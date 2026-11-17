"""D4 mailbox storage and MIME handling. No external dependencies."""
import base64
import hashlib
import json
import re
import sqlite3
import uuid
from contextlib import contextmanager
from datetime import datetime, timezone
from email import policy
from email.parser import BytesParser

DOMAIN = 'organizeon.com.br'
MAX_RAW = 20 * 1024 * 1024
def now(): return datetime.now(timezone.utc).isoformat()
def identifier(): return uuid.uuid4().hex

class MailStore:
    def __init__(self, path):
        self.path = str(path)
        with self.connect() as db:
            db.executescript('''
            PRAGMA journal_mode=WAL;
            CREATE TABLE IF NOT EXISTS mailboxes(id TEXT PRIMARY KEY, owner TEXT NOT NULL, address TEXT UNIQUE NOT NULL, label TEXT NOT NULL, created TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS messages(id TEXT PRIMARY KEY, mailbox TEXT NOT NULL, folder TEXT NOT NULL, subject TEXT NOT NULL, sender TEXT NOT NULL, recipients TEXT NOT NULL, body TEXT NOT NULL, html TEXT NOT NULL DEFAULT '', created TEXT NOT NULL, unread INTEGER NOT NULL DEFAULT 1, raw BLOB, delivery TEXT, dedup TEXT UNIQUE);
            CREATE INDEX IF NOT EXISTS message_folder ON messages(mailbox,folder,created);
            CREATE TABLE IF NOT EXISTS attachments(id TEXT PRIMARY KEY, message TEXT NOT NULL, name TEXT NOT NULL, mime TEXT NOT NULL, data BLOB NOT NULL);
            CREATE INDEX IF NOT EXISTS attachment_message ON attachments(message);
            CREATE TABLE IF NOT EXISTS settings(owner TEXT PRIMARY KEY, data TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS address_reservations(address TEXT PRIMARY KEY, owner TEXT NOT NULL);
            INSERT OR IGNORE INTO address_reservations SELECT address,owner FROM mailboxes;
            ''')
            if 'reply_to' not in {row['name'] for row in db.execute('PRAGMA table_info(messages)')}:
                db.execute('ALTER TABLE messages ADD COLUMN reply_to TEXT')
    @contextmanager
    def connect(self):
        db = sqlite3.connect(self.path, timeout=10)
        db.row_factory = sqlite3.Row
        db.execute('PRAGMA foreign_keys=ON')
        try:
            with db: yield db
        finally: db.close()
    def mailboxes(self, owner):
        with self.connect() as db: return [dict(r) for r in db.execute('SELECT * FROM mailboxes WHERE owner=? ORDER BY created',(owner,))]
    def mailbox(self, owner, mailbox):
        with self.connect() as db: row = db.execute('SELECT * FROM mailboxes WHERE owner=? AND id=?',(owner,mailbox)).fetchone()
        if not row: raise ValueError('Caixa postal não encontrada.')
        return dict(row)
    def create_mailbox(self, owner, local, label):
        local = str(local).strip().lower()
        if not re.fullmatch(r'[a-z0-9][a-z0-9._-]{0,62}',local) or '..' in local: raise ValueError('Endereço inválido. Use letras, números, ponto, hífen ou sublinhado.')
        row = dict(id=identifier(), owner=owner, address=local+'@'+DOMAIN, label=str(label or local)[:80], created=now())
        try:
            with self.connect() as db:
                reserved=db.execute('SELECT owner FROM address_reservations WHERE address=?',(row['address'],)).fetchone()
                if reserved and reserved['owner']!=owner:raise ValueError('Este endereço já está reservado.')
                db.execute('INSERT OR IGNORE INTO address_reservations VALUES(?,?)',(row['address'],owner))
                db.execute('INSERT INTO mailboxes VALUES(:id,:owner,:address,:label,:created)',row)
        except sqlite3.IntegrityError: raise ValueError('Este endereço já está em uso.')
        return row
    def ingest(self, recipient, raw, envelope):
        with self.connect() as db:
            box = db.execute('SELECT * FROM mailboxes WHERE address=?',(recipient.lower(),)).fetchone()
            if not box: return None
            digest = hashlib.sha256(recipient.lower().encode()+b'\0'+raw).hexdigest()
            existing = db.execute('SELECT id FROM messages WHERE dedup=?',(digest,)).fetchone()
            if existing: return existing['id']
            parsed = BytesParser(policy=policy.default).parsebytes(raw)
            text, html, files = [], [], []
            for part in parsed.walk():
                if part.is_multipart(): continue
                payload = part.get_payload(decode=True) or b''
                if part.get_filename() or part.get_content_disposition() == 'attachment':
                    files.append((part.get_filename() or 'anexo',part.get_content_type(),payload))
                elif part.get_content_type() in ('text/plain','text/html'):
                    content = payload.decode(part.get_content_charset() or 'utf-8',errors='replace')
                    (html if part.get_content_type()=='text/html' else text).append(content)
            mid=identifier()
            db.execute('INSERT INTO messages(id,mailbox,folder,subject,sender,recipients,body,html,created,raw,dedup) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                       (mid,box['id'],'inbox',str(parsed.get('subject','(Sem assunto)'))[:1000],str(parsed.get('from',envelope))[:2000],json.dumps([recipient]),'\n'.join(text),'\n'.join(html),now(),raw,digest))
            for name,mime,data in files: db.execute('INSERT INTO attachments VALUES(?,?,?,?,?)',(identifier(),mid,name[:255],mime,data))
            return mid
    def list_messages(self,owner,mailbox,folder,query='',page=0):
        self.mailbox(owner,mailbox)
        if folder not in ('inbox','sent','drafts','trash','failed'): raise ValueError('Pasta inválida.')
        with self.connect() as db:
            rows=db.execute('SELECT id,mailbox,folder,subject,sender,recipients,substr(body,1,140) AS snippet,created,unread,delivery FROM messages WHERE mailbox=? AND folder=? AND (subject LIKE ? OR body LIKE ? OR sender LIKE ?) ORDER BY created DESC LIMIT 51 OFFSET ?', (mailbox,folder,*(['%'+query[:200]+'%']*3),page*50)).fetchall()
        return {'items':[dict(r) for r in rows[:50]],'hasMore':len(rows)>50}
    def message(self,owner,mid):
        with self.connect() as db:
            row=db.execute('SELECT m.* FROM messages m JOIN mailboxes b ON m.mailbox=b.id WHERE m.id=? AND b.owner=?',(mid,owner)).fetchone()
            if not row: raise ValueError('Mensagem não encontrada.')
            result=dict(row); result.pop('raw',None);result.pop('dedup',None)
            if row['raw']:
                headers=BytesParser(policy=policy.default).parsebytes(row['raw'],headersonly=True)
                result['replyAddress']=str(headers.get('reply-to',headers.get('from',row['sender'])))[:2000]
                result['messageId']=str(headers.get('message-id',''))[:1000]
                result['references']=str(headers.get('references',''))[:3000]
            result['recipients']=json.loads(result['recipients'])
            result['attachments']=[dict(r) for r in db.execute('SELECT id,name,mime,length(data) AS size FROM attachments WHERE message=?',(mid,))]
            db.execute('UPDATE messages SET unread=0 WHERE id=?',(mid,))
            return result
    def save_draft(self,owner,data):
        box=self.mailbox(owner,data.get('mailbox',''))
        reply=data.get('replyId') or None
        if reply:self.message(owner,reply)
        mid=data.get('id') or identifier()
        recipients=data.get('to',[])
        if not isinstance(recipients,list) or len(recipients)>20 or any(not isinstance(x,str) or '\n' in x or '\r' in x or not re.fullmatch(r'[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+',x) for x in recipients): raise ValueError('Destinatários inválidos (máximo 20).')
        subject=str(data.get('subject',''))[:1000];body=str(data.get('body',''))
        if '\n' in subject or '\r' in subject or len(body)>500000: raise ValueError('Assunto ou texto inválido.')
        files=data.get('attachments',[])
        if len(files)>20: raise ValueError('Máximo de 20 anexos.')
        decoded=[];total=0
        for file in files:
            content=base64.b64decode(file.get('data',''),validate=True);total+=len(content)
            if total>10*1024*1024: raise ValueError('Anexos excedem 10 MB.')
            decoded.append((str(file.get('name','anexo'))[:255],str(file.get('mime','application/octet-stream')),content))
        with self.connect() as db:
            old=db.execute('SELECT mailbox,folder FROM messages WHERE id=?',(mid,)).fetchone()
            if old and (old['mailbox']!=box['id'] or old['folder']!='drafts'): raise ValueError('Este rascunho não pode ser alterado.')
            db.execute('INSERT INTO messages(id,mailbox,folder,subject,sender,recipients,body,created,unread,reply_to) VALUES(?,?,?,?,?,?,?,?,0,?) ON CONFLICT(id) DO UPDATE SET subject=excluded.subject,recipients=excluded.recipients,body=excluded.body,created=excluded.created,reply_to=coalesce(excluded.reply_to,messages.reply_to)', (mid,box['id'],'drafts',subject,box['address'],json.dumps(recipients),body,now(),reply))
            # Existing attachments are retained when editing a saved draft unless explicitly replaced.
            if 'attachments' in data:
                db.execute('DELETE FROM attachments WHERE message=?',(mid,))
                for name,mime,content in decoded: db.execute('INSERT INTO attachments VALUES(?,?,?,?,?)',(identifier(),mid,name,mime,content))
        return self.message(owner,mid)
    def move(self,owner,mid,folder):
        self.message(owner,mid)
        if folder not in ('trash','inbox'): raise ValueError('Destino inválido.')
        with self.connect() as db: db.execute('UPDATE messages SET folder=? WHERE id=? AND folder NOT IN (\'sending\')',(folder,mid))
    def settings(self,owner,public=True):
        with self.connect() as db: row=db.execute('SELECT data FROM settings WHERE owner=?',(owner,)).fetchone()
        data=json.loads(row['data']) if row else {'mode':'direct','port':587,'security':'starttls','host':'','username':''}
        if public: data={**data,'hasPassword':bool(data.get('password'))};data.pop('password',None)
        return data
    def save_settings(self,owner,data):
        old=self.settings(owner,False)
        mode=data.get('mode','direct');security=data.get('security','starttls')
        if mode not in ('direct','relay','cloudflare') or security not in ('starttls','tls'): raise ValueError('Configuração SMTP inválida.')
        host=str(data.get('host','')).strip();port=int(data.get('port',587))
        if not 1<=port<=65535 or any(x in host for x in '\r\n/'): raise ValueError('Servidor SMTP inválido.')
        values={'mode':mode,'host':host,'port':port,'security':security,'username':str(data.get('username',''))[:255], 'password':data.get('password') or old.get('password','')}
        with self.connect() as db: db.execute('INSERT INTO settings VALUES(?,?) ON CONFLICT(owner) DO UPDATE SET data=excluded.data',(owner,json.dumps(values)))
        return self.settings(owner)
