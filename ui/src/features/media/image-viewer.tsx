import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  Download,
  ExternalLink,
  Forward,
  MessageSquare,
  MoreVertical,
  Share2,
  Smile,
  Star,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import "./image-viewer.css";

type View = { scale: number; x: number; y: number };
/** Shared, script-free media surface. The caller owns source/authentication and URL lifetime. */
export function ImageViewer({
  open,
  onOpenChange,
  src,
  name,
  metadata,
  onForward,
  onJump,
  onReact,
  onBookmark,
  bookmarked = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  name: string;
  metadata?: ReactNode;
  onForward?: () => void;
  onJump?: () => void;
  onReact?: () => void;
  onBookmark?: () => Promise<unknown>;
  bookmarked?: boolean;
}) {
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [actionUrl, setActionUrl] = useState("");
  const image = useRef<HTMLImageElement>(null),
    stage = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    view: View;
    x: number;
    y: number;
    distance: number;
  } | null>(null);
  const pending = useRef<(() => void) | null>(null),
    lastTap = useRef(0),
    pointerType = useRef("");
  const id = useId();
  const historyEpoch = useRef(0);

  useEffect(() => {
    if (!open) return;
    const epoch = ++historyEpoch.current;
    const previous = history.state;
    if (previous?.organizeonImageViewer !== id)
      history.pushState(
        { ...previous, organizeonImageViewer: id },
        "",
        location.href,
      );
    const back = () => onOpenChange(false);
    addEventListener("popstate", back);
    return () => {
      removeEventListener("popstate", back);
      queueMicrotask(() => {
        if (
          historyEpoch.current === epoch &&
          history.state?.organizeonImageViewer === id
        )
          history.back();
      });
    };
  }, [open, id]);

  useEffect(() => {
    if (!open) return;
    setView({ scale: 1, x: 0, y: 0 });
    setError("");
    setBusy(false);
    setDragging(false);
    setFile(null);
    setActionUrl("");
    pointers.current.clear();
    gesture.current = null;
    lastTap.current = 0;
    pending.current = null;
    const controller = new AbortController();
    let object = "";
    void fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw Error("Não foi possível preparar a imagem.");
        return response.blob();
      })
      .then((blob) => {
        if (controller.signal.aborted) return;
        const next = new File([blob], name, { type: blob.type });
        object = URL.createObjectURL(blob);
        setFile(next);
        setActionUrl(object);
      })
      .catch((e) => {
        if (!controller.signal.aborted)
          setError(e.message || "Não foi possível preparar a imagem.");
      });
    return () => {
      controller.abort();
      if (object) URL.revokeObjectURL(object);
    };
  }, [open, src, name]);

  function constrain(next: View) {
    const scale = Math.min(5, Math.max(1, next.scale));
    const x = Math.max(
      0,
      ((image.current?.clientWidth || 0) * scale -
        (stage.current?.clientWidth || 0)) /
        2,
    );
    const y = Math.max(
      0,
      ((image.current?.clientHeight || 0) * scale -
        (stage.current?.clientHeight || 0)) /
        2,
    );
    return {
      scale,
      x: Math.min(x, Math.max(-x, next.x)),
      y: Math.min(y, Math.max(-y, next.y)),
    };
  }
  const zoom = (delta: number) =>
    setView((current) =>
      constrain({ ...current, scale: current.scale + delta }),
    );
  const reset = () => setView({ scale: 1, x: 0, y: 0 });
  function startGesture() {
    const points = [...pointers.current.values()];
    if (!points.length) {
      gesture.current = null;
      return;
    }
    const a = points[0],
      b = points[1];
    gesture.current = {
      view,
      x: b ? (a.x + b.x) / 2 : a.x,
      y: b ? (a.y + b.y) / 2 : a.y,
      distance: b ? Math.hypot(a.x - b.x, a.y - b.y) : 0,
    };
  }
  function defer(action: () => void) {
    pending.current = action;
    onOpenChange(false);
  }
  async function share() {
    if (!file) return;
    setError("");
    try {
      if (!navigator.canShare?.({ files: [file] }))
        throw Error(
          "Este navegador não permite compartilhar arquivos. Use Salvar imagem.",
        );
      await navigator.share({ files: [file], title: name });
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(value) => {
        if (!value) {
          const action = pending.current;
          pending.current = null;
          action?.();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="oo-image-viewer"
        onPointerDown={(event) => event.stopPropagation()}
        onPointerMove={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        onDoubleClick={(event) => event.stopPropagation()}
        style={{
          position: "fixed",
          inset: 0,
          top: 0,
          left: 0,
          transform: "none",
          width: "100%",
          maxWidth: "none",
          height: "100dvh",
          maxHeight: "none",
          padding: 0,
          borderRadius: 0,
          display: "flex",
          gap: 0,
          background: "#000",
          color: "#fff",
        }}
      >
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <DialogDescription className="sr-only">
          Visualizador de imagem. Use os controles de zoom, arraste para mover e
          Escape para fechar.
        </DialogDescription>
        <header className="oo-image-viewer-toolbar">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Fechar imagem"
            onClick={() => onOpenChange(false)}
          >
            <X />
          </Button>
          <span className="min-w-0 flex-1 truncate text-xs">{name}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Diminuir zoom"
            disabled={view.scale <= 1}
            onClick={() => zoom(-0.5)}
          >
            <ZoomOut />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Restaurar zoom"
            onClick={reset}
          >
            {Math.round(view.scale * 100)}%
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Aumentar zoom"
            disabled={view.scale >= 5}
            onClick={() => zoom(0.5)}
          >
            <ZoomIn />
          </Button>
          {onBookmark && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                bookmarked
                  ? "Remover imagem dos salvos"
                  : "Salvar mensagem nos favoritos"
              }
              aria-pressed={bookmarked}
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                setError("");
                try {
                  await onBookmark();
                } catch (e) {
                  setError((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              <Star fill={bookmarked ? "currentColor" : "none"} />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Mais opções da imagem"
                />
              }
            >
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="oo-image-viewer-menu min-w-56"
            >
              <DropdownMenuItem
                disabled={!actionUrl}
                onClick={() => {
                  const anchor = document.createElement("a");
                  anchor.href = actionUrl;
                  anchor.download = name;
                  anchor.click();
                }}
              >
                <Download />
                Salvar imagem
              </DropdownMenuItem>
              {onForward && (
                <DropdownMenuItem onClick={() => defer(onForward)}>
                  <Forward />
                  Encaminhar
                </DropdownMenuItem>
              )}
              {typeof navigator.share === "function" && (
                <DropdownMenuItem disabled={!file} onClick={() => void share()}>
                  <Share2 />
                  Compartilhar
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                disabled={!actionUrl}
                onClick={() =>
                  window.open(actionUrl, "_blank", "noopener,noreferrer")
                }
              >
                <ExternalLink />
                Abrir em nova aba
              </DropdownMenuItem>
              {onJump && (
                <DropdownMenuItem onClick={() => defer(onJump)}>
                  <MessageSquare />
                  Ir para a mensagem
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div
          ref={stage}
          className="oo-image-viewer-stage"
          data-dragging={dragging}
          data-no-swipe
          onWheel={(event) => {
            event.stopPropagation();
            zoom(event.deltaY < 0 ? 0.25 : -0.25);
          }}
          onDoubleClick={() => {
            if (pointerType.current === "mouse")
              view.scale > 1 ? reset() : zoom(1);
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
            setDragging(true);
            pointerType.current = event.pointerType;
            pointers.current.set(event.pointerId, {
              x: event.clientX,
              y: event.clientY,
            });
            event.currentTarget.setPointerCapture(event.pointerId);
            startGesture();
          }}
          onPointerMove={(event) => {
            event.stopPropagation();
            if (!pointers.current.has(event.pointerId) || !gesture.current)
              return;
            pointers.current.set(event.pointerId, {
              x: event.clientX,
              y: event.clientY,
            });
            const points = [...pointers.current.values()],
              a = points[0],
              b = points[1],
              start = gesture.current;
            if (b && start.distance) {
              const distance = Math.hypot(a.x - b.x, a.y - b.y);
              setView(
                constrain({
                  scale: (start.view.scale * distance) / start.distance,
                  x: start.view.x + (a.x + b.x) / 2 - start.x,
                  y: start.view.y + (a.y + b.y) / 2 - start.y,
                }),
              );
            } else if (start.view.scale > 1)
              setView(
                constrain({
                  ...start.view,
                  x: start.view.x + a.x - start.x,
                  y: start.view.y + a.y - start.y,
                }),
              );
            else setView({ ...start.view, y: a.y - start.y });
          }}
          onPointerUp={(event) => {
            event.stopPropagation();
            const start = gesture.current,
              wasSingle = pointers.current.size === 1;
            pointers.current.delete(event.pointerId);
            if (!pointers.current.size) setDragging(false);
            if (start && wasSingle) {
              const dy = event.clientY - start.y;
              if (start.view.scale === 1 && Math.abs(dy) > 100) {
                onOpenChange(false);
                return;
              }
              const tap = Math.hypot(event.clientX - start.x, dy) < 8;
              if (tap && event.pointerType !== "mouse") {
                setView((current) =>
                  current.scale === 1 ? { ...current, y: 0 } : current,
                );
                const now = performance.now();
                if (now - lastTap.current < 280) {
                  view.scale > 1 ? reset() : zoom(1);
                  lastTap.current = 0;
                } else lastTap.current = now;
              } else
                setView((current) =>
                  current.scale === 1 ? { ...current, y: 0 } : current,
                );
            }
            startGesture();
          }}
          onPointerCancel={(event) => {
            pointers.current.delete(event.pointerId);
            setDragging(false);
            gesture.current = null;
            setView((current) => constrain(current));
          }}
        >
          <img
            ref={image}
            src={src}
            alt={name}
            draggable={false}
            style={{
              transform: `translate(${view.x}px,${view.y}px) scale(${view.scale})`,
            }}
            onError={() => setError("Não foi possível exibir esta imagem.")}
          />
        </div>
        {(metadata || error || onReact) && (
          <footer className="oo-image-viewer-footer">
            {metadata}
            {onReact && (
              <Button
                variant="ghost"
                className="mt-2 text-white"
                onClick={() => defer(onReact)}
              >
                <Smile />
                Reagir
              </Button>
            )}
            {error && (
              <p role="alert" className="mt-2 text-sm text-red-400">
                {error}
              </p>
            )}
          </footer>
        )}
      </DialogContent>
    </Dialog>
  );
}
