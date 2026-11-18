import { afterEach, expect, it, vi } from "vitest";
import { dmService } from "@/services/messages-service";
import { messagesStore } from "./messages-store";
vi.mock("@/services/messages-service", () => ({ dmService: { inbox: vi.fn(), messages: vi.fn(), message: vi.fn(), claimGoldBadge: vi.fn(), claim: vi.fn(), read: vi.fn(), reset:vi.fn(), invalidateConversation:vi.fn() } }));
let stop: (() => void) | undefined;
afterEach(() => { stop?.(); stop = undefined; vi.useRealTimers(); Object.defineProperty(document,"hidden",{configurable:true,value:false}); });
it("keeps edits consumed in the background dirty until the cached message refreshes", async () => {
 vi.useFakeTimers();
 const original={id:"m1",seq:1,conversationId:"c1",content:"before",sender:{username:"bob"}};
 const edited={...original,content:"after"};
 const conversation={id:"c1",unread:0};
 const inbox={me:{username:"alice"},conversations:[conversation],requests:[],settings:{notifications:false},cursor:1,events:[]};
 vi.mocked(dmService.inbox).mockResolvedValue(inbox as any);
 vi.mocked(dmService.messages).mockResolvedValue({messages:[original],hasMore:false,typing:false,conversation} as any);
 vi.mocked(dmService.message).mockResolvedValue({message:edited} as any);
 stop=messagesStore.start("alice");await vi.advanceTimersByTimeAsync(0);messagesStore.open("c1");await vi.advanceTimersByTimeAsync(0);
 expect(messagesStore.get().threads.c1.messages[0].content).toBe("before");
 Object.defineProperty(document,"hidden",{configurable:true,value:true});
 vi.mocked(dmService.inbox).mockResolvedValueOnce({...inbox,cursor:2,events:[{seq:2,kind:"edited",conversationId:"c1",messageId:"m1"}]} as any);
 await messagesStore.refresh();expect(dmService.message).not.toHaveBeenCalled();
 Object.defineProperty(document,"hidden",{configurable:true,value:false});
 vi.mocked(dmService.inbox).mockResolvedValue({...inbox,cursor:2,events:[]} as any);
 vi.mocked(dmService.messages).mockResolvedValue({messages:[],hasMore:false,typing:false,conversation} as any);
 await messagesStore.refresh();expect(dmService.message).toHaveBeenCalledWith("m1");expect(messagesStore.get().threads.c1.messages[0].content).toBe("after");
});

it("delivers a pending award on the next visible session even when DM notices are disabled",async()=>{
 vi.useFakeTimers();vi.spyOn(document,"hasFocus").mockReturnValue(true);
 const inbox={me:{username:"alice",profile:{displayName:"Alice",nameColor:"#FAFAFA",avatarShape:"circle",avatar:null,bio:"",goldBadge:true}},conversations:[],requests:[],settings:{notifications:false},cursor:0,events:[],goldBadgeNotificationPending:true};
 vi.mocked(dmService.inbox).mockResolvedValue(inbox as any);vi.mocked(dmService.claimGoldBadge).mockResolvedValue({claimed:true});stop=messagesStore.start("alice");await vi.advanceTimersByTimeAsync(0);expect(dmService.claimGoldBadge).toHaveBeenCalledOnce();expect(messagesStore.get().notices[0].kind).toBe("gold_badge");expect(messagesStore.get().notices[0].text).toContain("Você ganhou");vi.mocked(dmService.inbox).mockResolvedValue({...inbox,goldBadgeNotificationPending:false} as any);await messagesStore.refresh();expect(dmService.claimGoldBadge).toHaveBeenCalledOnce();
});

it("reset clears cached history and draft and applies the new version",async()=>{vi.useFakeTimers();const conversation={id:"c1",unread:0,resetVersion:0};const inbox={me:{username:"alice"},conversations:[conversation],requests:[],settings:{notifications:false},cursor:1,events:[]};vi.mocked(dmService.inbox).mockResolvedValue(inbox as any);vi.mocked(dmService.messages).mockResolvedValue({messages:[{id:"m1",seq:1,conversationId:"c1",content:"old",sender:{username:"bob"}}],hasMore:false,typing:false,conversation} as any);stop=messagesStore.start("alice");await vi.advanceTimersByTimeAsync(0);messagesStore.open("c1");await vi.advanceTimersByTimeAsync(0);messagesStore.setDraft("c1",{text:"old draft"});const fresh={...conversation,resetVersion:1};vi.mocked(dmService.reset).mockResolvedValue({conversation:fresh} as any);vi.mocked(dmService.inbox).mockResolvedValue({...inbox,conversations:[fresh],cursor:2} as any);vi.mocked(dmService.messages).mockResolvedValue({messages:[],hasMore:false,typing:false,conversation:fresh} as any);await messagesStore.resetConversation(conversation as any);await vi.advanceTimersByTimeAsync(0);expect(messagesStore.get().threads.c1.messages).toEqual([]);expect(messagesStore.draft("c1").text).toBe("");expect(dmService.invalidateConversation).toHaveBeenCalledWith("c1");});
it('a reset received by polling clears the other participant cached thread',async()=>{vi.useFakeTimers();const c={id:'c1',unread:0,resetVersion:0};const inbox={me:{username:'alice'},conversations:[c],requests:[],settings:{notifications:false},cursor:1,events:[]};vi.mocked(dmService.inbox).mockResolvedValue(inbox as any);vi.mocked(dmService.messages).mockResolvedValue({messages:[{id:'old',seq:1,conversationId:'c1',content:'old'}],hasMore:false,conversation:c} as any);stop=messagesStore.start('alice');await vi.advanceTimersByTimeAsync(0);messagesStore.open('c1');await vi.advanceTimersByTimeAsync(0);expect(messagesStore.get().threads.c1.messages).toHaveLength(1);const fresh={...c,resetVersion:1};vi.mocked(dmService.inbox).mockResolvedValue({...inbox,conversations:[fresh],cursor:2,events:[{seq:2,kind:'reset',conversationId:'c1'}]} as any);vi.mocked(dmService.messages).mockResolvedValue({messages:[],hasMore:false,conversation:fresh} as any);await messagesStore.refresh();expect(messagesStore.get().threads.c1.messages).toEqual([]);});
