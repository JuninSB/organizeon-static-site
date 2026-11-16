import { useLongPressDelay } from "./gesture-config";
import { useEffect, useRef, useState, type PointerEvent } from "react";
/** Horizontal reply gesture never prevents the native vertical scroll gesture. */
export function useMessageGestures({
  reply,
  actions,
}: {
  reply: () => void;
  actions: () => void;
}) {
  const delay = useLongPressDelay();
  const origin = useRef<{
      x: number;
      y: number;
      horizontal: boolean;
      long: boolean;
    } | null>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const reset = () => {
    clear();
    origin.current = null;
    setOffset(0);
  };
  return {
    offset,
    handlers: {
      onPointerDown: (event: PointerEvent<HTMLElement>) => {
        if (
          event.pointerType === "mouse" ||
          (event.target as Element).closest(
            "button,a,input,textarea,video,audio",
          )
        )
          return;
        origin.current = {
          x: event.clientX,
          y: event.clientY,
          horizontal: false,
          long: false,
        };
        clear();
        timer.current = setTimeout(() => {
          if (origin.current) {
            origin.current.long = true;
            actions();
          }
        }, delay);
      },
      onPointerMove: (event: PointerEvent<HTMLElement>) => {
        const start = origin.current;
        if (!start) return;
        const dx = event.clientX - start.x,
          dy = event.clientY - start.y;
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) clear();
        if (dx < 0 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          start.horizontal = true;
          setOffset(Math.max(-56, dx));
        }
      },
      onPointerUp: (event: PointerEvent<HTMLElement>) => {
        const start = origin.current;
        if (
          start &&
          !start.long &&
          start.horizontal &&
          event.clientX - start.x < -48 &&
          Math.abs(event.clientY - start.y) < 36
        ) {
          event.stopPropagation();
          reply();
        }
        reset();
      },
      onPointerCancel: reset,
      onContextMenu: (event: React.MouseEvent<HTMLElement>) => {
        if ((event.target as Element).closest("a,video,audio")) return;
        event.preventDefault();
        clear();
        actions();
      },
    },
  };
}
