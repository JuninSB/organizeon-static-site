const { chromium } = require('/tmp/replay-browser/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-zygote', '--single-process', '--no-proxy-server', '--in-process-gpu', '--disable-gpu-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('https://organizeon.com.br/d4');
    await page.waitForURL('https://organizeon.com.br/d4/login');
    await page.getByRole('textbox', { name: 'Usuário', exact: true }).waitFor();
    await page.getByLabel('Senha', { exact: true }).waitFor();
    const api = await context.request.get('https://organizeon.com.br/d4/api/mailboxes');
    if (api.status() !== 401) throw Error('Mailbox API must remain protected');
    const scripts = await page.locator('script[src]').evaluateAll(elements => elements.map(element => element.src));
    for (const script of scripts) {
      const asset = await context.request.get(script);
      if (asset.status() !== 200 || !asset.headers()['content-type']?.includes('javascript')) throw Error('Login script not available');
    }
    await page.screenshot({ path: '/tmp/d4-anonymous-login-fixed.png', fullPage: true });
    if (errors.length) throw Error(JSON.stringify(errors));
    console.log('PASS anonymous /d4 -> /d4/login, form and assets loaded, API 401');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message); process.exit(1); });
