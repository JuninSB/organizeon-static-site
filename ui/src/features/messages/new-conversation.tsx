import { useState } from "react";
import { MessageCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messagesStore } from "@/stores/messages-store";
export function NewConversation() {
  const [username, setUsername] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <section className="mx-auto w-full max-w-md p-5">
      <MessageCirclePlus className="mb-4 size-8 text-muted-foreground" />
      <h2 className="text-xl font-semibold">Nova mensagem direta</h2>
      <p className="mb-5 mt-2 text-sm text-muted-foreground">
        Adicione uma conta pelo nome de usuário OrganizeOn.
      </p>
      <form
        className="grid gap-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError("");
          try {
            await messagesStore.request(username.trim().replace(/^@/, ""));
          } catch (e) {
            setError(
              e instanceof Error
                ? e.message
                : "Não foi possível enviar a solicitação.",
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <label className="grid gap-1.5 text-sm">
          Nome de usuário
          <Input
            autoFocus
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            maxLength={33}
            value={username}
            disabled={busy}
            placeholder="@usuario"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={busy || username.replace(/^@/, "").trim().length < 3}
        >
          {busy ? "Enviando…" : "Enviar solicitação"}
        </Button>
      </form>
    </section>
  );
}
