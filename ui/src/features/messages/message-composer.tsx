import { messageOutbox, useMessageOutbox } from "@/stores/message-outbox";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  LoaderCircle,
  Paperclip,
  Send,
  Smile,
  X,
  Reply,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import { dmService } from "@/services/messages-service";
import type { DmConversation, DmMessage } from "./types";
export type ComposerHandle = {
  mention: (username: string) => void;
  focus: () => void;
};
const emojis = [
  ["😀", "feliz"],
  ["😂", "risada"],
  ["🙂", "sorriso"],
  ["❤️", "coração"],
  ["👍", "positivo"],
  ["👎", "negativo"],
  ["🎉", "festa"],
  ["🔥", "fogo"],
  ["👀", "olhos"],
  ["😢", "triste"],
  ["😭", "choro"],
  ["💀", "caveira"],
  ["✅", "confirmado"],
  ["🤔", "pensando"],
  ["😎", "legal"],
  ["🙏", "obrigado"],
  ["✨", "brilho"],
  ["🚀", "foguete"],
  ["💜", "coração roxo"],
  ["🇧🇷", "brasil"],
  ["👋", "oi"],
  ["😊", "sorriso"],
  ["🎮", "jogo"],
  ["💬", "mensagem"],
];
export const MessageComposer = forwardRef<
  ComposerHandle,
  {
    conversation: DmConversation;
    editing: DmMessage | null;
    onEditDone: () => void;
  }
