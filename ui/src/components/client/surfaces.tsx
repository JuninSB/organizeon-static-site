import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ChevronUp, ArrowLeft, Check, Cloud, Gamepad2, Home, LogOut, Menu, Settings2, Shield, ShieldCheck, Signal,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type SurfaceProps = {
  type: "login" | "data" | "proxy" | "account";
  [key: string]: unknown;
};

type LoginProps = {
  initialMessage?: string;
  onSubmit: (input: { mode: "login" | "register" | "code"; username: string; password: string; loginCode: string }) => Promise<void>;
  onGuest: () => Promise<void>;
};

type GameOption = { id: string; name: string };
type BackupStatus = { enabled: boolean; size: number; limit: number };
type DataProps = {
  username: string;
  getStatus: () => Promise<BackupStatus>;
  getGames: () => Promise<GameOption[]>;
  toggleBackup: (enabled: boolean) => Promise<void>;
  saveBackup: () => Promise<void>;
  restoreBackup: () => Promise<void>;
  clearAllProgress: () => Promise<void>;
  clearGameProgress: (id: string) => Promise<void>;
  clearPreferences: () => void;
  onClose: () => void;
};

type ProxyOption = { id: string; name: string; description: string; beta?: boolean };
type ProxyProps = {
  options: ProxyOption[];
  currentId: string;
  latency: Record<string, { label: string; state: "pending" | "online" | "offline" }>;
  guestMode: boolean;
  onApply: (id: string) => void;
  onClose: () => void;
};

type AccountProps = {
  username: string;
  role: string;
  guest: boolean;
  canOpenDashboard: boolean;
  proxyLabel: string;
  onNavigate: (action: "home" | "games" | "settings" | "data" | "proxy" | "dashboard" | "logout") => void;
};

