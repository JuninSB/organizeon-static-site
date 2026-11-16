import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export type PasswordChange = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export type PasswordRequest = {
  username: string;
  self: boolean;
  submit: (values: PasswordChange) => Promise<void>;
};
export function PasswordDialog({
  request,
  onClose,
}: {
  request: PasswordRequest;
  onClose: (saved: boolean) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose(false);
      }}
    >
      <DialogContent
        className="sm:max-w-md"
        onKeyDown={(event) => {
          if (busy && event.key === "Escape") event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
          <DialogDescription>
            {request.self
              ? "Atualize sua senha. Será necessário entrar novamente."
              : `Defina uma nova senha para ${request.username}.`}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            if (busy) return;
            const form = event.currentTarget;
            const data = new FormData(form);
            const values = {
              currentPassword: String(data.get("currentPassword") || ""),
              newPassword: String(data.get("newPassword") || ""),
              confirmPassword: String(data.get("confirmPassword") || ""),
            };
            if (values.newPassword !== values.confirmPassword) {
              setError("As novas senhas não coincidem.");
              return;
            }
            setBusy(true);
            setError("");
            try {
              await request.submit(values);
              form.reset();
              onClose(true);
            } catch (e) {
              setError(
                e instanceof Error
                  ? e.message
                  : "Não foi possível alterar a senha.",
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <input
            hidden
            readOnly
            autoComplete="username"
            value={request.username}
          />
          {request.self && (
            <label className="grid gap-1.5 text-sm font-medium">
              Senha atual
              <Input
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                disabled={busy}
              />
            </label>
          )}
          <label className="grid gap-1.5 text-sm font-medium">
            Nova senha
            <Input
              name="newPassword"
              type="password"
              minLength={8}
              autoComplete="new-password"
              required
              disabled={busy}
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Confirmar nova senha
            <Input
              name="confirmPassword"
              type="password"
              minLength={8}
              autoComplete="new-password"
              required
              disabled={busy}
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => onClose(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? "Salvando…" : "Salvar senha"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
