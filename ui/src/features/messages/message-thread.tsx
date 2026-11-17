import { useMessageOutbox } from "@/stores/message-outbox";
import { PendingMessageRow } from "./pending-message";
import { m } from "@/core/motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Archive,
  BellOff,
  Bell,
  ChevronDown,
  LoaderCircle,
  MoreHorizontal,
  Search,
  ShieldBan,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import { dmService } from "@/services/messages-service";
import { MessageRow } from "./message-row";
import { MessageComposer, type ComposerHandle } from "./message-composer";
import { MessageActions, type MessageAction } from "./message-actions";
import type { DmConversation, DmMessage, DmPerson } from "./types";
const filters = [
  ["all", "Tudo"],
  ["media", "Mídia"],
  ["pinned", "Fixadas"],
  ["links", "Links"],
  ["files", "Arquivos"],
  ["bookmarks", "Salvas"],
];
export function MessageThread({
  conversation,
  onProfile,
}: {
  conversation: DmConversation;
  onProfile: (person: DmPerson) => void;
}) {
  const state = useMessagesState(),
    thread = state.threads[conversation.id];
  const [action, setAction] = useState<DmMessage | null>(null),
    [editing, setEditing] = useState<DmMessage | null>(null),
    [deleting, setDeleting] = useState<DmMessage | null>(null),
    [forwarding, setForwarding] = useState<DmMessage | null>(null),
    [forwardTarget, setForwardTarget] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [searchOpen, setSearchOpen] = useState(false),
    [query, setQuery] = useState(""),
    [search, setSearch] = useState(""),
    [filter, setFilter] = useState("all"),
    [filtered, setFiltered] = useState<DmMessage[] | null>(null),
    [searching, setSearching] = useState(false);
  const composer = useRef<ComposerHandle>(null),
    scroller = useRef<HTMLDivElement>(null),
    bottom = useRef(true);
  useEffect(() => {
    const timer = setTimeout(() => setSearch(query.trim()), 250);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    let active = true;
    if (!search && filter === "all") {
      setFiltered(null);
      return;
    }
    setSearching(true);
    void dmService
      .messages(conversation.id, { search, filter })
      .then((result) => {
        if (active) setFiltered(result.messages);
      })
      .catch((e) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setSearching(false);
      });
    return () => {
      active = false;
    };
  }, [conversation.id, search, filter, state.inbox?.cursor]);
  const list = filtered || thread?.messages || [];
  const pending = useMessageOutbox().pending.filter(
    (row) =>
      row.conversationId === conversation.id &&
      !list.some((message) => message.clientNonce === row.nonce),
  );
  useLayoutEffect(() => {
    if (bottom.current && scroller.current)
      scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [list.length, list.at(-1)?.id, pending.length]);
  async function perform(fn: () => Promise<unknown>) {
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível concluir.");
    }
  }
  function reply(message: DmMessage) {
    if (!conversation.canSend) return;
    setEditing(null);
    messagesStore.setDraft(conversation.id, { reply: message });
    composer.current?.focus();
  }
  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    setSearch("");
    setFilter("all");
    setFiltered(null);
    setSearching(false);
    bottom.current = true;
  }
  function context(action: MessageAction, message: DmMessage) {
    if (action === "reply") reply(message);
    else if (action === "edit") {
      setEditing(message);
      composer.current?.focus();
    } else if (action === "remove") setDeleting(message);
    else if (action === "forward") {
      setForwardTarget("");
      setForwarding(message);
    } else if (action === "copy")
      void perform(() => navigator.clipboard.writeText(message.content));
    else void perform(() => messagesStore.action(message, action));
  }
  const me = state.inbox?.me;
  const lastOwnIndex = list
    .map((message) => message.sender.username)
    .lastIndexOf(me?.username || "");
  if (!me) return null;
  return (
    <section
      className="oo-dm-thread flex h-full min-h-0 min-w-0 flex-col"
      aria-label={`Conversa com ${conversation.peer.profile.displayName}`}
    >
      <header className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Voltar às conversas"
          onClick={() => messagesStore.back()}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <button
          type="button"
          aria-label={`Abrir perfil de ${conversation.peer.profile.displayName}`}
          onClick={() => onProfile(conversation.peer)}
        >
          <ProfileAvatar
            profile={conversation.peer.profile}
            className="size-8"
          />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            className="max-w-full truncate text-left text-sm font-medium hover:underline"
            onClick={() =>
              composer.current?.mention(conversation.peer.username)
            }
          >
            {conversation.peer.profile.displayName}
          </button>
          <p className="truncate text-[10px] text-muted-foreground">
            {conversation.peer.online
              ? "Online"
              : "@" + conversation.peer.username}
            {conversation.muted ? " · silenciada" : ""}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={
            searchOpen ? "Fechar pesquisa da conversa" : "Pesquisar na conversa"
          }
          aria-expanded={searchOpen}
          aria-controls="dm-conversation-search"
          onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
        >
          {searchOpen ? (
            <X className="size-4" />
          ) : (
            <Search className="size-4" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Opções da conversa"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-60 max-w-[calc(100vw-2rem)]"
          >
            <DropdownMenuItem
              onClick={() =>
                void perform(() =>
                  messagesStore.conversation(conversation.id, {
                    muted: !conversation.muted,
                  }),
                )
              }
            >
              {conversation.muted ? <Bell /> : <BellOff />}
              {conversation.muted
                ? "Ativar notificações"
                : "Silenciar conversa"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                void perform(() =>
                  messagesStore.conversation(conversation.id, {
                    archived: true,
                  }),
                )
              }
            >
              <Archive />
              Fechar conversa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                void perform(() =>
                  messagesStore.block(
                    conversation.peer,
                    !conversation.blockedByMe,
                  ),
                )
              }
            >
              {conversation.blockedByMe ? <ShieldCheck /> : <ShieldBan />}
              {conversation.blockedByMe
                ? "Desbloquear conta"
                : "Bloquear conta"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {searchOpen && (
        <div
          id="dm-conversation-search"
          className="shrink-0 border-b border-border px-3 py-2"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              closeSearch();
            }
          }}
        >
          <label className="flex min-w-0 items-center gap-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <Input
              autoFocus
              aria-label="Pesquisar nesta conversa"
              className="h-8"
              placeholder="Pesquisar nesta conversa…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Limpar pesquisa"
                onClick={() => setQuery("")}
              >
                <X className="size-3" />
              </Button>
            )}
          </label>
          <nav
            aria-label="Filtrar mensagens"
            className="mt-2 overflow-x-auto touch-pan-x"
          >
            <div className="flex w-max min-w-full gap-1">
              {filters.map(([value, label]) => (
                <Button
                  key={value}
                  type="button"
                  variant={filter === value ? "secondary" : "ghost"}
                  size="sm"
                  aria-pressed={filter === value}
                  onClick={() => {
                    bottom.current = true;
                    setFilter(value);
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </nav>
        </div>
      )}
      <div
        ref={scroller}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 py-2"
        onScroll={() => {
          const el = scroller.current;
          if (el)
            bottom.current =
              el.scrollHeight - el.scrollTop - el.clientHeight < 100;
        }}
        aria-label="Histórico de mensagens"
      >
        {!filtered &&
          !search &&
          filter === "all" &&
          thread &&
          !thread.hasMore &&
          !thread.loading && (
            <section className="px-4 pb-6 pt-5" aria-label="Início da conversa">
              <button
                type="button"
                aria-label={`Ver perfil de ${conversation.peer.profile.displayName}`}
                onClick={() => onProfile(conversation.peer)}
              >
                <ProfileAvatar
                  profile={conversation.peer.profile}
                  className="size-16"
                />
              </button>
              <h2 className="mt-4 break-words text-2xl font-semibold tracking-tight">
                {conversation.peer.profile.displayName}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                @{conversation.peer.username}
              </p>
              <p className="mb-4 mt-3 text-sm text-muted-foreground">
                Este é o início da sua conversa com{" "}
                {conversation.peer.profile.displayName}.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onProfile(conversation.peer)}
              >
                Ver perfil
              </Button>
            </section>
          )}
        {!filtered && !search && filter === "all" && thread?.hasMore && (
          <div className="px-3 pb-3 text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={thread.loading}
              onClick={() => {
                const el = scroller.current,
                  oldHeight = el?.scrollHeight || 0;
                bottom.current = false;
                void messagesStore.load(conversation.id, true).then(() =>
                  requestAnimationFrame(() => {
                    if (el) el.scrollTop += el.scrollHeight - oldHeight;
                  }),
                );
              }}
            >
              {thread.loading ? (
                <LoaderCircle className="size-3 animate-spin" />
              ) : (
                <ChevronDown className="size-3 rotate-180" />
              )}
              Carregar mensagens anteriores
            </Button>
          </div>
        )}
        {searching && (
          <p role="status" className="px-4 py-2 text-xs text-muted-foreground">
            Pesquisando…
          </p>
        )}
        {thread?.loading && !thread.messages.length ? (
          <div className="space-y-5 p-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : !list.length ? (
          <div className="grid h-full min-h-40 place-content-center justify-items-center gap-3 px-6 text-center">
            <ProfileAvatar
              profile={conversation.peer.profile}
              className="size-14"
            />
            <h3 className="text-base font-semibold">
              {conversation.peer.profile.displayName}
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              {search || filter !== "all"
                ? "Nenhuma mensagem encontrada."
                : "Este é o início da sua conversa direta."}
            </p>
          </div>
        ) : (
          list.map((message, index) => {
            const day = new Date(message.createdAt).toLocaleDateString("pt-BR"),
              previous = list[index - 1];
            const person =
              message.sender.username === me.username ? me : conversation.peer;
            return (
              <m.div
                key={message.id}
                initial={
                  Date.now() - new Date(message.createdAt).getTime() < 10000
                    ? { opacity: 0, y: 6 }
                    : false
                }
                animate={{ opacity: 1, y: 0 }}
              >
                {(!previous ||
                  new Date(previous.createdAt).toLocaleDateString("pt-BR") !==
                    day) && (
                  <div className="my-4 flex items-center gap-3 px-4 text-[10px] text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    <span>{day}</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                )}
                <MessageRow
                  viewer={me.username}
                  compact={
                    !!previous &&
                    previous.sender.username === message.sender.username &&
                    !message.reply &&
                    !message.pinned &&
                    !message.bookmarked &&
                    !message.editedAt &&
                    !previous.deleted &&
                    new Date(message.createdAt).getTime() -
                      new Date(previous.createdAt).getTime() <
                      300000
                  }
                  showReceipt={index === lastOwnIndex}
                  message={message}
                  person={person}
                  own={message.sender.username === me.username}
                  read={message.seq <= conversation.peerReadSeq}
                  onReply={reply}
                  onActions={setAction}
                  onForward={(message) => context("forward", message)}
                  onBookmark={(message) =>
                    messagesStore.action(message, "bookmark")
                  }
                  onMention={(username) => composer.current?.mention(username)}
                  onProfile={onProfile}
                  onReact={(m, emoji) =>
                    void perform(() =>
                      messagesStore.action(m, "reaction", emoji),
                    )
                  }
                  quickReaction={state.inbox?.settings.quickReaction || "👍"}
                />
              </m.div>
            );
          })
        )}
        {pending.map((message) => (
          <PendingMessageRow key={message.id} message={message} person={me} />
        ))}
      </div>
      {(error || thread?.error) && (
        <p
          role="alert"
          className="border-t border-border px-3 py-2 text-xs text-destructive"
        >
          {error || thread?.error}
        </p>
      )}
      {thread?.typing && (
        <p
          role="status"
          className="shrink-0 px-4 pb-1 text-[10px] text-muted-foreground"
        >
          {conversation.peer.profile.displayName} está digitando…
        </p>
      )}
      <MessageComposer
        key={editing?.id || "composer"}
        ref={composer}
        conversation={conversation}
        editing={editing}
        onEditDone={() => setEditing(null)}
      />
      <MessageActions
        message={action}
        own={action?.sender.username === me.username}
        onClose={() => setAction(null)}
        onAction={context}
        onReact={(m, emoji) =>
          void perform(() => messagesStore.action(m, "reaction", emoji))
        }
      />
      <Dialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open && !busy) setDeleting(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apagar mensagem?</DialogTitle>
            <DialogDescription>
              A mensagem será apagada para os participantes desta DM.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => setDeleting(null)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={busy}
              onClick={async () => {
                if (!deleting) return;
                setBusy(true);
                try {
                  await messagesStore.remove(deleting);
                  setDeleting(null);
                } catch (e) {
                  setError(
                    e instanceof Error ? e.message : "Não foi possível apagar.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              Apagar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!forwarding}
        onOpenChange={(open) => {
          if (!open && !busy) setForwarding(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Encaminhar mensagem</DialogTitle>
            <DialogDescription>
              Escolha outra conversa aceita.
            </DialogDescription>
          </DialogHeader>
          <div className="grid max-h-64 gap-1 overflow-y-auto">
            {state.inbox?.conversations
              .filter((c) => c.id !== conversation.id && c.canSend)
              .map((c) => (
                <Button
                  type="button"
                  key={c.id}
                  variant={forwardTarget === c.id ? "secondary" : "ghost"}
                  className="h-12 justify-start"
                  onClick={() => setForwardTarget(c.id)}
                >
                  <ProfileAvatar profile={c.peer.profile} />
                  <span className="truncate">{c.peer.profile.displayName}</span>
                </Button>
              ))}
            {!state.inbox?.conversations.some(
              (c) => c.id !== conversation.id && c.canSend,
            ) && (
              <p className="py-4 text-sm text-muted-foreground">
                Nenhuma outra conversa aceita disponível.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => setForwarding(null)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={busy || !forwardTarget}
              onClick={async () => {
                if (!forwarding) return;
                setBusy(true);
                try {
                  await messagesStore.forward(forwarding, forwardTarget);
                  setForwarding(null);
                } catch (e) {
                  setError(
                    e instanceof Error
                      ? e.message
                      : "Não foi possível encaminhar.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              Encaminhar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
