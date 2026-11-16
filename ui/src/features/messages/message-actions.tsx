import { m } from "@/core/motion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import "./messages.css";
import { useRef, useState } from "react";
import {
  Copy,
  Reply,
  Forward,
  Pin,
  Bookmark,
  Mail,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { quickReactions, type DmMessage } from "./types";
export type MessageAction =
  | "reply"
  | "edit"
  | "remove"
  | "forward"
  | "copy"
  | "unread"
  | "pin"
  | "bookmark";
type Option = {
  id: MessageAction;
  label: string;
  icon: typeof Copy;
  description: string;
};
export function MessageActions({
  message,
  own,
  onClose,
  onAction,
  onReact,
}: {
  message: DmMessage | null;
  own: boolean;
  onClose: () => void;
  onAction: (action: MessageAction, message: DmMessage) => void;
  onReact: (message: DmMessage, emoji: string) => void;
}) {
  const prefs = useMessagesState().inbox?.settings;
  const [picker, setPicker] = useState(false),
    [error, setError] = useState("");
  const held = useRef<{ message: DmMessage; own: boolean } | null>(null);
  const pending = useRef<(() => void) | null>(null);
  if (message) held.current = { message, own };
  const current = message || held.current?.message;
  const isOwn = message ? own : !!held.current?.own;
  // Wait for the modal to release focus before opening another modal or composer.
  function choose(next: () => void) {
    if (!message || pending.current) return;
    pending.current = next;
    onClose();
  }
  const groups: Option[][] = [
    [
      ...(isOwn
        ? [
            {
              id: "edit" as const,
              label: "Editar mensagem",
              icon: Pencil,
              description: "Alterar o texto da sua mensagem",
            },
          ]
        : []),
      {
        id: "reply",
        label: "Responder",
        icon: Reply,
        description: "Citar esta mensagem na resposta",
      },
      {
        id: "forward",
        label: "Encaminhar",
        icon: Forward,
        description: "Enviar uma cópia identificada para outra conversa",
      },
    ],
    [
      {
        id: "copy",
        label: "Copiar texto",
        icon: Copy,
        description: "Copiar o texto para a área de transferência",
      },
      {
        id: "unread",
        label: "Marcar como não lida",
        icon: Mail,
        description: "Marcar a conversa como não lida a partir daqui",
      },
      {
        id: "pin",
        label: current?.pinned ? "Desafixar mensagem" : "Fixar mensagem",
        icon: Pin,
        description: "Gerenciar as mensagens fixadas da conversa",
      },
      {
        id: "bookmark",
        label: current?.bookmarked ? "Remover dos salvos" : "Salvar mensagem",
        icon: Bookmark,
        description: "Guardar esta mensagem nos seus salvos pessoais",
      },
    ],
    ...(isOwn
      ? [
          [
            {
              id: "remove" as const,
              label: "Apagar mensagem",
              icon: Trash2,
              description:
                "Apagar sua mensagem para os participantes após confirmar",
            },
          ],
        ]
      : []),
  ];
  return (
    <Drawer
      open={!!message}
      swipeDirection="down"
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      onOpenChangeComplete={(open) => {
        if (!open) {
          const next = pending.current;
          pending.current = null;
          next?.();
        }
      }}
    >
      <DrawerContent className="oo-dm-actions">
        <DrawerTitle className="sr-only">Ações da mensagem</DrawerTitle>
        <DrawerDescription className="sr-only">
          Puxe para baixo para fechar ou escolha uma ação.
        </DrawerDescription>
        <m.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 grid grid-cols-6 gap-2"
        >
          {quickReactions.slice(0, 6).map((emoji) => (
            <m.button
              key={emoji}
              type="button"
              whileTap={{ scale: 0.9 }}
              className="oo-dm-reaction"
              aria-label={`Reagir com ${emoji}`}
              onClick={() => {
                if (current) choose(() => onReact(current, emoji));
              }}
            >
              {emoji}
            </m.button>
          ))}
        </m.div>
        <div
          className="mb-5 flex min-h-8 items-center justify-center gap-1.5 text-xs text-muted-foreground"
          data-base-ui-swipe-ignore
        >
          <span>Toque duas vezes para {prefs?.quickReaction || "👍"}</span>
          <Popover open={picker} onOpenChange={setPicker}>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="h-7 px-1"
                />
              }
            >
              Alterar
            </PopoverTrigger>
            <PopoverContent side="top" className="oo-dm-actions w-64">
              <p className="mb-3 text-sm font-medium">Reação ao toque duplo</p>
              <div className="grid grid-cols-6 gap-2">
                {quickReactions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    aria-label={`Usar ${emoji} no toque duplo`}
                    aria-pressed={prefs?.quickReaction === emoji}
                    className="oo-dm-reaction"
                    onClick={() => {
                      void messagesStore
                        .settings({ quickReaction: emoji })
                        .then(() => setPicker(false))
                        .catch((e) => setError(e.message));
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="ml-auto"
            aria-label="Fechar ações da mensagem"
            onClick={onClose}
          >
            <X className="size-3.5" />
          </Button>
        </div>
        {error && (
          <p role="alert" className="mb-3 text-xs text-destructive">
            {error}
          </p>
        )}
        <div className="grid gap-4">
          {groups.map((options, index) => (
            <m.div
              key={index}
              className="oo-dm-action-group"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: index * 0.025 }}
            >
              {options.map(({ id, label, icon: Icon, description }) => (
                <m.button
                  key={id}
                  type="button"
                  title={description}
                  className="oo-dm-action-row"
                  data-destructive={id === "remove" || undefined}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    if (current) choose(() => onAction(id, current));
                  }}
                >
                  <Icon />
                  {label}
                </m.button>
              ))}
            </m.div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
