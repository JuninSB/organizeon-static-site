// Synthetic messages exercise the real UI; no mail is sent or modified.
const { chromium } = require('/tmp/replay-browser/node_modules/playwright');
const fs = require('fs'), path = require('path');
const realLogo = 'http://cdn.mcauto-images-production.sendgrid.net/956b73cc4c6df487/9b5d11af-4e16-4059-9d0a-ff0052a2ce6f/600x111.png';
(async () => {
 const browser = await chromium.launch({headless:true,args:['--no-sandbox','--no-zygote','--single-process','--no-proxy-server','--in-process-gpu','--disable-gpu-sandbox']});
 try {
  const context = await browser.newContext({viewport:{width:390,height:844}});
  await context.route('https://example.org/verify', route => route.fulfill({body:'Fixture destination',contentType:'text/html'}));
  const page = await context.newPage();
  const errors=[];let movedTo=null; const patches=[]; page.on('pageerror', e => errors.push(e.message));
  await page.route('https://organizeon.com.br/d4/**', route => {
   const url=new URL(route.request().url());
   if(url.pathname.includes('/api/')) {
    const endpoint=url.pathname.split('/api/')[1];
    if(endpoint.startsWith('messages/')&&route.request().method()==='PATCH'){patches.push(route.request().postDataJSON());movedTo=route.request().postDataJSON().folder;}
    let data={};
    if(endpoint==='session')data={authenticated:true,username:'fixture',role:'ultra_admin'};
    if(endpoint==='mailboxes')data={items:[{id:'box',address:'fixture@organizeon.com.br',label:'Teste'}]};
    if(endpoint.startsWith('messages/'))data={id:'html-fixture',mailbox:'box',folder:'inbox',subject:'Teste do leitor HTML',sender:'Roblox <no-reply@roblox.com>',recipients:['fixture@organizeon.com.br'],created:'2026-11-17T13:00:00Z',attachments:[],body:'Texto alternativo',html:'<h1>E-mail HTML</h1><img alt="Logo fixture" src="https://images.example.test/logo.png"><p><a style="display:inline-block;padding:20px;background:#27272a;color:white" href="https://example.org/verify">Abrir destino de teste</a></p><script>parent.document.body.innerHTML="COMPROMISED"</script>'};
    if(endpoint==='messages')data={items:[{id:'html-fixture',sender:'Roblox <no-reply@roblox.com>',subject:'Teste do leitor HTML',snippet:'Prévia de mensagem',created:'2026-11-17T13:00:00Z',unread:1}],hasMore:false};
    if(data.html && process.env.D4_REAL_IMAGE==='1')data.html=data.html.replace('https://images.example.test/logo.png',realLogo);
    return route.fulfill({json:data});
   }
   if(process.env.D4_HTML_LOCAL==='1'){
    const root=path.resolve(__dirname,'../../d4-dist');
    const file=url.pathname==='/d4/'?path.join(root,'d4.html'):path.join(root,url.pathname.slice(4));
    if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({path:file,contentType:file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':undefined});
   }
   if(url.pathname==='/d4/')return route.fetch({url:'https://organizeon.com.br/d4/login',maxRetries:2}).then(response=>route.fulfill({response}));
   return route.continue();
  });
  await page.route('https://images.example.test/logo.png',route=>route.fulfill({contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jB6kAAAAASUVORK5CYII=','base64')}));
  await page.goto('https://organizeon.com.br/d4/#/inbox');
  const row=page.locator('.d4-mail-open');await row.waitFor();
  await row.dispatchEvent('pointerdown',{button:0,clientX:100,clientY:200,pointerId:1,pointerType:'touch'});await page.waitForTimeout(250);await row.dispatchEvent('pointerup',{button:0,pointerId:1});
  const menu=page.getByRole('dialog');await menu.waitFor();
  if(!page.url().endsWith('#/inbox'))throw Error('Hold navigated unexpectedly');
  await page.screenshot({path:'/tmp/d4-email-actions-mobile.png',fullPage:true});
  await menu.getByRole('button',{name:'Marcar como lido',exact:true}).click();await page.waitForTimeout(500);
  if(patches[0]?.unread!==false)throw Error('Read update not sent');
  await page.getByRole('button',{name:'Opções de Teste do leitor HTML',exact:true}).click();await page.getByRole('button',{name:'Mover para lixeira',exact:true}).click();await page.waitForTimeout(500);
  if(movedTo!=='trash'||!page.url().endsWith('#/inbox'))throw Error('Move changed source folder');
  await page.getByRole('button',{name:'Opções de Teste do leitor HTML',exact:true}).click();await page.getByRole('button',{name:'Responder',exact:true}).click();
  await page.waitForFunction(()=>location.hash==='#/compose?reply=html-fixture');
  if(errors.length)throw Error(errors.join('; '));console.log('PASS real D4 UI long press, read mutation, trash stays source, reply, mobile');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
