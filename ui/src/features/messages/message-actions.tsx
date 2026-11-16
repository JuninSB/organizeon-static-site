import { useRef } from "react";
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
      <DrawerContent>
        <header className="mb-3 flex items-center justify-between gap-3">
          <DrawerTitle className="text-sm font-medium">
            Ações da mensagem
          </DrawerTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Fechar ações da mensagem"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
          <DrawerDescription className="sr-only">
            Puxe para baixo para fechar ou escolha uma ação.
          </DrawerDescription>
        </header>
        <div className="mb-4 grid grid-cols-6 gap-2">
          {quickReactions.slice(0, 6).map((emoji) => (
            <Button
              key={emoji}
              type="button"
              variant="secondary"
              className="h-11 rounded-lg text-xl"
              aria-label={`Reagir com ${emoji}`}
              onClick={() => {
                if (current) choose(() => onReact(current, emoji));
              }}
            >
              {emoji}
            </Button>
          ))}
        </div>
        <div className="grid gap-3">
          {groups.map((options, index) => (
            <div key={index} className="overflow-hidden rounded-lg bg-muted/50">
              {options.map(({ id, label, icon: Icon, description }, i) => (
                <Button
                  key={id}
                  type="button"
                  variant="ghost"
                  title={description}
                  className={`h-12 w-full justify-start gap-3 rounded-none px-3 ${i ? "border-t border-border/60" : ""} ${id === "remove" ? "text-destructive" : ""}`}
                  onClick={() => {
                    if (current) choose(() => onAction(id, current));
                  }}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
