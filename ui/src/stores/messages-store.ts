import { useSyncExternalStore } from "react";
import { AccountApiError } from "@/services/account-api";
import { dmService } from "@/services/messages-service";
import { uniqueId } from "@/utils/unique-id";
import type {
  Inbox,
  DmMessage,
  DmPerson,
  DmAttachment,
  DmNotice,
  DmSettings,
} from "@/features/messages/types";
type Thread = {
  messages: DmMessage[];
  hasMore: boolean;
  typing: boolean;
  loading: boolean;
  error: string;
};
type Draft = {
  text: string;
  reply: DmMessage | null;
  attachments: DmAttachment[];
  retry: { fingerprint: string; nonce: string } | null;
};
type State = {
  username: string | null;
  inbox: Inbox | null;
  connected: boolean;
  updatedAt: number;
  error: string;
  open: boolean;
  selectedId: string | null;
  view: "inbox" | "requests" | "new" | "settings";
  threads: Record<string, Thread>;
  drafts: Record<string, Draft>;
  notices: DmNotice[];
};
const initial = (): State => ({
  username: null,
  inbox: null,
  connected: false,
  updatedAt: 0,
  error: "",
  open: false,
  selectedId: null,
  view: "inbox",
  threads: {},
  drafts: {},
  notices: [],
});
let state = initial(),
  generation = 0,
  references = 0,
  timer: ReturnType<typeof setTimeout> | undefined,
  polling = false,
  revision = 0,
  cursor: number | null = null;
// Dirty cached messages survive inbox polling while a conversation is hidden.
const pendingChanges = new Map<string, Set<string>>();
const listeners = new Set<() => void>();
const emptyThread = (): Thread => ({
  messages: [],
  hasMore: false,
  typing: false,
  loading: false,
  error: "",
});
const emptyDraft = (): Draft => ({
  text: "",
  reply: null,
  attachments: [],
  retry: null,
});
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  for (const listener of listeners) listener();
};
const merge = (current: DmMessage[], next: DmMessage[]) =>
  [...new Map([...current, ...next].map((m) => [m.id, m])).values()]
    .sort((a, b) => a.seq - b.seq)
    .slice(-240);