function LoginSurface({ initialMessage = "", onSubmit, onGuest }: LoginProps) {
  const [mode, setMode] = useState<"login" | "register" | "code">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [pending, setPending] = useState(false);

  useEffect(() => setMessage(initialMessage), [initialMessage]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      await onSubmit({ mode, username, password, loginCode });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível conectar ao servidor.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="fixed inset-0 z-[2147483647] grid min-h-svh place-items-center overflow-y-auto bg-background px-4 py-10">
      <Card className="w-full max-w-[380px] animate-ui-enter border-border bg-card shadow-none">
        <CardHeader className="space-y-5">
          <div className="flex items-center gap-3"><img className="size-10 object-contain" src="https://organizeon.com.br/d3/assets/organizeon-icon.png" alt="" /><div><p className="text-sm font-semibold">OrganizeOn</p><p className="text-xs text-muted-foreground">Cliente</p></div></div>
          <div className="space-y-1.5"><CardTitle className="text-xl">{mode === "register" ? "Criar conta" : mode === "code" ? "Entrar com código" : "Entrar no OrganizeOn"}</CardTitle>
          <CardDescription>Autentique-se para acessar seus jogos e configurações.</CardDescription></div>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(value) => { setMode(value as typeof mode); setMessage(""); }}>
            <TabsList className="grid h-9 w-full grid-cols-3 bg-muted/70">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Criar conta</TabsTrigger>
              <TabsTrigger value="code">Código</TabsTrigger>
            </TabsList>
            <TabsContent value={mode} className="mt-4">
              <form className="grid gap-3" onSubmit={submit} autoComplete="on">
                {mode !== "code" ? <>
                  <label className="grid gap-1.5 text-sm font-medium" htmlFor="organizeon-username">Usuário
                    <Input id="organizeon-username" name="username" autoComplete="username" minLength={3} maxLength={32} required value={username} onChange={(event) => setUsername(event.target.value)} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium" htmlFor="organizeon-password">Senha
                    <Input id="organizeon-password" name="password" type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} minLength={mode === "register" ? 8 : undefined} required value={password} onChange={(event) => setPassword(event.target.value)} />
                  </label>
                </> : <label className="grid gap-1.5 text-sm font-medium" htmlFor="organizeon-code">Código de login
                  <Input id="organizeon-code" className="text-center font-mono tracking-[.3em]" name="loginCode" autoComplete="one-time-code" maxLength={6} pattern="[A-Za-z0-9]{6}" required value={loginCode} onChange={(event) => setLoginCode(event.target.value.toUpperCase())} />
                </label>}
                {mode === "register" && <p className="text-xs leading-relaxed text-muted-foreground">Contas novas começam sem permissões administrativas.</p>}
                {message && <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{message}</p>}
                <Button type="submit" className="mt-1 h-10 w-full" disabled={pending || (mode === "code" ? !loginCode : !username || !password)} aria-busy={pending}>{pending ? "Autenticando…" : mode === "register" ? "Criar conta" : "Entrar"}</Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-4 border-t pt-4">
            <Button variant="outline" className="w-full" onClick={() => void onGuest()} disabled={pending}>Continuar como convidado</Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">Acesso convidado com recursos limitados</p>
          </div>
        </CardContent>
        <CardFooter className="gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><ShieldCheck className="size-4 shrink-0" />Acesse com sua conta OrganizeOn.</CardFooter>
      </Card>
    </main>
  );
}

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / 1024 ** 2).toFixed(1)} MB`;
}

function DataSurface(props: DataProps) {
  const [status, setStatus] = useState<BackupStatus | null>(null);
  const [games, setGames] = useState<GameOption[]>([]);
  const [gameId, setGameId] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [problem, setProblem] = useState("");
  const [confirm, setConfirm] = useState<"clear-all" | "clear-game" | "clear-preferences" | null>(null);
  const [tab, setTab] = useState("backup");

  const refresh = async () => {
    setProblem("");
    try { setStatus(await props.getStatus()); }
    catch (error) { setProblem(error instanceof Error ? error.message : "Falha ao consultar o backup."); }
  };
  useEffect(() => {
    void refresh();
    void props.getGames().then(setGames).catch(() => setProblem("Não foi possível carregar a lista de jogos."));
  }, []);
  const run = async (name: string, action: () => Promise<void>) => {
    setBusy(name); setProblem("");
    try { await action(); await refresh(); toast.success("Ação concluída"); }
    catch (error) { setProblem(error instanceof Error ? error.message : "A ação falhou."); }
    finally { setBusy(null); setConfirm(null); }
  };
  const limit = status?.limit || 256 * 1024 * 1024;

  return (
    <main className="fixed inset-0 z-[2147483646] overflow-y-auto bg-background px-4 pb-8 pt-[max(16px,env(safe-area-inset-top))] text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-5 flex items-center gap-3">
          <Button variant="outline" size="icon" aria-label="Voltar" onClick={props.onClose}><ArrowLeft /></Button>
          <div className="min-w-0"><h1 className="text-xl font-semibold tracking-tight">Dados</h1><p className="truncate text-sm text-muted-foreground">Conta {props.username}</p></div>
        </header>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid h-9 w-full grid-cols-3 sm:w-auto sm:grid-cols-3">
            <TabsTrigger value="backup">Backup</TabsTrigger><TabsTrigger value="progress">Progressos</TabsTrigger><TabsTrigger value="preferences">Preferências</TabsTrigger>
          </TabsList>
          <TabsContent value="backup" className="mt-4">
            <Card>
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div><CardTitle className="flex items-center gap-2 text-base"><Cloud className="size-4 text-muted-foreground" />Backup na nuvem</CardTitle><CardDescription className="mt-1">Sincronize preferências e dados da conta.</CardDescription></div>
                <Badge variant={status?.enabled ? "default" : "secondary"}>{status ? status.enabled ? "Ativo" : "Desativado" : "Consultando"}</Badge>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-baseline justify-between gap-3 border-t pt-4 text-sm"><span className="text-muted-foreground">Armazenamento utilizado</span><strong className="font-mono text-xs sm:text-sm">{status ? formatBytes(status.size || 0) : "—"} / {formatBytes(limit)}</strong></div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Button onClick={() => void run("toggle", () => props.toggleBackup(!status?.enabled))} disabled={busy !== null || !status}>{busy === "toggle" ? "Atualizando…" : status?.enabled ? "Desativar backup" : "Ativar backup"}</Button>
                  <Button variant="outline" onClick={() => void run("save", props.saveBackup)} disabled={busy !== null}>{busy === "save" ? "Salvando…" : "Salvar agora"}</Button>
                  <Button variant="outline" onClick={() => void run("restore", props.restoreBackup)} disabled={busy !== null}>{busy === "restore" ? "Restaurando…" : "Restaurar backup"}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="progress" className="mt-4">
            <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Gamepad2 className="size-4 text-muted-foreground" />Progresso dos jogos</CardTitle><CardDescription>Os arquivos dos jogos continuam no navegador. Estas ações removem apenas os saves.</CardDescription></CardHeader>
              <CardContent className="grid gap-3">
                <Button variant="destructive" className="w-full sm:w-fit" onClick={() => setConfirm("clear-all")}>Apagar todos os progressos</Button>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <Select value={gameId} onValueChange={(value) => setGameId(value ?? "")}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Escolha um jogo" /></SelectTrigger>
                    <SelectContent>{games.map((game) => <SelectItem value={game.id} key={game.id}>{game.name} — {game.id}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button variant="destructive" disabled={!gameId} onClick={() => setConfirm("clear-game")}>Apagar jogo</Button>
                </div>
                <p className="text-xs text-muted-foreground">O identificador exibido depois do nome é o jogo selecionado.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences" className="mt-4">
            <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Settings2 className="size-4 text-muted-foreground" />Preferências locais</CardTitle><CardDescription>Tema, proxy, identidade do navegador e teclas ficam salvos neste dispositivo.</CardDescription></CardHeader><CardContent><Button variant="destructive" onClick={() => setConfirm("clear-preferences")}>Apagar preferências locais</Button></CardContent></Card>
          </TabsContent>
        </Tabs>
        {problem && <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{problem}</p>}
        <Dialog open={confirm !== null} onOpenChange={(open) => !open && setConfirm(null)}>
          <DialogContent><DialogHeader><DialogTitle>Confirmar exclusão</DialogTitle><DialogDescription>{confirm === "clear-all" ? "Apagar todos os saves de jogos deste perfil?" : confirm === "clear-game" ? `Apagar o save de ${gameId}?` : "Apagar as preferências locais deste dispositivo?"}</DialogDescription></DialogHeader>
            <DialogFooter><Button variant="outline" onClick={() => setConfirm(null)}>Cancelar</Button><Button variant="destructive" disabled={busy !== null} onClick={() => confirm === "clear-all" ? void run("clear-all", props.clearAllProgress) : confirm === "clear-game" ? void run("clear-game", () => props.clearGameProgress(gameId)) : void run("clear-preferences", async () => props.clearPreferences())}>Apagar</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

function ProxySurface(props: ProxyProps) {
  const [selected, setSelected] = useState(props.currentId);
  return <Dialog open onOpenChange={(open) => { if (!open) props.onClose(); }}>
    <DialogContent className="max-h-[min(86svh,760px)] overflow-y-auto sm:max-w-xl">
      <DialogHeader><DialogTitle>Servidor proxy</DialogTitle><DialogDescription>{props.guestMode ? "Convidados usam apenas servidores públicos externos." : "Escolha o servidor WISP usado pelo cliente."} A medição representa a abertura do WebSocket neste dispositivo.</DialogDescription></DialogHeader>
      <div className="grid gap-2" role="radiogroup" aria-label="Servidor proxy">
        {props.options.map((option) => {
          const measurement = props.latency[option.id] ?? { label: "Medindo conexão…", state: "pending" as const };
          const active = selected === option.id;
          return <button type="button" role="radio" aria-checked={active} key={option.id} data-proxy-id={option.id} onClick={() => setSelected(option.id)} className={`group flex min-h-16 w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "border-foreground bg-accent" : "border-border bg-background hover:bg-muted"}`}>
            <span className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${active ? "border-foreground" : "border-muted-foreground/50"}`}>{active && <span className="size-2 rounded-full bg-foreground" />}</span>
            <span className="min-w-0 flex-1"><span className="flex items-center gap-2 font-medium">{option.name}{option.beta && <Badge variant="outline" className="text-[10px]">BETA</Badge>}</span><span className="mt-1 block text-sm text-muted-foreground">{option.description}</span><span className={`connection ${measurement.state} mt-2 flex items-center gap-1.5 text-xs text-muted-foreground`}><Signal className={`size-3 ${measurement.state === "online" ? "text-emerald-500" : measurement.state === "offline" ? "text-destructive" : ""}`} />{measurement.label}</span></span>
            {active && <Check className="size-4 text-foreground" />}
          </button>;
        })}
      </div>
      <p className="rounded-md border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">Servidores beta são operados por terceiros. O tráfego de navegação pode não passar pelo backend OrganizeOn.</p>
      <DialogFooter><Button variant="outline" onClick={props.onClose}>Cancelar</Button><Button onClick={() => props.onApply(selected)}>Aplicar e reiniciar</Button></DialogFooter>
    </DialogContent>
  </Dialog>;
}

