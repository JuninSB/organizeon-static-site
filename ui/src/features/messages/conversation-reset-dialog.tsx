import { useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { messagesStore } from "@/stores/messages-store";
import type { DmConversation } from "./types";

export function ConversationResetDialog({
  conversation,
  onClose,
}: {
  conversation: DmConversation | null;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <Dialog
      open={!!conversation}
      onOpenChange={(open) => {
        if (!open && !busy) {
          setError("");
          onClose();
        }
      }}
    >
      <DialogContent showCloseButton={!busy}>
        <DialogTitle>
          Resetar conversa com @{conversation?.peer.username}?
        </DialogTitle>
        <DialogDescription>
          Todas as mensagens, mídias, reações e itens salvos desta conversa
          serão apagados para os dois participantes. Esta ação não pode ser
          desfeita.
        </DialogDescription>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => {
              setError("");
              onClose();
            }}
          >
            Cancelar
          </Button>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-700"
            disabled={busy}
            onClick={async () => {
              if (!conversation || busy) return;
              setBusy(true);
              setError("");
              try {
                await messagesStore.resetConversation(conversation);
                onClose();
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            <RotateCcw />
            {busy ? "Resetando…" : "Resetar conversa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
