import { useState, type FormEvent } from "react";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function D2Login({ onSubmit }: { onSubmit: (username: string, password: string) => Promise<void> }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setPending(true);
    try { await onSubmit(username, password); setPassword(""); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível entrar."); }
    finally { setPending(false); }
  }
  return <main className="grid min-h-svh place-items-center px-4 py-10">
    <Card className="w-full max-w-[380px] border-border bg-card shadow-none animate-ui-enter">
      <CardHeader className="space-y-5">
        <div className="flex items-center gap-3"><img className="size-10 object-contain" src="https://organizeon.com.br/d3/assets/organizeon-icon.png" alt="" /><div><p className="text-sm font-semibold">OrganizeOn <span className="font-normal text-muted-foreground">D2</span></p><p className="text-xs text-muted-foreground">Painel de arquivos</p></div></div>
        <div className="space-y-1.5"><CardTitle className="text-xl">Entrar no painel</CardTitle><CardDescription>Autentique-se para acessar o conteúdo do Endpoint 2.</CardDescription></div>
      </CardHeader>
      <CardContent><form className="grid gap-4" onSubmit={(event) => void submit(event)}>
        <label className="grid gap-1.5 text-sm font-medium">Usuário<Input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required disabled={pending} /></label>
        <label className="grid gap-1.5 text-sm font-medium">Senha<Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required disabled={pending} /></label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="h-10 w-full" disabled={pending || !username || !password}>{pending && <LoaderCircle className="animate-spin" />}{pending ? "Entrando…" : "Entrar"}</Button>
      </form></CardContent>
      <CardFooter className="gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><ShieldCheck className="size-4" />Acesse com sua conta OrganizeOn.</CardFooter>
    </Card>
  </main>;
}