const roleLabels: Record<string, string> = { owner: "Owner", ultra_admin: "Ultra Admin", admin: "Administrador", user: "Usuário", guest: "Convidado" };
function AccountSurface(props: AccountProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const actions: { id: AccountProps["onNavigate"] extends (v: infer T) => void ? T : never; label: string; icon: typeof UserRound }[] = [
    { id: "home", label: "Início", icon: Home }, { id: "games", label: "Jogos", icon: Gamepad2 },
    { id: "settings", label: "Configurações", icon: Settings2 },
    ...(!props.guest ? [{ id: "data" as const, label: "Dados", icon: Cloud }] : []),
    { id: "proxy", label: "Servidor proxy", icon: Signal },
    ...(props.canOpenDashboard ? [{ id: "dashboard" as const, label: "Dashboard", icon: Shield }] : []),
  ];
  return <Sheet open={open} onOpenChange={setOpen}><SheetTrigger render={<Button variant="outline" size="icon" className="pointer-events-auto fixed left-3 top-3 z-40" aria-label="Abrir menu" />}><Menu /></SheetTrigger>
    <SheetContent side="left" className="w-[min(88vw,320px)] border-border bg-popover p-3">
      <SheetHeader className="border-b px-2 pb-4 text-left"><SheetTitle className="flex items-center gap-2.5"><img className="size-7" src="https://organizeon.com.br/d3/assets/organizeon-icon.png" alt="" />OrganizeOn</SheetTitle><SheetDescription>Workspace</SheetDescription></SheetHeader>
      <nav className="grid gap-1" aria-label="Navegação da conta">{actions.map(({ id, label, icon: Icon }) => <Button key={id} variant="ghost" className="justify-start" onClick={() => { setOpen(false); props.onNavigate(id); }}><Icon className="size-4 text-muted-foreground" />{label}{id === "proxy" && <Badge variant="secondary" className="ml-auto">{props.proxyLabel}</Badge>}</Button>)}</nav>
      <div className="mt-auto border-t pt-3"><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" className="h-12 w-full justify-start" aria-label={`Perfil de ${props.username}`} />}><UserRound className="size-4"/><span className="grid flex-1 text-left"><span className="text-sm">{props.username}</span><span className="text-xs text-muted-foreground">{roleLabels[props.role] || "Usuário"}</span></span><ChevronUp className="size-4"/></DropdownMenuTrigger><DropdownMenuContent side="top" align="start" className="w-64"><DropdownMenuGroup><DropdownMenuLabel>{props.username} · {roleLabels[props.role] || "Usuário"}</DropdownMenuLabel></DropdownMenuGroup><DropdownMenuSeparator/><DropdownMenuItem onClick={() => setLogoutOpen(true)} className="text-destructive"><LogOut/>Sair da conta</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
    </SheetContent>
    <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}><DialogContent className="sm:max-w-sm"><DialogHeader><DialogTitle>Encerrar sessão?</DialogTitle><DialogDescription>{props.guest ? "Deseja sair do modo convidado?" : "Deseja realmente sair desta conta?"}</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setLogoutOpen(false)}>Cancelar</Button><Button variant="destructive" onClick={() => props.onNavigate("logout")}>Sair</Button></DialogFooter></DialogContent></Dialog>
  </Sheet>;
}

export function ClientSurface(props: SurfaceProps) {
  const { type, ...rest } = props;
  const content = useMemo(() => {
    if (type === "login") return <LoginSurface {...rest as LoginProps} />;
    if (type === "data") return <DataSurface {...rest as DataProps} />;
    if (type === "proxy") return <ProxySurface {...rest as ProxyProps} />;
    return <AccountSurface {...rest as AccountProps} />;
  }, [type, rest]);
  return <div className={type === "account" ? "organizeon-ui organizeon-overlay-root dark text-foreground" : "organizeon-ui dark min-h-svh bg-background text-foreground"}>{content}</div>;
}
