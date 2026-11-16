import {render,screen} from '@testing-library/react';import userEvent from '@testing-library/user-event';import {expect,it,vi} from 'vitest';import {ProfileCard} from './profile-card';import {defaultProfile} from '@/services/profile-service';
it('shows another profile without editing controls',()=>{render(<ProfileCard username="someone" role="Usuário" profile={{...defaultProfile('someone'),displayName:'Nome público',bio:'Descrição pública'}}/>);expect(screen.getByRole('heading',{name:'Nome público'})).toBeInTheDocument();expect(screen.getByText('Descrição pública')).toBeInTheDocument();expect(screen.queryByRole('button')).not.toBeInTheDocument();});
it('opens independent editors only when editing capability is supplied',async()=>{const onEdit=vi.fn();render(<ProfileCard username="me" role="Admin" profile={defaultProfile('me')} onEdit={onEdit}/>);const user=userEvent.setup();await user.click(screen.getByRole('button',{name:'Editar nome e cor'}));expect(onEdit).toHaveBeenLastCalledWith('identity');await user.click(screen.getByRole('button',{name:'Editar descrição'}));expect(onEdit).toHaveBeenLastCalledWith('bio');await user.click(screen.getByRole('button',{name:'Editar foto de perfil'}));expect(onEdit).toHaveBeenLastCalledWith('photo');});

it.each([['circle','50%'],['rounded','20%'],['square','0']] as const)("matches the avatar frame to the %s shape",(avatarShape,radius)=>{
 const {container}=render(<ProfileCard username="fixture" role="Usuário" profile={{...defaultProfile("fixture"),avatarShape}} frameless/>);
 const frame=container.querySelector('[data-avatar-frame]') as HTMLElement;
 expect(frame).toHaveStyle({borderRadius:radius});expect(frame.firstElementChild).toHaveStyle({borderRadius:radius});
});
