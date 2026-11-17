import {render,screen} from '@testing-library/react';import userEvent from '@testing-library/user-event';import {expect,it,vi} from 'vitest';import {ProfileCard} from './profile-card';import {defaultProfile} from '@/services/profile-service';
it('shows another profile without editing controls',()=>{render(<ProfileCard username="someone" role="Usuário" profile={{...defaultProfile('someone'),displayName:'Nome público',bio:'Descrição pública'}}/>);expect(screen.getByRole('heading',{name:'Nome público'})).toBeInTheDocument();expect(screen.getByText('Descrição pública')).toBeInTheDocument();expect(screen.queryByRole('button')).not.toBeInTheDocument();});
it('opens independent editors only when editing capability is supplied',async()=>{const onEdit=vi.fn();render(<ProfileCard username="me" role="Admin" profile={defaultProfile('me')} onEdit={onEdit}/>);const user=userEvent.setup();await user.click(screen.getByRole('button',{name:'Editar nome e cor'}));expect(onEdit).toHaveBeenLastCalledWith('identity');await user.click(screen.getByRole('button',{name:'Editar descrição'}));expect(onEdit).toHaveBeenLastCalledWith('bio');await user.click(screen.getByRole('button',{name:'Editar foto de perfil'}));expect(onEdit).toHaveBeenLastCalledWith('photo');});
it('supports background images for normal accounts and preserves fit without exposing public edit controls',async()=>{
 const onEdit=vi.fn();const profile={...defaultProfile('fixture'),bannerImage:'data:image/jpeg;base64,fixture',bannerFit:'fill' as const};
 const {rerender}=render(<ProfileCard username="fixture" role="Usuário" profile={profile} onEdit={onEdit}/>);
 expect(screen.getByAltText('Fundo do perfil')).toHaveStyle({objectFit:'fill'});
 await userEvent.setup().click(screen.getByRole('button',{name:'Editar aparência'}));expect(onEdit).toHaveBeenCalledWith('appearance');
 expect(screen.queryByRole('button',{name:'Editar fundo do perfil'})).toBeNull();
 rerender(<ProfileCard username="fixture" role="Usuário" profile={profile}/>);expect(screen.queryByRole('button')).toBeNull();
});

it.each([['circle','50%'],['rounded','20%'],['square','0']] as const)("matches the avatar frame to the %s shape",(avatarShape,radius)=>{
 const {container}=render(<ProfileCard username="fixture" role="Usuário" profile={{...defaultProfile("fixture"),avatarShape}} frameless/>);
 const frame=container.querySelector('[data-avatar-frame]') as HTMLElement;
 expect(frame).toHaveStyle({borderRadius:radius});expect(frame.firstElementChild).toHaveStyle({borderRadius:radius});
});
it('shows the official badge only when awarded and publicly enabled, and gates lava by entitlement',()=>{
 const profile={...defaultProfile('fixture'),bannerStyle:'lava' as const};const {container,rerender}=render(<ProfileCard username="fixture" role="Usuário" profile={profile}/>);expect(container.querySelector('[data-lava]')).toBeNull();expect(screen.queryByRole('img',{name:'Emblema dourado OrganizeOn'})).toBeNull();
 rerender(<ProfileCard username="fixture" role="Usuário" profile={{...profile,goldBadge:true,showGoldBadge:true}}/>);expect(container.querySelector('[data-lava]')).toBeTruthy();expect(screen.getByRole('img',{name:'Emblema dourado OrganizeOn'})).toBeInTheDocument();
 rerender(<ProfileCard username="fixture" role="Usuário" profile={{...profile,goldBadge:true,showGoldBadge:false}}/>);expect(screen.queryByRole('img',{name:'Emblema dourado OrganizeOn'})).toBeNull();expect(container.querySelector('[data-lava]')).toBeTruthy();
});
