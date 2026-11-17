import { useRef, useState } from "react";
import { Crop, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Profile } from "@/services/profile-service";
import type { ProfileField } from "./profile-card";
import { ProfileAvatar } from "./profile-avatar";
import { LavaBanner } from "./lava-banner";
import { BannerSeedControl } from "./banner-seed-control";
import { AvatarEditor } from "./avatar-editor";
const shapes = {
  circle: "Círculo",
  square: "Quadrado",
  rounded: "Cantos arredondados",
};
export function ProfileFieldEditor({
  field,
  profile,
  onSave,
  onCancel,
  onRerolled,
}: {
  field: ProfileField;
  profile: Profile;
  onSave: (patch: Partial<Profile>) => Promise<void>;
  onCancel: () => void;
  onRerolled?: (profile: Profile) => void;
}) {
  const [draft, setDraft] = useState<Profile>({...profile, bannerStyle: profile.bannerStyle === "slime" || profile.bannerStyle === "magma" ? "solid" as const : profile.bannerStyle}),
    [photo, setPhoto] = useState<File | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const isBanner = field === "appearance" && draft.bannerStyle === "image";
  return (
    <form
      className="grid gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        if (busy || photo) return;
        if (isBanner && !draft.bannerImage) {setError("Escolha uma imagem para o fundo.");return;}
        setBusy(true);
        setError("");
        try {
          await onSave(
            field === "identity"
              ? { displayName: draft.displayName, nameColor: draft.nameColor }
              : field === "bio"
                ? { bio: draft.bio }
                : field === "appearance"
                  ? { showGoldBadge: !!draft.goldBadge && draft.showGoldBadge !== false, bannerStyle: draft.bannerStyle || "solid", bannerColor: draft.bannerColor || null, bannerImage: isBanner ? draft.bannerImage || null : null, bannerFit: draft.bannerFit || "cover" }
                  : { avatar: draft.avatar, avatarShape: draft.avatarShape },
          );
        } catch (e) {
          setError(e instanceof Error ? e.message : "Não foi possível salvar.");
        } finally {
          setBusy(false);
        }
      }}
    >
      {field === "appearance" && <>
        <div className="oo-profile-banner h-28 rounded-lg border border-border bg-card" role="img" aria-label="Prévia do fundo" style={{background:`color-mix(in srgb, ${draft.bannerColor || draft.nameColor} 18%, rgb(var(--card)))`}}>
          {isBanner ? draft.bannerImage && <img src={draft.bannerImage} alt="Prévia do fundo" className="size-full" style={{objectFit:draft.bannerFit || "cover"}} /> : draft.goldBadge && draft.bannerStyle !== "solid" && !!draft.bannerStyle && <LavaBanner seed={draft.bannerSeed || "preview"} color={draft.bannerColor || draft.nameColor} material={draft.bannerStyle === "lava" ? undefined : draft.bannerStyle === "magma" ? "lava" : draft.bannerStyle} />}
        </div>
        {profile.goldBadge && !isBanner && <>
        <label className="flex items-center gap-3 text-sm"><Checkbox checked={!draft.bannerColor} disabled={busy} onCheckedChange={(follow) => setDraft({...draft,bannerColor:follow ? null : draft.nameColor})}/>Usar a cor do nick no fundo</label>
        {draft.bannerColor && <label className="flex items-center justify-between gap-3 text-sm">Cor do fundo<Input aria-label="Cor do fundo" type="color" className="h-10 w-16 p-1" value={draft.bannerColor} disabled={busy} onChange={event => setDraft({...draft,bannerColor:event.target.value})}/></label>}
        <BannerSeedControl profile={draft} disabled={busy} onUpdated={(next) => {setDraft(current => ({...current,bannerSeed:next.bannerSeed,bannerRerollAvailableAt:next.bannerRerollAvailableAt,bannerRerollUnlimited:next.bannerRerollUnlimited}));onRerolled?.(next);}} />
        </>}
        {profile.goldBadge && <label className="flex items-center gap-3 text-sm"><Checkbox checked={draft.showGoldBadge !== false} disabled={busy} onCheckedChange={(value) => setDraft({ ...draft, showGoldBadge: !!value })} />Exibir emblema dourado no perfil</label>}
        <label className="grid gap-2 text-sm">Fundo do perfil
          <Select value={draft.bannerStyle || "solid"} disabled={busy || !!photo} onValueChange={(value) => {if(value && ["solid","image","lava","bubbles","gradient","stars","rainbow"].includes(value))setDraft({ ...draft, bannerStyle: value as Profile["bannerStyle"] });}}>
            <SelectTrigger aria-label="Estilo do fundo"><SelectValue>{({solid:"Cor sólida",image:"Imagem",lava:"Fluidos — 12 composições",bubbles:"Bolhas",gradient:"Gradiente",stars:"Estrelas",rainbow:"Arcos de cor"}[(draft.bannerStyle === "slime" || draft.bannerStyle === "magma" ? "solid" : draft.bannerStyle) || "solid"])}</SelectValue></SelectTrigger>
            <SelectContent><SelectItem value="solid">Cor sólida</SelectItem><SelectItem value="image">Imagem</SelectItem>{profile.goldBadge && <><SelectItem value="lava">Fluidos — 12 composições</SelectItem><SelectItem value="bubbles">Bolhas</SelectItem><SelectItem value="gradient">Gradiente</SelectItem><SelectItem value="stars">Estrelas</SelectItem><SelectItem value="rainbow">Arcos de cor</SelectItem></>}</SelectContent>
          </Select>
        </label>
      </>}
      {field === "identity" && (
        <>
          <label className="grid gap-1.5 text-sm">
            Nome de exibição
            <Input
              autoFocus
              required
              maxLength={40}
              value={draft.displayName}
              disabled={busy}
              onChange={(event) =>
                setDraft({ ...draft, displayName: event.target.value })
              }
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            Cor do nome
            <span className="flex items-center gap-3 rounded-md border border-input p-2">
              <input
                type="color"
                aria-label="Cor do nome"
                value={draft.nameColor}
                disabled={busy}
                onChange={(event) =>
                  setDraft({ ...draft, nameColor: event.target.value })
                }
                className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span className="font-mono text-xs text-muted-foreground">
                {draft.nameColor.toUpperCase()}
              </span>
            </span>
          </label>
        </>
      )}
      {field === "bio" && (
        <label className="grid gap-1.5 text-sm">
          Descrição
          <textarea
            autoFocus
            aria-label="Descrição"
            rows={5}
            maxLength={280}
            value={draft.bio}
            disabled={busy}
            onChange={(event) =>
              setDraft({ ...draft, bio: event.target.value })
            }
            className="min-h-28 resize-y rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <span className="text-right text-xs text-muted-foreground">
            {draft.bio.length}/280
          </span>
        </label>
      )}
      {(field === "photo" || isBanner) && (
        <>
          <div className="flex items-center gap-4">
            {!isBanner && <ProfileAvatar profile={draft} className="size-16" />}
            <div className="flex flex-wrap gap-2">
              <input
                ref={input}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                aria-label={isBanner ? "Selecionar imagem de fundo" : "Selecionar foto de perfil"}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  if (
                    file.size > 5 * 1024 * 1024 ||
                    !["image/png", "image/jpeg", "image/webp"].includes(
                      file.type,
                    )
                  ) {
                    setError(
                      "Escolha uma imagem PNG, JPEG ou WebP de até 5 MB.",
                    );
                    return;
                  }
                  setError("");
                  setPhoto(file);
                }}
              />
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => input.current?.click()}
              >
                <ImagePlus className="size-4" />
                {isBanner ? "Escolher imagem" : "Escolher foto"}
              </Button>
              {(isBanner ? draft.bannerImage : draft.avatar) && (
                <Button
                  type="button"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => setDraft(isBanner ? { ...draft, bannerImage: null, bannerStyle: "solid" } : { ...draft, avatar: null })}
                >
                  {isBanner ? "Remover fundo" : "Remover foto"}
                </Button>
              )}
              {isBanner && draft.bannerImage && !photo && <Button type="button" variant="outline" disabled={busy} onClick={() => {
                try {
                  const bytes=Uint8Array.from(atob(draft.bannerImage!.split(",")[1]),char=>char.charCodeAt(0));
                  setPhoto(new File([bytes],"fundo.jpg",{type:"image/jpeg"}));
                  setError("");
                } catch {setError("Não foi possível abrir a imagem. Escolha o arquivo novamente.");}
              }}><Crop />Ajustar imagem</Button>}
            </div>
          </div>
          {isBanner && <label className="flex items-center gap-3 text-sm"><Checkbox checked={draft.bannerFit === "fill"} disabled={busy} onCheckedChange={value => setDraft({...draft,bannerFit:value ? "fill" : "cover"})} />Esticar para preencher</label>}
          {photo && (
            <AvatarEditor
              key={photo.name + photo.lastModified}
              file={photo}
              shape={draft.avatarShape}
              variant={isBanner ? "banner" : "avatar"}
              stretch={isBanner && draft.bannerFit === "fill"}
              onCancel={() => setPhoto(null)}
              onSave={(avatar) => {
                setDraft(isBanner ? { ...draft, bannerImage: avatar } : { ...draft, avatar });
                setPhoto(null);
              }}
            />
          )}
          {!isBanner && <label className="grid gap-1.5 text-sm">
            Formato da foto
            <Select
              value={draft.avatarShape}
              disabled={busy}
              onValueChange={(value) => {
                if (value)
                  setDraft({
                    ...draft,
                    avatarShape: value as Profile["avatarShape"],
                  });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{shapes[draft.avatarShape]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(shapes).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>}
        </>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={busy || !!photo}>
          {busy ? "Salvando…" : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
