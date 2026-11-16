import { useRef, useState } from "react";
import { LogOut, KeyRound, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordDialog } from "@/components/admin/password-dialog";
import {
  profileService,
  finishPasswordChange,
  type Profile,
} from "@/services/profile-service";
import { updateProfile } from "@/stores/profile-store";
import { ProfileAvatar } from "./profile-avatar";
import { AvatarEditor } from "./avatar-editor";
export default function ProfileDialog({
  username,
  role,
  profile,
  onClose,
  onLogout,
}: {
  username: string;
  role: string;
  profile: Profile;
  onClose: () => void;
  onLogout?: () => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [password, setPassword] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  return (
    <>
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open && !busy) onClose();
        }}
      >
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Meu perfil</DialogTitle>
            <DialogDescription>
              @{username} · {role}
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4"
            onSubmit={async (event) => {
              event.preventDefault();
              if (busy || photo) return;
              setBusy(true);
              setError("");
              try {
                const saved = await profileService.save(draft);
                updateProfile(username, saved);
                onClose();
              } catch (e) {
                setError(
                  e instanceof Error ? e.message : "Não foi possível salvar.",
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            <div className="flex items-center gap-4">
              <ProfileAvatar profile={draft} className="size-16" />
              <div className="flex flex-wrap gap-2">
                <input
                  ref={input}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  aria-label="Selecionar foto de perfil"
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
                  Alterar foto
                </Button>
                {draft.avatar && (
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={busy}
                    onClick={() => setDraft({ ...draft, avatar: null })}
                  >
                    Remover
                  </Button>
                )}
              </div>
            </div>
            {photo && (
              <AvatarEditor
                key={photo.name + photo.lastModified}
                file={photo}
                shape={draft.avatarShape}
                onCancel={() => setPhoto(null)}
                onSave={(avatar) => {
                  setDraft({ ...draft, avatar });
                  setPhoto(null);
                }}
              />
            )}
            <label className="grid gap-1.5 text-sm">
              Nome de exibição
              <Input
                required
                maxLength={40}
                value={draft.displayName}
                disabled={busy}
                onChange={(event) =>
                  setDraft({ ...draft, displayName: event.target.value })
                }
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-1.5 text-sm">
                Cor do nome
                <input
                  type="color"
                  aria-label="Cor do nome"
                  value={draft.nameColor}
                  disabled={busy}
                  onChange={(event) =>
                    setDraft({ ...draft, nameColor: event.target.value })
                  }
                  className="h-9 w-full rounded-md border border-input bg-background p-1"
                />
              </label>
              <label className="grid gap-1.5 text-sm">
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
                    <SelectValue>{{circle:"Círculo",square:"Quadrado",rounded:"Cantos arredondados"}[draft.avatarShape]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="circle">Círculo</SelectItem>
                    <SelectItem value="square">Quadrado</SelectItem>
                    <SelectItem value="rounded">Cantos arredondados</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>
            <label className="grid gap-1.5 text-sm">
              Descrição
              <textarea
                aria-label="Descrição"
                maxLength={280}
                rows={3}
                value={draft.bio}
                disabled={busy}
                onChange={(event) =>
                  setDraft({ ...draft, bio: event.target.value })
                }
                className="min-h-20 resize-y rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span className="text-right text-xs text-muted-foreground">
                {draft.bio.length}/280
              </span>
            </label>
            <div className="rounded-md border p-3">
              <p
                className="text-sm font-medium"
                style={{ color: draft.nameColor }}
              >
                {draft.displayName || username}
              </p>
              <p className="mt-1 whitespace-pre-wrap break-words text-xs text-muted-foreground">
                {draft.bio || "Seu perfil OrganizeOn"}
              </p>
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={busy || !!photo}>
                {busy ? "Salvando…" : "Salvar perfil"}
              </Button>
            </DialogFooter>
            <div className="flex flex-wrap gap-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => setPassword(true)}
              >
                <KeyRound className="size-4" />
                Alterar senha
              </Button>
              {onLogout && (
                <Button
                  type="button"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                >
                  <LogOut className="size-4" />
                  Sair da conta
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {password && (
        <PasswordDialog
          request={{ username, self: true, submit: profileService.password }}
          onClose={(saved) => {
            setPassword(false);
            if (saved) {
              onClose();
              finishPasswordChange();
            }
          }}
        />
      )}
    </>
  );
}
