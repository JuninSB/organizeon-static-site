import { useEffect, useState, type ReactNode } from "react";
import { MotionRoot, MotionPane } from "@/core/motion";
import { ArrowLeft, X } from "lucide-react";
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
import type { Profile } from "@/services/profile-service";
import { GrantGoldBadge } from "./grant-gold-badge";
import { updateProfile, saveOptimisticProfile } from "@/stores/profile-store";
import { ProfileCard, type ProfileField } from "./profile-card";
import { ProfileFieldEditor } from "./profile-field-editor";
const titles = {
  identity: "Editar nome",
  bio: "Editar descrição",
  photo: "Editar foto",
  appearance: "Editar aparência",
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
      <DrawerContent
        className="oo-profile-drawer oo-profile-expanded"
        contentClassName="px-0"
      >
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
  canGrantBadge = false,
}: {
  username: string;
  role: string;
  profile: Profile;
  onClose: () => void;
  editable?: boolean;
  canGrantBadge?: boolean;
}) {
  const [grantedProfile, setGrantedProfile] = useState<Profile | null>(null);
  const shownProfile = grantedProfile || profile;
  useEffect(() => setGrantedProfile(null), [profile]);
  const compact = useCompactProfile();
  const [open, setOpen] = useState(true),
    [editing, setEditing] = useState<ProfileField | null>(null);
  const title = editing ? titles[editing] : editable ? "Meu perfil" : "Perfil";
  return (
    <MotionRoot>
      <ProfileSurface
        compact={compact}
        open={open}
        title={title}
        description={`Perfil de ${profile.displayName}, ${role}.`}
        onOpenChange={setOpen}
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
                onClick={() => setEditing(null)}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}
            {!compact && (
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              className="size-10 rounded-full"
              aria-label="Fechar perfil"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
            )}
          </div>

          <MotionPane
            key={editing || "profile"}
            className={editing ? "px-5 pb-5 pt-14" : undefined}
          >
            <div data-base-ui-swipe-ignore={editing ? "" : undefined}>
              {editing && editable ? (
                <>
                  <h2 className="mb-4 text-lg font-semibold">
                    {titles[editing]}
                  </h2>
                  <ProfileFieldEditor
                    key={editing}
                    field={editing}
                    profile={shownProfile}
                    onRerolled={(next) => updateProfile(username,next)}
                    onCancel={() => setEditing(null)}
                    onSave={async (patch) => {
                      setEditing(null);
                      try {
                        await saveOptimisticProfile(username, patch);
                      } catch {
                        /* Shared feedback owns the rollback notice. */
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <ProfileCard
                    username={username}
                    role={role}
                    profile={shownProfile}
                    frameless
                    onEdit={editable ? setEditing : undefined}
                  />
                </>
              )}
            </div>
          </MotionPane>
        </div>
        {canGrantBadge && !shownProfile.goldBadge && <div className="px-5 pb-5"><GrantGoldBadge username={username} onGranted={(next) => {setGrantedProfile(next);if(editable)updateProfile(username,next);}} /></div>}
      </ProfileSurface>
    </MotionRoot>
  );
}
