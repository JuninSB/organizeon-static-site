import hashlib
import hmac
import json
import logging
import os
import sqlite3
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit, quote
from mail import MailStore, MAX_RAW, now
from smtp_delivery import deliver

ROOT=Path(os.environ.get('D4_HOME',Path(__file__).resolve().parents[1]))
STATE=Path(os.environ.get('D4_STATE',Path.home()/'.local/share/organizeon/d4'))
os.umask(0o077)
DATA=STATE/'data';DATA.mkdir(parents=True,exist_ok=True,mode=0o700)
STORE=MailStore(DATA/'mail.sqlite3')
INTERNAL=(STATE/'config/internal.key').read_text().strip()
INBOUND=(STATE/'config/inbound.key').read_text().strip()
SEND_LOCK=threading.Lock()
with STORE.connect() as db:
    db.execute("UPDATE messages SET folder='failed',delivery=? WHERE folder='sending'",(json.dumps({'status':'uncertain','error':'O serviço reiniciou durante o envio. Confira com o destinatário antes de reenviar.','at':now()}),))

class Handler(BaseHTTPRequestHandler):
    server_version='OrganizeOnD4'
    def log_message(self,*args): pass
    def answer(self,status,data,kind='application/json; charset=utf-8',headers=None):
        content=json.dumps(data,ensure_ascii=False).encode() if kind.startswith('application/json') else data
        self.send_response(status);self.send_header('Content-Type',kind);self.send_header('Content-Length',str(len(content)))
        self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff')
        for k,v in (headers or {}).items():self.send_header(k,v)
        self.end_headers()
        if self.command!='HEAD':self.wfile.write(content)
    def body(self,max_bytes=MAX_RAW):
        size=int(self.headers.get('Content-Length','0'))
        if size<0 or size>max_bytes:raise ValueError('Mensagem excede 20 MB.')
        raw=self.rfile.read(size)
        if len(raw)!=size:raise ValueError('Corpo incompleto.')
        return raw
    def route(self):
        if not hmac.compare_digest(self.headers.get('X-D4-Internal',''),INTERNAL):return self.answer(403,{'error':'Acesso negado.'})
        url=urlsplit(self.path);path=url.path;params=parse_qs(url.query)
        if path=='/d4/api/inbound' and self.command=='POST':
            raw=self.body();stamp=self.headers.get('X-D4-Timestamp','')
            try:
                if abs(time.time()-int(stamp))>300:raise ValueError()
            except ValueError:return self.answer(401,{'error':'Assinatura expirada.'})
            expected=hmac.new(INBOUND.encode(),(stamp+'\n'+self.path+'\n'+hashlib.sha256(raw).hexdigest()).encode(),hashlib.sha256).hexdigest()
            if not hmac.compare_digest(expected,self.headers.get('X-D4-Signature','')):return self.answer(401,{'error':'Assinatura inválida.'})
            mid=STORE.ingest(params.get('to',[''])[0],raw,params.get('from',[''])[0])
            return self.answer(200 if mid else 404,{'id':mid,'accepted':bool(mid)})
        if path=='/d4/internal/health':return self.answer(200,{'ok':True})
        owner=self.headers.get('X-D4-User','')
        if not owner:return self.answer(401,{'error':'Autenticação necessária.'})
        api='/d4/api/'
        if path.startswith(api):
            action=path[len(api):].strip('/');parts=action.split('/')
            data=json.loads(self.body()) if self.command in ('POST','PATCH','PUT') else {}
            if action=='mailboxes':
                if self.command=='GET':return self.answer(200,{'items':STORE.mailboxes(owner)})
                if self.command=='POST':return self.answer(201,STORE.create_mailbox(owner,data.get('local',''),data.get('label','')))
            if len(parts)==2 and parts[0]=='mailboxes':
                STORE.mailbox(owner,parts[1])
                if self.command=='PATCH':
                    with STORE.connect() as db:db.execute('UPDATE mailboxes SET label=? WHERE id=?',(str(data.get('label',''))[:80],parts[1]))
                    return self.answer(200,{'ok':True})
                if self.command=='DELETE':
                    with STORE.connect() as db:
                        count=db.execute('SELECT count(*) FROM messages WHERE mailbox=?',(parts[1],)).fetchone()[0]
                        if count:raise ValueError('Esta caixa contém mensagens. Preserve os e-mails ou use outro endereço.')
                        db.execute('DELETE FROM mailboxes WHERE id=?',(parts[1],))
                    return self.answer(200,{'ok':True})
            if action=='messages' and self.command=='GET':return self.answer(200,STORE.list_messages(owner,params.get('mailbox',[''])[0],params.get('folder',['inbox'])[0],params.get('q',[''])[0],max(0,int(params.get('page',['0'])[0]))))
            if action=='drafts' and self.command=='POST':return self.answer(200,STORE.save_draft(owner,data))
            if parts[0]=='messages' and len(parts)>=2:
                mid=parts[1]
                if len(parts)==2:
                    if self.command=='GET':return self.answer(200,STORE.message(owner,mid))
                    if self.command=='PATCH':STORE.move(owner,mid,data.get('folder','trash'));return self.answer(200,{'ok':True})
                    if self.command=='DELETE':
                        current=STORE.message(owner,mid)
                        if current['folder']!='trash':raise ValueError('Mova a mensagem para a lixeira antes de excluir definitivamente.')
                        with STORE.connect() as db:
                            db.execute('DELETE FROM attachments WHERE message=?',(mid,))
                            db.execute('DELETE FROM messages WHERE id=?',(mid,))
                        return self.answer(200,{'ok':True})
                if len(parts)==3 and parts[2]=='send' and self.command=='POST':
                    if not SEND_LOCK.acquire(blocking=False):return self.answer(409,{'error':'Outro envio está em andamento. Aguarde.'})
                    try:return self.answer(200,deliver(STORE,owner,mid))
                    finally:SEND_LOCK.release()
                if len(parts)==3 and parts[2]=='raw' and self.command=='GET':
                    STORE.message(owner,mid)
                    with STORE.connect() as db:raw=db.execute('SELECT raw FROM messages WHERE id=?',(mid,)).fetchone()['raw']
                    return self.answer(200,raw or b'', 'message/rfc822',{'Content-Disposition':'attachment; filename="message.eml"'})
            if parts[0]=='attachments' and len(parts)==2 and self.command=='GET':
                with STORE.connect() as db:
                    row=db.execute('SELECT a.* FROM attachments a JOIN messages m ON a.message=m.id JOIN mailboxes b ON m.mailbox=b.id WHERE a.id=? AND b.owner=?',(parts[1],owner)).fetchone()
                if not row:return self.answer(404,{'error':'Anexo não encontrado.'})
                return self.answer(200,row['data'],'application/octet-stream',{'Content-Disposition':"attachment; filename*=UTF-8''"+quote(row['name'],safe=''),'Content-Security-Policy':"sandbox; default-src 'none'"})
            if action=='settings':
                if self.command=='GET':return self.answer(200,STORE.settings(owner))
                if self.command=='PUT':return self.answer(200,STORE.save_settings(owner,data))
            return self.answer(404,{'error':'Recurso não encontrado.'})
        if self.command not in ('GET','HEAD'):return self.answer(405,{'error':'Método inválido.'})
        relative=path.removeprefix('/d4/').lstrip('/')
        target=(ROOT/'frontend/dist'/relative).resolve()
        root=(ROOT/'frontend/dist').resolve()
        if root not in target.parents or not target.is_file():target=root/'index.html'
        import mimetypes
        return self.answer(200,target.read_bytes(),mimetypes.guess_type(target.name)[0] or 'application/octet-stream')
    def do_GET(self):self.dispatch()
    def do_HEAD(self):self.dispatch()
    def do_POST(self):self.dispatch()
    def do_PATCH(self):self.dispatch()
    def do_DELETE(self):self.dispatch()
    def do_PUT(self):self.dispatch()
    def dispatch(self):
        try:self.route()
        except (ValueError,KeyError,TypeError,sqlite3.IntegrityError) as e:self.answer(400,{'error':str(e)[:300]})
        except (BrokenPipeError,ConnectionResetError):pass
        except Exception as e:
            logging.error('request_failed type=%s',type(e).__name__)
            self.answer(500,{'error':'Não foi possível concluir a operação.'})

if __name__=='__main__':
    os.umask(0o077)
    logging.basicConfig(level=logging.INFO,format='%(asctime)sZ %(levelname)s %(message)s')
    logging.info('D4 listening on localhost:8340')
    ThreadingHTTPServer(('127.0.0.1',8340),Handler).serve_forever()
