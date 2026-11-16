import {MessagesProvider} from "@/features/messages/messages-provider";
import { AccountMenu } from "./account-menu";
import { useServiceTheme } from "@/hooks/use-service-theme";
import type { ReactNode } from 'react';
import { Moon, Sun, Files, RefreshCw } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarSeparator, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { RotatingIcon } from './rotating-icon';

function FileNavigation() {
 const { setOpenMobile } = useSidebar();
 return <SidebarMenu><SidebarMenuItem><SidebarMenuButton isActive tooltip="Meus arquivos" onClick={() => setOpenMobile(false)}><Files/><span>Meus arquivos</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu>;
}
export function ServiceShell({ children, username, role, logout, refresh, refreshing }: { children: ReactNode; username: string; role: string; logout: () => void; refresh: () => void; refreshing: boolean }) {
 const { rootRef, theme, toggleTheme } = useServiceTheme("d2-theme");
 return <div ref={rootRef} className="contents"><TooltipProvider><MessagesProvider username={username}><SidebarProvider defaultOpen><Sidebar collapsible="icon">
 <SidebarHeader className="px-3 pb-3 pt-4"><a href="#/dashboard" className="flex min-h-10 items-center gap-2.5 rounded-md px-2 text-sm font-semibold"><img className="size-7 shrink-0" src={theme === "dark" ? "https://organizeon.com.br/d3/assets/organizeon-icon.png" : "https://organizeon.com.br/d3/assets/organizeon_icon_black_128.png"} alt=""/><span className="truncate">OrganizeOn <span className="font-normal text-muted-foreground">D2</span></span></a></SidebarHeader><SidebarSeparator/>
 <SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><FileNavigation/></SidebarGroup></SidebarContent>
 <SidebarFooter className="px-2 pb-3"><AccountMenu username={username} role={role} onLogout={logout}/></SidebarFooter>
 </Sidebar><SidebarInset className="min-h-svh min-w-0"><header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 sm:px-6"><SidebarTrigger aria-label="Abrir ou recolher navegação"/><span className="flex-1 text-sm font-medium">Meus arquivos</span><Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}>{theme === "dark" ? <Sun/> : <Moon/>}</Button><Button variant="ghost" size="icon" aria-label="Atualizar" disabled={refreshing} onClick={refresh}><RotatingIcon icon={RefreshCw} active={refreshing}/></Button></header><main className="mx-auto grid w-full max-w-5xl gap-5 px-4 py-6 sm:px-6 sm:py-8">{children}</main></SidebarInset></SidebarProvider></MessagesProvider></TooltipProvider></div>;
}
