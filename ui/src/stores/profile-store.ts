import { accountSession } from "@/core/account-session";
import { operationFeedback } from "@/core/operation-feedback";
import { useEffect, useSyncExternalStore } from "react";
import {
  defaultProfile,
  profileService,
  type Profile,
} from "@/services/profile-service";
type Entry = {
  profile: Profile;
  confirmed: Profile;
  listeners: Set<() => void>;
  pending: Promise<void> | null;
  revision: number;
  writes: number;
  fieldRevisions: Partial<Record<keyof Profile, number>>;
  tail: Promise<void>;
};
const entries = new Map<string, Entry>();
function entry(username: string) {
  let value = entries.get(username);
  if (!value) {
    value = {
      profile: defaultProfile(username),
      confirmed: defaultProfile(username),
      listeners: new Set(),
      pending: null,
      revision: 0,
      writes: 0,
      fieldRevisions: {},
      tail: Promise.resolve(),
    };
    entries.set(username, value);
  }
  return value;
}
function publish(username: string, profile: Profile) {
  const value = entry(username);
  value.profile = profile;
  for (const listener of value.listeners) listener();
}
let channel: BroadcastChannel | undefined;
try {
  channel = new BroadcastChannel("organizeon-profile");
  channel.onmessage = ({ data }) => {
    if (typeof data?.username === "string" && entries.has(data.username))
      void refreshProfile(data.username);
  };
} catch {}
export async function refreshProfile(username: string) {
  const value = entry(username);
  if (!value.pending) {
    const revision = value.revision;
    value.pending = profileService
      .get()
      .then((profile) => {
        if (profile && value.revision === revision && !value.writes)
          { value.confirmed = profile; publish(username, profile); }
      })
      .catch(() => {})
      .finally(() => {
        value.pending = null;
      });
  }
  return value.pending;
}
export function updateProfile(username: string, profile: Profile) {
  entry(username).revision++;
  entry(username).confirmed = profile;
  publish(username, profile);
  channel?.postMessage({ username });
}
/** Apply each field immediately; serialize writes and roll back only fields still owned by this edit. */
export function saveOptimisticProfile(
  username: string,
  patch: Partial<Profile>,
): Promise<void> {
  const session = accountSession.get(),
    value = entry(username);
  if (session.username !== username)
    return Promise.reject(Error("Sua sessão mudou. Abra o perfil novamente."));
  const token = ++value.revision,
    keys = Object.keys(patch) as (keyof Profile)[];
  for (const key of keys) value.fieldRevisions[key] = token;
  value.writes++;
  publish(username, { ...value.profile, ...patch });
  const work = value.tail
    .catch(() => {})
    .then(async () => {
      try {
        if (accountSession.get().revision !== session.revision) return;
        const saved = await profileService.save(patch);
        if (accountSession.get().revision !== session.revision) return;
        value.confirmed = saved;
        const next = { ...value.profile };
        for (const key of keys)
          if (value.fieldRevisions[key] === token)
            Object.assign(next, { [key]: saved[key] });
        publish(username, next);
        channel?.postMessage({ username });
      } catch (error) {
        if (accountSession.get().revision !== session.revision) return;
        const next = { ...value.profile };
        for (const key of keys)
          if (value.fieldRevisions[key] === token)
            Object.assign(next, { [key]: value.confirmed[key] });
        publish(username, next);
        operationFeedback.show(
          "Não foi possível salvar o perfil. A alteração foi desfeita. " +
            (error instanceof Error ? error.message : "Tente novamente."),
        );
        throw error;
      } finally {
        value.writes--;
        value.revision++;
      }
    });
  value.tail = work;
  return work;
}
export function useProfile(username: string, enabled = true) {
  const value = entry(username);
  const profile = useSyncExternalStore(
    (listener) => {
      value.listeners.add(listener);
      return () => {
        value.listeners.delete(listener);
      };
    },
    () => value.profile,
  );
  useEffect(() => {
    if (!enabled) return;
    void refreshProfile(username);
    const refresh = () => {
      if (!document.hidden) void refreshProfile(username);
    };
    window.addEventListener("focus", refresh);
    const timer = setInterval(refresh, 60000);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [username, enabled]);
  return profile;
}
