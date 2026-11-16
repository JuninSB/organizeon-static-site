import { useState } from "react";
import { Bell, ShieldCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  messagesStore,
  unlockDmSound,
  useMessagesState,
} from "@/stores/messages-store";
import { quickReactions, type DmSettings } from "./types";
export function MessagesSettings() {
  const { inbox } = useMessagesState();
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  if (!inbox)
    return (
      <p className="p-5 text-sm text-muted-foreground">
        Carregando configurações…
      </p>
    );
  const prefs = inbox.settings;
  async function save(patch: Partial<DmSettings>) {
    setBusy(true);
    setError("");
    try {
      if (patch.sound) await unlockDmSound();
      await messagesStore.settings(patch);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível salvar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mx-auto w-full max-w-lg space-y-5 overflow-y-auto p-5">
      <div>
        <h2 className="text-lg font-semibold">Configurações de mensagens</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Preferências da sua conta em todos os serviços.
        </p>
      </div>
      <div className="space-y-4 rounded-lg border border-border p-4">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheck className="size-4" />
          Solicitações
        </h3>
        <label className="flex items-start gap-3">
          <Checkbox
            checked={prefs.autoAccept}
            disabled={busy}
            onCheckedChange={(value) => void save({ autoAccept: !!value })}
          />
          <span className="text-sm">
            Aceitar DMs automaticamente
            <span className="mt-1 block text-xs text-muted-foreground">
              Novas solicitações serão aceitas sem confirmação.
            </span>
          </span>
        </label>
      </div>
      <div className="space-y-4 rounded-lg border border-border p-4">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <Bell className="size-4" />
          Notificações
        </h3>
        {(
          [
            {
              key: "notifications",
              label: "Notificações de novas mensagens",
              detail: "Mostra um aviso no canto superior direito.",
            },
            {
              key: "previews",
              label: "Mostrar prévia da mensagem",
              detail: "Inclui o texto da mensagem no aviso.",
            },
            {
              key: "sound",
              label: "Som de notificação",
              detail: "Toca um som curto nesta aba.",
            },
          ] as const
        ).map((item) => (
          <label key={item.key} className="flex items-start gap-3">
            <Checkbox
              checked={prefs[item.key]}
              disabled={busy}
              onCheckedChange={(value) => void save({ [item.key]: !!value })}
            />
            <span className="text-sm">
              {item.label}
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.detail}
              </span>
            </span>
          </label>
        ))}
        {typeof Notification !== "undefined" && (
          <div className="border-t border-border pt-3">
            <p className="mb-2 text-xs text-muted-foreground">
              Avisos do navegador enquanto uma aba OrganizeOn estiver aberta.
            </p>
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={async () => {
                if (prefs.desktop) {
                  void save({ desktop: false });
                  return;
                }
                const permission = await Notification.requestPermission();
                if (permission === "granted") void save({ desktop: true });
                else
                  setError(
                    "Permita notificações nas configurações do navegador para ativar esta opção.",
                  );
              }}
            >
              {prefs.desktop
                ? "Desativar avisos do navegador"
                : "Ativar avisos do navegador"}
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-2 rounded-lg border border-border p-4">
        <label className="text-sm font-medium">
          Reação com toque duplo
          <Select
            value={prefs.quickReaction}
            disabled={busy}
            onValueChange={(value) => {
              if (value) void save({ quickReaction: value });
            }}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue>{prefs.quickReaction}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {quickReactions.map((emoji) => (
                <SelectItem key={emoji} value={emoji}>
                  {emoji}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </section>
  );
}
