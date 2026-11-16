import {it,expect,vi} from 'vitest';
import {configureAccountTransport} from './account-api';
import {dmService} from './messages-service';
it('reuses authenticated snapshots for compact reads and resets them for a new session',async()=>{
 const me={username:'alice',profile:{avatar:'fixture-avatar'}};
 const base={me,conversations:[],requests:[],events:[],cursor:1,settings:{},version:'v1'};
 const adapter=vi.fn().mockResolvedValueOnce(base).mockResolvedValueOnce({unchanged:true,version:'v1',events:[{kind:'read'}],cursor:2}).mockResolvedValueOnce({...base,me:{username:'bob'},version:'v2'});
 const release=configureAccountTransport(adapter);
 try{expect((await dmService.inbox(null)).me).toEqual(me);const cached=await dmService.inbox(1);expect(cached.me).toEqual(me);expect(cached.cursor).toBe(2);expect(cached.events).toEqual([{kind:'read'}]);expect(adapter.mock.calls[1][0]).toContain('version=v1');expect((await dmService.inbox(null)).me.username).toBe('bob');expect(adapter.mock.calls[2][0]).not.toContain('version=');}finally{release();}
});
