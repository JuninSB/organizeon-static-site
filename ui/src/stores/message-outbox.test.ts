import { afterEach, expect, it, vi } from "vitest";
import { dmService } from "@/services/messages-service";
import { accountSession } from "@/core/account-session";
import { messageOutbox } from "./message-outbox";
vi.mock("@/services/messages-service",()=>({dmService:{send:vi.fn(),upload:vi.fn()}}));
afterEach(()=>{messageOutbox.clear();vi.clearAllMocks();});
it("renders a pending send immediately and retries a failure with the same nonce",async()=>{
 accountSession.activate("fixture");let reject!:(error:Error)=>void;
 vi.mocked(dmService.send).mockImplementationOnce(()=>new Promise((_,r)=>{reject=r;}));
 const confirmed=vi.fn(),work=messageOutbox.enqueue({conversationId:"c",content:"teste",replyId:null,attachmentIds:[]},confirmed);
 const pending=messageOutbox.get().pending[0];expect(pending.content).toBe("teste");expect(confirmed).not.toHaveBeenCalled();
 reject(Error("Falha de rede"));await expect(work).rejects.toThrow("Falha de rede");expect(messageOutbox.get().pending[0].status).toBe("failed");
 vi.mocked(dmService.send).mockResolvedValueOnce({message:{id:"real"}} as any);await messageOutbox.retry(pending.id);
 expect(vi.mocked(dmService.send).mock.calls.map(call=>call[1].nonce)).toEqual([pending.nonce,pending.nonce]);expect(messageOutbox.get().pending).toHaveLength(0);expect(confirmed).toHaveBeenCalledOnce();
});
it("separates actual upload progress from acknowledgement and reuses uploaded attachments on retry",async()=>{
 accountSession.activate("fixture");let ack!:(result:any)=>void;
 vi.mocked(dmService.upload).mockImplementationOnce(async(_c,_f,progress)=>{progress?.(50,100);expect(messageOutbox.get().pending[0].progress).toBe(50);return {attachment:{id:"a"}} as any;});
 vi.mocked(dmService.send).mockImplementationOnce(()=>new Promise(r=>{ack=r;}));
 messageOutbox.stage("c",new File(["hello"],"test.txt",{type:"text/plain"}));const work=messageOutbox.enqueue({conversationId:"c",content:"",replyId:null,attachmentIds:[]},vi.fn());
 await vi.waitFor(()=>expect(messageOutbox.get().pending[0].status).toBe("confirming"));expect(messageOutbox.get().pending[0].progress).toBe(100);ack({message:{id:"m"}});await work;expect(messageOutbox.get().pending).toHaveLength(0);
});
