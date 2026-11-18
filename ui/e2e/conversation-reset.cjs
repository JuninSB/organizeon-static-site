// Real DM store/HTTP handler in memory, real compiled client; no production accounts.
const fs=require('fs'),path=require('path'),http=require('http');
const {pathToFileURL}=require('url');
const {chromium}=require('/tmp/replay-browser/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),backend=path.resolve(root,'../backend-cleanup/organizeon-backend');
(async()=>{
 const {createDirectMessagesStore}=await import(pathToFileURL(backend+'/src/direct-messages/store.mjs'));
 const {createDirectMessagesHandler}=await import(pathToFileURL(backend+'/src/direct-messages/http.mjs'));
 const account=username=>['alice','bob','carol'].includes(username)?{username,role:'ultra_admin',profile:{displayName:username,nameColor:'#FAFAFA',bio:'',avatar:null,avatarShape:'circle'}}:null;
 const store=createDirectMessagesStore({filePath:':memory:',resolveAccount:account});
 const source=store.createRequest('alice','bob');store.respond('bob',source.id,'accept');
 const target=store.createRequest('bob','carol');store.respond('carol',target.id,'accept');
 const handler=createDirectMessagesHandler({store,authenticate:request=>account(request.headers['x-fixture-account']),originAllowed:()=>true,readJson:async request=>{let body='';for await(const chunk of request)body+=chunk;return JSON.parse(body||'{}');},sendJson:(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));}});
 const server=http.createServer((req,res)=>handler(req,res,new URL(req.url,'http://localhost'),'/dm'));await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--no-zygote','--single-process','--no-proxy-server','--in-process-gpu','--disable-gpu-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error('PAGE_ERROR',e.message);});
  const data=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=600;c.height=400;const x=c.getContext('2d');x.fillStyle='#264653';x.fillRect(0,0,600,400);x.fillStyle='#e9c46a';x.fillRect(100,70,400,260);return c.toDataURL('image/png').split(',')[1];});
  const attachment=store.upload('alice',source.id,{name:'integracao.png',mime:'image/png',data});
  const sent=store.send('alice',source.id,{content:'Mídia privada de teste',attachmentIds:[attachment.id],nonce:crypto.randomUUID()});
  await page.route('https://media-fixture.test/**',async route=>{
   const url=new URL(route.request().url());
   if(url.pathname.startsWith('/dm/')){const response=await fetch('http://127.0.0.1:'+server.address().port+url.pathname+url.search,{method:route.request().method(),headers:{'x-fixture-account':'bob'},body:route.request().postData()||undefined});return route.fulfill({status:response.status,contentType:'application/json',body:await response.text()});}
   if(url.pathname==='/')return route.fulfill({contentType:'text/html',body:`<meta name="viewport" content="width=device-width,initial-scale=1"><div id="root"></div><script type="module">import{mountD2Dashboard}from'/ui-dist/client-ui.js';mountD2Dashboard(document.querySelector('#root'),{username:'bob',role:'ultra_admin',request:async(path,opts={})=>{if(!path.startsWith('/dm/'))return path==='/account/profile'?{profile:${JSON.stringify(account('bob').profile)}}:{files:[]};const r=await fetch(path,opts),d=await r.json();if(!r.ok)throw Error(d.error);return d;},upload:async()=>{},logout(){}},'/ui-dist/client-ui.css');</script>`});
   if(process.env.RESET_PUBLIC==='1'&&url.pathname.startsWith('/ui-dist/'))return route.fetch({url:'https://organizeon.com.br/d1/live'+url.pathname,maxRetries:2}).then(response=>route.fulfill({response}));
   if(process.env.MEDIA_PUBLIC==='1'&&url.pathname.startsWith('/ui-dist/'))return route.fetch({url:'https://juninsb.github.io/organizeon-static-site'+url.pathname+'?v=dm-viewer-f84617a',maxRetries:2}).then(response=>route.fulfill({response}));
   const file=path.join(root,url.pathname);return fs.existsSync(file)?route.fulfill({path:file,contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':undefined}):route.fulfill({status:404});
  });
  await page.goto('https://media-fixture.test/');
  await page.getByRole('button',{name:'Abrir ou recolher navegação',exact:true}).click();await page.getByRole('button',{name:'Mensagens diretas',exact:true}).click();await page.getByRole('button',{name:'Conversa com alice',exact:true}).click();
  await page.getByRole('button',{name:'Voltar às conversas',exact:true}).click();
  const row=page.getByRole('button',{name:'Conversa com alice',exact:true});await row.click({button:'right'});
  await page.getByRole('button',{name:'Resetar conversa',exact:true}).click();
  const confirm=page.getByRole('dialog',{name:'Resetar conversa com @alice?'});await confirm.waitFor();
  await confirm.getByRole('button',{name:'Cancelar',exact:true}).click();
  if(store.getMessages('bob',source.id).messages.length!==1)throw Error('Cancel mutated conversation');
  await row.click({button:'right'});await page.getByRole('button',{name:'Resetar conversa',exact:true}).click();
  await page.getByRole('dialog',{name:'Resetar conversa com @alice?'}).getByRole('button',{name:'Resetar conversa',exact:true}).click();
  await page.getByRole('dialog',{name:'Resetar conversa com @alice?'}).waitFor({state:'hidden'});
  if(store.getMessages('alice',source.id).messages.length||store.getMessages('bob',source.id).messages.length)throw Error('Reset not persisted');
  await row.click();await page.getByText('Este é o início da sua conversa com',{exact:false}).waitFor();await page.getByText('Mídia privada de teste',{exact:true}).waitFor({state:'hidden'});
  await page.screenshot({path:'/tmp/dm-reset-empty.png',fullPage:true});
  if(errors.length)throw Error(errors.join('; '));console.log('PASS compiled DM reset, confirmation cancellation, real isolated backend deletion, empty thread');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));store.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
