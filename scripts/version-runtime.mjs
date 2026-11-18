import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {posix} from 'node:path';
/** Version the shipped legacy import graph without breaking relative imports. */
export async function versionRuntime(root,manifest){
 const hash=value=>createHash('sha256').update(value).digest('hex').slice(0,16);
 const known=new Set(manifest.files.map(file=>file.path));
 const sources=manifest.files.filter(({path})=>/\.(?:m?js|css)$/.test(path)&&! /^(?:games|vendor)\//.test(path));
 const values=new Map();
 for(const {path}of sources){let value=await readFile(new URL(path,root),'utf8');value=value.replace(/\?v=runtime-[a-f0-9]{16}/g,'');if(path==='auth-client.js')value=value.replace(/const RUNTIME_ASSETS_REVISION = "[^"]*";/,'const RUNTIME_ASSETS_REVISION = "runtime";');values.set(path,value);}
 const clientRevision='ui-'+hash(values.get('ui-dist/client-ui.js')+values.get('ui-dist/client-ui.css'));
 let auth=values.get('auth-client.js').replace(/const CLIENT_UI_REVISION = "[^"]*";/,`const CLIENT_UI_REVISION = "${clientRevision}";`);values.set('auth-client.js',auth);
 const revision='runtime-'+hash(JSON.stringify([...values].sort(([a],[b])=>a.localeCompare(b))));
 for(const [path,source]of values){let next=source;
  if(!path.startsWith('ui-dist/')&&/\.m?js$/.test(path))next=source.replace(/(["'`])((?:\\.|(?!\1)[^\\\r\n])*)\1/g,(match,quote,value)=>{
   if(!value.includes('/')||! /\.(?:m?js|css)$/.test(value)||/^[a-z][\w+.-]*:/i.test(value))return match;
   const relative=posix.normalize(posix.join(posix.dirname(path),value));
   const resolved=known.has(value.replace(/^\//,''))||known.has(relative)||[...known].some(file=>value.endsWith('/'+file)||value.endsWith('}'+file));
   return resolved?quote+value+'?v='+revision+quote:match;
  });
  if(path==='auth-client.js')next=next.replace('const RUNTIME_ASSETS_REVISION = "runtime";',`const RUNTIME_ASSETS_REVISION = "${revision}";`);
  await writeFile(new URL(path,root),next);
 }
 return {revision,clientRevision};
}
