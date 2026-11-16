import { useState } from "react";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import type { DmPerson } from "./types";
export function RequestsList({
  onProfile,
}: {
  onProfile: (person: DmPerson) => void;
}) {
  const { inbox } = useMessagesState();
  const [busy, setBusy] = useState<string | null>(null),
    [error, setError] = useState("");
  const list = inbox?.requests || [];
  async function act(id: string, action: "accept" | "decline" | "cancel") {
    setBusy(id);
    setError("");
    try {
      await messagesStore.respond(id, action);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível responder.");
    } finally {
      setBusy(null);
    }
  }
  return (
    <section className="mx-auto w-full max-w-2xl overflow-y-auto p-5">
      <h2 className="text-lg font-semibold">Solicitações de DM</h2>
      <p className="mb-5 mt-1 text-sm text-muted-foreground">
        Escolha quem pode conversar com você.
      </p>
      {!list.length ? (
        <div className="grid justify-items-center gap-3 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
          <Inbox className="size-7" />
          <p className="text-sm">Nenhuma solicitação pendente.</p>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border">
          {list.map((item) => (
            <div
              key={item.id}
              className="flex min-w-0 flex-wrap items-center gap-3 p-4"
            >
              <button
                type="button"
                aria-label={`Abrir perfil de ${item.peer.profile.displayName}`}
                onClick={() => onProfile(item.peer)}
              >
                <ProfileAvatar
                  profile={item.peer.profile}
                  className="size-10"
                />
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {item.peer.profile.displayName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  @{item.peer.username}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.direction === "incoming"
                    ? "Quer iniciar uma conversa."
                    : "Aguardando resposta."}
                </p>
              </div>
              <div className="flex gap-2">
                {item.direction === "incoming" ? (
                  <>
                    <Button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => void act(item.id, "accept")}
                    >
                      Aceitar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={busy === item.id}
                      onClick={() => void act(item.id, "decline")}
                    >
                      Recusar
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    disabled={busy === item.id}
                    onClick={() => void act(item.id, "cancel")}
                  >
                    Cancelar solicitação
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
    </section>
  );
}
