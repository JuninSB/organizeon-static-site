"""Real SMTP delivery. Ambiguous DATA failures are never automatically retried."""
import json
import smtplib
import ssl
from pathlib import Path
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from mail import DOMAIN, now

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
    outcomes=[]
    try:
        if settings['mode']=='cloudflare':
            token=(Path(store.path).parent.parent/'config/cloudflare-token.txt').read_text().strip()
            with smtplib.SMTP_SSL('smtp.mx.cloudflare.net',465,timeout=30,context=ssl.create_default_context()) as client:
                client.login('api_token',token)
                refused=client.send_message(mime)
                outcomes=[{'recipient':r,'status':'rejected' if r in refused else 'accepted','code':refused[r][0] if r in refused else 250} for r in recipients]
        elif settings['mode']=='relay':
            if not settings.get('host'): raise ValueError('Configure o servidor SMTP externo.')
            cls=smtplib.SMTP_SSL if settings.get('security')=='tls' else smtplib.SMTP
            with cls(settings['host'],settings['port'],timeout=25,**({'context':ssl.create_default_context()} if cls is smtplib.SMTP_SSL else {})) as client:
                client.ehlo()
                if cls is smtplib.SMTP: client.starttls(context=ssl.create_default_context());client.ehlo()
                if settings.get('username'):client.login(settings['username'],settings.get('password',''))
                refused=client.send_message(mime)
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
                    refused=client.send_message(mime,to_addrs=targets)
                    outcomes.extend({'recipient':r,'status':'rejected' if r in refused else 'accepted','code':refused[r][0] if r in refused else 250} for r in targets)
        accepted=all(x['status']=='accepted' for x in outcomes)
        result={'status':'accepted' if accepted else 'partial','recipients':outcomes,'at':now(),'messageId':str(mime['Message-ID'])}
        folder='sent' if accepted else 'failed'
    except Exception as error:
        # DATA may have reached the peer before a connection failure: never claim rejection or resend automatically.
        detail=str(error)
        for secret in [settings.get('password',''),locals().get('token','')]:
            if secret:detail=detail.replace(secret,'[redacted]')
        result={'status':'error_or_uncertain','error':detail[:500],'recipients':outcomes,'at':now(),'messageId':str(mime['Message-ID'])};folder='failed'
    with store.connect() as db:db.execute('UPDATE messages SET folder=?,delivery=?,raw=? WHERE id=?',(folder,json.dumps(result),mime.as_bytes(),mid))
    return store.message(owner,mid)
