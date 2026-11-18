import { updateProfile } from "./profile-store";
import { messageOutbox } from "./message-outbox";
import { operationFeedback } from "@/core/operation-feedback";
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
  DmConversation,
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
const threadEpochs = new Map<string, number>();
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
type MetadataPatch = Partial<
  Pick<DmConversation, "favorite" | "pinned" | "muted" | "archived" | "unread">
>;
type PendingMetadata = {
  base: DmConversation;
  fields: Set<keyof MetadataPatch>;
  operations: { token: number; patch: MetadataPatch }[];
  tail: Promise<void>;
};
const optimisticMetadata = new Map<string, PendingMetadata>();
let metadataToken = 0;
function overlayMetadata(inbox: Inbox): Inbox {
  const conversations = inbox.conversations
    .map((c) => {
      const pending = optimisticMetadata.get(c.id);
      if (!pending) return c;
      const base = Object.fromEntries(
        [...pending.fields].map((key) => [key, pending.base[key]]),
      );
      return Object.assign(
        { ...c, ...base },
        ...pending.operations.map((operation) => operation.patch),
      );
    })
    .sort(
      (a, b) =>
        Number(!!b.pinned) - Number(!!a.pinned) ||
        Number(!!b.favorite) - Number(!!a.favorite) ||
        b.updatedAt.localeCompare(a.updatedAt),
    );
  return { ...inbox, conversations };
}
function optimisticConversation(
  id: string,
  patch: MetadataPatch,
  send: () => Promise<unknown>,
): Promise<void> {
  const row = state.inbox?.conversations.find((c) => c.id === id);
  if (!row) return Promise.reject(Error("Conversa indisponível."));
  const currentGeneration = generation;
  let record = optimisticMetadata.get(id);
  if (!record) {
    record = {
      base: row,
      fields: new Set(),
      operations: [],
      tail: Promise.resolve(),
    };
    optimisticMetadata.set(id, record);
  }
  const target = record,
    token = ++metadataToken;
  for (const key of Object.keys(patch) as (keyof MetadataPatch)[])
    target.fields.add(key);
  target.operations.push({ token, patch });
  revision++;
  if (state.inbox) set({ inbox: overlayMetadata(state.inbox) });
  const work = target.tail
    .catch(() => {})
    .then(async () => {
      if (currentGeneration !== generation) return;
      let failure: unknown;
      try {
        await send();
        target.base = { ...target.base, ...patch };
      } catch (error) {
        failure = error;
      }
      if (currentGeneration !== generation) return;
      target.operations = target.operations.filter(
        (operation) => operation.token !== token,
      );
      if (state.inbox) set({ inbox: overlayMetadata(state.inbox) });
      if (!target.operations.length) optimisticMetadata.delete(id);
      void messagesStore.refresh();
      if (failure) {
        operationFeedback.show(
          "Não foi possível salvar a alteração. Ela foi desfeita. " +
            (failure instanceof Error ? failure.message : "Tente novamente."),
        );
        throw failure;
      }
    });
  target.tail = work;
  return work;
}
function updateMessage(message: DmMessage) {
  const current = state.threads[message.conversationId];
  if (current)
    threadPatch(message.conversationId, {
      messages: merge(current.messages, [message]),
    });
}
function resetThread(id: string) {
  threadEpochs.set(id, (threadEpochs.get(id) || 0) + 1);
  pendingChanges.delete(id);
  messageOutbox.clearConversation(id);
  dmService.invalidateConversation(id);
  set({
    threads: { ...state.threads, [id]: emptyThread() },
    drafts: { ...state.drafts, [id]: emptyDraft() },
    notices: state.notices.filter((notice) => notice.conversationId !== id),
  });
}
const conversationResetVersion = (id: string) =>
  state.inbox?.conversations.find((c) => c.id === id)?.resetVersion || 0;
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
      threadEpochs.clear();
      optimisticMetadata.clear();
      messageOutbox.clear();
      operationFeedback.dismiss();
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
        threadEpochs.clear();
        optimisticMetadata.clear();
        messageOutbox.clear();
        operationFeedback.dismiss();
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
    const threadEpoch = threadEpochs.get(id) || 0;
    threadPatch(id, { loading: true, error: "" });
    try {
      const page = await dmService.messages(
        id,
        older && current.messages.length
          ? { before: current.messages[0].seq }
          : {},
      );
      if (version !== generation || threadEpoch !== (threadEpochs.get(id) || 0))
        return;
      threadPatch(id, {
        messages: merge(state.threads[id]?.messages || [], page.messages),
        hasMore: page.hasMore,
        typing: page.typing,
        loading: false,
      });
    } catch (error) {
      if (version === generation && threadEpoch === (threadEpochs.get(id) || 0))
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
    if (
      !draft.text.trim() &&
      !draft.attachments.length &&
      !messageOutbox.get().drafts[id]?.length
    )
      return;
    const threadEpoch = threadEpochs.get(id) || 0;
    const task = messageOutbox.enqueue(
      {
        conversationId: id,
        resetVersion: conversationResetVersion(id),
        content: draft.text,
        replyId: draft.reply?.id || null,
        attachmentIds: draft.attachments.map((item) => item.id),
      },
      (message) => {
        if (threadEpoch !== (threadEpochs.get(id) || 0)) return;
        updateMessage(message);
        void messagesStore.refresh();
      },
    );
    messagesStore.setDraft(id, {
      text: "",
      reply: null,
      attachments: [],
      retry: null,
    });
    await task;
  },
  async upload(id: string, file: File) {
    const version = generation;
    const threadEpoch = threadEpochs.get(id) || 0;
    const draft = messagesStore.draft(id);
    if (draft.attachments.length >= 4)
      throw Error("Você pode adicionar até quatro arquivos.");
    const result = await dmService.upload(
      id,
      file,
      undefined,
      conversationResetVersion(id),
    );
    if (version !== generation || threadEpoch !== (threadEpochs.get(id) || 0))
      return;
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
    const epoch = threadEpochs.get(message.conversationId) || 0,
      session = generation;
    await dmService.action(message.id, action, value);
    if (
      session !== generation ||
      epoch !== (threadEpochs.get(message.conversationId) || 0)
    )
      return;
    if (action === "unread") {
      set({ selectedId: null, view: "inbox" });
    } else {
      const result = await dmService.message(message.id);
      if (
        session !== generation ||
        epoch !== (threadEpochs.get(message.conversationId) || 0)
      )
        return;
      updateMessage(result.message);
    }
    await messagesStore.refresh();
  },
  async edit(message: DmMessage, content: string) {
    const epoch = threadEpochs.get(message.conversationId) || 0,
      session = generation;
    const result = await dmService.edit(message.id, content);
    if (
      session !== generation ||
      epoch !== (threadEpochs.get(message.conversationId) || 0)
    )
      return;
    updateMessage(result.message);
    void messagesStore.refresh();
  },
  async remove(message: DmMessage) {
    const epoch = threadEpochs.get(message.conversationId) || 0,
      session = generation;
    await dmService.remove(message.id);
    const result = await dmService.message(message.id);
    if (
      session !== generation ||
      epoch !== (threadEpochs.get(message.conversationId) || 0)
    )
      return;
    updateMessage(result.message);
    void messagesStore.refresh();
  },
  async forward(message: DmMessage, target: string) {
    const epoch = threadEpochs.get(target) || 0,
      session = generation;
    const result = await dmService.send(target, {
      forwardId: message.id,
      nonce: uniqueId(),
      resetVersion: conversationResetVersion(target),
    });
    if (session !== generation || epoch !== (threadEpochs.get(target) || 0))
      return;
    updateMessage(result.message);
    await messagesStore.refresh();
    messagesStore.select(target);
  },
  async resetConversation(conversation: DmConversation) {
    const currentGeneration = generation;
    const result = await dmService.reset(conversation);
    if (currentGeneration !== generation) return;
    revision++;
    resetThread(conversation.id);
    if (state.inbox)
      set({
        inbox: {
          ...state.inbox,
          conversations: state.inbox.conversations.map((c) =>
            c.id === conversation.id ? result.conversation : c,
          ),
        },
      });
    await messagesStore.refresh();
  },
  async conversation(
    id: string,
    patch: {
      muted?: boolean;
      archived?: boolean;
      favorite?: boolean;
      pinned?: boolean;
    },
  ) {
    if (patch.archived && state.selectedId === id) set({ selectedId: null });
    await optimisticConversation(id, patch, () =>
      dmService.conversation(id, patch),
    );
  },
  async markRead(id: string) {
    await optimisticConversation(id, { unread: 0 }, () => dmService.read(id));
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
    stamp = revision,
    firstInbox = !state.inbox;
  try {
    const selectedAtStart =
      state.open && !document.hidden ? state.selectedId : null;
    const threadAtStart = selectedAtStart
      ? state.threads[selectedAtStart]
      : null;
    const pageRequest =
      selectedAtStart && !threadAtStart?.loading
        ? dmService.messages(
            selectedAtStart,
            threadAtStart?.messages.length
              ? { after: threadAtStart.messages.at(-1)!.seq }
              : {},
          )
        : null;
    const [rawInbox, nextPage] = await Promise.all([
      dmService.inbox(cursor),
      pageRequest,
    ]);
    let inbox = overlayMetadata(rawInbox);
    if (version !== generation) return;
    if (
      !Array.isArray(inbox.conversations) ||
      !Array.isArray(inbox.requests) ||
      inbox.me?.username !== state.username
    )
      throw Error("As mensagens estão temporariamente indisponíveis.");
    if (stamp !== revision) return;
    const resets = new Set(
      inbox.events
        .filter((event) => event.kind === "reset")
        .map((event) => event.conversationId),
    );
    for (const conversation of inbox.conversations) {
      const old = state.inbox?.conversations.find(
        (c) => c.id === conversation.id,
      );
      if (old && (old.resetVersion || 0) !== (conversation.resetVersion || 0))
        resets.add(conversation.id);
    }
    if (nextPage && selectedAtStart) {
      const known = inbox.conversations.find((c) => c.id === selectedAtStart);
      if (
        (nextPage.conversation.resetVersion || 0) > (known?.resetVersion || 0)
      ) {
        resets.add(selectedAtStart);
        inbox = {
          ...inbox,
          conversations: inbox.conversations.map((c) =>
            c.id === selectedAtStart ? nextPage.conversation : c,
          ),
        };
      }
    }
    for (const id of resets) resetThread(id);
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
    if(firstInbox&&inbox.settings.notifications){
      try{
        const summary=await dmService.unreadSummary();
        if(version!==generation||stamp!==revision)return;
        if(summary.count>0)set({notices:[...state.notices,{id:-2,conversationId:"",person:inbox.me,kind:"unread_summary",text:`Você tem ${summary.count} ${summary.count===1?"mensagem não lida":"mensagens não lidas"}.`}]});
      }catch{/* A summary failure must not prevent the inbox from opening. */}
    }
    const selected = state.selectedId;
    if (
      state.open &&
      selected &&
      !document.hidden &&
      nextPage &&
      selectedAtStart === selected
    ) {
      const current = state.threads[selected] || emptyThread();
      const page = resets.has(selected)
        ? await dmService.messages(selected)
        : nextPage;
      if (version !== generation || stamp !== revision) return;
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
    if (
      inbox.goldBadgeNotificationPending &&
      !document.hidden &&
      document.hasFocus()
    ) {
      const award = await dmService.claimGoldBadge();
      if (version !== generation) return;
      if (award.claimed) {
        updateProfile(inbox.me.username, inbox.me.profile);
        set({
          notices: [
            ...state.notices.filter((notice) => notice.kind !== "gold_badge"),
            {
              id: -1,
              conversationId: "",
              person: inbox.me,
              text: "Você ganhou o emblema dourado OrganizeOn.",
              kind: "gold_badge",
            },
          ].slice(-3),
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
        threadEpochs.clear();
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
          document.hidden ? 20000 : state.open ? 1000 : 5000,
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
