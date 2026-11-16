import {
  Copy,
  Reply,
  Forward,
  Pin,
  Bookmark,
  Mail,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
  const options = [
    { id: "reply" as const, label: "Responder", icon: Reply },
    { id: "forward" as const, label: "Encaminhar", icon: Forward },
    { id: "copy" as const, label: "Copiar texto", icon: Copy },
    { id: "unread" as const, label: "Marcar como não lida", icon: Mail },
    {
      id: "pin" as const,
      label: message?.pinned ? "Desafixar mensagem" : "Fixar mensagem",
      icon: Pin,
    },
    {
      id: "bookmark" as const,
      label: message?.bookmarked ? "Remover dos salvos" : "Salvar mensagem",
      icon: Bookmark,
    },
    ...(own
      ? [
          { id: "edit" as const, label: "Editar mensagem", icon: Pencil },
          { id: "remove" as const, label: "Apagar mensagem", icon: Trash2 },
        ]
      : []),
  ];
  return (
    <Sheet
      open={!!message}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="mx-auto max-h-[85svh] w-full max-w-lg overflow-y-auto rounded-t-xl p-4"
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-border" />
        <SheetHeader className="p-0">
          <SheetTitle>Ações da mensagem</SheetTitle>
          <SheetDescription className="sr-only">
            Responda, reaja ou gerencie esta mensagem.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-6 gap-1">
          {quickReactions.slice(0, 6).map((emoji) => (
            <Button
              key={emoji}
              type="button"
              variant="outline"
              className="h-11 text-xl"
              aria-label={`Reagir com ${emoji}`}
              onClick={() => {
                if (message) onReact(message, emoji);
                onClose();
              }}
            >
              {emoji}
            </Button>
          ))}
        </div>
        <div className="grid gap-1 rounded-lg border border-border p-1">
          {options.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              type="button"
              variant="ghost"
              className={`h-10 justify-start ${id === "remove" ? "text-destructive" : ""}`}
              onClick={() => {
                if (message) onAction(id, message);
                onClose();
              }}
            >
              <Icon className="size-4" />
              {label}
            </Button>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </SheetContent>
    </Sheet>
  );
}
