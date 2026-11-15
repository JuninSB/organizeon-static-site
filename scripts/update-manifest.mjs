import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../download-manifest.json', import.meta.url), 'utf8'));
const renamedPaths = new Map([
  ['assets/jdht-c-CyPArwUk.js', 'assets/client-runtime-paths.js'],
  ['kzds/worker.js', 'vendor/bare-mux/worker.js'],
  ['omhy/index.mjs', 'vendor/epoxy/index.mjs'],
  ['onsc/index.mjs', 'vendor/libcurl/libcurl.mjs'],
  ['rlr/obmw.bundle.js', 'vendor/ultraviolet/uv.bundle.js'],
  ['rlr/obmw.client.js', 'vendor/ultraviolet/uv.client.js'],
  ['rlr/obmw.config.js', 'vendor/ultraviolet/uv.config.js'],
  ['rlr/obmw.handler.js', 'vendor/ultraviolet/uv.handler.js'],
  ['rlr/obmw.sw.js', 'vendor/ultraviolet/uv.sw.js'],
  ['xzmo/grhp.all.js', 'vendor/scramjet/scramjet.all.js'],
  ['xzmo/grhp.sync.js', 'vendor/scramjet/scramjet.sync.js'],
  ['xzmo/grhp.wasm.wasm', 'vendor/scramjet/scramjet.wasm.wasm'],
]);
for (const file of manifest.files) {
  file.path = renamedPaths.get(file.path) || file.path;
}
const requiredFiles = [
  'ui-dist/client-ui.js',
  'ui-dist/client-ui.css',
  'ui-dist/admin-ui.js',
  'ui-dist/admin-ui.css',
  'vendor/bare-mux/worker.js',
  'vendor/epoxy/index.mjs',
  'vendor/libcurl/libcurl.mjs',
  'vendor/ultraviolet/uv.bundle.js',
  'vendor/ultraviolet/uv.client.js',
  'vendor/ultraviolet/uv.config.js',
  'vendor/ultraviolet/uv.handler.js',
  'vendor/ultraviolet/uv.sw.js',
  'vendor/scramjet/scramjet.all.js',
  'vendor/scramjet/scramjet.sync.js',
  'vendor/scramjet/scramjet.wasm.wasm',
];
const knownPaths = new Set(manifest.files.map((file) => file.path));
for (const path of requiredFiles) {
  if (!knownPaths.has(path)) manifest.files.push({ path, size: 0, sha256: '' });
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
