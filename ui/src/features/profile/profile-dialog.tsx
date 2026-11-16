import { useState } from "react";
import { ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PasswordDialog } from "@/components/admin/password-dialog";
import {
  profileService,
  finishPasswordChange,
  type Profile,
} from "@/services/profile-service";
import { updateProfile } from "@/stores/profile-store";
import { ProfileCard, type ProfileField } from "./profile-card";
import { ProfileFieldEditor } from "./profile-field-editor";
const titles = {
  identity: "Editar nome",
  bio: "Editar descrição",
  photo: "Editar foto",
};
export default function ProfileDialog({
  username,
  role,
  profile,
  onClose,
  editable = true,
}: {
  username: string;
  role: string;
  profile: Profile;
  onClose: () => void;
  editable?: boolean;
}) {
  const [editing, setEditing] = useState<ProfileField | null>(null),
    [password, setPassword] = useState(false),
    [saving, setSaving] = useState(false);
  return (
    <>
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open && !saving) onClose();
        }}
      >
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 pr-6">
              {editing && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Voltar ao perfil"
                  disabled={saving}
                  onClick={() => setEditing(null)}
                >
                  <ArrowLeft className="size-4" />
                </Button>
              )}
              <DialogTitle>
                {editing ? titles[editing] : editable ? "Meu perfil" : "Perfil"}
              </DialogTitle>
            </div>
            <DialogDescription className="sr-only">
              {editing
                ? "Edite o campo selecionado do perfil."
                : `Perfil de ${profile.displayName}, ${role}.`}
            </DialogDescription>
          </DialogHeader>
          {editing && editable ? (
            <ProfileFieldEditor
              key={editing}
              field={editing}
              profile={profile}
              onCancel={() => setEditing(null)}
              onSave={async (patch) => {
                setSaving(true);
                try {
                  const result = await profileService.save(patch);
                  updateProfile(username, result);
                  setEditing(null);
                } finally {
                  setSaving(false);
                }
              }}
            />
          ) : (
            <>
              <ProfileCard
                username={username}
                role={role}
                profile={profile}
                onEdit={editable ? setEditing : undefined}
              />
              {editable && (
                <section
                  className="border-t border-border pt-4"
                  aria-label="Segurança da conta"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setPassword(true)}
                    className="w-full justify-start"
                  >
                    <KeyRound className="size-4" />
                    Alterar senha
                  </Button>
                </section>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      {password && editable && (
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
