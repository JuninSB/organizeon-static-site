import { useLongPressDelay } from "./gesture-config";
import { useEffect, useRef } from "react";
import { BellOff, Pin, Star } from "lucide-react";
import { m } from "@/core/motion";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { Badge } from "@/components/ui/badge";
import type { DmConversation } from "./types";
export function ConversationRow({
  conversation: c,
  username,
  selected,
  onOpen,
  onActions,
}: {
  conversation: DmConversation;
  username: string | null;
  selected: boolean;
  onOpen: () => void;
  onActions: () => void;
}) {
  const delay = useLongPressDelay();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    origin = useRef<{ x: number; y: number } | null>(null),
    held = useRef(false);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => () => clear(), []);
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
      onClick={(event) => {
        if (held.current) {
          event.preventDefault();
          held.current = false;
          return;
        }
        onOpen();
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") return;
        held.current = false;
        origin.current = { x: event.clientX, y: event.clientY };
        clear();
        timer.current = setTimeout(() => {
          held.current = true;
          onActions();
        }, delay);
      }}
      onPointerMove={(event) => {
        if (
          origin.current &&
          (Math.abs(event.clientX - origin.current.x) > 10 ||
            Math.abs(event.clientY - origin.current.y) > 10)
        )
          clear();
      }}
      onPointerUp={clear}
      onPointerCancel={clear}
      onContextMenu={(event) => {
        event.preventDefault();
        clear();
        held.current = true;
        onActions();
      }}
      onKeyDown={(event) => {
        if (
          event.key === "ContextMenu" ||
          (event.shiftKey && event.key === "F10")
        ) {
          event.preventDefault();
          onActions();
        }
      }}
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
        <span className="flex gap-1">
          {c.pinned && (
            <Pin
              className="size-3 text-muted-foreground"
              aria-label="Conversa fixada"
            />
          )}
          {c.favorite && (
            <Star
              className="size-3 text-muted-foreground"
              aria-label="Conversa favorita"
            />
          )}
        </span>
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
