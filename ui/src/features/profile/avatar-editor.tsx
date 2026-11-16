import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { avatarRadius } from "./profile-avatar";
import type { Profile } from "@/services/profile-service";
export function AvatarEditor({
  file,
  shape,
  onSave,
  onCancel,
}: {
  file: File;
  shape: Profile["avatarShape"];
  onSave: (avatar: string) => void;
  onCancel: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");
  const drag = useRef<{
    x: number;
    y: number;
    pan: { x: number; y: number };
  } | null>(null);
  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth * img.naturalHeight > 24000000) {
        setError("Escolha uma imagem de até 24 megapixels.");
        return;
      }
      setImage(img);
    };
    img.onerror = () => setError("Não foi possível abrir esta imagem.");
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);
  useEffect(() => {
    if (!image || !canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;
    const side = Math.min(image.naturalWidth, image.naturalHeight) / zoom;
    const x = ((image.naturalWidth - side) * (1 + pan.x)) / 2,
      y = ((image.naturalHeight - side) * (1 + pan.y)) / 2;
    context.fillStyle = "#111113";
    context.fillRect(0, 0, 256, 256);
    context.drawImage(image, x, y, side, side, 0, 0, 256, 256);
  }, [image, zoom, pan]);
  return (
    <div className="grid gap-3 rounded-lg border p-4">
      <p className="text-sm font-medium">Recortar foto</p>
      <canvas
        ref={canvas}
        width={256}
        height={256}
        aria-label="Prévia do recorte"
        className="mx-auto aspect-square w-full max-w-56 touch-none bg-muted"
        style={{ borderRadius: avatarRadius(shape) }}
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, y: event.clientY, pan };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current) {
            const d = drag.current;
            setPan({
              x: Math.max(
                -1,
                Math.min(1, d.pan.x - (event.clientX - d.x) / 100),
              ),
              y: Math.max(
                -1,
                Math.min(1, d.pan.y - (event.clientY - d.y) / 100),
              ),
            });
          }
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      />
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <label className="grid gap-1 text-xs">
        Zoom
        <input
          aria-label="Zoom do recorte"
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        {(["x", "y"] as const).map((axis) => (
          <label key={axis} className="grid gap-1 text-xs">
            {axis === "x" ? "Horizontal" : "Vertical"}
            <input
              aria-label={
                axis === "x" ? "Posição horizontal" : "Posição vertical"
              }
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={pan[axis]}
              onChange={(e) =>
                setPan({ ...pan, [axis]: Number(e.target.value) })
              }
            />
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar recorte
        </Button>
        <Button
          type="button"
          disabled={!image || !!error}
          onClick={() => {
            if (canvas.current)
              onSave(canvas.current.toDataURL("image/jpeg", 0.86));
          }}
        >
          Usar recorte
        </Button>
      </div>
    </div>
  );
}
