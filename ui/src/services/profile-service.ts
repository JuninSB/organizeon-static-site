import { accountRequest } from "./account-api";
export type Profile = {
  displayName: string;
  nameColor: string;
  bannerColor?: string | null;
  bannerImage?: string | null;
  bannerFit?: "cover" | "fill";
  bio: string;
  avatarShape: "circle" | "square" | "rounded";
  avatar: string | null;
  goldBadge?: boolean;
  bannerSeed?: string;
  bannerRerollAvailableAt?: string | null;
  bannerRerollUnlimited?: boolean;
  showGoldBadge?: boolean;
  bannerStyle?: "solid" | "lava" | "slime" | "bubbles" | "gradient" | "magma" | "stars" | "rainbow";
};
export const defaultProfile = (username: string): Profile => ({
  displayName: username,
  nameColor: "#FAFAFA",
  bio: "",
  avatarShape: "circle",
  avatar: null,
});
export const profileService = {
  rerollBanner: async (): Promise<Profile> => (await accountRequest("/dm/awards/gold-badge/reroll", {method:"POST"})).profile,
  grantGoldBadge: async (username: string): Promise<Profile> =>
    (await accountRequest("/dm/people/" + encodeURIComponent(username) + "/gold-badge", { method: "POST" })).profile,
  get: async (): Promise<Profile> =>
    (await accountRequest("/account/profile")).profile,
  save: async (profile: Partial<Profile>): Promise<Profile> =>
    (
      await accountRequest("/account/profile", {
        method: "PATCH",
        body: JSON.stringify(profile),
      })
    ).profile,
  password: async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    await accountRequest("/account/password", {
      method: "POST",
      body: JSON.stringify(values),
    });
  },
};

export function finishPasswordChange() {
  if (/^\/d[234](\/|$)/.test(location.pathname)) {
    location.replace(location.pathname.slice(0, 3) + "/login");
    return;
  }
  if (window.parent !== window) {
    window.parent.postMessage(
      { type: "organizeon:open-main", loggedOut: true },
      "*",
    );
    return;
  }
  const auth = (
    window as Window & { organizeonAuth?: { logout: () => Promise<void> } }
  ).organizeonAuth;
  if (auth) {
    void auth.logout();
    return;
  }
  location.replace(new URL("./", document.baseURI).href);
}
