import { AccountMenu } from "@/components/layout/account-menu";
import { useEffect, useRef, useState } from "react";
import {
  Activity, ArrowLeft, ChevronDown, Cpu, Database, Gauge, LayoutDashboard, RefreshCw, Server,
  TerminalSquare, Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PortalContextProvider } from "@/components/ui/portal-context";

type AdminView = "overview" | "logs" | "users" | "services" | "terminal";
type AdminUIBridge = {
  setAccount: (account: { username: string; role: string; permissions: string[] }) => void;
  setView: (view: AdminView) => void;
  openUserDialog: () => void;
  closeUserDialog: () => void;
  setRoles: (roles: string[]) => void;
  setRequestDomains: (domains: string[], current: string) => void;
  showLoginCode: (data: { username: string; code: string; expiresAt: string }) => void;
  toast: (message: string, kind?: "success" | "error" | "info") => void;
  confirm: (description: string, title?: string, confirmLabel?: string) => Promise<boolean>;
  promptPassword: (username: string) => Promise<string | null>;
};
declare global { interface Window { OrganizeOnAdminUI?: AdminUIBridge } }

const navigation: { value: AdminView; label: string; icon: typeof LayoutDashboard; permission?: string }[] = [
  { value: "overview", label: "Visão geral", icon: LayoutDashboard },
  { value: "logs", label: "Eventos", icon: Activity, permission: "admin.dashboard" },
  { value: "users", label: "Usuários", icon: Users, permission: "admin.users" },
  { value: "services", label: "Serviços", icon: Server },
  { value: "terminal", label: "Terminal", icon: TerminalSquare, permission: "admin.terminal" },
];

function AdminNavigation({ value, label, icon: Icon, permission, active }: {value: AdminView; label: string; icon: typeof LayoutDashboard; permission?: string; active: boolean}) {
 const { setOpenMobile } = useSidebar();
 return <SidebarMenuButton data-view={value} data-permission={permission} isActive={active} tooltip={label} onClick={() => { setOpenMobile(false);window.dispatchEvent(new CustomEvent('organizeon:admin-view', {detail:value})); }}><Icon aria-hidden="true"/><span>{label}</span></SidebarMenuButton>;
}

function Metric({ title, valueId, detailId, icon: Icon, fallback = "—" }: { title: string; valueId: string; detailId: string; icon: typeof Cpu; fallback?: string }) {
  return <Card className="min-w-0"><CardHeader className="flex-row items-center justify-between gap-2 pb-2"><CardDescription>{title}</CardDescription><Icon className="size-4 text-muted-foreground" /></CardHeader><CardContent><p id={valueId} className="truncate text-2xl font-semibold tracking-tight">{fallback}</p><p id={detailId} className="mt-1 min-h-5 text-xs text-muted-foreground">—</p></CardContent></Card>;
}

