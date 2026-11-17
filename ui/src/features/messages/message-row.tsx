import { useRef, useState } from "react";
import { Bookmark, CheckCheck, MoreHorizontal, Pin, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { useMessageGestures } from "./use-message-gestures";
import { MessageMedia } from "./message-media";
import type { DmMessage, DmPerson } from "./types";
function Text({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(https?:\/\/[^\s]+|@[A-Za-z0-9_.-]{3,32})/g)
        .map((part, i) =>
          /^https?:\/\//.test(part) ? (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-primary underline underline-offset-2"
            >
              {part}
            </a>
          ) : /^@[A-Za-z0-9_.-]+$/.test(part) ? (
            <span
              key={i}
              className="rounded bg-accent px-0.5 font-medium text-accent-foreground"
            >
              {part}
            </span>
          ) : (
            part
          ),
        )}
    </>
  );
}
export function MessageRow({
  message,
  person,
  own,
  read,
  onReply,
  onActions,
  onForward,
  onBookmark,
  onMention,
  onProfile,
  onReact,
  quickReaction,
  compact = false,
  showReceipt = true,
  viewer = "",
}: {
  message: DmMessage;
  person: DmPerson;
  own: boolean;
  read: boolean;
  onReply: (m: DmMessage) => void;
  onActions: (m: DmMessage) => void;
  onForward?: (m: DmMessage) => void;
  onBookmark?: (m: DmMessage) => Promise<unknown>;
  onMention: (username: string) => void;
  onProfile: (person: DmPerson) => void;
  onReact: (m: DmMessage, emoji: string) => void;
  quickReaction: string;
  compact?: boolean;
  showReceipt?: boolean;
  viewer?: string;
}) {
  const actions = () => {
      if (!message.deleted) onActions(message);
    },
    reply = () => {
      if (!message.deleted) onReply(message);
    };
  const mentioned =
    !own &&
    message.content
      .split(/(https?:\/\/[^\s]+|@[A-Za-z0-9_.-]{3,32})/g)
      .some((part) => part.toLowerCase() === "@" + viewer.toLowerCase());
  const gesture = useMessageGestures({ reply, actions });
  const [hover, setHover] = useState(false);
  const row = useRef<HTMLElement>(null);
  return (
    <article
      ref={row}
      tabIndex={-1}
      {...gesture.handlers}
      data-message-id={message.id}
      className={`group relative flex min-w-0 gap-3 rounded-md px-3 ${mentioned ? "oo-dm-mentioned" : ""} ${compact ? "py-0.5" : "pb-1 pt-3"} hover:bg-accent/20`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDoubleClick={(event) => {
        if (
          (event.target as Element).closest(
            "button,a,input,textarea,video,audio",
          )
        )
          return;
        if (!message.deleted) onReact(message, quickReaction);
      }}
      style={{
        transform: gesture.offset
          ? `translateX(${gesture.offset}px)`
          : undefined,
        touchAction: "pan-y",
        transition: gesture.offset ? "none" : "transform 150ms ease",
      }}
    >
      {!compact ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mt-0.5 size-9 shrink-0 rounded-full p-0"
          aria-label={`Abrir perfil de ${person.profile.displayName}`}
          onClick={() => onProfile(person)}
        >
          <ProfileAvatar profile={person.profile} className="size-9" />
        </Button>
      ) : (
        <span className="w-9 shrink-0" aria-hidden="true" />
      )}
      <div className="min-w-0 flex-1">
        {message.reply && (
          <div className="mb-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Reply className="size-3 shrink-0" />
            <span className="shrink-0">@{message.reply.username}</span>
            <span className="truncate">
              {message.reply.content || "Arquivo"}
            </span>
          </div>
        )}
        {!compact && (
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 pr-6">
            <button
              type="button"
              className="max-w-full truncate rounded text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                color:
                  person.profile.nameColor.toUpperCase() === "#FAFAFA"
                    ? undefined
                    : person.profile.nameColor,
              }}
              onClick={() => onMention(person.username)}
            >
              {person.profile.displayName}
            </button>
            <time
              dateTime={message.createdAt}
              className="text-[10px] text-muted-foreground"
              title={new Date(message.createdAt).toLocaleString("pt-BR")}
            >
              {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
            {message.editedAt && !message.deleted && (
              <span className="text-[10px] text-muted-foreground">editada</span>
            )}
            {message.pinned && (
              <Pin
                aria-label="Mensagem fixada"
                className="size-3 text-muted-foreground"
              />
            )}
            {message.bookmarked && (
              <Bookmark
                aria-label="Mensagem salva"
                className="size-3 text-muted-foreground"
              />
            )}
          </div>
        )}
        {message.forwarded && !message.deleted && (
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Encaminhada
          </p>
        )}
        <p
          className={`mt-0.5 whitespace-pre-wrap break-words text-sm leading-relaxed ${message.deleted ? "italic text-muted-foreground" : ""}`}
        >
          {message.deleted ? (
            "Mensagem apagada"
          ) : (
            <Text text={message.content} />
          )}
        </p>
        {!message.deleted &&
          message.attachments.map((attachment) => (
            <MessageMedia
              key={attachment.id}
              attachment={attachment}
              metadata={
                <div className="flex items-center gap-3">
                  <ProfileAvatar profile={person.profile} className="size-9" />
                  <div>
                    <p className="text-sm font-medium">
                      {person.profile.displayName}
                    </p>
                    <time className="text-xs text-zinc-400">
                      {new Date(message.createdAt).toLocaleString("pt-BR")}
                    </time>
                  </div>
                </div>
              }
              onForward={onForward ? () => onForward(message) : undefined}
              onBookmark={onBookmark ? () => onBookmark(message) : undefined}
              onReact={() => onActions(message)}
              bookmarked={message.bookmarked}
              onJump={() => {
                row.current?.scrollIntoView({
                  block: "center",
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                });
                row.current?.focus({ preventScroll: true });
              }}
            />
          ))}
        {!message.deleted && message.reactions.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {message.reactions.map((reaction) => (
              <button
                key={reaction.emoji}
                type="button"
                aria-label={`Reagir com ${reaction.emoji}, ${reaction.count}`}
                aria-pressed={reaction.mine}
                onClick={() => onReact(message, reaction.emoji)}
                className={`rounded-md border px-2 py-0.5 text-xs transition-colors ${reaction.mine ? "border-primary bg-accent" : "border-border bg-muted hover:bg-accent"}`}
              >
                {reaction.emoji}{" "}
                <span className="tabular-nums">{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
        {own && showReceipt && !message.deleted && (
          <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
            {read && <CheckCheck className="size-3" />}
            {read ? "Lida" : "Enviada"}
          </p>
        )}
      </div>
      {!message.deleted && (
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Ações da mensagem"
          className={`absolute right-1 top-1 ${hover ? "" : "sm:opacity-0 sm:group-focus-within:opacity-100"}`}
          onClick={actions}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      )}
    </article>
  );
}
