const fs=require('fs'),path=require('path');
const {pathToFileURL}=require('url');
const {chromium}=require('/tmp/replay-browser/node_modules/playwright');
const root=path.resolve(__dirname,'../..');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--no-zygote','--single-process','--no-proxy-server','--in-process-gpu','--disable-gpu-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  let profile={displayName:'Teste',nameColor:'#FAFAFA',bio:'Descrição preservada',avatarShape:'circle',avatar:null,bannerImage:null,bannerFit:'cover'};
  const errors=[],patches=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://api.organizeon.com.br/**',route=>{
   if(route.request().method()==='PATCH'){const patch=route.request().postDataJSON();patches.push(patch);profile={...profile,...patch};}
   return route.fulfill({json:{profile}});
  });
  await page.route('https://profile-bg.test/**',route=>{
   const url=new URL(route.request().url());
   if(url.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta name="viewport" content="width=device-width,initial-scale=1"><div id="nav"></div><script type="module">import{mountNavigation}from"/ui-dist/client-ui.js";mountNavigation(document.querySelector("#nav"),{type:"account",username:"Teste",role:"user",guest:false,canOpenDashboard:false,proxyLabel:"OrganizeOn",onNavigate(){}},"/ui-dist/client-ui.css");</script>'});
   if(process.env.PROFILE_PUBLIC==='1'&&url.pathname.startsWith('/ui-dist/'))return route.fetch({url:'https://juninsb.github.io/organizeon-static-site'+url.pathname+'?v=profile-image-style-20261117',maxRetries:2}).then(response=>route.fulfill({response}));
   const file=path.join(root,url.pathname);return fs.existsSync(file)?route.fulfill({path:file,contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':undefined}):route.fulfill({status:404});
  });
  const openProfile=async()=>{await page.getByRole('button',{name:'Abrir menu',exact:true}).click();await page.getByRole('button',{name:'Perfil de Teste'}).click();await page.getByRole('menuitem',{name:'Perfil',exact:true}).click();await page.getByRole('dialog',{name:'Meu perfil',exact:true}).waitFor();};
  await page.goto('https://profile-bg.test/');await openProfile();
  if(await page.getByRole('button',{name:'Editar fundo do perfil'}).count())throw Error('Separate background pencil remains');
  await page.getByRole('button',{name:'Editar aparência'}).click();
  await page.getByRole('combobox',{name:'Estilo do fundo'}).click();
  await page.getByRole('option',{name:'Imagem',exact:true}).click();
  const checkbox=page.getByRole('checkbox',{name:'Esticar para preencher'});
  if(await checkbox.isChecked())throw Error('Stretch must default off');
  const png=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=400;c.height=200;const x=c.getContext('2d');x.fillStyle='#b91c1c';x.fillRect(0,0,200,200);x.fillStyle='#1d4ed8';x.fillRect(200,0,200,200);return c.toDataURL('image/png').split(',')[1];});
  await page.getByLabel('Selecionar imagem de fundo').setInputFiles({name:'fixture.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
  const crop=page.getByLabel('Prévia do recorte');await page.getByRole('button',{name:'Usar recorte'}).waitFor();
  await page.waitForFunction(()=>{const host=document.querySelector('#nav').shadowRoot;return ![...host.querySelectorAll('button')].find(button=>button.textContent.includes('Usar recorte')).disabled;});
  const before=await crop.evaluate(c=>c.toDataURL());await page.getByRole('button',{name:'Girar 90°'}).click();
  await page.waitForFunction(previous=>document.querySelector('#nav').shadowRoot.querySelector('canvas').toDataURL()!==previous,before);
  await checkbox.click();if(!(await checkbox.isChecked()))throw Error('Stretch not selected');
  await page.screenshot({path:'/tmp/profile-background-editor.png',fullPage:true});
  await page.getByRole('button',{name:'Usar recorte'}).click();await page.getByRole('button',{name:'Salvar alterações'}).click();
  const banner=page.getByAltText('Fundo do perfil');await banner.waitFor();
  await banner.evaluate(image=>image.decode());
  if(await banner.evaluate(image=>getComputedStyle(image).objectFit)!=='fill')throw Error('Fit not applied');
  if(profile.bannerFit!=='fill'||!profile.bannerImage?.startsWith('data:image/jpeg;base64,')||profile.avatar!==null)throw Error('Wrong save contract');
  fs.writeFileSync('/tmp/profile-background-crop.jpg',Buffer.from(profile.bannerImage.split(',')[1],'base64'));
  const backend=process.env.PROFILE_BACKEND_SOURCE||path.resolve(root,'../backend-cleanup/organizeon-backend/src/profiles.mjs');
  const {validateProfile}=await import(pathToFileURL(backend));
  const saved=validateProfile(patches.at(-1),{username:'fixture'});if(saved.bannerImage!==profile.bannerImage||saved.bannerFit!=='fill')throw Error('Backend rejects cropped image');
  await page.reload();await openProfile();await page.getByAltText('Fundo do perfil').waitFor();
  await page.screenshot({path:'/tmp/profile-background-saved.png',fullPage:true});
  await page.setViewportSize({width:1365,height:900});await page.reload();await openProfile();await page.getByAltText('Fundo do perfil').waitFor();
  await page.screenshot({path:'/tmp/profile-background-desktop.png',fullPage:true});
  await page.getByRole('button',{name:'Editar aparência'}).click();
  await page.getByRole('button',{name:'Ajustar imagem'}).click();await page.getByRole('button',{name:'Girar 90°'}).waitFor();
  await page.getByRole('button',{name:'Cancelar recorte'}).click();
  await page.getByRole('button',{name:'Remover fundo'}).click();await page.getByRole('button',{name:'Salvar alterações'}).click();
  await page.getByAltText('Fundo do perfil').waitFor({state:'detached'});
  if(profile.bannerImage!==null||profile.bio!=='Descrição preservada')throw Error('Removal lost other fields');
  if(errors.length)throw Error(errors.join('; '));
  console.log('PASS normal account, image upload, rotation, optional stretch, crop/backend validation, reload persistence, removal');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
