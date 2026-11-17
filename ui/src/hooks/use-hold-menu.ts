import {
  useEffect,
  useRef,
  type PointerEvent,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
/** Long press without capturing pointers, so native scrolling remains available. */
export function useHoldMenu(open: () => void, delay = 200) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    start = useRef<{ x: number; y: number } | null>(null),
    held = useRef(false);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clear, []);
  return {
    onPointerDown: (event: PointerEvent) => {
      if (event.button !== 0) return;
      clear();
      held.current = false;
      start.current = { x: event.clientX, y: event.clientY };
      timer.current = setTimeout(() => {
        held.current = true;
        open();
      }, delay);
    },
    onPointerMove: (event: PointerEvent) => {
      if (
        start.current &&
        Math.hypot(
          event.clientX - start.current.x,
          event.clientY - start.current.y,
        ) > 8
      )
        clear();
    },
    onPointerUp: clear,
    onPointerCancel: clear,
    onPointerLeave: clear,
    onClickCapture: (event: MouseEvent) => {
      if (held.current) {
        held.current = false;
        event.preventDefault();
        event.stopPropagation();
      }
    },
    onContextMenu: (event: MouseEvent) => {
      clear();
      event.preventDefault();
      open();
    },
    onKeyDown: (event: KeyboardEvent) => {
      held.current = false;
      if (
        event.key === "ContextMenu" ||
        (event.shiftKey && event.key === "F10")
      ) {
        event.preventDefault();
        open();
      }
    },
  };
}
