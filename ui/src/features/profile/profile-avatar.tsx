import { UserRound } from "lucide-react";
import type { Profile } from "@/services/profile-service";
export function avatarRadius(shape: Profile["avatarShape"]) {
  return shape === "circle" ? "50%" : shape === "rounded" ? "20%" : "0";
}
export function ProfileAvatar({
  profile,
  className = "size-8",
}: {
  profile: Profile;
  className?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden border border-border bg-muted ${className}`}
      style={{ borderRadius: avatarRadius(profile.avatarShape) }}
    >
      {profile.avatar ? (
        <img src={profile.avatar} alt="" className="size-full object-cover" />
      ) : (
        <UserRound className="size-4 text-muted-foreground" />
      )}
    </span>
  );
}