function threadPatch(id: string, patch: Partial<Thread>) {
  set({
    threads: {
      ...state.threads,
      [id]: { ...(state.threads[id] || emptyThread()), ...patch },
    },
  });
}
let audio: AudioContext | null = null;
export async function unlockDmSound() {
  if (!audio) audio = new AudioContext();
  await audio.resume();
}
function sound() {
  try {
    if (audio?.state !== "running") return;
    const oscillator = audio.createOscillator(),
      gain = audio.createGain();
    oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.025, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.12);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.12);
  } catch {}
}
function updateMessage(message: DmMessage) {
  const current = state.threads[message.conversationId];
  if (current)
    threadPatch(message.conversationId, {
      messages: merge(current.messages, [message]),
    });
}
export const messagesStore = {
  get: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  start(username: string) {
    if (state.username !== username) {
      generation++;
      pendingChanges.clear();
      if (timer) clearTimeout(timer);
      state = { ...initial(), username };
      cursor = null;
      polling = false;
      references = 0;
      revision = 0;
    }
    const current = generation;
    references++;
    void poll();
    return () => {
      if (current !== generation) return;
      if (--references <= 0) {
        generation++;
        pendingChanges.clear();
        if (timer) clearTimeout(timer);
        polling = false;
        cursor = null;
        set(initial());
      }
    };
  },
  open(id?: string) {
    let selected = id || state.selectedId;
    let view: State["view"] = "inbox";
    if (id && state.inbox?.requests.some((c) => c.id === id)) {
      selected = null;
      view = "requests";
    }
    set({ open: true, selectedId: selected, view });
    if (selected) void messagesStore.load(selected);
    void poll();
  },
  close() {
    set({ open: false });
  },
  back() {
    if (state.selectedId) set({ selectedId: null, view: "inbox" });
    else if (state.view !== "inbox") set({ view: "inbox" });
    else set({ open: false });
  },
  view(view: State["view"]) {
    set({ view, selectedId: null });
  },
  select(id: string) {
    set({ selectedId: id, view: "inbox" });
    void messagesStore.load(id);
  },
  draft(id: string) {
    return state.drafts[id] || emptyDraft();
  },
  setDraft(id: string, patch: Partial<Draft>) {
    set({
      drafts: {
        ...state.drafts,
        [id]: { ...messagesStore.draft(id), ...patch },
      },
    });
  },
  dismissNotice(id: number) {
    set({ notices: state.notices.filter((n) => n.id !== id) });
  },
  async refresh() {
    revision++;
    if (timer) clearTimeout(timer);
    if (polling) {
      timer = setTimeout(() => void poll(), 200);
      return;
    }
    await poll();
  },
  async load(id: string, older = false) {
    const current = state.threads[id] || emptyThread();
    if (current.loading) return;
    const version = generation;
    threadPatch(id, { loading: true, error: "" });
    try {
      const page = await dmService.messages(
        id,
        older && current.messages.length
          ? { before: current.messages[0].seq }
          : {},
      );
      if (version !== generation) return;
      threadPatch(id, {
        messages: merge(state.threads[id]?.messages || [], page.messages),
        hasMore: page.hasMore,
        typing: page.typing,
        loading: false,
      });
    } catch (error) {
      if (version === generation)
        threadPatch(id, {
          error:
            error instanceof Error
              ? error.message
              : "Não foi possível carregar.",
          loading: false,
        });
    }
  },
  async send(id: string) {
    const draft = messagesStore.draft(id);
    if (!draft.text.trim() && !draft.attachments.length) return;
    const fingerprint = JSON.stringify({
      text: draft.text,
      reply: draft.reply?.id,
      attachments: draft.attachments.map((a) => a.id),
    });
    const nonce =
      draft.retry?.fingerprint === fingerprint ? draft.retry.nonce : uniqueId();
    messagesStore.setDraft(id, { retry: { fingerprint, nonce } });
    const version = generation;
    const result = await dmService.send(id, {
      content: draft.text,
      replyId: draft.reply?.id,
      attachmentIds: draft.attachments.map((a) => a.id),
      nonce,
    });
    if (version !== generation) return;
    updateMessage(result.message);
    messagesStore.setDraft(id, {
      text: "",
      reply: null,
      attachments: [],
      retry: null,
    });
    await messagesStore.refresh();
  },
  async upload(id: string, file: File) {
    const version = generation;
    const draft = messagesStore.draft(id);
    if (draft.attachments.length >= 4)
      throw Error("Você pode adicionar até quatro arquivos.");
    const result = await dmService.upload(id, file);
    if (version !== generation) return;
    messagesStore.setDraft(id, {
      attachments: [
        ...messagesStore.draft(id).attachments,
        result.attachment,
      ].slice(0, 4),
    });
  },
  async removeAttachment(id: string, attachmentId: string) {
    await dmService.discardAttachment(attachmentId);
    messagesStore.setDraft(id, {
      attachments: messagesStore
        .draft(id)
        .attachments.filter((a) => a.id !== attachmentId),
    });
  },
  async request(username: string) {
    const result = await dmService.request(username);
    await messagesStore.refresh();
    if (result.status === "accepted") messagesStore.select(result.id);
    else messagesStore.view("requests");
  },
  async respond(id: string, action: "accept" | "decline" | "cancel") {
    await dmService.respond(id, action);
    await messagesStore.refresh();
    if (action === "accept") messagesStore.select(id);
  },
  async settings(patch: Partial<DmSettings>) {
    const result = await dmService.settings(patch);
    revision++;
    if (state.inbox)
      set({ inbox: { ...state.inbox, settings: result.settings } });
  },
  async action(message: DmMessage, action: string, value?: string) {
    await dmService.action(message.id, action, value);
    if (action === "unread") {
      set({ selectedId: null, view: "inbox" });
    } else {
      const result = await dmService.message(message.id);
      updateMessage(result.message);
    }
    await messagesStore.refresh();
  },
  async edit(message: DmMessage, content: string) {
    const result = await dmService.edit(message.id, content);
    updateMessage(result.message);
    await messagesStore.refresh();
  },
  async remove(message: DmMessage) {
    await dmService.remove(message.id);
    const result = await dmService.message(message.id);
    updateMessage(result.message);
    await messagesStore.refresh();
  },
  async forward(message: DmMessage, target: string) {
    const result = await dmService.send(target, {
      forwardId: message.id,
      nonce: uniqueId(),
    });
    updateMessage(result.message);
    await messagesStore.refresh();
    messagesStore.select(target);
  },
  async conversation(
    id: string,
    patch: { muted?: boolean; archived?: boolean },
  ) {
    await dmService.conversation(id, patch);
    if (patch.archived && state.selectedId === id) set({ selectedId: null });
    await messagesStore.refresh();
  },
  async block(person: DmPerson, blocked: boolean) {
    await dmService.block(person.username, blocked);
    await messagesStore.refresh();
  },
};
async function poll() {
  if (polling || !state.username || !references) return;
  if (timer) clearTimeout(timer);
  polling = true;
  const version = generation,
    stamp = revision;
  try {
    const inbox = await dmService.inbox(cursor);
    if (version !== generation) return;
    if (
      !Array.isArray(inbox.conversations) ||
      !Array.isArray(inbox.requests) ||
      inbox.me?.username !== state.username
    )
      throw Error("As mensagens estão temporariamente indisponíveis.");
    if (stamp !== revision) return;
    for (const event of inbox.events) {
      if (
        !event.messageId ||
        !["edited", "deleted", "changed"].includes(event.kind)
      )
        continue;
      if (
        !state.threads[event.conversationId]?.messages.some(
          (message) => message.id === event.messageId,
        )
      )
        continue;
      const dirty =
        pendingChanges.get(event.conversationId) || new Set<string>();
      dirty.add(event.messageId);
      pendingChanges.set(event.conversationId, dirty);
    }
    cursor = inbox.cursor;
    set({ inbox, connected: true, updatedAt: Date.now(), error: "" });
    const selected = state.selectedId;
    if (state.open && selected && !document.hidden) {
      const current = state.threads[selected] || emptyThread();
      const page = await dmService.messages(
        selected,
        current.messages.length ? { after: current.messages.at(-1)!.seq } : {},
      );
      if (version !== generation || stamp !== revision) return;
      let data = merge(current.messages, page.messages);
      const changed = pendingChanges.get(selected);
      for (const id of [...(changed || [])]) {
        if (!data.some((message) => message.id === id)) {
          changed?.delete(id);
          continue;
        }
        try {
          const result = await dmService.message(id);
          if (version !== generation || stamp !== revision) return;
          data = merge(data, [result.message]);
          changed?.delete(id);
        } catch {
          /* Keep dirty entries for the next successful read. */
        }
      }
      if (!changed?.size) pendingChanges.delete(selected);
      threadPatch(selected, {
        messages: data,
        hasMore: current.messages.length ? current.hasMore : page.hasMore,
        typing: page.typing,
        error: "",
      });
      const last = data.at(-1);
      if (page.conversation.unread && last && document.hasFocus()) {
        await dmService.read(selected, last.seq);
        if (version !== generation) return;
        set({
          inbox: {
            ...inbox,
            conversations: inbox.conversations.map((c) =>
              c.id === selected ? { ...page.conversation, unread: 0 } : c,
            ),
          },
        });
      }
    }
    const desktopAllowed =
      inbox.settings.desktop &&
      typeof Notification !== "undefined" &&
      Notification.permission === "granted";
    if (
      inbox.settings.notifications &&
      ((!document.hidden && document.hasFocus()) || desktopAllowed)
    )
      for (const event of inbox.events
        .filter((e) => !e.claimed && ["message", "request"].includes(e.kind))
        .slice(-3)) {
        if (
          state.open &&
          event.conversationId === state.selectedId &&
          !document.hidden &&
          document.hasFocus()
        )
          continue;
        const result = await dmService.claim(event.seq);
        if (version !== generation) return;
        if (!result.claimed || !result.conversation) continue;
        const person = result.conversation.peer;
        const text =
          result.kind === "request"
            ? "Quer iniciar uma conversa com você."
            : inbox.settings.previews
              ? result.message?.content || "Enviou um arquivo."
              : "Nova mensagem direta.";
        if (document.hidden && desktopAllowed) {
          const notification = new Notification(person.profile.displayName, {
            body: text,
            icon: person.profile.avatar || undefined,
            tag: "organizeon-dm-" + event.seq,
          });
          notification.onclick = () => {
            window.focus();
            messagesStore.open(event.conversationId);
            notification.close();
          };
        } else {
          set({
            notices: [
              ...state.notices,
              {
                id: event.seq,
                conversationId: event.conversationId,
                person,
                text,
                kind: result.kind || "message",
              },
            ].slice(-3),
          });
          if (inbox.settings.sound) sound();
        }
      }
  } catch (error) {
    if (version === generation) {
      if (error instanceof AccountApiError && error.status === 401) {
        cursor = null;
        pendingChanges.clear();
        set({
          inbox: null,
          threads: {},
          notices: [],
          connected: false,
          error: error.message,
        });
      } else
        set({
          connected: false,
          error:
            error instanceof Error
              ? error.message
              : "Não foi possível conectar às mensagens.",
        });
    }
  } finally {
    if (version === generation) {
      polling = false;
      if (references)
        timer = setTimeout(
          () => void poll(),
          document.hidden ? 20000 : state.open ? 1800 : 5000,
        );
    }
  }
}
if (typeof window !== "undefined") {
  window.addEventListener("focus", () => void messagesStore.refresh());
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) void messagesStore.refresh();
  });
}
export function useMessagesState() {
  return useSyncExternalStore(
    messagesStore.subscribe,
    messagesStore.get,
    messagesStore.get,
  );
}