>(function MessageComposer({ conversation, editing, onEditDone }, ref) {
  const state = useMessagesState(),
    draft =
      state.drafts[conversation.id] || messagesStore.draft(conversation.id);
  const text = useRef<HTMLTextAreaElement>(null),
    file = useRef<HTMLInputElement>(null),
    lastTyping = useRef(0);
  const [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false),
    [error, setError] = useState(""),
    [editText, setEditText] = useState(editing?.content || ""),
    [emojiQuery, setEmojiQuery] = useState("");
  const localMedia = useMessageOutbox().drafts[conversation.id] || [];
  const value = editing ? editText : draft.text;
  useLayoutEffect(() => {
    if (editing) text.current?.focus();
  }, [editing?.id]);
  useLayoutEffect(() => {
    if (!text.current) return;
    text.current.style.height = "auto";
    text.current.style.height =
      Math.min(120, Math.max(40, text.current.scrollHeight)) + "px";
  }, [value]);
  function change(next: string) {
    if (editing) setEditText(next);
    else messagesStore.setDraft(conversation.id, { text: next });
    if (next && Date.now() - lastTyping.current > 2500) {
      lastTyping.current = Date.now();
      void dmService.typing(conversation.id, true).catch(() => {});
    } else if (!next)
      void dmService.typing(conversation.id, false).catch(() => {});
  }
  function insert(value: string) {
    const input = text.current,
      current = editing ? editText : messagesStore.draft(conversation.id).text;
    const start = input?.selectionStart ?? current.length,
      end = input?.selectionEnd ?? start;
    change(
      (current.slice(0, start) + value + current.slice(end)).slice(0, 4000),
    );
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + value.length, start + value.length);
    });
  }
  useImperativeHandle(ref, () => ({
    mention: (username) => insert("@" + username + " "),
    focus: () => text.current?.focus(),
  }));
  async function submit() {
    if (busy || uploading || !conversation.canSend) return;
    setBusy(true);
    setError("");
    try {
      if (editing) {
        await messagesStore.edit(editing, editText);
        onEditDone();
      } else { void messagesStore.send(conversation.id).catch(e=>setError(e.message)); }
      text.current?.focus();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível enviar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div
      className="shrink-0 border-t border-border bg-background px-3 pb-3 pt-2"
      data-no-swipe
    >
      {(draft.reply || editing) && (
        <div className="mb-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          {editing ? (
            <Pencil className="size-3" />
          ) : (
            <Reply className="size-3" />
          )}
          <span className="min-w-0 flex-1 truncate">
            {editing
              ? "Editando mensagem"
              : `Respondendo a @${draft.reply!.sender.username}: ${draft.reply!.content || "Arquivo"}`}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={editing ? "Cancelar edição" : "Cancelar resposta"}
            onClick={() => {
              if (editing) onEditDone();
              else messagesStore.setDraft(conversation.id, { reply: null });
            }}
          >
            <X className="size-3" />
          </Button>
        </div>
      )}
      {localMedia.length > 0 && !editing && <div className="mb-2 flex gap-2 overflow-x-auto">{localMedia.map(item=><div key={item.id} className="relative shrink-0 rounded-lg border border-border bg-card p-2">{item.preview?<img src={item.preview} alt={item.name} className="h-20 w-28 rounded object-cover"/>:<span className="block max-w-36 truncate text-xs">{item.name}</span>}<Button type="button" variant="secondary" size="icon-xs" className="absolute right-0 top-0" aria-label={`Remover anexo ${item.name}`} onClick={()=>messageOutbox.removeDraft(conversation.id,item.id)}><X className="size-3"/></Button></div>)}</div>}
      {draft.attachments.length > 0 && !editing && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {draft.attachments.map((a) => (
            <div
              key={a.id}
              className="flex max-w-full items-center gap-1 rounded-md border border-border bg-muted pl-2 text-xs"
            >
              <span className="max-w-36 truncate">{a.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Remover anexo ${a.name}`}
                onClick={() =>
                  void messagesStore
                    .removeAttachment(conversation.id, a.id)
                    .catch((e) => setError(e.message))
                }
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
        className="flex items-end gap-1 rounded-lg border border-input bg-muted/40 p-1.5 focus-within:ring-1 focus-within:ring-ring"
      >
        <input
          ref={file}
          type="file"
          className="sr-only"
          multiple
          aria-label="Anexar arquivos à mensagem"
          onChange={async (event) => {
            const files = Array.from(event.target.files || []);
            event.target.value = "";
            setUploading(true);
            setError("");
            try {
              for (const item of files)
                messageOutbox.stage(conversation.id, item);
            } catch (e) {
              setError(
                e instanceof Error ? e.message : "Não foi possível anexar.",
              );
            } finally {
              setUploading(false);
            }
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={busy || uploading || !conversation.canSend || !!editing}
          aria-label="Adicionar arquivo"
          onClick={() => file.current?.click()}
        >
          {uploading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Paperclip className="size-4" />
          )}
        </Button>
        <textarea
          ref={text}
          rows={1}
          maxLength={4000}
          value={value}
          disabled={busy || !conversation.canSend}
          aria-label="Mensagem direta"
          placeholder={
            conversation.canSend
              ? `Mensagem para @${conversation.peer.username}`
              : "Envio indisponível nesta conversa"
          }
          onChange={(event) => change(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              void submit();
            } else if (event.key === "Escape" && (editing || draft.reply)) {
              event.preventDefault();
              event.stopPropagation();
              if (editing) onEditDone();
              else messagesStore.setDraft(conversation.id, { reply: null });
            }
          }}
          className="max-h-32 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-5 outline-none disabled:opacity-50"
        />
        <Popover>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Escolher emoji"
                disabled={!conversation.canSend}
              />
            }
          >
            <Smile className="size-4" />
          </PopoverTrigger>
          <PopoverContent className="w-72 p-3" align="end">
            <Input
              aria-label="Pesquisar emoji"
              placeholder="Pesquisar emoji…"
              value={emojiQuery}
              onChange={(event) => setEmojiQuery(event.target.value)}
            />
            <div className="mt-2 grid max-h-48 grid-cols-6 gap-1 overflow-y-auto">
              {emojis
                .filter(
                  ([emoji, label]) =>
                    label.includes(emojiQuery.toLowerCase()) ||
                    emoji.includes(emojiQuery),
                )
                .map(([emoji, label]) => (
                  <Button
                    key={emoji}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-xl"
                    aria-label={`Inserir ${label}`}
                    onClick={() => insert(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button
          type="submit"
          size="icon"
          disabled={
            busy ||
            uploading ||
            !conversation.canSend ||
            (!value.trim() && !draft.attachments.length && !localMedia.length)
          }
          aria-label={editing ? "Salvar mensagem" : "Enviar mensagem"}
        >
          {busy ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
});
