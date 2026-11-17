import { useRef, useState } from "react";
import {
  Mail,
  MailOpen,
  Reply,
  Forward,
  Trash2,
  Undo2,
  Download,
  ArrowUpRight,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api, type Message } from "./api";
export function MailActions({
  item,
  folder,
  onClose,
  refresh,
}: {
  item: Message | null;
  folder: string;
  onClose: () => void;
  refresh: () => void;
}) {
  const held = useRef(item),
    pending = useRef<(() => void) | null>(null);
  if (item) held.current = item;
  const current = item || held.current;
  const [deleting, setDeleting] = useState<Message | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  function choose(action: () => void) {
    pending.current = action;
    onClose();
  }
  async function patch(data: object) {
    if (!current) return;
    try {
      await api("/messages/" + current.id, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      refresh();
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <>
      <Drawer
        open={!!item}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        onOpenChangeComplete={(open) => {
          if (!open) {
            const action = pending.current;
            pending.current = null;
            action?.();
          }
        }}
      >
        <DrawerContent>
          <DrawerTitle>{current?.subject || "(Sem assunto)"}</DrawerTitle>
          <DrawerDescription>Opções deste e-mail.</DrawerDescription>
          <div className="grid gap-1">
            {[
              {
                label: "Abrir e-mail",
                icon: ArrowUpRight,
                run: () => {
                  location.hash =
                    folder === "drafts"
                      ? "/compose/" + current?.id
                      : "/message/" + current?.id;
                },
              },
              {
                label: "Responder",
                icon: Reply,
                run: () => {
                  location.hash = "/compose?reply=" + current?.id;
                },
              },
              {
                label: "Encaminhar",
                icon: Forward,
                run: () => {
                  location.hash = "/compose?forward=" + current?.id;
                },
              },
              {
                label: current?.unread
                  ? "Marcar como lido"
                  : "Marcar como não lido",
                icon: current?.unread ? MailOpen : Mail,
                run: () => void patch({ unread: !current?.unread }),
              },
              {
                label: folder === "trash" ? "Restaurar" : "Mover para lixeira",
                icon: folder === "trash" ? Undo2 : Trash2,
                run: () =>
                  void patch({
                    folder: folder === "trash" ? "inbox" : "trash",
                  }),
              },
              {
                label: "Baixar .eml",
                icon: Download,
                run: () => {
                  const a = document.createElement("a");
                  a.href = "/d4/api/messages/" + current?.id + "/raw";
                  a.download = "message.eml";
                  a.click();
                },
              },
            ]
              .filter(
                (action) =>
                  folder !== "drafts" ||
                  !["Responder", "Encaminhar"].includes(action.label),
              )
              .map(({ label, icon: Icon, run }) => (
                <Button
                  key={label}
                  variant="ghost"
                  className="h-12 justify-start"
                  onClick={() => choose(run)}
                >
                  <Icon />
                  {label}
                </Button>
              ))}
            {folder === "trash" && (
              <Button
                variant="ghost"
                className="h-12 justify-start text-destructive"
                onClick={() => choose(() => setDeleting(current))}
              >
                <Trash2 />
                Excluir definitivamente
              </Button>
            )}
          </div>
        </DrawerContent>
      </Drawer>
      {error && (
        <p role="alert" className="p-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <Dialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open && !busy) setDeleting(null);
        }}
      >
        <DialogContent>
          <DialogTitle>Excluir e-mail definitivamente?</DialogTitle>
          <DialogDescription>
            A mensagem e seus anexos serão apagados. Esta ação não pode ser
            desfeita.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => setDeleting(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={busy}
              onClick={async () => {
                if (!deleting) return;
                setBusy(true);
                try {
                  await api("/messages/" + deleting.id, { method: "DELETE" });
                  setDeleting(null);
                  refresh();
                } catch (e) {
                  setError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              Excluir definitivamente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
