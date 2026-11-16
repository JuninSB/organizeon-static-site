import type { Profile } from "@/services/profile-service";
export type DmPerson = {
  username: string;
  role: string;
  profile: Profile;
  available: boolean;
  online?: boolean;
};
export type DmAttachment = {
  id: string;
  name: string;
  mime: string;
  size: number;
};
export type DmMessage = {
  id: string;
  seq: number;
  conversationId: string;
  sender: { username: string };
  content: string;
  createdAt: string;
  editedAt: string | null;
  deleted: boolean;
  pinned: boolean;
  bookmarked: boolean;
  reply: { id: string; username: string; content: string } | null;
  forwarded: boolean;
  attachments: DmAttachment[];
  reactions: { emoji: string; count: number; mine: boolean }[];
};
export type DmConversation = {
  id: string;
  status: "pending" | "accepted";
  direction: "incoming" | "outgoing";
  peer: DmPerson;
  createdAt: string;
  updatedAt: string;
  muted: boolean;
  archived: boolean;
  blockedByMe: boolean;
  canSend: boolean;
  unread: number;
  peerReadSeq: number;
  lastMessage: DmMessage | null;
};
export type DmSettings = {
  autoAccept: boolean;
  notifications: boolean;
  sound: boolean;
  previews: boolean;
  desktop: boolean;
  quickReaction: string;
};
export type DmEvent = {
  seq: number;
  kind: string;
  conversationId: string;
  messageId: string | null;
  claimed: boolean;
};
export type Inbox = {
  me: DmPerson;
  conversations: DmConversation[];
  requests: DmConversation[];
  settings: DmSettings;
  events: DmEvent[];
  cursor: number;
};
export type MessagePage = {
  messages: DmMessage[];
  hasMore: boolean;
  conversation: DmConversation;
  typing: boolean;
};
export type DmNotice = {
  id: number;
  conversationId: string;
  person: DmPerson;
  text: string;
  kind: string;
};
export const quickReactions = [
  "👍",
  "❤️",
  "😂",
  "🎉",
  "🔥",
  "👀",
  "👎",
  "😢",
  "✅",
  "🇧🇷",
  "💀",
  "🙂",
];
