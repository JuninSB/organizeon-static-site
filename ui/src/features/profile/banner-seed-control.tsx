import { useEffect, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotatingIcon } from "@/components/layout/rotating-icon";
import { profileService, type Profile } from "@/services/profile-service";
import { bannerCooldown, formatBannerCooldown } from "./banner-cooldown";
export function BannerSeedControl({ profile, disabled, onUpdated }: { profile: Profile; disabled?: boolean; onUpdated: (profile: Profile) => void }) {
  const [now, setNow] = useState(Date.now), [busy, setBusy] = useState(false);
  const [error, setError] = useState(""), [copied, setCopied] = useState(false);
  const remaining = bannerCooldown(profile.bannerRerollAvailableAt, now);
  useEffect(() => {
    setNow(Date.now());
    if (!bannerCooldown(profile.bannerRerollAvailableAt)) return;
    const timer = setInterval(() => {
      setNow(Date.now());
      if (!bannerCooldown(profile.bannerRerollAvailableAt)) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [profile.bannerRerollAvailableAt]);
  useEffect(() => setCopied(false), [profile.bannerSeed]);
  return <section className="space-y-3 rounded-lg border border-border p-3" aria-label="Seed e reroll do fundo">
    <label className="grid gap-2 text-sm">Seed do fundo
      <span className="flex min-w-0 items-center gap-2">
        <Input readOnly value={profile.bannerSeed || ""} className="min-w-0 font-mono text-xs" aria-label="Seed do fundo" />
        <Button type="button" variant="outline" size="icon" aria-label="Copiar seed" disabled={!profile.bannerSeed} onClick={async () => { try {await navigator.clipboard.writeText(profile.bannerSeed!);setCopied(true);setError("");} catch {setError("Não foi possível copiar a seed.");} }}><Copy className="size-4" /></Button>
      </span>
    </label>
    {copied && <p role="status" className="text-xs text-muted-foreground">Seed copiada.</p>}
    <Button type="button" variant="outline" disabled={disabled || busy || remaining > 0} onClick={async () => {
      if (busy || remaining > 0) return;
      setBusy(true);setError("");
      try { onUpdated(await profileService.rerollBanner());setNow(Date.now()); }
      catch (error) {
        let confirmed = false;
        try {
          const current = await profileService.get();
          onUpdated(current);setNow(Date.now());
          confirmed = current.bannerSeed !== profile.bannerSeed && bannerCooldown(current.bannerRerollAvailableAt) > 0;
        } catch {}
        if (!confirmed) setError(error instanceof Error ? error.message : "Não foi possível gerar outra seed.");
      } finally {setBusy(false);}
    }}><RotatingIcon icon={RefreshCw} active={busy} />{busy ? "Gerando fundo…" : "Gerar nova seed"}</Button>
    <p className="text-xs text-muted-foreground">{remaining > 0 ? <>Novo reroll em <time dateTime={profile.bannerRerollAvailableAt || undefined}>{formatBannerCooldown(remaining)}</time>.</> : "Alteração imediata. Uma nova seed a cada 24 horas."}</p>
    {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
  </section>;
}
