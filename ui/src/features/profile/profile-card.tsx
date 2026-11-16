import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/services/profile-service";
import { ProfileAvatar } from "./profile-avatar";
export type ProfileField = "identity" | "bio" | "photo";
/** Presentation is shared by own/public profiles; editing is an explicit capability. */
export function ProfileCard({
  username,
  role,
  profile,
  onEdit,
}: {
  username: string;
  role: string;
  profile: Profile;
  onEdit?: (field: ProfileField) => void;
}) {
  const pencil = (field: ProfileField, label: string) =>
    onEdit && (
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label={label}
        onClick={() => onEdit(field)}
      >
        <Pencil className="size-3.5" />
      </Button>
    );
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div
        className="h-20 border-b border-border bg-muted"
        aria-hidden="true"
      />
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-10 mb-4 flex items-end justify-between gap-3">
          <div className="rounded-2xl bg-card p-1">
            <ProfileAvatar profile={profile} className="size-20" />
          </div>
          {pencil("photo", "Editar foto de perfil")}
        </div>
        <div className="flex min-w-0 items-start gap-2">
          <div className="min-w-0 flex-1">
            <h2
              className="break-words text-xl font-semibold leading-tight tracking-tight"
              style={{
                color:
                  profile.nameColor.toUpperCase() === "#FAFAFA"
                    ? undefined
                    : profile.nameColor,
              }}
            >
              {profile.displayName}
            </h2>
            <p className="mt-1 break-all text-sm text-muted-foreground">
              @{username}
            </p>
          </div>
          {pencil("identity", "Editar nome e cor")}
        </div>
        <Badge variant="secondary" className="mt-3">
          {role}
        </Badge>
        <section
          className="mt-5 border-t border-border pt-4"
          aria-label="Descrição do perfil"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Sobre
            </h3>
            {pencil("bio", "Editar descrição")}
          </div>
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {profile.bio || (
              <span className="text-muted-foreground">
                Nenhuma descrição adicionada.
              </span>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
