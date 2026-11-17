"""Real SMTP delivery. Ambiguous DATA failures are never automatically retried."""
import json
import smtplib
import ssl
from pathlib import Path
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from mail import BREVO, DOMAIN, now

class ReceiptMixin:
    def data(self, message):
        code, response = super().data(message)
        self.d4_receipt = {'code':code,'response':response.decode('utf-8',errors='replace')[:500]}
        return code, response

class SubmissionSMTP(ReceiptMixin, smtplib.SMTP): pass
class SubmissionSMTPSSL(ReceiptMixin, smtplib.SMTP_SSL): pass

def deliver(store,owner,mid):
    message=store.message(owner,mid)
    if message['folder']!='drafts': raise ValueError('Salve um rascunho antes de enviar.')
    recipients=message['recipients']
    if not recipients: raise ValueError('Adicione um destinatário.')
    settings=store.settings(owner,False)
    mime=EmailMessage();mime['From']=message['sender'];mime['To']=', '.join(recipients)
    mime['Subject']=message['subject'];mime['Date']=formatdate(localtime=False);mime['Message-ID']=make_msgid(domain=DOMAIN)
    if message.get('reply_to'):
        parent=store.message(owner,message['reply_to'])
        if parent.get('messageId'):
            mime['In-Reply-To']=parent['messageId']
            mime['References']=(parent.get('references','')+' '+parent['messageId']).strip()
    mime.set_content(message['body'])
    with store.connect() as db:
        for row in db.execute('SELECT * FROM attachments WHERE message=?',(mid,)):
            major,_,minor=row['mime'].partition('/')
            mime.add_attachment(row['data'],maintype=major or 'application',subtype=minor or 'octet-stream',filename=row['name'])
        changed=db.execute("UPDATE messages SET folder='sending' WHERE id=? AND folder='drafts'",(mid,)).rowcount
        if not changed: raise ValueError('Envio já iniciado.')
    outcomes=[]; receipts=[]; phase='prepare'; token=''
    try:
        if settings['mode']=='brevo':
            token=(Path(store.path).parent.parent/'config/brevo-smtp.key').read_text().strip()
            phase='connect'
            with SubmissionSMTP(BREVO['host'],BREVO['port'],timeout=30) as client:
                client.ehlo();phase='tls'
                client.starttls(context=ssl.create_default_context());client.ehlo()
                phase='authenticate';client.login(BREVO['username'],token)
                phase='submit';refused=client.send_message(mime)
                outcomes=[{'recipient':r,'status':'rejected' if r in refused else 'accepted','code':refused[r][0] if r in refused else 250} for r in recipients]
                if getattr(client,'d4_receipt',None):receipts.append(client.d4_receipt)
        elif settings['mode']=='cloudflare':
            token=(Path(store.path).parent.parent/'config/cloudflare-token.txt').read_text().strip()
            with smtplib.SMTP_SSL('smtp.mx.cloudflare.net',465,timeout=30,context=ssl.create_default_context()) as client:
                client.login('api_token',token)
                phase='submit';refused=client.send_message(mime)
                outcomes=[{'recipient':r,'status':'rejected' if r in refused else 'accepted','code':refused[r][0] if r in refused else 250} for r in recipients]
        elif settings['mode']=='relay':
            if not settings.get('host'): raise ValueError('Configure o servidor SMTP externo.')
            phase='connect'
            cls=SubmissionSMTPSSL if settings.get('security')=='tls' else SubmissionSMTP
            with cls(settings['host'],settings['port'],timeout=25,**({'context':ssl.create_default_context()} if cls is SubmissionSMTPSSL else {})) as client:
                client.ehlo()
                if cls is SubmissionSMTP: phase='tls';client.starttls(context=ssl.create_default_context());client.ehlo()
                if settings.get('username'):phase='authenticate';client.login(settings['username'],settings.get('password',''))
                phase='submit';refused=client.send_message(mime)
                if getattr(client,'d4_receipt',None):receipts.append(client.d4_receipt)
                outcomes=[{'recipient':r,'status':'rejected' if r in refused else 'accepted','code':refused[r][0] if r in refused else 250} for r in recipients]
        else:
            import dns.resolver
            groups={}
            for recipient in recipients: groups.setdefault(recipient.rsplit('@',1)[1].lower(),[]).append(recipient)
            for domain,targets in groups.items():
                exchanges=sorted(dns.resolver.resolve(domain,'MX',lifetime=10),key=lambda x:x.preference)
                hosts=[str(x.exchange).rstrip('.') for x in exchanges]
                if not hosts or not hosts[0]: raise ValueError('O domínio não aceita e-mail (MX nulo).')
                client=None
                for host in hosts:
                    try: client=smtplib.SMTP(host,25,local_hostname='mail.'+DOMAIN,timeout=12);break
                    except (OSError,smtplib.SMTPConnectError):continue
                if client is None: raise ValueError('Não foi possível conectar à porta 25. Configure SMTP externo nas configurações.')
                with client:
                    client.ehlo()
                    if client.has_extn('starttls'):client.starttls(context=ssl.create_default_context());client.ehlo()
                    phase='submit';refused=client.send_message(mime,to_addrs=targets)
                    outcomes.extend({'recipient':r,'status':'rejected' if r in refused else 'accepted','code':refused[r][0] if r in refused else 250} for r in targets)
        accepted=bool(outcomes) and all(x['status']=='accepted' for x in outcomes)
        result={'status':'accepted' if accepted else 'partial','transport':settings['mode'],'receipts':receipts,'recipients':outcomes,'at':now(),'messageId':str(mime['Message-ID'])}
        folder='sent' if accepted else 'failed'
    except Exception as error:
        # DATA may have reached the peer before a connection failure: never claim rejection or resend automatically.
        detail=str(error)
        for secret in [settings.get('password',''),locals().get('token','')]:
            if secret:detail=detail.replace(secret,'[redacted]')
        known=isinstance(error,(smtplib.SMTPResponseException,smtplib.SMTPRecipientsRefused))
        if isinstance(error,smtplib.SMTPRecipientsRefused):
            outcomes.extend({'recipient':recipient,'status':'rejected','code':reply[0]} for recipient,reply in error.recipients.items())
        elif isinstance(error,smtplib.SMTPDataError):
            attempted={item['recipient'] for item in outcomes}
            outcomes.extend({'recipient':recipient,'status':'rejected','code':error.smtp_code} for recipient in recipients if recipient not in attempted)
        confirmed=len(outcomes)==len(recipients) and all(x['status']=='accepted' for x in outcomes)
        status='accepted' if confirmed else 'partial' if any(x['status']=='accepted' for x in outcomes) else 'rejected' if known else 'uncertain' if phase=='submit' else 'failed'
        result={'status':status,'phase':phase,'transport':settings['mode'],'code':getattr(error,'smtp_code',None),'warning' if confirmed else 'error':detail[:500],'receipts':receipts,'recipients':outcomes,'at':now(),'messageId':str(mime['Message-ID'])};folder='sent' if confirmed else 'failed'
    serialized=json.dumps(result)
    for secret in [settings.get('password',''),token]:
        if secret:serialized=serialized.replace(secret,'[redacted]')
    with store.connect() as db:db.execute('UPDATE messages SET folder=?,delivery=?,raw=? WHERE id=?',(folder,serialized,mime.as_bytes(),mid))
    return store.message(owner,mid)
