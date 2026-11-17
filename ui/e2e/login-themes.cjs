const fs=require('fs'),path=require('path');
const {chromium}=require('/tmp/replay-browser/node_modules/playwright');
const repo=path.resolve(__dirname,'../..');
const local=process.env.THEME_TEST_LOCAL==='1';
(async()=>{
 let browser;
 try{
  for(const service of ['d2','d3','d4','client']){
   browser=await chromium.launch({headless:true,args:['--no-sandbox','--no-zygote','--single-process','--no-proxy-server','--in-process-gpu','--disable-gpu-sandbox']});
   const context=await browser.newContext({viewport:{width:390,height:844}});
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   if(local||service==='client')await page.route('https://juninsb.github.io/organizeon-static-site/ui-dist/**',route=>{
    const file=path.join(repo,'ui-dist',new URL(route.request().url()).pathname.split('/').at(-1));
    if(fs.existsSync(file))return route.fulfill({path:file,headers:{'Access-Control-Allow-Origin':'*'},contentType:file.endsWith('.css')?'text/css':'text/javascript'});
    return route.continue();
   });
   if(local&&['d3','d4'].includes(service))await page.route('https://organizeon.com.br/'+service+'/**',route=>{
    const url=new URL(route.request().url());if(url.pathname.includes('/api/'))return route.continue();
    const directory=service==='d3'?'/root/unlock/d3-profile-work/dist':path.join(repo,'d4-dist');
    const file=url.pathname.endsWith('/login')?path.join(directory,service==='d3'?'index.html':'d4.html'):path.join(directory,url.pathname.slice(4));
    if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({path:file,contentType:file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':undefined});
    return route.continue();
   });
   if(service==='client'){
    await page.route('https://client-theme.test/',route=>route.fulfill({contentType:'text/html',body:`<meta name="viewport" content="width=device-width,initial-scale=1"><div id="host"></div><script type="module">import{mountClientSurface}from'https://juninsb.github.io/organizeon-static-site/ui-dist/client-ui.js';mountClientSurface(document.getElementById('host'),{type:'login',onSubmit:async()=>{},onGuest:()=>{}},'https://juninsb.github.io/organizeon-static-site/ui-dist/client-ui.css');</script>`}));
    await page.goto('https://client-theme.test/');
   }else await page.goto('https://organizeon.com.br/'+service+'/login');
   const toggle=page.getByRole('button',{name:'Ativar tema claro',exact:true});await toggle.waitFor();
   const username=page.getByRole('textbox',{name:'Usuário',exact:true});await username.fill('fixture-theme');
   await toggle.click();await page.getByRole('button',{name:'Ativar tema escuro',exact:true}).waitFor();
   if(await username.inputValue()!=='fixture-theme')throw Error(service+' loses form state on theme change');
   const black=page.locator('img[src*="organizeon_preto_separado_1024.png"]:visible');await black.first().waitFor();
   await page.waitForTimeout(200);await page.screenshot({path:'/tmp/'+service+'-login-theme-light.png',fullPage:true});
   await page.reload();await page.getByRole('button',{name:'Ativar tema escuro',exact:true}).waitFor();
   await page.getByRole('button',{name:'Ativar tema escuro',exact:true}).click();await page.getByRole('button',{name:'Ativar tema claro',exact:true}).waitFor();
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error(service+' viewport overflow');
   if(errors.length)throw Error(service+' '+JSON.stringify(errors));
   console.log('PASS',service,'toggle persistence form-state light-brand');await browser.close();
  }
 }finally{if(browser)await browser.close();}
})().catch(e=>{console.error(e.message);process.exit(1)});
