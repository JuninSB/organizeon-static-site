import { LoaderCircle, RotateCw, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { messageOutbox, type PendingMessage } from "@/stores/message-outbox";
import { useMessagesState } from "@/stores/messages-store";
import type { DmPerson } from "./types";
import "./messages.css";
export function PendingMessageRow({message,person}:{message:PendingMessage;person:DmPerson}){
 const showStatus=useMessagesState().inbox?.settings.showSendStatus===true;
 const failed=message.status==="failed",confirming=message.status==="confirming"||message.progress===100;
 return <article data-pending-id={message.id} className="flex gap-3 px-3 py-3" aria-label={failed?"Mensagem não enviada":"Mensagem pendente"}>
 <ProfileAvatar profile={person.profile} className="size-9"/>
 <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-muted-foreground">{person.profile.displayName}</p><p className={`whitespace-pre-wrap break-words text-sm ${failed?"text-destructive":"text-muted-foreground"}`}>{message.content}</p>
 {message.media.map(media=><div key={media.id} className="mt-2 max-w-64 overflow-hidden rounded-xl bg-card">{media.preview?<img src={media.preview} alt={media.name} className="max-h-52 w-full object-cover opacity-60"/>:<p className="flex gap-2 p-3 text-xs text-muted-foreground"><File className="size-4"/>{media.name}</p>}</div>)}
 {!failed&&message.media.length>0&&message.status==="uploading"&&message.progress!==100&&<div className="mt-2 max-w-64"><progress className="oo-upload-progress" max={100} value={message.progress??undefined} aria-label="Progresso do upload"/>{showStatus&&<span className="text-[10px] text-muted-foreground">{message.progress===null?"Preparando arquivo…":`Enviando ${Math.round(message.progress)}%`}</span>}</div>}
 <p role="status" className={`mt-1 flex items-center gap-1.5 text-xs ${failed?"text-destructive":"text-muted-foreground"}`}>{!failed&&<LoaderCircle className="size-3 animate-spin motion-reduce:animate-none"/>}<span className={!failed&&!showStatus?"sr-only":undefined}>{failed?(message.error||"Falha no envio"):confirming?"Confirmando envio…":message.media.length?"Enviando anexo…":"Enviando…"}</span></p>
 {failed&&<div className="mt-2 flex gap-2"><Button type="button" size="sm" variant="outline" onClick={()=>void messageOutbox.retry(message.id).catch(()=>{})}><RotateCw className="size-3"/>Tentar novamente</Button><Button type="button" size="sm" variant="ghost" onClick={()=>messageOutbox.discard(message.id)}><X className="size-3"/>Remover tentativa</Button></div>}
 </div></article>;
}
