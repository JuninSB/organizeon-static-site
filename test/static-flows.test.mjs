import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const text = (path) => readFile(new URL(path, root), "utf8");

test("registration, Data controls and cloud backup are present", async () => {
  const source = await text("auth-client.js");
  assert.match(source, /\/auth\/register/);
  assert.match(source, /Registrar/);
  assert.match(source, /Backup na nuvem/);
  assert.match(source, /Apagar todos os progressos/);
  assert.match(source, /Apagar preferências/);
  assert.match(source, /exportIndexedDatabases/);
  assert.match(source, /restoreCookies/);
});

test("internal links and dashboard remain inside the client", async () => {
  const [auth, index] = await Promise.all([text("auth-client.js"), text("index.html")]);
  assert.match(auth, /installInternalNavigationGuard/);
  assert.match(auth, /navigateInternalSearch/);
  assert.doesNotMatch(index, /window\.open\(dashboardUrl/);
  assert.match(index, /startDashboardShell\(\)/);
});

test("only verified shared-world versions advertise this relay", async () => {
  const catalog = JSON.parse(await text("games/catalog.json"));
  const withRelay = catalog.games.filter((game) => game.relayUrl).map((game) => game.id).sort();
  assert.deepEqual(withRelay, ["eaglercraft-1-5-2", "eaglercraft-1-8-8"]);
  assert.equal(catalog.games.some((game) => game.id.includes("1-9")), false);
  assert.equal(catalog.games.find((game) => game.id === "eaglercraft-1-12-2").relayUrl, undefined);
});

test("Tetris includes guideline mechanics and persistent high score", async () => {
  const source = await text("games/library/classic-tetris.html");
  for (const feature of ["jlKicks", "iKicks", "LOCK_DELAY", "LOCK_RESETS", "refill", "ghostY", "hardDrop", "hold"]) {
    assert.match(source, new RegExp(`\\b${feature}\\b`));
  }
  assert.match(source, /organizeon-tetris-progress/);
});

test("download manifest hashes match every listed file", async () => {
  const manifest = JSON.parse(await text("download-manifest.json"));
  for (const file of manifest.files) {
    const data = await readFile(new URL(file.path, root));
    assert.equal(data.length, file.size, `${file.path} size`);
    assert.equal(createHash("sha256").update(data).digest("hex"), file.sha256, `${file.path} hash`);
  }
});
