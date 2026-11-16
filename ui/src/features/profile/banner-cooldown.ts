export function bannerCooldown(availableAt: string | null | undefined, now = Date.now()) {
  const deadline = Date.parse(availableAt || "");
  return Number.isFinite(deadline) ? Math.max(0, Math.ceil((deadline - now) / 1000)) : 0;
}
export function formatBannerCooldown(seconds: number) {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 3600)}h ${String(Math.floor(value % 3600 / 60)).padStart(2, "0")}min ${String(value % 60).padStart(2, "0")}s`;
}
