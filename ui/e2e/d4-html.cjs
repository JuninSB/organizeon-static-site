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
  const errors=[]; page.on('pageerror', e => errors.push(e.message));
  await page.route('https://organizeon.com.br/d4/**', route => {
   const url=new URL(route.request().url());
   if(url.pathname.includes('/api/')) {
    const endpoint=url.pathname.split('/api/')[1];
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
  await page.goto('https://organizeon.com.br/d4/#/message/html-fixture');
  const frame=page.frameLocator('iframe[title="Conteúdo do e-mail"]');
  await frame.getByRole('heading',{name:'E-mail HTML'}).waitFor();
  const profile=page.getByRole('button',{name:'Ver perfil de Roblox'});
  await page.waitForFunction(()=>{
    const image=document.querySelector('button[aria-label="Ver perfil de Roblox"] img');
    return image && image.complete && image.naturalWidth>0;
  });
  await profile.click();
  await page.getByRole('dialog').waitFor();
  await page.getByRole('dialog').getByText('no-reply@roblox.com',{exact:true}).waitFor();
  await page.screenshot({path:'/tmp/d4-sender-profile-mobile.png',fullPage:true});
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({state:'hidden'});
  await frame.getByRole('img').evaluate(image=>image.decode());
  const popupPromise=context.waitForEvent('page');
  await frame.getByRole('link',{name:'Abrir destino de teste'}).click();
  const popup=await popupPromise;await popup.waitForLoadState();
  if(popup.url()!=='https://example.org/verify')throw Error('Link did not open destination');
  await popup.close();
  await page.getByRole('button',{name:'Ver texto',exact:true}).click();
  await page.getByText(/Abrir destino de teste \(https:\/\/example.org\/verify\)/).waitFor();
  await page.getByRole('button',{name:'Ver conteúdo HTML'}).click();
  await frame.getByRole('heading').waitFor();
  if(await page.locator('body').textContent().then(text=>text.includes('COMPROMISED')))throw Error('Mail script escaped');
  if(errors.length)throw Error(errors.join('; '));
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Horizontal overflow');
  await page.screenshot({path:'/tmp/d4-html-mobile.png',fullPage:true});
  await page.setViewportSize({width:1365,height:900});
  await page.screenshot({path:'/tmp/d4-html-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>location.hash='/inbox');
  await page.locator('.d4-mail-row').waitFor();
  await page.getByRole('button',{name:'Ver perfil de Roblox'}).click();
  await page.getByRole('dialog').waitFor();
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({state:'hidden'});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Inbox horizontal overflow');
  await page.screenshot({path:'/tmp/d4-sender-inbox-mobile.png',fullPage:true});
  await page.getByRole('button').filter({hasText:'Teste do leitor HTML'}).click();
  await page.getByRole('button',{name:'Ver texto',exact:true}).waitFor();
  console.log('PASS automatic HTML, images, button popup, text toggle, sandbox, sender avatars/cards, inbox navigation, mobile/desktop');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
