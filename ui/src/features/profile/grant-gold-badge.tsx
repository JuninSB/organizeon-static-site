import { useState } from "react";
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileService, type Profile } from "@/services/profile-service";
/** Caller omits this control for non-owners. The backend independently enforces ownership. */
export function GrantGoldBadge({ username, onGranted }: { username: string; onGranted?: (profile: Profile) => void }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [granted, setGranted] = useState(false);
  return <div className="space-y-2">
    {!granted && <Button type="button" variant="ghost" disabled={busy} className="text-amber-600 dark:text-amber-400" onClick={async () => {
      setBusy(true);setError("");
      try { const profile = await profileService.grantGoldBadge(username);setGranted(true);onGranted?.(profile); }
      catch (error) { setError(error instanceof Error ? error.message : "Não foi possível conceder o emblema."); }
      finally { setBusy(false); }
    }}><Award className="size-4" />{busy ? "Concedendo emblema…" : "Dar emblema dourado"}</Button>}
    {granted && <p role="status" className="text-xs text-muted-foreground">Emblema concedido.</p>}
    {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
  </div>;
}
