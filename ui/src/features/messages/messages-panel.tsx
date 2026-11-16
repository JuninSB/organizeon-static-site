import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  Inbox,
  LoaderCircle,
  MessageCircle,
  MessageCirclePlus,
  RefreshCw,
  Settings2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
import { useProfile } from "@/stores/profile-store";
import { messagesStore, useMessagesState } from "@/stores/messages-store";
import { roleNames } from "@/utils/account-roles";
import { MessageThread } from "./message-thread";
import { MessagesSettings } from "./messages-settings";
import { RequestsList } from "./requests-list";
import { NewConversation } from "./new-conversation";
import type { DmPerson } from "./types";
const ProfileDialog = lazy(() => import("@/features/profile/profile-dialog"));
function useViewport() {
  const measure = () => ({
    width: window.visualViewport?.width || innerWidth,
    height: window.visualViewport?.height || innerHeight,
    top: window.visualViewport?.offsetTop || 0,
  });
  const [size, setSize] = useState(measure);
  useEffect(() => {
    const update = () => setSize(measure());
    visualViewport?.addEventListener("resize", update);
    visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      visualViewport?.removeEventListener("resize", update);
      visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return size;
}
function Pane({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div
      className={`h-full min-h-0 min-w-0 transition-[opacity,transform] duration-150 motion-reduce:transition-none ${ready ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
    >
      {children}
    </div>
  );
}
function PersonProfile({
  person,
  own,
  onClose,
}: {
  person: DmPerson;
  own: boolean;
  onClose: () => void;
}) {
  const profile = useProfile(person.username, own);
  return (
    <Suspense fallback={<p role="status">Carregando perfil…</p>}>
      <ProfileDialog
        username={person.username}
        role={roleNames[person.role] || person.role}
        profile={own ? profile : person.profile}
        editable={own}
        onClose={onClose}
      />
    </Suspense>
  );
}
export default function MessagesPanel() {
  const state = useMessagesState(),
    viewport = useViewport();
  const [query, setQuery] = useState(""),
    [person, setPerson] = useState<DmPerson | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const selected = state.inbox?.conversations.find(
    (c) => c.id === state.selectedId,
  );
  const showList = !selected && state.view === "inbox";
  const list = (state.inbox?.conversations || []).filter(
    (c) =>
      !c.archived &&
      [c.peer.username, c.peer.profile.displayName].some((v) =>
        v.toLowerCase().includes(query.toLowerCase()),
      ),
  );
  const incoming =
    state.inbox?.requests.filter((c) => c.direction === "incoming").length || 0;
  return (
    <>
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) messagesStore.close();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex flex-col gap-0 overflow-hidden rounded-lg p-0"
          style={{
            width: Math.min(
              1100,
              viewport.width < 640 ? viewport.width : viewport.width - 32,
            ),
            maxWidth: viewport.width,
            height: Math.max(
              180,
              viewport.width < 640 ? viewport.height : Math.min(768, viewport.height - 32),
            ),
            top: viewport.top + viewport.height / 2,
          }}
          onPointerDown={(event) => {
            if (
              event.pointerType === "mouse" ||
              (event.target as Element).closest(
                "[data-no-swipe],button,a,input,textarea,video,audio",
              )
            )
              return;
            swipe.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            const start = swipe.current;
            swipe.current = null;
            if (
              start &&
              event.clientX - start.x > 84 &&
              Math.abs(event.clientY - start.y) < 40
            )
              messagesStore.back();
          }}
          onPointerCancel={() => {
            swipe.current = null;
          }}
        >
          <DialogHeader className="shrink-0 border-b border-border px-3 py-2">
            <div className="flex items-center gap-2">
              {!showList && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Voltar às conversas"
                  onClick={() => messagesStore.back()}
                >
                  <ArrowLeft className="size-4" />
                </Button>
              )}
              <MessageCircle className="size-4 text-muted-foreground" />
              <DialogTitle className="flex-1 text-sm">
                Mensagens diretas
              </DialogTitle>
              <span
                className={`size-1.5 rounded-full ${state.connected ? "bg-emerald-500" : "bg-muted-foreground"}`}
                aria-label={state.connected ? "Conectado" : "Reconectando"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Configurações de mensagens"
                onClick={() => messagesStore.view("settings")}
              >
                <Settings2 className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Fechar mensagens"
                onClick={() => messagesStore.close()}
              >
                <X className="size-4" />
              </Button>
            </div>
            <DialogDescription className="sr-only">
              Conversas privadas da sua conta OrganizeOn.
            </DialogDescription>
          </DialogHeader>
          <div className="flex min-h-0 flex-1">
            <aside
              className={`${showList ? "flex" : "hidden md:flex"} w-full shrink-0 flex-col border-r border-border md:w-72`}
              aria-label="Lista de conversas"
            >
              <div className="shrink-0 space-y-2 border-b border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-medium">Suas conversas</h2>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label="Nova mensagem direta"
                    onClick={() => messagesStore.view("new")}
                  >
                    <MessageCirclePlus className="size-4" />
                  </Button>
                </div>
                <Input
                  aria-label="Pesquisar conversa"
                  placeholder="Pesquisar conversa…"
                  className="h-8"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Button
                  type="button"
                  variant={state.view === "requests" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => messagesStore.view("requests")}
                >
                  <Inbox className="size-4" />
                  Solicitações
                  {incoming > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {incoming}
                    </Badge>
                  )}
                </Button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-1.5">
                {!state.inbox && !state.error ? (
                  <p
                    role="status"
                    className="flex items-center gap-2 p-4 text-xs text-muted-foreground"
                  >
                    <LoaderCircle className="size-3 animate-spin" />
                    Carregando conversas…
                  </p>
                ) : !list.length ? (
                  <div className="grid gap-3 p-6 text-center">
                    <MessageCircle className="mx-auto size-7 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {query
                        ? "Nenhuma conversa encontrada."
                        : "Suas DMs vão aparecer aqui."}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => messagesStore.view("new")}
                    >
                      Nova DM
                    </Button>
                  </div>
                ) : (
                  list.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-label={`Conversa com ${c.peer.profile.displayName}`}
                      onClick={() => messagesStore.select(c.id)}
                      className={`mb-1 flex w-full min-w-0 items-center gap-2.5 rounded-md p-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${state.selectedId === c.id ? "bg-accent" : "hover:bg-muted"}`}
                    >
                      <ProfileAvatar
                        profile={c.peer.profile}
                        className="size-9"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {c.peer.profile.displayName}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {c.lastMessage
                            ? (c.lastMessage.sender.username === state.username
                                ? "Você: "
                                : "") +
                              (c.lastMessage.deleted
                                ? "Mensagem apagada"
                                : c.lastMessage.content || "Arquivo")
                            : "Conversa aceita"}
                        </span>
                      </span>
                      {c.unread > 0 && (
                        <Badge variant="secondary" className="tabular-nums">
                          {c.unread > 99 ? "99+" : c.unread}
                        </Badge>
                      )}
                    </button>
                  ))
                )}
              </div>
              {state.error && (
                <div className="shrink-0 border-t border-border p-3">
                  <p role="alert" className="text-xs text-destructive">
                    {state.error}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => void messagesStore.refresh()}
                  >
                    <RefreshCw className="size-3" />
                    Tentar novamente
                  </Button>
                </div>
              )}
            </aside>
            <main
              className={`${showList ? "hidden md:block" : "block"} min-h-0 min-w-0 flex-1`}
            >
              <Pane key={state.selectedId || state.view}>
                {selected ? (
                  <MessageThread
                    key={selected.id}
                    conversation={selected}
                    onProfile={setPerson}
                  />
                ) : state.view === "requests" ? (
                  <RequestsList onProfile={setPerson} />
                ) : state.view === "new" ? (
                  <NewConversation />
                ) : state.view === "settings" ? (
                  <MessagesSettings />
                ) : (
                  <div className="grid h-full place-content-center justify-items-center gap-3 p-8 text-center">
                    <MessageCircle className="size-10 text-muted-foreground" />
                    <h2 className="text-lg font-semibold">
                      Suas mensagens, em qualquer serviço
                    </h2>
                    <p className="max-w-xs text-sm text-muted-foreground">
                      Escolha uma conversa ou adicione alguém pelo @usuário.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => messagesStore.view("new")}
                    >
                      Nova DM
                    </Button>
                  </div>
                )}
              </Pane>
            </main>
          </div>
        </DialogContent>
      </Dialog>
      {person && (
        <PersonProfile
          person={person}
          own={person.username === state.username}
          onClose={() => setPerson(null)}
        />
      )}
    </>
  );
}
