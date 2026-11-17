import { m } from "@/core/motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Download, File, Image, LoaderCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dmService } from "@/services/messages-service";
import type { DmAttachment } from "./types";
import type { ReactNode } from "react";
import { ImageViewer } from "@/features/media/image-viewer";
function bytes(value: number) {
  return value >= 1048576
    ? (value / 1048576).toFixed(1) + " MB"
    : Math.max(1, Math.round(value / 1024)) + " KB";
}
export function MessageMedia({
  attachment,
  metadata,
  onForward,
  onJump,
  onReact,
  onBookmark,
  bookmarked,
}: {
  attachment: DmAttachment;
  metadata?: ReactNode;
  onForward?: () => void;
  onJump?: () => void;
  onReact?: () => void;
  onBookmark?: () => Promise<unknown>;
  bookmarked?: boolean;
}) {
  const [viewing, setViewing] = useState(false);
  const host = useRef<HTMLDivElement>(null),
    alive = useRef(true),
    inFlight = useRef(false),
    autoTried = useRef(false);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const [url, setUrl] = useState<string | null>(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url);
    },
    [url],
  );
  const type = attachment.mime.split("/")[0],
    preview = ["image", "video", "audio"].includes(type);
  const load = useCallback(async () => {
    if (inFlight.current || url) return;
    inFlight.current = true;
    setLoading(true);
    setError("");
    try {
      const result = await dmService.attachment(attachment.id);
      const binary = atob(result.attachment.data),
        array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
      const object = URL.createObjectURL(
        new Blob([array], { type: attachment.mime }),
      );
      if (!alive.current) {
        URL.revokeObjectURL(object);
        return;
      }
      if (preview) setUrl(object);
      else {
        const a = document.createElement("a");
        a.href = object;
        a.download = attachment.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(object), 60000);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Não foi possível abrir o arquivo.",
      );
    } finally {
      inFlight.current = false;
      if (alive.current) setLoading(false);
    }
  }, [attachment.id, attachment.mime, attachment.name, preview, url]);
  useEffect(() => {
    if (
      type !== "image" ||
      attachment.size > 1048576 ||
      !host.current ||
      autoTried.current
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some((entry) => entry.isIntersecting) &&
          !autoTried.current
        ) {
          autoTried.current = true;
          void load();
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [attachment.size, type, load]);
  return (
    <div
      ref={host}
      className="mt-2 w-fit max-w-full overflow-hidden rounded-xl bg-card"
      data-no-swipe
    >
      {url ? (
        type === "image" ? (
          <button
            type="button"
            className="block cursor-zoom-in border-0 bg-transparent p-0"
            aria-label={`Ampliar ${attachment.name}`}
            onClick={() => setViewing(true)}
          >
            <m.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={url}
              alt={attachment.name}
              loading="lazy"
              className="max-h-72 max-w-full rounded object-contain"
            />
          </button>
        ) : type === "video" ? (
          <video controls src={url} className="max-h-72 max-w-full rounded" />
        ) : (
          <audio controls src={url} className="max-w-full" />
        )
      ) : (
        <Button
          type="button"
          variant="ghost"
          disabled={loading}
          onClick={() => void load()}
          className="h-auto max-w-full justify-start p-3"
        >
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : preview ? (
            type === "image" ? (
              <Image className="size-4" />
            ) : (
              <Play className="size-4" />
            )
          ) : (
            <File className="size-4" />
          )}
          <span className="min-w-0 text-left">
            <span className="block max-w-52 truncate text-xs">
              {attachment.name}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {bytes(attachment.size)} ·{" "}
              {preview ? "Carregar mídia" : "Baixar arquivo"}
            </span>
          </span>
          {!preview && <Download className="size-3" />}
        </Button>
      )}
      {error && (
        <p role="alert" className="mt-1 max-w-60 text-xs text-destructive">
          {error}
        </p>
      )}
      {url && type === "image" && (
        <ImageViewer
          open={viewing}
          onOpenChange={setViewing}
          src={url}
          name={attachment.name}
          metadata={metadata}
          onForward={onForward}
          onJump={onJump}
          onReact={onReact}
          onBookmark={onBookmark}
          bookmarked={bookmarked}
        />
      )}
    </div>
  );
}
