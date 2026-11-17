import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

export function createD4Gateway({authenticate,sendJson,login,originAllowed}) {
  const allowed=account=>Boolean(account&&['ultra_admin','super_admin','owner'].includes(account.role));
  return async function handleD4(request,response,url) {
    try {
      const path=url.pathname;
      if(path==='/d4/api/login'&&request.method==='POST')return login(request,response,'d4');
      const account=authenticate(request,url);
      if(path==='/d4/api/session')return sendJson(response,200,{authenticated:allowed(account),...(allowed(account)?{username:account.username,role:account.role}:{})});
      if(path==='/d4/api/logout'&&request.method==='POST'){
        if(!originAllowed(request))return sendJson(response,403,{error:'origin_not_allowed'});
        response.setHeader('Set-Cookie','organizeon_session=; Path=/d4/; Max-Age=0; Secure; HttpOnly; SameSite=Strict');
        return sendJson(response,200,{ok:true});
      }
      const inbound=path==='/d4/api/inbound'&&request.method==='POST';
      if(path.startsWith('/d4/api/')&&!inbound){
        if(!account)return sendJson(response,401,{error:'Autenticação necessária.'});
        if(!allowed(account))return sendJson(response,403,{error:'Uma conta ultra admin ou superior é necessária.'});
        if(!['GET','HEAD'].includes(request.method)&&!originAllowed(request))return sendJson(response,403,{error:'origin_not_allowed'});
      }
      if(!path.startsWith('/d4/api/')&&['GET','HEAD'].includes(request.method)){
        if(path==='/d4/login'&&allowed(account)){response.writeHead(302,{Location:'/d4/'});return response.end();}
        if(path!='/d4/login'&&!path.startsWith('/d4/assets/')&&!allowed(account)){response.writeHead(302,{Location:'/d4/login'});return response.end();}
      }
      const secret=(await readFile(join(homedir(),'.local/share/organizeon/d4/config/internal.key'),'utf8')).trim();
      const chunks=[];let size=0;
      for await(const chunk of request){size+=chunk.length;if(size>22*1024*1024)return sendJson(response,413,{error:'Mensagem muito grande.'});chunks.push(chunk);}
      const body=Buffer.concat(chunks);
      const headers={'X-D4-Internal':secret,'X-D4-User':allowed(account)?account.username:'','Content-Length':String(body.length),'Content-Type':request.headers['content-type']||'application/json'};
      if(inbound){headers['X-D4-Timestamp']=String(request.headers['x-d4-timestamp']||'');headers['X-D4-Signature']=String(request.headers['x-d4-signature']||'');}
      const upstream=http.request({hostname:'127.0.0.1',port:8340,path:request.url,method:request.method,headers,timeout:180000},incoming=>{
        response.writeHead(incoming.statusCode,incoming.headers);incoming.pipe(response);
      });
      upstream.on('timeout',()=>upstream.destroy());
      upstream.on('error',()=>{if(!response.headersSent)sendJson(response,503,{error:'O serviço de e-mail está temporariamente indisponível.'});else response.destroy();});
      response.on('close',()=>upstream.destroy());upstream.end(body);
    }catch{if(!response.headersSent)sendJson(response,503,{error:'O serviço de e-mail está temporariamente indisponível.'});}
  };
}
