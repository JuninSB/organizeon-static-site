import { useRef, useState } from "react";
import {
  UserRound,
  Archive,
  Star,
  Pin,
  CheckCheck,
  BellOff,
  Bell,
  RotateCcw,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import { ConversationResetDialog } from "./conversation-reset-dialog";
import type { DmConversation, DmPerson } from "./types";
import { m } from "@/core/motion";
import "./messages.css";
export function ConversationActions({
  conversation: c,
  onClose,
  onProfile,
}: {
  conversation: DmConversation | null;
  onClose: () => void;
  onProfile: (person: DmPerson) => void;
}) {
  const held = useRef(c),
    pending = useRef<(() => void) | null>(null);
  if (c) held.current = c;
  const current = c || held.current;
  const [error, setError] = useState("");
  const [resetTarget, setResetTarget] = useState<DmConversation | null>(null);
  const role = useMessagesState().inbox?.me.role;
  const canReset =
    !!role && ["ultra_admin", "super_admin", "owner"].includes(role);
  const choose = (fn: () => void | Promise<unknown>) => {
    if (!c || pending.current) return;
    pending.current = () => {
      void Promise.resolve()
        .then(fn)
        .catch((e) => setError(e.message));
    };
    onClose();
  };
  if (!current) return null;
  const groups = [
    [
      { label: "Perfil", icon: UserRound, run: () => onProfile(current.peer) },
      {
        label: "Fechar DM",
        icon: Archive,
        run: () => messagesStore.conversation(current.id, { archived: true }),
      },
    ],
    [
      {
        label: current.favorite
          ? "Remover dos favoritos"
          : "Adicionar aos favoritos",
        icon: Star,
        run: () =>
          messagesStore.conversation(current.id, {
            favorite: !current.favorite,
          }),
      },
      {
        label: current.pinned ? "Desafixar conversa" : "Fixar conversa",
        icon: Pin,
        run: () =>
          messagesStore.conversation(current.id, { pinned: !current.pinned }),
      },
    ],
    [
      {
        label: "Marcar como lida",
        icon: CheckCheck,
        run: () => messagesStore.markRead(current.id),
      },
      {
        label: current.muted ? "Ativar notificações" : "Silenciar conversa",
        icon: current.muted ? Bell : BellOff,
        run: () =>
          messagesStore.conversation(current.id, { muted: !current.muted }),
      },
    ],
  ];
  return (
    <>
      <Drawer
        open={!!c}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        onOpenChangeComplete={(open) => {
          if (!open) {
            const run = pending.current;
            pending.current = null;
            run?.();
          }
        }}
      >
        <DrawerContent className="oo-dm-actions">
          <DrawerTitle className="sr-only">Ações da conversa</DrawerTitle>
          <DrawerDescription className="sr-only">
            Gerencie esta conversa da sua conta.
          </DrawerDescription>
          <div className="mb-5 flex items-center gap-3">
            <ProfileAvatar profile={current.peer.profile} className="size-12" />
            <p className="text-base font-semibold">@{current.peer.username}</p>
          </div>
          <div className="grid gap-4">
            {groups.map((group, index) => (
              <div className="oo-dm-action-group" key={index}>
                {group.map(({ label, icon: Icon, run }) => (
                  <m.button
                    key={label}
                    type="button"
                    className="oo-dm-action-row"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => choose(run)}
                  >
                    <Icon />
                    {label}
                  </m.button>
                ))}
              </div>
            ))}
            {canReset && (
              <div className="oo-dm-action-group">
                <m.button
                  type="button"
                  className="oo-dm-action-row text-orange-500"
                  style={{ color: "#f97316" }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => choose(() => setResetTarget(current))}
                >
                  <RotateCcw />
                  Resetar conversa
                </m.button>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
      <ConversationResetDialog
        conversation={resetTarget}
        onClose={() => setResetTarget(null)}
      />
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-border bg-popover p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </>
  );
}
