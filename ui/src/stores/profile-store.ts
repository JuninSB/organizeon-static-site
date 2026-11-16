import { useEffect, useSyncExternalStore } from "react";
import {
  defaultProfile,
  profileService,
  type Profile,
} from "@/services/profile-service";
type Entry = {
  profile: Profile;
  listeners: Set<() => void>;
  pending: Promise<void> | null;
  revision: number;
};
const entries = new Map<string, Entry>();
function entry(username: string) {
  let value = entries.get(username);
  if (!value) {
    value = {
      profile: defaultProfile(username),
      listeners: new Set(),
      pending: null,
      revision: 0,
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
        if (profile && value.revision === revision) publish(username, profile);
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
  publish(username, profile);
  channel?.postMessage({ username });
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
