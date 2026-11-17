export type Mailbox={id:string;address:string;label:string};
export type Attachment={id?:string;name:string;mime:string;size?:number;data?:string};
export type Message={id:string;mailbox:string;folder:string;subject:string;sender:string;replyAddress?:string;reply_to?:string;recipients:string[];body:string;html?:string;created:string;unread:number;snippet?:string;attachments:Attachment[];delivery?:string};
export async function api<T=any>(path:string,options:RequestInit={}):Promise<T>{
 const response=await fetch('/d4/api'+path,{...options,credentials:'same-origin',headers:{'Content-Type':'application/json',...options.headers}});
 const data=await response.json();
 if(!response.ok){if(response.status===401)location.assign('/d4/login');throw new Error(data.error==='invalid_credentials'?'Usuário ou senha incorretos.':data.error==='permission_required'?'Uma conta ultra admin ou superior é necessária.':data.error||'Não foi possível concluir.');}
 return data;
}
export const post=(data:unknown)=>({method:'POST',body:JSON.stringify(data)});
export const date=(value:string)=>new Date(value).toLocaleString('pt-BR');
export function bytesToBase64(bytes:Uint8Array){let text='';for(let i=0;i<bytes.length;i+=8192)text+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(text);}