export function AdminApp() {
  const [account, setAccount] = useState<{username: string; role: string; permissions: string[]} | null>(null);
  const [view, setView] = useState<AdminView>("overview");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [roles, setRoles] = useState(["user", "admin"]);
  const [role, setRole] = useState("user");
  const [codeDialog, setCodeDialog] = useState<{ username: string; code: string; expiresAt: string } | null>(null);
  const [confirmation, setConfirmation] = useState<{ title: string; description: string; confirmLabel: string } | null>(null);
  const [passwordTarget, setPasswordTarget] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const confirmResolver = useRef<((value: boolean) => void) | null>(null);
  const passwordResolver = useRef<((value: string | null) => void) | null>(null);
  const [domain, setDomain] = useState("all");
  const [domains, setDomains] = useState(["all"]);
  const domainElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bridge: AdminUIBridge = {
      setAccount,
      setView: (next) => setView(next),
      openUserDialog: () => setUserDialogOpen(true),
      closeUserDialog: () => setUserDialogOpen(false),
      setRoles: (next) => { setRoles(next); setRole(next[0] || "user"); },
      setRequestDomains: (next, current) => { setDomains(next); setDomain(current); },
      showLoginCode: (next) => setCodeDialog(next),
      toast: (message, kind = "info") => toast[kind](message),
      confirm: (description, title = "Confirmar ação", confirmLabel = "Continuar") => new Promise((resolve) => {
        confirmResolver.current = resolve;
        setConfirmation({ title, description, confirmLabel });
      }),
      promptPassword: (username) => new Promise((resolve) => {
        passwordResolver.current = resolve;
        setPasswordTarget(username);
        setNewPassword("");
      }),
    };
    window.OrganizeOnAdminUI = bridge;
    void import("../../../admin.js");
    return () => { if (window.OrganizeOnAdminUI === bridge) delete window.OrganizeOnAdminUI; };
  }, []);

  useEffect(() => {
    const select = domainElement.current as (HTMLDivElement & { value: string }) | null;
    if (select) select.value = domain;
  }, [domain]);

  function changeDomain(value: string | null) {
    const next = value || "all";
    setDomain(next);
    const select = domainElement.current as (HTMLDivElement & { value: string }) | null;
    if (select) {
      select.value = next;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  const selectRole = (value: string | null) => setRole(value || "user");

  const portalContainer = document.getElementById("organizeon-admin-root");
  if (!portalContainer) throw new Error("Raiz do painel administrativo ausente.");
  return <PortalContextProvider container={portalContainer}><TooltipProvider>
    <div className="organizeon-ui dark organizeon-admin-root min-h-svh bg-background text-foreground">
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon" variant="sidebar">
          <SidebarHeader className="px-3 pb-3 pt-4"><div className="flex min-h-10 items-center gap-2.5 px-2 text-sm font-semibold tracking-tight"><img className="size-7 shrink-0" src="https://organizeon.com.br/d3/assets/organizeon-icon.png" alt=""/><span>OrganizeOn <span className="font-normal text-muted-foreground">Admin</span></span></div></SidebarHeader>
          <SidebarSeparator />
          <SidebarContent><SidebarGroup><SidebarGroupLabel>Administração</SidebarGroupLabel><SidebarMenu>{navigation.filter(item => !account || (!item.permission || account.permissions.includes(item.permission)) && (item.value !== "services" || account.permissions.some(permission => permission.startsWith("services.")))).map(({ value, label, icon: Icon, permission }) => <SidebarMenuItem key={value} id={value === "services" ? "services-nav" : undefined}>
            <AdminNavigation value={value} label={label} icon={Icon} permission={permission} active={view === value}/>
          </SidebarMenuItem>)}</SidebarMenu></SidebarGroup></SidebarContent>
          <SidebarFooter className="px-2 pb-3"><AccountMenu username={account?.username || 'Conta'} role={account?.role || 'user'} onReturn={() => document.getElementById('back-link')?.click()}/></SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-w-0 bg-background">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger aria-label="Abrir navegação" />
            <Separator orientation="vertical" className="h-5" />
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">Central de controle</p></div>
            <Tooltip><TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Voltar ao cliente" id="back-link" />}><ArrowLeft /></TooltipTrigger><TooltipContent>Voltar ao OrganizeOn</TooltipContent></Tooltip>
            <Toaster position="bottom-right" theme="dark" closeButton />
          </header>
          <main className="mx-auto w-full max-w-[1500px] min-w-0 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
            <Tabs value={view} onValueChange={(value) => setView(value as AdminView)}>
              <TabsList className="sr-only" aria-label="Painéis administrativos">{navigation.map(({ value, label }) => <TabsTrigger value={value} data-view={value} key={value}>{label}</TabsTrigger>)}</TabsList>
              <TabsContent keepMounted value="overview" className="view mt-0" id="view-overview">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Visão geral do servidor</h1><p className="mt-1 text-sm text-muted-foreground">Recursos, rotas e tráfego do backend.</p></div><Button id="monitor-toggle" className="shrink-0"><Activity /><span data-ui-label>Ativar monitoramento</span></Button></div>
                <section className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <Card><CardHeader className="pb-2"><CardDescription>Domínio</CardDescription></CardHeader><CardContent><p id="domain-value" className="truncate font-semibold">—</p><p id="domain-detail" className="mt-1 break-words text-xs text-muted-foreground">Aguardando backend</p></CardContent></Card>
                  <Card><CardHeader className="pb-2"><CardDescription>API / WISP</CardDescription></CardHeader><CardContent><p id="service-status" className="font-semibold">—</p><p id="service-detail" className="mt-1 break-words text-xs text-muted-foreground">—</p></CardContent></Card>
                  <Card><CardHeader className="pb-2"><CardDescription>Portas</CardDescription></CardHeader><CardContent><p id="ports-value" className="font-semibold">—</p><p id="ports-detail" className="mt-1 break-words text-xs text-muted-foreground">—</p></CardContent></Card>
                  <Card><CardHeader className="pb-2"><CardDescription>Uptime do processo</CardDescription></CardHeader><CardContent><p id="server-uptime-value" className="font-semibold">—</p><p id="server-uptime-detail" className="mt-1 break-words text-xs text-muted-foreground">—</p></CardContent></Card>
                </section>
                <Card className="mb-4 overflow-hidden"><CardHeader className="flex-row flex-wrap items-center justify-between gap-3 border-b py-3"><div><CardTitle className="text-sm">Domínios e rotas</CardTitle><CardDescription className="mt-1">Medição até a resposta HTTP; não é ping ICMP.</CardDescription></div><Button id="monitor-refresh" variant="outline" size="sm" disabled><RefreshCw /><span data-ui-label>Atualizar</span></Button></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Serviço</TableHead><TableHead>Rota</TableHead><TableHead>Status</TableHead><TableHead>HTTP completo</TableHead></TableRow></TableHeader><TableBody id="routes-status-body"><TableRow><TableCell colSpan={4} className="h-20 text-center text-muted-foreground">Ative o monitoramento para consultar as rotas.</TableCell></TableRow></TableBody></Table></div></CardContent></Card>
                <Card id="monitoring-off" className="mb-4"><CardContent className="flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center"><div><CardTitle className="text-sm">Monitoramento desativado</CardTitle><CardDescription className="mt-1 max-w-2xl">Uptime e requisições continuam sendo contados. CPU, RAM e gráficos só são amostrados quando um administrador ativa esta sessão.</CardDescription></div><Button id="monitor-activate"><Activity />Ativar monitoramento</Button></CardContent></Card>
                <div id="monitoring-content" hidden>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric title="CPU" valueId="cpu-value" detailId="cpu-detail" icon={Cpu} fallback="0%"/><Metric title="RAM" valueId="ram-value" detailId="ram-detail" icon={Database} fallback="0%"/><Card><CardHeader className="pb-2"><CardDescription>Solicitações por minuto</CardDescription></CardHeader><CardContent><p id="rpm-value" className="text-2xl font-semibold">0</p><p id="request-detail" className="mt-1 min-h-5 text-xs text-muted-foreground">—</p><div className="mt-2"><Select value={domain} onValueChange={changeDomain}><SelectTrigger id="request-domain-trigger" className="w-full"><SelectValue placeholder="Todos os domínios"/></SelectTrigger><SelectContent>{domains.map((item) => <SelectItem value={item} key={item}>{item === "all" ? "Todos os domínios" : item}</SelectItem>)}</SelectContent></Select><div id="request-domain-select" ref={domainElement} className="sr-only" aria-hidden="true" /></div></CardContent></Card><Metric title="Uptime" valueId="uptime-value" detailId="process-detail" icon={Gauge} fallback="0m"/></div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-2"><Card><CardHeader><CardTitle className="text-sm">CPU e RAM</CardTitle></CardHeader><CardContent><canvas id="resource-chart" className="h-56 w-full" /></CardContent></Card><Card><CardHeader><CardTitle className="text-sm">Solicitações por minuto</CardTitle></CardHeader><CardContent><canvas id="request-chart" className="h-56 w-full" /></CardContent></Card></div>
                </div>
              </TabsContent>
              <TabsContent keepMounted value="logs" className="view mt-0" id="view-logs"><div className="mb-4"><h1 className="text-2xl font-semibold tracking-tight">Eventos do servidor</h1><p className="mt-1 text-sm text-muted-foreground">Fluxo de entrada e saída, sem conteúdo sensível.</p></div><Card><CardHeader className="flex-row items-center justify-between border-b py-3"><CardDescription id="logs-status">Desconectado</CardDescription><div className="flex gap-2"><Button id="logs-pause" variant="outline" size="sm">Pausar</Button><Button id="logs-clear" variant="outline" size="sm">Limpar tela</Button></div></CardHeader><CardContent className="p-0"><div className="max-h-[70svh] min-h-80 overflow-auto p-3 font-mono text-xs" id="logs-list"><div className="grid min-h-64 place-items-center text-center text-sm text-muted-foreground">Abra esta aba para conectar aos eventos.</div></div></CardContent></Card></TabsContent>
              <TabsContent keepMounted value="users" className="view mt-0" id="view-users"><div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-2xl font-semibold tracking-tight">Contas e permissões</h1><p className="mt-1 text-sm text-muted-foreground">Alterações invalidam imediatamente os tokens anteriores.</p></div><Button id="create-user"><Users />Criar usuário</Button></div><Card className="overflow-hidden"><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Conta</TableHead><TableHead>Tipo</TableHead><TableHead>Permissões</TableHead><TableHead>Status</TableHead><TableHead>Ações</TableHead></TableRow></TableHeader><TableBody id="users-body" /></Table></div></Card></TabsContent>
              <TabsContent keepMounted value="services" className="view mt-0" id="view-services"><div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-2xl font-semibold tracking-tight">Serviços</h1><p className="mt-1 text-sm text-muted-foreground">Ações disponíveis conforme as permissões da conta.</p></div><Button id="services-refresh" variant="outline"><RefreshCw />Atualizar status</Button></div><div id="services-grid" className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3" /></TabsContent>
              <TabsContent keepMounted value="terminal" className="view mt-0" id="view-terminal"><div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-2xl font-semibold tracking-tight">Terminal do servidor</h1><p className="mt-1 text-sm text-muted-foreground">Shell remoto protegido por token e permissão administrativa.</p></div><Button id="terminal-connect"><TerminalSquare /><span data-ui-label>Conectar terminal</span></Button></div><Card className="overflow-hidden"><CardHeader className="flex-row items-center justify-between gap-2 border-b py-3"><CardDescription id="terminal-status">Desconectado</CardDescription><div className="flex items-center gap-1"><Tooltip><TooltipTrigger render={<Button variant="outline" size="icon-sm" id="terminal-scroll-up" aria-label="Subir no histórico"/>}><ChevronDown className="rotate-180" /></TooltipTrigger><TooltipContent>Subir no histórico</TooltipContent></Tooltip><Button variant="outline" size="icon-sm" id="terminal-scroll-down" aria-label="Descer no histórico"><ChevronDown /></Button><Button variant="outline" size="sm" id="terminal-scroll-bottom">Fim</Button><Button variant="destructive" size="sm" id="terminal-disconnect" hidden>Desconectar</Button></div></CardHeader><CardContent className="bg-background p-2"><div className="h-[min(62svh,560px)] min-h-64 overflow-auto" id="terminal-output" aria-label="Saída do terminal"/><form id="terminal-form" className="flex items-center gap-2 border-t pt-2"><span className="font-mono text-muted-foreground">$</span><Input id="terminal-input" autoComplete="off" spellCheck={false} disabled aria-label="Comando terminal" className="border-0 bg-transparent font-mono shadow-none focus-visible:ring-0" /></form></CardContent></Card></TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </SidebarProvider>

      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent id="user-dialog" className="max-h-[90svh] overflow-y-auto sm:max-w-lg"><DialogHeader><DialogTitle>Nova conta</DialogTitle><DialogDescription>Crie o perfil e atribua apenas as permissões necessárias.</DialogDescription></DialogHeader>
          <form id="user-form" className="grid gap-3">
            <label className="grid gap-1.5 text-sm font-medium">Usuário<Input name="username" required minLength={3} maxLength={32} pattern="[A-Za-z0-9_.-]+" autoComplete="off" /></label>
            <label className="grid gap-1.5 text-sm font-medium">Senha<Input name="password" type="password" required minLength={8} autoComplete="new-password" /></label>
            <label className="grid gap-1.5 text-sm font-medium">Tipo de conta
              <Select name="role" value={role} onValueChange={selectRole}><SelectTrigger id="role-select" className="w-full"><SelectValue /></SelectTrigger><SelectContent>{roles.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent></Select>
            </label>
            <fieldset><legend className="mb-2 text-sm font-medium">Permissões</legend><div id="permission-checks" className="grid gap-2 rounded-md border p-3 sm:grid-cols-2" /></fieldset>
            <DialogFooter><Button type="button" variant="outline" className="cancel-dialog" onClick={() => setUserDialogOpen(false)}>Cancelar</Button><Button type="submit">Criar conta</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={codeDialog !== null} onOpenChange={(open) => !open && setCodeDialog(null)}>
        <DialogContent className="sm:max-w-sm"><DialogHeader><DialogTitle>Código de login</DialogTitle><DialogDescription>Uso único para {codeDialog?.username}. Válido até {codeDialog?.expiresAt ? new Date(codeDialog.expiresAt).toLocaleTimeString("pt-BR") : "—"}.</DialogDescription></DialogHeader><Input readOnly aria-label="Código de login" value={codeDialog?.code || ""} className="text-center font-mono text-lg tracking-[.25em]"/><DialogFooter><Button variant="outline" onClick={() => navigator.clipboard.writeText(codeDialog?.code || "").then(() => toast.success("Código copiado."))}>Copiar código</Button><Button onClick={() => setCodeDialog(null)}>Fechar</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={confirmation !== null} onOpenChange={(open) => { if (!open && confirmation) { confirmResolver.current?.(false); confirmResolver.current = null; setConfirmation(null); } }}>
        <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>{confirmation?.title}</DialogTitle><DialogDescription>{confirmation?.description}</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => { confirmResolver.current?.(false); confirmResolver.current = null; setConfirmation(null); }}>Cancelar</Button><Button variant="destructive" onClick={() => { confirmResolver.current?.(true); confirmResolver.current = null; setConfirmation(null); }}>{confirmation?.confirmLabel}</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={passwordTarget !== null} onOpenChange={(open) => { if (!open && passwordTarget !== null) { passwordResolver.current?.(null); passwordResolver.current = null; setPasswordTarget(null); } }}>
        <DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Alterar senha</DialogTitle><DialogDescription>Defina uma nova senha para {passwordTarget}.</DialogDescription></DialogHeader><form onSubmit={(event) => { event.preventDefault(); passwordResolver.current?.(newPassword); passwordResolver.current = null; setPasswordTarget(null); }} className="grid gap-4"><label className="grid gap-1.5 text-sm font-medium">Nova senha<Input type="password" minLength={8} autoComplete="new-password" required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /></label><DialogFooter><Button type="button" variant="outline" onClick={() => { passwordResolver.current?.(null); passwordResolver.current = null; setPasswordTarget(null); }}>Cancelar</Button><Button type="submit">Salvar senha</Button></DialogFooter></form></DialogContent>
      </Dialog>
        <div id="toast" className="hidden" aria-hidden="true" />
    </div>
  </TooltipProvider></PortalContextProvider>;
}
