import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PendingMessageRow } from "./pending-message";
let showSendStatus=false;
vi.mock("@/stores/messages-store",()=>({useMessagesState:()=>({inbox:{settings:{showSendStatus}}})}));
vi.mock("@/features/profile/profile-avatar",()=>({ProfileAvatar:()=>null}));
const person={username:"fixture",profile:{displayName:"Fixture"}} as any;
const base={id:"p",nonce:"n",conversationId:"c",content:"Teste",replyId:null,media:[],attachmentIds:[],status:"confirming",progress:null,error:""} as any;
afterEach(()=>{cleanup();showSendStatus=false;});
it("keeps confirmation accessible but visually hidden by default",()=>{
 render(<PendingMessageRow message={base} person={person}/>);
 expect(screen.getByText("Confirmando envio…")).toHaveClass("sr-only");
 expect(screen.getByRole("status").querySelector(".animate-spin")).toBeTruthy();
});
it("shows optional status text when enabled",()=>{showSendStatus=true;render(<PendingMessageRow message={base} person={person}/>);expect(screen.getByText("Confirmando envio…")).not.toHaveClass("sr-only");});
it("always shows failed sends in red",()=>{render(<PendingMessageRow message={{...base,status:"failed",error:"Falha de rede"}} person={person}/>);expect(screen.getByText("Falha de rede").closest('[role="status"]')).toHaveClass("text-destructive");expect(screen.getByText("Falha de rede")).not.toHaveClass("sr-only");});
it("uses an indeterminate spinner during confirmation rather than a completed progress bar",()=>{render(<PendingMessageRow message={{...base,progress:100,media:[{id:"a",name:"arquivo",size:5,mime:"text/plain"}]}} person={person}/>);expect(screen.queryByRole("progressbar")).toBeNull();expect(screen.getByRole("status").querySelector(".animate-spin")).toBeTruthy();});
