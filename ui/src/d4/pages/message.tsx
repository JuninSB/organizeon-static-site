import { useEffect, useMemo, useState } from "react";
import { emailDocument, emailText } from "../email-document";
import { SenderProfile } from "../sender-profile";
import { senderIdentity } from "../sender";
import { ArrowLeft, Reply, Forward, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, date, type Message } from "../api";
export default function MessagePage({
  id,
  refresh,
}: {
  id: string;
  refresh: () => Promise<void>;
}) {
  const [message, setMessage] = useState<Message | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [html, setHtml] = useState(false);
  useEffect(() => {
    let active = true;
    setMessage(null);
    setError("");
    api("/messages/" + id)
      .then((value) => {
        if (active) {
          setMessage(value);
          setHtml(Boolean(value.html?.trim()));
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [id]);
  const document = useMemo(() => emailDocument(message?.html || ""), [message?.html]);
  if (error)
    return (
      <p role="alert" className="text-destructive">
        {error}
      </p>
    );
  if (!message) return <div className="p-6">Carregando mensagem…</div>;
  const delivery = message.delivery ? JSON.parse(message.delivery) : null;
  const permanentlyDelete = async () => {
    if (!confirm("Excluir definitivamente esta mensagem e seus anexos?"))
      return;
    setBusy(true);
    try {
      await api("/messages/" + id, { method: "DELETE" });
      await refresh();
      location.hash = "/trash";
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <article className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => history.back()}>
          <ArrowLeft />
          Voltar
        </Button>
        <Button onClick={() => (location.hash = "/compose?reply=" + id)}>
          <Reply />
          Responder
        </Button>
        <Button
          variant="outline"
          onClick={() => (location.hash = "/compose?forward=" + id)}
        >
          <Forward />
          Encaminhar
        </Button>
        <Button
          variant="ghost"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await api("/messages/" + id, {
                method: "PATCH",
                body: JSON.stringify({
                  folder: message.folder === "trash" ? "inbox" : "trash",
                }),
              });
              await refresh();
              location.hash =
                "/" + (message.folder === "trash" ? "inbox" : "trash");
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <Trash2 />
          {message.folder === "trash" ? "Restaurar" : "Mover para lixeira"}
        </Button>
        <Button
          variant="ghost"
          render={<a href={"/d4/api/messages/" + id + "/raw"} download />}
        >
          <Download />
          Baixar .eml
        </Button>
      </div>
      {message.folder === "trash" && (
        <Button
          variant="destructive"
          disabled={busy}
          onClick={() => void permanentlyDelete()}
        >
          Excluir definitivamente
        </Button>
      )}
      <div className="space-y-3 rounded-lg border bg-card p-5">
        <h1 className="break-words text-xl font-semibold">
          {message.subject || "(Sem assunto)"}
        </h1>
        <div className="flex min-w-0 items-center gap-3">
          <SenderProfile sender={message.sender} messageId={id} />
          <div className="min-w-0">
            <p className="break-words text-sm font-medium">{senderIdentity(message.sender).name}</p>
            <p className="break-all text-xs text-muted-foreground">{senderIdentity(message.sender).address}</p>
          </div>
        </div>
        <p className="break-all text-sm text-muted-foreground">
          Para: {message.recipients.join(", ")}
        </p>
        <time className="text-xs text-muted-foreground">
          {date(message.created)}
        </time>
      </div>
      {delivery && (
        <div
          className={
            "rounded-lg border p-4 text-sm " +
            (delivery.status === "accepted"
              ? "text-muted-foreground"
              : "text-destructive")
          }
        >
          <p>
            {delivery.status === "accepted"
              ? "Aceito pelo servidor SMTP."
              : delivery.status === "partial"
                ? "Entrega parcial. Confira os destinatários."
                : delivery.status === "rejected"
                  ? "Envio rejeitado pelo servidor SMTP."
                  : delivery.status === "uncertain"
                    ? "Envio sem confirmação. Confira com o destinatário antes de reenviar."
                    : "Não foi possível enviar a mensagem."}
          </p>
          {delivery.error && <p className="break-words">{delivery.error}</p>}
          {delivery.transport && (
            <p className="text-xs">Transporte: {delivery.transport}</p>
          )}
          {delivery.receipts?.map(
            (receipt: { code: number; response: string }, index: number) => (
              <p key={index} className="break-all text-xs">
                SMTP {receipt.code}: {receipt.response}
              </p>
            ),
          )}
          {delivery.recipients?.map((r: any) => (
            <p key={r.recipient}>
              {r.recipient}: {r.status === "accepted" ? "Aceito" : r.status === "rejected" ? "Rejeitado" : r.status} ({r.code})
            </p>
          ))}
        </div>
      )}
      <div className="d4-message-body space-y-3 rounded-lg border p-[2px]">
        {message.html && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHtml((v) => !v)}
          >
            {html ? "Ver texto" : "Ver conteúdo HTML"}
          </Button>
        )}
        {html ? (
          <iframe
            title="Conteúdo do e-mail"
            sandbox="allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer"
            className="d4-message-frame w-full rounded bg-white"
            srcDoc={document}
          />
        ) : (
          <pre className="whitespace-pre-wrap break-words p-2 font-sans text-sm leading-7">
            {emailText(message.html || message.body) ||
              (message.html
                ? "Este e-mail contém somente HTML. Use o botão acima para visualizá-lo."
                : "(Sem texto)")}
          </pre>
        )}
      </div>
      {message.attachments.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">Anexos</h2>
          {message.attachments.map((file) => (
            <a
              key={file.id}
              className="flex items-center gap-3 rounded-lg border p-3 text-sm hover:bg-muted"
              href={"/d4/api/attachments/" + file.id}
              download
            >
              <Download className="size-4" />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                {Math.ceil((file.size || 0) / 1024)} KB
              </span>
            </a>
          ))}
        </section>
      )}
      <footer className="pb-6 pt-4" aria-label="Fim da mensagem">
        <p className="border-t pt-4 text-center text-xs text-muted-foreground">
          Organizeon • Mail
        </p>
      </footer>
    </article>
  );
}
