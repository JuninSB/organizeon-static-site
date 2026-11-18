import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(process.argv[2] || resolve(repo, "live-dist"));
const manifest = JSON.parse(
  await readFile(resolve(repo, "download-manifest.json"), "utf8"),
);
await mkdir(output, { recursive: true });
const excluded = new Set([
  "index.html",
  "404.html",
  "download-manifest.json",
  "version.txt",
  "index-version.txt",
]);
const files = [];
for (const { path } of manifest.files) {
  if (excluded.has(path) || path.startsWith("releases/")) continue;
  const destination = resolve(output, path);
  if (!destination.startsWith(output + "/"))
    throw Error("Invalid runtime path");
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(resolve(repo, path), destination);
  files.push(path);
}
const version = manifest.version;
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><base href="/d1/live/"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#09090b"><title>OrganizeOn — Live</title><link rel="icon" href="brand/organizeon-icon.png"><link rel="stylesheet" href="assets/jdht-s-SOkYHzV0.css"><style>body{margin:0;background:#09090b;color:#fafafa}#live-start{position:fixed;inset:0;display:grid;place-items:center;font:14px system-ui}</style><script>window.__groveBase='/d1/live/';window.__groveCDN='/d1/live/';window.__ORGANIZEON_LIVE__=true;window.__ORGANIZEON_CLIENT_VERSION__=${JSON.stringify(version)};try{var t=JSON.parse(localStorage.getItem('star-theme')||'{}');document.documentElement.classList.add(t.mode==='light'?'light':'dark');document.documentElement.setAttribute('data-theme',t.themeId||'maple')}catch{document.documentElement.classList.add('dark')}</script></head><body><div id="live-start">Carregando OrganizeOn…</div><div id="root"></div><script src="config.js?v=${version}"></script><script type="module">try{await import('./auth-client.js?v=${version}');document.getElementById('live-start')?.remove()}catch(error){const node=document.getElementById('live-start');node.textContent='Não foi possível carregar o OrganizeOn. Atualize a página.';console.error(error)}</script></body></html>`;
await writeFile(resolve(output, "index.html"), html);
files.push("index.html");
await writeFile(
  resolve(output, "live-files.json"),
  JSON.stringify({ version, files }),
);
console.log("Live client built:", files.length, "local files");
