import { useEffect, useState } from "react";
import { Download, File, Image, LoaderCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dmService } from "@/services/messages-service";
import type { DmAttachment } from "./types";
function bytes(value: number) {
  return value >= 1048576
    ? (value / 1048576).toFixed(1) + " MB"
    : Math.max(1, Math.round(value / 1024)) + " KB";
}
export function MessageMedia({ attachment }: { attachment: DmAttachment }) {
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
  async function load() {
    if (loading) return;
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
      setLoading(false);
    }
  }
  return (
    <div
      className="mt-2 w-fit max-w-full rounded-md border border-border bg-muted/40 p-2"
      data-no-swipe
    >
      {url ? (
        type === "image" ? (
          <img
            src={url}
            alt={attachment.name}
            loading="lazy"
            className="max-h-72 max-w-full rounded object-contain"
          />
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
          className="h-auto max-w-full justify-start py-2"
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
    </div>
  );
}
