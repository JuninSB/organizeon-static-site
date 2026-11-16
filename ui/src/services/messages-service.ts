import { accountRequest } from "./account-api";
import type {
  Inbox,
  MessagePage,
  DmMessage,
  DmConversation,
  DmSettings,
  DmPerson,
  DmAttachment,
} from "@/features/messages/types";
const id = encodeURIComponent;
export const dmService = {
  inbox: (after: number | null) =>
    accountRequest<Inbox>(
      "/dm/inbox?active=" +
        (document.hidden ? "0" : "1") +
        (after === null ? "" : "&after=" + after),
    ),
  request: (username: string) =>
    accountRequest<DmConversation>("/dm/requests", {
      method: "POST",
      body: JSON.stringify({ username }),
    }),
  respond: (conversationId: string, action: "accept" | "decline" | "cancel") =>
    accountRequest("/dm/conversations/" + id(conversationId) + "/request", {
      method: "POST",
      body: JSON.stringify({ action }),
    }),
  messages: (
    conversationId: string,
    query: {
      before?: number;
      after?: number;
      search?: string;
      filter?: string;
    } = {},
  ) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(query))
      if (v !== undefined && v !== "") p.set(k, String(v));
    return accountRequest<MessagePage>(
      "/dm/conversations/" + id(conversationId) + "/messages?" + p,
    );
  },
  send: (
    conversationId: string,
    values: {
      content?: string;
      nonce: string;
      replyId?: string | null;
      attachmentIds?: string[];
      forwardId?: string;
    },
  ) =>
    accountRequest<{ message: DmMessage }>(
      "/dm/conversations/" + id(conversationId) + "/messages",
      { method: "POST", body: JSON.stringify(values) },
    ),
  message: (messageId: string) =>
    accountRequest<{ message: DmMessage }>("/dm/messages/" + id(messageId)),
  edit: (messageId: string, content: string) =>
    accountRequest<{ message: DmMessage }>("/dm/messages/" + id(messageId), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    }),
  remove: (messageId: string) =>
    accountRequest("/dm/messages/" + id(messageId), { method: "DELETE" }),
  action: (messageId: string, action: string, value?: string) =>
    accountRequest("/dm/messages/" + id(messageId) + "/actions", {
      method: "POST",
      body: JSON.stringify({ action, value }),
    }),
  read: (conversationId: string, seq: number) =>
    accountRequest("/dm/conversations/" + id(conversationId) + "/read", {
      method: "POST",
      body: JSON.stringify({ seq }),
    }),
  typing: (conversationId: string, active: boolean) =>
    accountRequest("/dm/conversations/" + id(conversationId) + "/typing", {
      method: "POST",
      body: JSON.stringify({ active }),
    }),
  conversation: (
    conversationId: string,
    patch: { muted?: boolean; archived?: boolean },
  ) =>
    accountRequest("/dm/conversations/" + id(conversationId), {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  settings: (patch: Partial<DmSettings>) =>
    accountRequest<{ settings: DmSettings }>("/dm/settings", {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  block: (username: string, blocked: boolean) =>
    accountRequest("/dm/people/" + id(username) + "/block", {
      method: "POST",
      body: JSON.stringify({ blocked }),
    }),
  person: (username: string) =>
    accountRequest<{ person: DmPerson }>("/dm/people/" + id(username)),
  claim: (seq: number) =>
    accountRequest<{
      claimed: boolean;
      conversation?: DmConversation;
      message?: DmMessage;
      kind?: string;
    }>("/dm/notifications/claim", {
      method: "POST",
      body: JSON.stringify({ seq }),
    }),
  upload: async (conversationId: string, file: File) => {
    if (file.size > 8 * 1024 * 1024)
      throw Error("Cada arquivo pode ter até 8 MB.");
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]);
      reader.onerror = () => reject(Error("Não foi possível ler o arquivo."));
      reader.readAsDataURL(file);
    });
    return accountRequest<{ attachment: DmAttachment }>(
      "/dm/conversations/" + id(conversationId) + "/attachments",
      {
        method: "POST",
        body: JSON.stringify({
          name: file.name,
          mime: file.type || "application/octet-stream",
          data,
        }),
      },
    );
  },
  attachment: (attachmentId: string) =>
    accountRequest<{ attachment: DmAttachment & { data: string } }>(
      "/dm/attachments/" + id(attachmentId),
    ),
  discardAttachment: (attachmentId: string) =>
    accountRequest("/dm/attachments/" + id(attachmentId), { method: "DELETE" }),
};
