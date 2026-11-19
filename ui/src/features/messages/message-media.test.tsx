import {render,screen,act} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import {MessageMedia} from './message-media';
import {dmService} from '@/services/messages-service';
vi.mock('@/services/messages-service',()=>({dmService:{attachment:vi.fn()}}));
afterEach(()=>{vi.useRealTimers();vi.clearAllMocks();});
it('shows expired media without fetching bytes or offering download',()=>{
 render(<MessageMedia attachment={{id:'a',name:'old.mp4',mime:'video/mp4',size:50,expired:true}}/>);
 expect(screen.getByText('Arquivo expirado')).toBeInTheDocument();expect(screen.queryByRole('button')).toBeNull();expect(dmService.attachment).not.toHaveBeenCalled();
});
it('expires an open component at its server deadline without a page reload',()=>{
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-11-19T12:00:00Z'));
 render(<MessageMedia attachment={{id:'b',name:'file.bin',mime:'application/octet-stream',size:50,expiresAt:'2026-11-19T12:00:01Z'}}/>);
 expect(screen.getByRole('button')).toBeEnabled();act(()=>vi.advanceTimersByTime(1000));expect(screen.getByText('Arquivo expirado')).toBeInTheDocument();expect(screen.queryByRole('button')).toBeNull();
});
