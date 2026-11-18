import {
  Download,
  FileText,
  Flame,
  Gamepad2,
  Play,
  Radio,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type GameCardData = {
  id: string;
  unavailableReason?: string;
  actionDisabled?: boolean;
  actionLabel?: string;
  installed?: boolean;
  downloading?: boolean;
  name: string;
  description: string;
  category: string;
  type: string;
  platforms: string[];
  cover: string;
  sizeLabel: string;
  attribution: string;
  mobileWarning: boolean;
  trending: boolean;
  relayUrl?: string;
  relaySupport?: string;
  hasCredits: boolean;
  onAction: () => void;
  onRemove: () => void;
  onRelay: () => void;
  onCredits: () => void;
};

export function GameCard({ game }: { game: GameCardData }) {
  const typeLabel =
    game.type === "flash"
      ? "Flash · Ruffle"
      : game.type === "external-download"
        ? "HTML offline"
        : game.type === "remote"
          ? "Multiplayer"
          : "HTML5";
  return (
    <Card className="h-full overflow-hidden rounded-lg border-border bg-card p-0 shadow-none transition-colors hover:border-zinc-600">
      <img
        className="aspect-[16/10] w-full bg-muted object-cover"
        src={game.cover}
        alt={`Capa de ${game.name}`}
        loading="lazy"
      />
      <CardContent className="grid gap-3 p-3.5 sm:p-4">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="gap-1">
            <Gamepad2 className="size-3" />
            {typeLabel}
          </Badge>
          {game.platforms.map((platform) => (
            <Badge variant="outline" key={platform}>
              {platform}
            </Badge>
          ))}
          {game.mobileWarning && (
            <Badge variant="outline">Melhor com teclado</Badge>
          )}
          {game.trending && (
            <Badge variant="outline" className="gap-1">
              <Flame className="size-3" />
              Em alta
            </Badge>
          )}
        </div>
        <div className="flex min-w-0 items-start gap-2">
          <h2 className="min-w-0 flex-1 text-base font-semibold leading-5 tracking-tight">
            {game.name}
          </h2>
          <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
            {game.sizeLabel}
          </Badge>
        </div>
        <p className="min-h-10 text-xs leading-relaxed text-muted-foreground">
          {game.description}
        </p>
        {game.unavailableReason && (
          <p className="text-xs text-muted-foreground">
            {game.unavailableReason}
          </p>
        )}
        <p className="min-h-4 text-[10px] leading-relaxed text-muted-foreground">
          {game.attribution}
        </p>
        <div
          className="game-stats flex min-h-4 flex-wrap gap-3 text-[10px] text-muted-foreground"
          aria-label="Estatísticas do jogo"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            className="action min-w-0 flex-1"
            type="button"
            disabled={game.actionDisabled ?? true}
            onClick={game.onAction}
          >
            {game.type === "external-download" ? (
              <Download />
            ) : game.type === "remote" ? (
              <Radio />
            ) : (
              <Play />
            )}
            <span data-action-label>{game.actionLabel || "Verificando…"}</span>
          </Button>
          {game.relayUrl && (
            <Button
              className="credits"
              variant="outline"
              type="button"
              title={game.relaySupport || "Relay multiplayer"}
              onClick={game.onRelay}
            >
              Copiar relay
            </Button>
          )}
          {game.hasCredits && (
            <Button
              className="credits"
              variant="outline"
              type="button"
              onClick={game.onCredits}
            >
              <FileText />
              Créditos
            </Button>
          )}
          <Button
            className="remove"
            variant="destructive"
            size="icon"
            type="button"
            title="Apagar jogo do cache"
            aria-label={`Apagar ${game.name} do cache`}
            hidden={!game.installed}
            onClick={game.onRemove}
          >
            <Trash2 />
          </Button>
        </div>
        <div
          className="progress h-1.5 overflow-hidden rounded-full bg-muted"
          hidden={!game.downloading}
        >
          <span className="block h-full w-0 rounded-full bg-primary transition-[width] duration-100" />
        </div>
      </CardContent>
    </Card>
  );
}
