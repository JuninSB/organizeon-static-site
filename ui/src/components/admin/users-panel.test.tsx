import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { UsersPanel, type UsersData } from "./users-panel";
const user={username:'fixture',role:'user',permissions:[],disabled:false,canEdit:true,canRevokeSessions:true,isSelf:false};
const data=(role:string)=>({currentUser:{...user,username:'actor',role},users:[user],permissions:[],grantablePermissions:[],roles:[],onSave:vi.fn(),onPassword:vi.fn(),onCode:vi.fn(),onRevokeSessions:vi.fn(),onDelete:vi.fn(),onGrantBadge:vi.fn()}) as UsersData;
it.each(['user','admin','ultra_admin'])('omits the grant badge action entirely for %s',(async role=>{render(<UsersPanel data={data(role)}/>);screen.getByRole('button',{name:'Ações de fixture'}).focus();await userEvent.keyboard('{ArrowDown}');await screen.findByRole('menuitem',{name:'Alterar senha'});expect(screen.queryByRole('menuitem',{name:'Dar emblema dourado'})).not.toBeInTheDocument();}));
it('allows owner to grant the selected account through its existing actions menu',async()=>{const fixture=data('owner');render(<UsersPanel data={fixture}/>);screen.getByRole('button',{name:'Ações de fixture'}).focus();await userEvent.keyboard('{ArrowDown}');await screen.findByRole('menuitem',{name:'Alterar senha'});await userEvent.click(await screen.findByRole('menuitem',{name:'Dar emblema dourado'}));expect(fixture.onGrantBadge).toHaveBeenCalledWith(user);});
