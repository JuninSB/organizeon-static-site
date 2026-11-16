import { BellOff } from "lucide-react";
import { m } from "@/core/motion";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { Badge } from "@/components/ui/badge";
import type { DmConversation } from "./types";
export function ConversationRow({
  conversation: c,
  username,
  selected,
  onOpen,
}: {
  conversation: DmConversation;
  username: string | null;
  selected: boolean;
  onOpen: () => void;
}) {
  const at = new Date(c.lastMessage?.createdAt || c.updatedAt),
    recent = Date.now() - at.getTime() < 86400000;
  const time = Number.isNaN(at.getTime())
    ? ""
    : at.toLocaleString(
        "pt-BR",
        recent
          ? { hour: "2-digit", minute: "2-digit" }
          : { day: "2-digit", month: "2-digit" },
      );
  return (
    <m.button
      type="button"
      aria-label={`Conversa com ${c.peer.profile.displayName}`}
      onClick={onOpen}
      whileTap={{ scale: 0.985 }}
      className={`mb-1 flex w-full min-w-0 items-center gap-3 rounded-xl border-0 px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? "bg-accent" : "bg-transparent hover:bg-card"}`}
    >
      <span className="relative shrink-0">
        <ProfileAvatar profile={c.peer.profile} className="size-11" />
        {c.peer.online && (
          <span
            className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-emerald-500"
            aria-label="Online"
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-sm ${c.unread ? "font-semibold" : "font-medium"}`}
        >
          {c.peer.profile.displayName}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {c.lastMessage
            ? (c.lastMessage.sender.username === username ? "Você: " : "") +
              (c.lastMessage.deleted
                ? "Mensagem apagada"
                : c.lastMessage.content || "Arquivo")
            : "Conversa aceita"}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1.5">
        <time
          className="text-[10px] text-muted-foreground"
          dateTime={Number.isNaN(at.getTime()) ? undefined : at.toISOString()}
        >
          {time}
        </time>
        {c.unread > 0 ? (
          <Badge variant="secondary" className="tabular-nums">
            {c.unread > 99 ? "99+" : c.unread}
          </Badge>
        ) : c.muted ? (
          <BellOff className="size-3 text-muted-foreground" />
        ) : null}
      </span>
    </m.button>
  );
}
