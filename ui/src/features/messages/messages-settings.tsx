import { useEffect, useState } from "react";
import { Bell, ShieldCheck, Timer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { longPressDelay, MIN_LONG_PRESS_MS, MAX_LONG_PRESS_MS } from "./gesture-config";
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
  const [holdMs, setHoldMs] = useState(() => String(longPressDelay(inbox?.settings.longPressMs)));
  useEffect(() => setHoldMs(String(longPressDelay(inbox?.settings.longPressMs))), [inbox?.settings.longPressMs]);
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
    <section className="mx-auto w-full max-w-lg h-full min-h-0 space-y-5 overflow-y-auto overscroll-contain p-5">
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
              key: "showSendStatus",
              label: "Mostrar textos de envio",
              detail: "Exibe o status ao lado dos indicadores visuais de envio e upload.",
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
      <form className="space-y-3 rounded-lg border border-border p-4" onSubmit={(event) => {
        event.preventDefault();
        const value = Number(holdMs);
        if (!Number.isInteger(value) || value < MIN_LONG_PRESS_MS || value > MAX_LONG_PRESS_MS) {
          setError(`Escolha um tempo entre ${MIN_LONG_PRESS_MS} e ${MAX_LONG_PRESS_MS} ms.`);
          return;
        }
        void save({ longPressMs: value });
      }}>
        <h3 className="flex items-center gap-2 text-sm font-medium"><Timer className="size-4" />Toque longo</h3>
        <label className="grid gap-2 text-sm">
          Tempo para abrir menus (ms)
          <Input type="number" min={MIN_LONG_PRESS_MS} max={MAX_LONG_PRESS_MS} step={1} required value={holdMs} disabled={busy} onChange={(event) => setHoldMs(event.target.value)} />
        </label>
        <p className="text-xs text-muted-foreground">Padrão: 200 ms. Aplica-se às mensagens e às conversas.</p>
        <Button type="submit" variant="outline" disabled={busy || Number(holdMs) === longPressDelay(prefs.longPressMs)}>Salvar tempo</Button>
      </form>
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
