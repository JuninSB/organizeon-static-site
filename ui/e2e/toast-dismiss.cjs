const fs=require('fs'),path=require('path');const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');const root=path.resolve(__dirname,'../..');
(async()=>{const browser=await chromium.launch({channel:'chromium',headless:true,args:['--no-sandbox','--no-zygote','--single-process','--no-proxy-server','--in-process-gpu','--disable-gpu-sandbox']});try{
const page=await browser.newPage({viewport:{width:390,height:850},isMobile:true,hasTouch:true});
await page.route('https://test.local/**',route=>{const url=new URL(route.request().url());if(url.pathname==='/')return route.fulfill({contentType:'text/html',body:'<button id="underlying" style="position:fixed;top:10px;left:10px" onclick="this.textContent=\'clicked\'">Behind overlay</button>'});const file=path.join(root,url.pathname);return route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'text/javascript':'text/css'});});
await page.goto('https://test.local/');await page.evaluate(async()=>{const ui=await import('/ui-dist/client-ui.js');window.testUI=ui;const host=document.createElement('div');host.style.cssText='position:fixed;inset:0;z-index:2147483647;pointer-events:none';document.body.append(host);ui.mountClientToaster(host,'/ui-dist/client-ui.css');});
await page.waitForTimeout(200);await page.evaluate(()=>window.testUI.showClientToast('Notificação de teste','success'));
await page.getByText('Notificação de teste',{exact:true}).waitFor();
const close=page.locator('[data-close-button]').first();await close.click();await page.getByText('Notificação de teste',{exact:true}).waitFor({state:'hidden'});
await page.evaluate(()=>window.testUI.showConnectionToast('Conectando','Preparando',30,0));await page.getByRole('button',{name:'Fechar notificação'}).click();await page.getByText('Preparando',{exact:true}).waitFor({state:'hidden'});
await page.locator('#underlying').click();if(await page.locator('#underlying').textContent()!=='clicked')throw Error('Overlay blocks page');
console.log('PASS mobile: standard toast X, connection notification X, overlay click-through');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
