import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { MotionRoot, MotionPane } from "@/core/motion";
import { ArrowLeft, KeyRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
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
function useCompactProfile() {
  const [compact, setCompact] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const change = () => setCompact(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return compact;
}
function ProfileSurface({
  compact,
  open,
  title,
  description,
  children,
  onOpenChange,
  onClosed,
}: {
  compact: boolean;
  open: boolean;
  title: string;
  description: string;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  onClosed: () => void;
}) {
  const complete = (open: boolean) => {
    if (!open) onClosed();
  };
  return compact ? (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={complete}
      swipeDirection="down"
    >
      <DrawerContent className="oo-profile-drawer" contentClassName="px-0">
        <DrawerTitle className="sr-only">{title}</DrawerTitle>
        <DrawerDescription className="sr-only">{description}</DrawerDescription>
        {children}
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={complete}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[90svh] overflow-y-auto p-0 sm:max-w-md"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
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
  const compact = useCompactProfile();
  const [open, setOpen] = useState(true),
    [editing, setEditing] = useState<ProfileField | null>(null),
    [password, setPassword] = useState(false),
    [saving, setSaving] = useState(false);
  const title = editing ? titles[editing] : editable ? "Meu perfil" : "Perfil";
  return (
    <MotionRoot>
      <ProfileSurface
        compact={compact}
        open={open}
        title={title}
        description={`Perfil de ${profile.displayName}, ${role}.`}
        onOpenChange={(next) => {
          if (!saving) setOpen(next);
        }}
        onClosed={onClose}
      >
        <div className="relative">
          <div className="absolute right-3 top-3 z-10 flex gap-1">
            {editing && (
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                aria-label="Voltar ao perfil"
                disabled={saving}
                onClick={() => setEditing(null)}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              className="rounded-full"
              aria-label="Fechar perfil"
              disabled={saving}
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <MotionPane
              key={editing || "profile"}
              className={editing ? "px-5 pb-5 pt-14" : undefined}
            >
              <div data-base-ui-swipe-ignore={editing ? "" : undefined}>{editing && editable ? (
                <>
                  <h2 className="mb-4 text-lg font-semibold">
                    {titles[editing]}
                  </h2>
                  <ProfileFieldEditor
                    key={editing}
                    field={editing}
                    profile={profile}
                    onCancel={() => setEditing(null)}
                    onSave={async (patch) => {
                      setSaving(true);
                      try {
                        updateProfile(
                          username,
                          await profileService.save(patch),
                        );
                        setEditing(null);
                      } finally {
                        setSaving(false);
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <ProfileCard
                    username={username}
                    role={role}
                    profile={profile}
                    frameless
                    onEdit={editable ? setEditing : undefined}
                  />
                  {editable && (
                    <section
                      className="mx-5 mb-5 border-t border-border pt-3"
                      aria-label="Segurança da conta"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setPassword(true)}
                      >
                        <KeyRound className="size-4" />
                        Alterar senha
                      </Button>
                    </section>
                  )}
                </>
              )}</div>
            </MotionPane>
          </AnimatePresence>
        </div>
      </ProfileSurface>
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
    </MotionRoot>
  );
}
