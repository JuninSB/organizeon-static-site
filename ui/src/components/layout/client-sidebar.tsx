import { useState } from 'react';
import { Cloud, Gamepad2, Home, Settings2, Shield, Signal } from 'lucide-react';
import { AccountMenu } from './account-menu';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
export type AccountProps = { username:string;role:string;guest:boolean;canOpenDashboard:boolean;proxyLabel:string;onNavigate:(action:'home'|'games'|'settings'|'data'|'proxy'|'dashboard'|'logout')=>void };
function ClientNavigation({account,confirmLogout}:{account:AccountProps;confirmLogout:()=>void}) {
 const {setOpen,setOpenMobile}=useSidebar();
 const close=()=>{setOpen(false);setOpenMobile(false);};
 const items=[{id:'home' as const,label:'Início',icon:Home},{id:'games' as const,label:'Jogos',icon:Gamepad2},{id:'settings' as const,label:'Configurações',icon:Settings2},...(!account.guest?[{id:'data' as const,label:'Dados',icon:Cloud}]:[]),{id:'proxy' as const,label:'Servidor proxy',icon:Signal},...(account.canOpenDashboard?[{id:'dashboard' as const,label:'Dashboard',icon:Shield}]:[])];
 return <Sidebar collapsible="offcanvas" className="pointer-events-auto"><SidebarHeader className="px-3 pb-3 pt-4"><div className="flex min-h-10 items-center gap-2.5 px-2 text-sm font-semibold"><img className="size-7 shrink-0" src="https://organizeon.com.br/d3/assets/organizeon-icon.png" alt=""/><span>OrganizeOn</span></div></SidebarHeader><SidebarSeparator/><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarMenu>{items.map(({id,label,icon:Icon})=><SidebarMenuItem key={id}><SidebarMenuButton tooltip={label} onClick={()=>{close();account.onNavigate(id);}}><Icon/><span>{label}</span>{id==='proxy'&&<Badge variant="secondary" className="ml-auto text-[10px]">{account.proxyLabel}</Badge>}</SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroup></SidebarContent><SidebarFooter className="px-2 pb-3"><AccountMenu username={account.username} role={account.role} onLogout={()=>{close();confirmLogout();}}/></SidebarFooter></Sidebar>;
}
export function AccountSurface(account:AccountProps) {
 const [logoutOpen,setLogoutOpen]=useState(false);
 return <SidebarProvider defaultOpen={false} className="pointer-events-none min-h-0"><ClientNavigation account={account} confirmLogout={()=>setLogoutOpen(true)}/><SidebarTrigger className="pointer-events-auto fixed left-3 top-3 z-40 border bg-background" aria-label="Abrir menu"/><Dialog open={logoutOpen} onOpenChange={setLogoutOpen}><DialogContent className="sm:max-w-sm"><DialogHeader><DialogTitle>Encerrar sessão?</DialogTitle><DialogDescription>{account.guest?'Deseja sair do modo convidado?':'Deseja realmente sair desta conta?'}</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={()=>setLogoutOpen(false)}>Cancelar</Button><Button variant="destructive" onClick={()=>account.onNavigate('logout')}>Sair</Button></DialogFooter></DialogContent></Dialog></SidebarProvider>;
}
