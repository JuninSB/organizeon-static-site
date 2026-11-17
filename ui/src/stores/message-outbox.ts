import { useSyncExternalStore } from "react";
import { dmService } from "@/services/messages-service";
import { uniqueId } from "@/utils/unique-id";
import { accountSession } from "@/core/account-session";
import { operationFeedback } from "@/core/operation-feedback";
import type { DmMessage } from "@/features/messages/types";
export type LocalMedia = { id: string; name: string; size: number; mime: string; preview?: string; uploadedId?: string };
export type PendingMessage = { id: string; nonce: string; conversationId: string; resetVersion?:number; content: string; replyId: string|null; media: LocalMedia[]; attachmentIds: string[]; status: "sending"|"uploading"|"confirming"|"failed"; progress: number|null; error: string };
let state: { drafts: Record<string,LocalMedia[]>; pending: PendingMessage[] } = {drafts:{},pending:[]};
const listeners = new Set<()=>void>(), files = new Map<string,File>(), callbacks = new Map<string,(message:DmMessage)=>void>(), running = new Set<string>();
const emit=()=>{for(const listener of listeners)listener();};
const patch=(id:string,values:Partial<PendingMessage>)=>{state={...state,pending:state.pending.map(row=>row.id===id?{...row,...values}:row)};emit();};
function release(media:LocalMedia[]){for(const item of media){if(item.preview)URL.revokeObjectURL(item.preview);files.delete(item.id);}}
async function transmit(id:string):Promise<void>{
 if(running.has(id))return;
 const row=state.pending.find(item=>item.id===id);if(!row)return;
 const session=accountSession.get();running.add(id);patch(id,{status:row.media.length?"uploading":"sending",error:"",progress:null});
 const active=()=>accountSession.get().revision===session.revision&&state.pending.some(item=>item.id===id);
 try{
   const media=[...row.media], total=media.reduce((sum,item)=>sum+item.size,0);let completed=0;
   for(let index=0;index<media.length;index++){
     const item=media[index];if(item.uploadedId){completed+=item.size;continue;}
     const file=files.get(item.id);if(!file)throw Error("O arquivo não está mais disponível. Selecione-o novamente.");
     const result=await dmService.upload(row.conversationId,file,(loaded,bytes)=>{if(active())patch(id,{progress:Math.min(100,(completed+item.size*loaded/bytes)/total*100)});},row.resetVersion || 0);
     if(!active())return;
     media[index]={...item,uploadedId:result.attachment.id};completed+=item.size;patch(id,{media,progress:completed/total*100});
   }
   if(!active())return;patch(id,{status:"confirming"});
   const result=await dmService.send(row.conversationId,{content:row.content,nonce:row.nonce,replyId:row.replyId,resetVersion:row.resetVersion || 0,attachmentIds:[...row.attachmentIds,...media.map(item=>item.uploadedId!)]});
   if(!active())return;
   callbacks.get(id)?.(result.message);callbacks.delete(id);state={...state,pending:state.pending.filter(item=>item.id!==id)};emit();
   // Keep previews alive briefly across the replacement by the canonical message.
   setTimeout(()=>release(media),5000);
 }catch(error){if(active()){const message=error instanceof Error?error.message:"Não foi possível enviar.";patch(id,{status:"failed",error:message});operationFeedback.show("A mensagem não foi enviada. "+message);}throw error;}
 finally{running.delete(id);}
}
export const messageOutbox={
 get:()=>state,
 subscribe(listener:()=>void){listeners.add(listener);return()=>{listeners.delete(listener);};},
 stage(conversationId:string,file:File){if(file.size>8*1024*1024)throw Error("Cada arquivo pode ter até 8 MB.");const current=state.drafts[conversationId]||[];if(current.length>=4)throw Error("Você pode adicionar até quatro arquivos.");const item={id:uniqueId(),name:file.name,size:file.size,mime:file.type,preview:/^(image|video)\//.test(file.type)?URL.createObjectURL(file):undefined};files.set(item.id,file);state={...state,drafts:{...state.drafts,[conversationId]:[...current,item]}};emit();},
 removeDraft(conversationId:string,id:string){const list=state.drafts[conversationId]||[];release(list.filter(item=>item.id===id));state={...state,drafts:{...state.drafts,[conversationId]:list.filter(item=>item.id!==id)}};emit();},
 enqueue(values:{conversationId:string;resetVersion?:number;content:string;replyId:string|null;attachmentIds:string[]},confirmed:(message:DmMessage)=>void){const nonce=uniqueId(),id="pending-"+nonce;const row:PendingMessage={...values,id,nonce,media:state.drafts[values.conversationId]||[],status:"sending",progress:null,error:""};callbacks.set(id,confirmed);state={drafts:{...state.drafts,[values.conversationId]:[]},pending:[...state.pending,row]};emit();return transmit(id);},
 retry:transmit,
 clearConversation(conversationId:string){release(state.drafts[conversationId]||[]);for(const row of state.pending.filter(row=>row.conversationId===conversationId)){release(row.media);callbacks.delete(row.id);}state={drafts:{...state.drafts,[conversationId]:[]},pending:state.pending.filter(row=>row.conversationId!==conversationId)};emit();},
 discard(id:string){const row=state.pending.find(item=>item.id===id);if(!row||running.has(id))return;release(row.media);callbacks.delete(id);state={...state,pending:state.pending.filter(item=>item.id!==id)};emit();},
 clear(){for(const media of Object.values(state.drafts))release(media);for(const row of state.pending)release(row.media);state={drafts:{},pending:[]};files.clear();callbacks.clear();emit();},
};
export const useMessageOutbox=()=>useSyncExternalStore(messageOutbox.subscribe,messageOutbox.get);
