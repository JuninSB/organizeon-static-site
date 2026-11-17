import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { avatarRadius } from "./profile-avatar";
import type { Profile } from "@/services/profile-service";
export function AvatarEditor({
  file,
  shape,
  onSave,
  onCancel,
  variant = "avatar",
  stretch = false,
}: {
  file: File;
  shape: Profile["avatarShape"];
  onSave: (avatar: string) => void;
  onCancel: () => void;
  variant?: "avatar" | "banner";
  stretch?: boolean;
}) {
  const width = variant === "banner" ? 768 : 256, height = 256;
  const canvas = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
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
    const rotated = document.createElement("canvas");
    const swap = rotation % 180 !== 0;
    const scale = Math.min(1, 1536 / Math.max(image.naturalWidth, image.naturalHeight));
    const scaledWidth = image.naturalWidth * scale, scaledHeight = image.naturalHeight * scale;
    rotated.width = Math.round(swap ? scaledHeight : scaledWidth);
    rotated.height = Math.round(swap ? scaledWidth : scaledHeight);
    const source = rotated.getContext("2d");
    if (!source) return;
    source.translate(rotated.width / 2, rotated.height / 2);
    source.rotate(rotation * Math.PI / 180);
    source.drawImage(image, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
    const cropHeight = stretch ? rotated.height : Math.min(rotated.height, rotated.width / (width / height)) / zoom;
    const cropWidth = stretch ? rotated.width : cropHeight * (width / height);
    const x = ((rotated.width - cropWidth) * (1 + pan.x)) / 2,
      y = ((rotated.height - cropHeight) * (1 + pan.y)) / 2;
    context.fillStyle = "#111113";
    context.fillRect(0, 0, width, height);
    context.drawImage(rotated, x, y, cropWidth, cropHeight, 0, 0, width, height);
  }, [image, zoom, pan, width, height, rotation, stretch]);
  return (
    <div className="grid gap-3 rounded-lg border p-4">
      <p className="text-sm font-medium">{variant === "banner" ? "Recortar fundo" : "Recortar foto"}</p>
      <canvas
        ref={canvas}
        width={width}
        height={height}
        aria-label="Prévia do recorte"
        className={`mx-auto w-full touch-none bg-muted ${variant === "banner" ? "aspect-[3/1] rounded-lg" : "aspect-square max-w-56"}`}
        style={{ borderRadius: variant === "banner" ? undefined : avatarRadius(shape) }}
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
      <Button type="button" variant="outline" disabled={!image} onClick={() => setRotation(value => (value + 90) % 360)}><RotateCw />Girar 90°</Button>
      {!stretch && <><label className="grid gap-1 text-xs">
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
      </>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar recorte
        </Button>
        <Button
          type="button"
          disabled={!image || !!error}
          onClick={() => {
            if (canvas.current) {
              for (const quality of [0.86, 0.7, 0.55, 0.4]) {
                const result = canvas.current.toDataURL("image/jpeg", quality);
                if (result.length < 131000) {onSave(result);return;}
              }
              setError("A imagem ficou muito grande. Escolha uma imagem mais simples.");
            }
          }}
        >
          Usar recorte
        </Button>
      </div>
    </div>
  );
}
