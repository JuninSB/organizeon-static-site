import type { ReactNode } from 'react';
import { ChevronUp, Files, LogOut, UserRound, RefreshCw } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarSeparator, useSidebar } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { RotatingIcon } from './rotating-icon';

const roles: Record<string, string> = { owner: 'Owner', ultra_admin: 'Ultra admin', super_admin: 'Super admin', admin: 'Admin', user: 'Usuário' };
function FileNavigation() {
 const { setOpenMobile } = useSidebar();
 return <SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive tooltip="Meus arquivos" onClick={() => setOpenMobile(false)}><Files/><span>Meus arquivos</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu>;
}
export function ServiceShell({ children, username, role, logout, refresh, refreshing }: { children: ReactNode; username: string; role: string; logout: () => void; refresh: () => void; refreshing: boolean }) {
 return <TooltipProvider><SidebarProvider defaultOpen><Sidebar collapsible="icon">
 <SidebarHeader className="px-3 pb-3 pt-4"><a href="#/dashboard" className="flex min-h-10 items-center gap-2.5 rounded-md px-2 text-sm font-semibold"><img className="size-7 shrink-0" src="https://organizeon.com.br/d3/assets/organizeon-icon.png" alt=""/><span className="truncate">OrganizeOn <span className="font-normal text-muted-foreground">D2</span></span></a></SidebarHeader><SidebarSeparator/>
 <SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><FileNavigation/></SidebarGroup></SidebarContent>
 <SidebarFooter className="px-2 pb-3"><DropdownMenu><DropdownMenuTrigger render={<SidebarMenuButton size="lg" aria-label={`Perfil de ${username}`}/> }><UserRound/><span className="grid flex-1 text-left text-xs"><span>{username}</span><span className="text-muted-foreground">{roles[role] || role}</span></span><ChevronUp/></DropdownMenuTrigger><DropdownMenuContent side="top" align="start" className="w-64"><DropdownMenuGroup><DropdownMenuLabel>{username} · {roles[role] || role}</DropdownMenuLabel></DropdownMenuGroup><DropdownMenuSeparator/><DropdownMenuItem onClick={logout} className="text-destructive"><LogOut/>Sair da conta</DropdownMenuItem></DropdownMenuContent></DropdownMenu></SidebarFooter>
 </Sidebar><SidebarInset className="min-h-svh min-w-0"><header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6"><SidebarTrigger aria-label="Abrir ou recolher navegação"/><span className="flex-1 text-sm font-medium">Meus arquivos</span><Button variant="ghost" size="icon" aria-label="Atualizar" disabled={refreshing} onClick={refresh}><RotatingIcon icon={RefreshCw} active={refreshing}/></Button></header><main className="mx-auto grid w-full max-w-5xl gap-5 px-4 py-6 sm:px-6 sm:py-8">{children}</main></SidebarInset></SidebarProvider></TooltipProvider>;
}
