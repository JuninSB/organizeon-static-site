import {
  operationFeedback,
  useOperationFailure,
} from "@/core/operation-feedback";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { usePortalContainer } from "@/components/ui/portal-context";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import type { DmNotice } from "./types";
function Notice({ notice }: { notice: DmNotice }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const timeout = setTimeout(() => dismiss(), 9000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [notice.id]);
  function dismiss() {
    setVisible(false);
    setTimeout(() => messagesStore.dismissNotice(notice.id), 150);
  }
  return (
    <div
      role="status"
      className={`pointer-events-auto rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-sm transition-[opacity,transform] duration-150 motion-reduce:transition-none ${visible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
    >
      <div className="flex items-start gap-3">
        <ProfileAvatar profile={notice.person.profile} className="size-9" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {notice.person.profile.displayName}
          </p>
          <p className="mt-1 line-clamp-2 break-words text-xs text-muted-foreground">
            {notice.text}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              messagesStore.open(notice.conversationId);
              dismiss();
            }}
          >
            Abrir
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Fechar notificação de ${notice.person.profile.displayName}`}
          onClick={dismiss}
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
export function MessagesNotifications() {
  const { notices } = useMessagesState();
  const failure = useOperationFailure();
  const container = usePortalContainer();
  if (!notices.length && !failure) return null;
  return createPortal(
    <div
      aria-label="Notificações de mensagens"
      className="pointer-events-none fixed right-4 top-4 z-50 grid w-[min(22rem,calc(100vw-2rem))] gap-2"
    >
      {failure && (
        <div
          role="alert"
          className="pointer-events-auto flex items-start gap-3 rounded-xl border border-border bg-popover p-4 text-sm text-popover-foreground shadow-sm"
        >
          <p className="flex-1">{failure}</p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Fechar aviso de falha"
            onClick={() => operationFeedback.dismiss()}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
      {notices.map((notice) => (
        <Notice key={notice.id} notice={notice} />
      ))}
    </div>,
    container || document.body,
  );
}
