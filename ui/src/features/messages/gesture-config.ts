import { useMessagesState } from "@/stores/messages-store";
export const DEFAULT_LONG_PRESS_MS = 200;
export const MIN_LONG_PRESS_MS = 100;
export const MAX_LONG_PRESS_MS = 2000;
export function longPressDelay(value: unknown): number {
  return typeof value === "number" && Number.isInteger(value) && value >= MIN_LONG_PRESS_MS && value <= MAX_LONG_PRESS_MS
    ? value : DEFAULT_LONG_PRESS_MS;
}
/** Account preference shared by message and conversation touch gestures. */
export function useLongPressDelay() {
  return longPressDelay(useMessagesState().inbox?.settings.longPressMs);
}
