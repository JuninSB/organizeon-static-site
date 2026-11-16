import { useServiceTheme } from "@/hooks/use-service-theme";
import type { ReactNode } from 'react';
import { CircleUserRound, Moon, Sun, ChevronUp, Files, LogOut, UserRound, RefreshCw } from 'lucide-react';
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
 const { rootRef, theme, toggleTheme } = useServiceTheme("d2-theme");
 return <div ref={rootRef} className="contents"><TooltipProvider><SidebarProvider defaultOpen><Sidebar collapsible="icon">
 <SidebarHeader className="px-3 pb-3 pt-4"><a href="#/dashboard" className="flex min-h-10 items-center gap-2.5 rounded-md px-2 text-sm font-semibold"><img className="size-7 shrink-0" src={theme === "dark" ? "https://organizeon.com.br/d3/assets/organizeon-icon.png" : "https://organizeon.com.br/d3/assets/organizeon_icon_black_128.png"} alt=""/><span className="truncate">OrganizeOn <span className="font-normal text-muted-foreground">D2</span></span></a></SidebarHeader><SidebarSeparator/>
 <SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><FileNavigation/></SidebarGroup></SidebarContent>
 <SidebarFooter className="px-2 pb-3"><DropdownMenu><DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="h-12 justify-start" aria-label={`Perfil de ${username}`}/> }>
 <span className="grid size-8 shrink-0 place-items-center rounded-md border border-sidebar-border bg-sidebar-accent text-sidebar-foreground"><UserRound className="size-4"/></span>
 <span className="grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden"><span className="truncate font-medium">{username}</span><span className="truncate text-muted-foreground">{roles[role] || role}</span></span><ChevronUp className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden"/>
 </DropdownMenuTrigger><DropdownMenuContent side="top" align="start" className="w-64"><DropdownMenuGroup><DropdownMenuLabel className="px-2 py-2"><span className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-md border border-border bg-muted"><CircleUserRound className="size-4"/></span><span className="grid min-w-0"><span className="truncate text-sm font-medium text-foreground">{username}</span><span className="truncate text-xs text-muted-foreground">{roles[role] || role}</span></span></span></DropdownMenuLabel></DropdownMenuGroup><DropdownMenuSeparator/><DropdownMenuItem onClick={logout} className="text-destructive"><LogOut/>Sair da conta</DropdownMenuItem></DropdownMenuContent></DropdownMenu></SidebarFooter>
 </Sidebar><SidebarInset className="min-h-svh min-w-0"><header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6"><SidebarTrigger aria-label="Abrir ou recolher navegação"/><span className="flex-1 text-sm font-medium">Meus arquivos</span><Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}>{theme === "dark" ? <Sun/> : <Moon/>}</Button><Button variant="ghost" size="icon" aria-label="Atualizar" disabled={refreshing} onClick={refresh}><RotatingIcon icon={RefreshCw} active={refreshing}/></Button></header><main className="mx-auto grid w-full max-w-5xl gap-5 px-4 py-6 sm:px-6 sm:py-8">{children}</main></SidebarInset></SidebarProvider></TooltipProvider></div>;
}
