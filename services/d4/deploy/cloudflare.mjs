import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
const account='6e49ae0596e22af097c9b03b081dfb0e', zone='facae9e82f7262f66f23de6ca84e73e0';
const token=(await readFile('/sdcard/lib/cloudflare-token.txt','utf8')).trim();
const name='organizeon-d4-mail';
async function request(path,method='GET',body){
 const response=await fetch('https://api.cloudflare.com/client/v4'+path,{method,headers:{Authorization:'Bearer '+token,...(body instanceof FormData?{}:{'Content-Type':'application/json'})},body:body===undefined?undefined:body instanceof FormData?body:JSON.stringify(body)});
 const result=await response.json();if(!response.ok||!result.success)throw Error(JSON.stringify({path,status:response.status,errors:result.errors}));return result.result;
}
const root=new URL('../',import.meta.url);
await mkdir(new URL('private/',root),{recursive:true,mode:0o700});
let secret;
try{secret=(await readFile(new URL('private/inbound.key',root),'utf8')).trim();}catch{secret=randomBytes(32).toString('hex');await writeFile(new URL('private/inbound.key',root),secret,{mode:0o600});}
const namespaces=await request(`/accounts/${account}/storage/kv/namespaces`);
let kv=namespaces.find(x=>x.title==='organizeon-d4-mail-pending');
if(!kv)kv=await request(`/accounts/${account}/storage/kv/namespaces`,'POST',{title:'organizeon-d4-mail-pending'});
const dns=await request(`/zones/${zone}/dns_records?per_page=100`);
const rules=await request(`/zones/${zone}/email/routing/rules`);
const catchall=await request(`/zones/${zone}/email/routing/rules/catch_all`);
await writeFile(new URL('private/cloudflare-before.json',root),JSON.stringify({dns,rules,catchall},null,2),{mode:0o600});
const form=new FormData();
form.set('metadata',new Blob([JSON.stringify({main_module:'email.js',compatibility_date:'2026-11-17',bindings:[{type:'kv_namespace',name:'PENDING',namespace_id:kv.id},{type:'plain_text',name:'BACKEND_URL',text:'https://organizeon.com.br'},{type:'secret_text',name:'INBOUND_SECRET',text:secret}]})],{type:'application/json'}));
form.set('email.js',new Blob([await readFile(new URL('worker/email.js',root),'utf8')],{type:'application/javascript+module'}),'email.js');
await request(`/accounts/${account}/workers/scripts/${name}`,'PUT',form);
await request(`/accounts/${account}/workers/scripts/${name}/schedules`,'PUT',[{cron:'*/5 * * * *'}]);
console.log('WORKER_DEPLOYED',name,'QUEUE',kv.id);
if(process.argv.includes('--activate')){
 await request(`/zones/${zone}/email/routing/rules/catch_all`,'PUT',{enabled:true,name:'OrganizeOn D4 mailboxes',matchers:[{type:'all'}],actions:[{type:'worker',value:[name]}]});
 console.log('CATCH_ALL_ACTIVE');
}
