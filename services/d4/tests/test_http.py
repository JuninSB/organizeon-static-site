import importlib.util
import os
import sys
import tempfile
import threading
import unittest
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
from http.server import ThreadingHTTPServer

BACKEND = Path(__file__).resolve().parents[1] / 'backend'
sys.path.insert(0, str(BACKEND))

class LoginAssetsTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        root = Path(self.temp.name)
        (root / 'config').mkdir()
        (root / 'frontend/dist/assets').mkdir(parents=True)
        (root / 'config/internal.key').write_text('fixture-internal')
        (root / 'config/inbound.key').write_text('fixture-inbound')
        (root / 'frontend/dist/index.html').write_text('<html>Login fixture</html>')
        (root / 'frontend/dist/assets/app.js').write_text('console.log("fixture")')
        self.previous = {key: os.environ.get(key) for key in ['D4_HOME', 'D4_STATE']}
        os.environ['D4_HOME'] = os.environ['D4_STATE'] = str(root)
        spec = importlib.util.spec_from_file_location('d4_http_fixture', BACKEND / 'server.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), module.Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base = 'http://127.0.0.1:' + str(self.server.server_port)

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        for key, value in self.previous.items():
            if value is None: os.environ.pop(key, None)
            else: os.environ[key] = value
        self.temp.cleanup()

    def test_login_and_assets_available_without_user_session(self):
        for path, content in [('/d4/login', b'Login fixture'), ('/d4/assets/app.js', b'console.log')]:
            with urlopen(Request(self.base + path, headers={'X-D4-Internal': 'fixture-internal'})) as response:
                self.assertEqual(response.status, 200)
                self.assertIn(content, response.read())

    def test_mail_api_still_requires_user_and_internal_identity(self):
        for headers, status in [({'X-D4-Internal': 'fixture-internal'}, 401), ({}, 403)]:
            with self.assertRaises(HTTPError) as error:
                urlopen(Request(self.base + '/d4/api/mailboxes', headers=headers))
            self.assertEqual(error.exception.code, status)
            error.exception.close()

if __name__ == '__main__': unittest.main()
