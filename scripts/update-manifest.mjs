import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// Version admin assets by their content; the HTML itself is then hashed normally.
const adminHtmlUrl = new URL('../admin.html', import.meta.url);
let adminHtml = await readFile(adminHtmlUrl, 'utf8');
for (const extension of ['js', 'css']) {
  const bytes = await readFile(new URL(`../ui-dist/admin-ui.${extension}`, import.meta.url));
  const version = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  adminHtml = adminHtml.replace(new RegExp(`(\\./ui-dist/admin-ui\\.${extension})(?:\\?v=[^"\\s]*)?`, 'g'), `$1?v=${version}`);
}
await writeFile(adminHtmlUrl, adminHtml);

// Preserve the published list: clients depend on existing paths remaining available.
const manifest = JSON.parse(await readFile(new URL('../download-manifest.json', import.meta.url), 'utf8'));
for (const path of ['ui-dist/client-ui.js', 'ui-dist/client-ui.css', 'ui-dist/admin-ui.js', 'ui-dist/admin-ui.css']) {
  if (!manifest.files.some((file) => file.path === path)) manifest.files.push({ path, size: 0, sha256: '' });
}
for (const file of manifest.files) {
  const bytes = await readFile(new URL(`../${file.path}`, import.meta.url));
  file.size = bytes.length;
  file.sha256 = createHash('sha256').update(bytes).digest('hex');
}
manifest.totalBytes = manifest.files.reduce((total, file) => total + file.size, 0);
manifest.version = 'v2-' + createHash('sha256').update(JSON.stringify(manifest.files)).digest('hex').slice(0, 16);
manifest.generatedAt = new Date().toISOString();
await writeFile(new URL('../download-manifest.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n');
await writeFile(new URL('../version.txt', import.meta.url), manifest.version + '\n');
