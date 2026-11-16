import { ProfileBoundary } from "@/features/profile/profile-boundary";
import { lazy, Suspense, useState } from "react";
import { ChevronUp, UserRound, LogOut } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile, refreshProfile } from "@/stores/profile-store";
import { ProfileAvatar } from "@/features/profile/profile-avatar";
const ProfileDialog = lazy(() => import("@/features/profile/profile-dialog"));
export const roleNames: Record<string, string> = {
  owner: "Owner",
  ultra_admin: "Ultra admin",
  super_admin: "Super admin",
  admin: "Admin",
  user: "Usuário",
  guest: "Convidado",
};
/** Shared account identity; editing is authenticated by the service, never by role labels. */
export function AccountMenu({
  username,
  role,
  onLogout,
}: {
  username: string;
  role: string;
  onLogout?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const profile = useProfile(username, role !== "guest");
  const label = roleNames[role] || role;
  const identity = (
    <>
      <ProfileAvatar profile={profile} />
      <span className="grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
        <span
          className="truncate font-medium"
          style={{
            color:
              profile.nameColor.toUpperCase() === "#FAFAFA"
                ? undefined
                : profile.nameColor,
          }}
        >
          {profile.displayName}
        </span>
        <span className="truncate text-muted-foreground">{label}</span>
      </span>
    </>
  );
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuButton
              size="lg"
              className="h-12 justify-start"
              aria-label={`Perfil de ${username}`}
            />
          }
        >
          {identity}
          <ChevronUp className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-64">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-2 py-2">
              <span className="flex items-center gap-2.5">
                <ProfileAvatar profile={profile} />
                <span className="grid min-w-0">
                  <span
                    className="truncate text-sm font-medium"
                    style={{
                      color:
                        profile.nameColor.toUpperCase() === "#FAFAFA"
                          ? undefined
                          : profile.nameColor,
                    }}
                  >
                    {profile.displayName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    @{username} · {label}
                  </span>
                </span>
              </span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={role === "guest"}
            onClick={() => {
              void refreshProfile(username).then(() => setOpen(true));
            }}
          >
            <UserRound />
            Perfil
          </DropdownMenuItem>
          {onLogout && (
            <DropdownMenuItem onClick={onLogout} className="text-destructive">
              <LogOut />
              {role === "guest" ? "Sair do modo convidado" : "Sair da sessão"}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {open && (
        <ProfileBoundary onClose={() => setOpen(false)}>
          <Suspense
            fallback={
              <p
                role="status"
                className="fixed bottom-4 right-4 rounded-md border bg-popover p-3 text-sm"
              >
                Carregando perfil…
              </p>
            }
          >
            <ProfileDialog
              username={username}
              role={label}
              profile={profile}
              onClose={() => setOpen(false)}
            />
          </Suspense>
        </ProfileBoundary>
      )}
    </>
  );
}
