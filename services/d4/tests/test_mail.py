import base64
import os
import sys
import tempfile
import unittest
from pathlib import Path
from email.message import EmailMessage
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'backend'))
from mail import MailStore
from smtp_delivery import deliver

class MailTests(unittest.TestCase):
    def setUp(self):
        self.directory=tempfile.TemporaryDirectory()
        self.store=MailStore(Path(self.directory.name)/'mail.sqlite3')
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
        self.store.save_settings('alice',{'mode':'relay','host':'smtp.example.org','port':465,'security':'tls','username':'a','password':'private'})
        self.assertNotIn('password',self.store.settings('alice'))
        message=self.store.save_draft('alice',{'mailbox':self.box['id'],'to':['fixture@example.org'],'body':'hello'})
        with patch('smtplib.SMTP_SSL',side_effect=OSError('connection failed')): result=deliver(self.store,'alice',message['id'])
        self.assertEqual(result['folder'],'failed');self.assertIn('error_or_uncertain',result['delivery'])
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

if __name__=='__main__':unittest.main()
