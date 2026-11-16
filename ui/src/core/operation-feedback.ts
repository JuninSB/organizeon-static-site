import { useSyncExternalStore } from "react";
let message = "";
const listeners = new Set<() => void>();
export const operationFeedback = {
  show(next: string) {
    message = next;
    for (const notify of listeners) notify();
  },
  dismiss() {
    message = "";
    for (const notify of listeners) notify();
  },
  get: () => message,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
export const useOperationFailure = () =>
  useSyncExternalStore(operationFeedback.subscribe, operationFeedback.get);
