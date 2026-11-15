import { useState } from "react";
import { AlertTriangle, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type GameKeyOption = { label: string; code: string; key?: string };
export type GameCredit = { attribution?: string; copyright?: string; license?: string; source?: string; sourceLabel?: string };

export function ConfirmActionDialog({ title, description, confirmLabel = "Continuar", onCancel, onConfirm }: { title: string; description: string; confirmLabel?: string; onCancel: () => void; onConfirm: () => void }) {
  return <Dialog open onOpenChange={(open) => !open && onCancel()}><DialogContent className="sm:max-w-md"><DialogHeader><div className="grid size-9 place-items-center rounded-md border bg-muted"><AlertTriangle className="size-4 text-muted-foreground" /></div><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={onCancel}>Cancelar</Button><Button onClick={onConfirm}>{confirmLabel}</Button></DialogFooter></DialogContent></Dialog>;
}

export function GameCreditsDialog({ game, onClose }: { game: GameCredit & { name: string }; onClose: () => void }) {
  return <Dialog open onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
      <DialogHeader><DialogTitle>Créditos · {game.name}</DialogTitle><DialogDescription>Créditos e licença deste jogo.</DialogDescription></DialogHeader>
      <div className="grid gap-2 text-sm text-muted-foreground">
        {game.attribution && <p>{game.attribution}</p>}
        {game.copyright && <p>{game.copyright}</p>}
        {game.license && <p>Licença: {game.license}</p>}
        {game.source && <p><a className="text-foreground underline underline-offset-4" href={game.source} target="_blank" rel="noopener noreferrer">{game.sourceLabel || "Abrir código-fonte e licença"}</a></p>}
      </div>
      <DialogFooter><Button onClick={onClose}>Fechar</Button></DialogFooter>
    </DialogContent>
  </Dialog>;
}

export function GameControlSettingsDialog({
  name,
  definitions,
  selectedKeys,
  defaultKeys,
  isTetris,
  initialLeftHanded,
  onClose,
  onSave,
  onFullscreen,
}: {
  name: string;
  definitions: GameKeyOption[];
  selectedKeys: string[];
  defaultKeys: string[];
  isTetris: boolean;
  initialLeftHanded: boolean;
  onClose: () => void;
  onSave: (keys: string[], leftHanded: boolean) => void;
  onFullscreen: () => void;
}) {
  const [keys, setKeys] = useState(() => new Set(selectedKeys));
  const [leftHanded, setLeftHanded] = useState(initialLeftHanded);
  function toggle(code: string, checked: boolean) {
    setKeys((current) => { const next = new Set(current); checked ? next.add(code) : next.delete(code); return next; });
  }
  function reset() {
    setKeys(new Set(defaultKeys));
    setLeftHanded(false);
  }
  return <Dialog open onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-h-[min(85svh,720px)] overflow-y-auto sm:max-w-xl">
      <DialogHeader><DialogTitle>Teclas · {name}</DialogTitle><DialogDescription>Ative as teclas usadas pelo jogo. A seleção fica salva neste aparelho.</DialogDescription></DialogHeader>
      <fieldset><legend className="mb-2 text-sm font-medium">Teclas disponíveis</legend><div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {definitions.map((item) => <label key={item.code} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm transition-colors hover:bg-muted">
          <input type="checkbox" className="size-4 accent-primary" checked={keys.has(item.code) || keys.has(item.label) || Boolean(item.key && keys.has(item.key))} onChange={(event) => toggle(item.code, event.target.checked)} />
          <span>{item.label}</span>
        </label>)}
      </div></fieldset>
      {isTetris && <div className="grid gap-2 border-t pt-3"><p className="text-sm font-medium">Opções do Tetris</p><label className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm"><input type="checkbox" className="size-4 accent-primary" checked={leftHanded} onChange={(event) => setLeftHanded(event.target.checked)} /><span>Sou canhoto (ações à esquerda)</span></label><Button variant="outline" onClick={onFullscreen}><Maximize2 />Tela cheia</Button></div>}
      <DialogFooter className="flex-col-reverse sm:flex-row"><Button type="button" variant="outline" onClick={reset}><RotateCcw />Restaurar padrão</Button><Button type="button" onClick={() => onSave([...keys], leftHanded)}>Salvar</Button></DialogFooter>
    </DialogContent>
  </Dialog>;
}
