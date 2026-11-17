import base64
import os
import sys
import tempfile
import unittest
import json
from pathlib import Path
from email.message import EmailMessage
from unittest.mock import patch, MagicMock
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'backend'))
from mail import MailStore
from smtp_delivery import deliver

class MailTests(unittest.TestCase):
    def setUp(self):
        self.directory=tempfile.TemporaryDirectory()
        (Path(self.directory.name)/'data').mkdir()
        self.store=MailStore(Path(self.directory.name)/'data/mail.sqlite3')
        self.box=self.store.create_mailbox('alice','fixture','Pessoal')
    def tearDown(self):self.directory.cleanup()
    def test_address_uniqueness_and_ownership(self):
        with self.assertRaises(ValueError):self.store.create_mailbox('bob','fixture','')
        with self.assertRaises(ValueError):self.store.mailbox('bob',self.box['id'])
        with self.assertRaises(ValueError):self.store.create_mailbox('alice','bad@outside.org','')
    def test_mime_attachment_dedup_and_access(self):
        message=EmailMessage();message['From']='sender@example.org';message['To']=self.box['address'];message['Subject']='Olá';message.set_content('Corpo original');message.add_alternative('<h1>Olá</h1><script>alert(1)</script>',subtype='html');message.add_attachment(b'attachment-bytes',maintype='application',subtype='octet-stream',filename='teste.bin')
        mid=self.store.ingest(self.box['address'],message.as_bytes(),'sender@example.org')
        self.assertEqual(mid,self.store.ingest(self.box['address'],message.as_bytes(),'sender@example.org'))
        actual=self.store.message('alice',mid);self.assertIn('Corpo original',actual['body']);self.assertEqual(actual['attachments'][0]['size'],16)
        with self.assertRaises(ValueError):self.store.message('bob',mid)
        self.assertIsNone(self.store.ingest('absent@organizeon.com.br',message.as_bytes(),''))
    def test_draft_persists_and_does_not_overwrite_sent(self):
        message=self.store.save_draft('alice',{'mailbox':self.box['id'],'to':['fixture@example.org'],'subject':'Rascunho','body':'texto','attachments':[{'name':'a.txt','mime':'text/plain','data':base64.b64encode(b'a').decode()}]})
        loaded=MailStore(self.store.path).message('alice',message['id']);self.assertEqual(loaded['body'],'texto');self.assertEqual(len(loaded['attachments']),1)
        self.store.save_draft('alice',{'id':message['id'],'mailbox':self.box['id'],'to':[],'body':'novo'})
        self.assertEqual(len(self.store.message('alice',message['id'])['attachments']),1)
        self.store.move('alice',message['id'],'trash')
        with self.assertRaises(ValueError):self.store.save_draft('alice',{'id':message['id'],'mailbox':self.box['id']})
    def test_smtp_failure_is_not_sent(self):
        directory=Path(self.directory.name)/'config';directory.mkdir()
        (directory/'brevo-smtp.key').write_text('fixture-private-key')
        self.assertNotIn('password',self.store.settings('alice'))
        message=self.store.save_draft('alice',{'mailbox':self.box['id'],'to':['fixture@example.org'],'body':'hello'})
        with patch('smtp_delivery.SubmissionSMTP',side_effect=OSError('connection failed')) as client: result=deliver(self.store,'alice',message['id'])
        client.assert_called_once()
        self.assertEqual(result['folder'],'failed');self.assertEqual(json.loads(result['delivery'])['status'],'failed')
        self.assertEqual(self.store.list_messages('alice',self.box['id'],'sent')['items'],[])
        with self.assertRaises(ValueError):deliver(self.store,'alice',message['id'])
    def test_header_injection_rejected(self):
        for value in [{'to':['a@example.org\r\nBcc:x@example.org']},{'subject':'hello\nBcc: x@example.org'}]:
            with self.assertRaises(ValueError):self.store.save_draft('alice',{'mailbox':self.box['id'],**value})
    def test_deleted_address_cannot_be_taken_by_another_account(self):
        with self.store.connect() as db:db.execute('DELETE FROM mailboxes WHERE id=?',(self.box['id'],))
        with self.assertRaises(ValueError):self.store.create_mailbox('bob','fixture','')
        recreated=self.store.create_mailbox('alice','fixture','')
        self.assertEqual(recreated['address'],self.box['address'])
    def test_reply_metadata_and_ownership(self):
        raw=b'From: sender@example.org\r\nReply-To: reply@example.org\r\nMessage-ID: <original@example.org>\r\nSubject: Original\r\n\r\nOriginal body'
        mid=self.store.ingest(self.box['address'],raw,'sender@example.org')
        original=self.store.message('alice',mid)
        self.assertEqual(original['replyAddress'],'reply@example.org')
        draft=self.store.save_draft('alice',{'mailbox':self.box['id'],'replyId':mid,'to':['reply@example.org'],'body':'Resposta'})
        self.assertEqual(draft['reply_to'],mid)
        box=self.store.create_mailbox('bob','bob','')
        with self.assertRaises(ValueError):self.store.save_draft('bob',{'mailbox':box['id'],'replyId':mid})
    def test_brevo_shared_secret_is_not_public_or_saved_per_user(self):
        directory=Path(self.directory.name)/'config';directory.mkdir()
        (directory/'brevo-smtp.key').write_text('fixture-private-key')
        settings=self.store.settings('alice')
        self.assertEqual(settings['mode'],'brevo');self.assertTrue(settings['hasPassword'])
        self.assertNotIn('password',settings);self.assertNotIn('fixture-private-key',json.dumps(settings))
        self.assertEqual(self.store.settings('bob')['mode'],'brevo')
        self.store.save_settings('alice',{'mode':'brevo','password':'should-not-be-stored'})
        # Managed Brevo always reads the server key, not a value sent from a browser.
        self.assertNotIn('password',self.store.settings('alice',False))
        with self.store.connect() as db:
            stored=db.execute('SELECT data FROM settings WHERE owner=?',('alice',)).fetchone()['data']
            self.assertNotIn('should-not-be-stored',stored)
    def test_brevo_rejection_is_failed_without_disclosing_key(self):
        import smtplib
        directory=Path(self.directory.name)/'config';directory.mkdir()
        (directory/'brevo-smtp.key').write_text('fixture-private-key')
        message=self.store.save_draft('alice',{'mailbox':self.box['id'],'to':['fixture@example.org'],'body':'Teste'})
        with patch('smtp_delivery.SubmissionSMTP',side_effect=smtplib.SMTPConnectError(554,b'Account not activated fixture-private-key')):
            result=deliver(self.store,'alice',message['id'])
        status=json.loads(result['delivery'])
        self.assertEqual(result['folder'],'failed');self.assertEqual(status['status'],'rejected');self.assertEqual(status['code'],554)
        self.assertNotIn('fixture-private-key',result['delivery'])
    def test_html_only_message_has_safe_text_for_reply_and_forward(self):
        raw=b'From: sender@example.org\r\nContent-Type: text/html; charset=utf-8\r\n\r\n<style>hidden</style><h1>Title</h1><p>Body</p><script>secret()</script>'
        mid=self.store.ingest(self.box['address'],raw,'sender@example.org')
        body=self.store.message('alice',mid)['body']
        self.assertIn('Body',body);self.assertNotIn('secret()',body);self.assertNotIn('hidden',body)
    def brevo_fixture(self):
        directory=Path(self.directory.name)/'config';directory.mkdir()
        (directory/'brevo-smtp.key').write_text('fixture-private-key')
        client=MagicMock();client.__enter__.return_value=client
        client.send_message.return_value={};client.d4_receipt={'code':250,'response':'queued as fixture-id'}
        draft=self.store.save_draft('alice',{'mailbox':self.box['id'],'to':['fixture@example.org'],'body':'Teste com anexo','attachments':[{'name':'file.txt','mime':'text/plain','data':base64.b64encode(b'file-bytes').decode()}]})
        return client,draft
    def test_brevo_acceptance_has_receipt_and_preserves_sender_and_attachment(self):
        import ssl
        client,draft=self.brevo_fixture()
        client.d4_receipt['response']+=' fixture-private-key'
        with patch('smtp_delivery.SubmissionSMTP',return_value=client):result=deliver(self.store,'alice',draft['id'])
        client.login.assert_called_once_with('c3cae7001@smtp-brevo.com','fixture-private-key')
        self.assertEqual(client.starttls.call_args.kwargs['context'].verify_mode,ssl.CERT_REQUIRED)
        mime=client.send_message.call_args.args[0]
        self.assertEqual(str(mime['From']),self.box['address']);self.assertEqual(next(mime.iter_attachments()).get_payload(decode=True),b'file-bytes')
        self.assertEqual(result['folder'],'sent');self.assertEqual(json.loads(result['delivery'])['receipts'][0]['code'],250)
        self.assertNotIn('fixture-private-key',result['delivery'])
    def test_disconnect_during_submit_is_uncertain_and_not_retried(self):
        import smtplib
        client,draft=self.brevo_fixture();client.send_message.side_effect=smtplib.SMTPServerDisconnected('connection lost')
        with patch('smtp_delivery.SubmissionSMTP',return_value=client):result=deliver(self.store,'alice',draft['id'])
        self.assertEqual(result['folder'],'failed');self.assertEqual(json.loads(result['delivery'])['status'],'uncertain')
        client.send_message.assert_called_once()
        with self.assertRaises(ValueError):deliver(self.store,'alice',draft['id'])
    def test_quit_failure_does_not_undo_confirmed_data_acceptance(self):
        import smtplib
        client,draft=self.brevo_fixture();client.__exit__.side_effect=smtplib.SMTPServerDisconnected('QUIT connection lost')
        with patch('smtp_delivery.SubmissionSMTP',return_value=client):result=deliver(self.store,'alice',draft['id'])
        self.assertEqual(result['folder'],'sent');self.assertEqual(json.loads(result['delivery'])['status'],'accepted')
    def test_sender_is_derived_from_owned_mailbox(self):
        draft=self.store.save_draft('alice',{'mailbox':self.box['id'],'sender':'forged@example.org','body':'Teste'})
        self.assertEqual(draft['sender'],self.box['address'])
        with self.assertRaises(ValueError):self.store.save_draft('bob',{'mailbox':self.box['id'],'body':'forged'})

if __name__=='__main__':unittest.main()
