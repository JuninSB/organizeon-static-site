import { useEffect, useState } from "react";
import { Send, Save, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  api,
  post,
  bytesToBase64,
  type Attachment,
  type Message,
} from "../api";
export default function Compose({
  mailbox,
  draftId,
  replyId,
  forwardId,
  refresh,
}: {
  mailbox: string;
  draftId?: string;
  replyId?: string;
  forwardId?: string;
  refresh: () => Promise<void>;
}) {
  const [id, setId] = useState(draftId),
    [box, setBox] = useState(mailbox),
    [to, setTo] = useState(""),
    [subject, setSubject] = useState(""),
    [body, setBody] = useState(""),
    [files, setFiles] = useState<Attachment[]>([]),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(Boolean(draftId || replyId || forwardId)),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (!draftId && !replyId && !forwardId) setBox(mailbox);
  }, [mailbox, draftId, replyId, forwardId]);
  useEffect(() => {
    if (!draftId && !replyId && !forwardId) return;
    let active = true;
    api<Message>("/messages/" + (draftId || replyId || forwardId))
      .then((m) => {
        if (!active) return;
        if (draftId) {
          setId(m.id);
          setBox(m.mailbox);
          setTo(m.recipients.join(", "));
          setSubject(m.subject);
          setBody(m.body);
          setFiles(m.attachments);
        } else if (forwardId) {
          setBox(m.mailbox);
          setTo("");
          setSubject(
            /^fwd:/i.test(m.subject) ? m.subject : "Fwd: " + m.subject,
          );
          setBody(
            "\n\n---------- Mensagem encaminhada ----------\nDe: " +
              m.sender +
              "\nData: " +
              new Date(m.created).toLocaleString("pt-BR") +
              "\nPara: " +
              m.recipients.join(", ") +
              "\nAssunto: " +
              m.subject +
              "\n\n" +
              m.body,
          );
          setFiles(m.attachments);
        } else {
          setBox(m.mailbox);
          setTo(
            (m.replyAddress || m.sender).match(/<([^>]+)>/)?.[1] ||
              m.replyAddress ||
              m.sender,
          );
          setSubject(/^re:/i.test(m.subject) ? m.subject : "Re: " + m.subject);
          setBody(
            "\n\nEm " +
              new Date(m.created).toLocaleString("pt-BR") +
              ", " +
              m.sender +
              " escreveu:\n" +
              m.body
                .split("\n")
                .map((l) => "> " + l)
                .join("\n"),
          );
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [draftId, replyId, forwardId]);
  useEffect(() => {
    const guard = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    addEventListener("beforeunload", guard);
    return () => removeEventListener("beforeunload", guard);
  }, [dirty]);
  async function submit(send: boolean) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const attachments = await Promise.all(
        files.map(async (file) => {
          if (file.data !== undefined) return file;
          const response = await fetch("/d4/api/attachments/" + file.id);
          if (!response.ok)
            throw new Error("Não foi possível carregar o anexo " + file.name);
          return {
            name: file.name,
            mime: file.mime,
            data: bytesToBase64(new Uint8Array(await response.arrayBuffer())),
          };
        }),
      );
      const saved = await api<Message>(
        "/drafts",
        post({
          id,
          replyId,
          mailbox: box,
          to: to
            .split(/[;,]/)
            .map((s) => s.trim())
            .filter(Boolean),
          subject,
          body,
          attachments,
        }),
      );
      setId(saved.id);
      setDirty(false);
      if (send) {
        const result = await api<Message>(
          "/messages/" + saved.id + "/send",
          post({}),
        );
        await refresh();
        location.hash = "/message/" + result.id;
      } else {
        setNotice("Rascunho salvo.");
        await refresh();
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  if (loading) return <div>Carregando rascunho…</div>;
  return (
    <section className="space-y-4 rounded-lg border p-4 sm:p-6">
      <h1 className="text-lg font-semibold">
        {forwardId
          ? "Encaminhar mensagem"
          : replyId
            ? "Responder"
            : "Nova mensagem"}
      </h1>
      <p className="text-xs text-muted-foreground">
        A caixa selecionada será usada como remetente.
      </p>
      <label className="grid gap-2 text-sm">
        Para
        <Input
          value={to}
          disabled={busy}
          placeholder="destinatario@exemplo.com"
          onChange={(e) => {
            setTo(e.target.value);
            setDirty(true);
          }}
        />
      </label>
      <label className="grid gap-2 text-sm">
        Assunto
        <Input
          value={subject}
          disabled={busy}
          onChange={(e) => {
            setSubject(e.target.value);
            setDirty(true);
          }}
        />
      </label>
      <label className="grid gap-2 text-sm">
        Mensagem
        <textarea
          aria-label="Mensagem"
          className="d4-textarea"
          value={body}
          disabled={busy}
          onChange={(e) => {
            setBody(e.target.value);
            setDirty(true);
          }}
        />
      </label>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded border p-2 text-sm"
          >
            <Paperclip className="size-4" />
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <Button
              size="icon"
              variant="ghost"
              aria-label={"Remover " + file.name}
              disabled={busy}
              onClick={() => {
                setFiles((items) => items.filter((_, i) => i !== index));
                setDirty(true);
              }}
            >
              <X />
            </Button>
          </div>
        ))}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <Paperclip className="size-4" />
          Adicionar anexos
          <input
            aria-label="Adicionar anexos"
            type="file"
            multiple
            className="sr-only"
            disabled={busy}
            onChange={async (e) => {
              const selected = Array.from(e.target.files || []);
              if (
                selected.reduce((sum, f) => sum + f.size, 0) +
                  files.reduce((sum, f) => sum + (f.size || 0), 0) >
                10 * 1024 * 1024
              ) {
                setError("Anexos excedem 10 MB.");
                return;
              }
              const next = await Promise.all(
                selected.map(async (f) => ({
                  name: f.name,
                  mime: f.type || "application/octet-stream",
                  size: f.size,
                  data: bytesToBase64(new Uint8Array(await f.arrayBuffer())),
                })),
              );
              setFiles((current) => [...current, ...next]);
              setDirty(true);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {error && (
        <p role="alert" className="break-words text-sm text-destructive">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="text-sm text-muted-foreground">
          {notice}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={busy || !box || !to}
          onClick={() => void submit(true)}
        >
          <Send />
          {busy ? "Processando…" : "Enviar"}
        </Button>
        <Button
          variant="outline"
          disabled={busy || !box}
          onClick={() => void submit(false)}
        >
          <Save />
          Salvar rascunho
        </Button>
      </div>
    </section>
  );
}
