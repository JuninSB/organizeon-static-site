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
  assert.match(source, /star-settings/);
  assert.match(source, /isCloudPreferenceStorageKey/);
  assert.match(source, /organizeonCloudBackup/);
  assert.match(source, /games\/catalog\.json/);
  assert.match(source, /Escolha um jogo/);
  const restoreIndex = source.indexOf("await initializeCloudBackup({ timeoutMs: 3500 })");
  const appImportIndex = source.indexOf("await import(config.appModule)", restoreIndex);
  assert.ok(restoreIndex >= 0 && appImportIndex > restoreIndex, "cloud preferences restore before app initialization");
});

test("internal links and dashboard remain inside the client", async () => {
  const [auth, index] = await Promise.all([text("auth-client.js"), text("index.html")]);
  assert.match(auth, /installInternalNavigationGuard/);
  assert.match(auth, /navigateInternalSearch/);
  assert.doesNotMatch(index, /window\.open\(dashboardUrl/);
  assert.match(index, /startDashboardShell\(\)/);
});

test("kernel version and index downloader point to the published index", async () => {
  const [index, kernelVersion, clientVersion, manifestText] = await Promise.all([
    text("index.html"),
    text("index-version.txt"),
    text("version.txt"),
    text("download-manifest.json"),
  ]);
  const embedded = index.match(/var loaderVersion = "([0-9.]+)";/)?.[1];
  assert.equal(embedded, kernelVersion.trim());
  assert.match(index, /new URL\("index\.html", baseUrl\)/);
  assert.match(index, /download\.download = "index\.html"/);
  assert.doesNotMatch(index, /download\.href = "https:\/\/organizeon\.com\.br\/d1"/);
  assert.equal(JSON.parse(manifestText).version, clientVersion.trim());
  assert.match(clientVersion.trim(), /^v[0-9]+-[0-9a-f]{16}$/);
});

test("only verified shared-world versions advertise this relay", async () => {
  const catalog = JSON.parse(await text("games/catalog.json"));
  const withRelay = catalog.games.filter((game) => game.relayUrl).map((game) => game.id).sort();
  assert.deepEqual(withRelay, ["eaglercraft-1-5-2", "eaglercraft-1-8-8"]);
  assert.equal(catalog.games.some((game) => game.id.includes("1-9")), false);
  assert.equal(catalog.games.find((game) => game.id === "eaglercraft-1-12-2").relayUrl, undefined);
});

test("game catalog integrity metadata matches distributed files", async () => {
  const catalog = JSON.parse(await text("games/catalog.json"));
  for (const game of catalog.games) {
    for (const file of game.files || [{ path: game.entry, size: game.size, sha256: game.sha256 }]) {
      const data = await readFile(new URL(`games/${file.path}`, root));
      assert.equal(data.length, file.size, `${game.id} size`);
      assert.equal(createHash("sha256").update(data).digest("hex"), file.sha256, `${game.id} hash`);
    }
  }
});

test("Tetris includes guideline mechanics and persistent high score", async () => {
  const source = await text("games/library/classic-tetris.html");
  for (const feature of ["jlKicks", "iKicks", "LOCK_DELAY", "LOCK_RESETS", "refill", "ghostY", "hardDrop", "hold"]) {
    assert.match(source, new RegExp(`\\b${feature}\\b`));
  }
  assert.match(source, /organizeon-tetris-progress/);
  assert.match(source, /organizeon-tetris-binds/);
  assert.match(source, /binds-dialog/);
  assert.match(source, /settings-dialog/);
  assert.match(source, /organizeon-tetris-left-handed/);
  assert.match(source, /playSound/);
  assert.match(source, /playNoise/);
  assert.match(source, /name===\"fill\"/);
  assert.match(source, /hardDropFx/);
  assert.match(source, /drawDropFx/);
  assert.match(source, /drawFxPiece/);
  assert.match(source, /triggerClearFx/);
  assert.match(source, /clearedRows/);
  assert.match(source, /duration:100/);
  assert.match(source, /impactLead:100/);
  assert.match(source, /lockedCells/);
  assert.match(source, /colorVariant/);
  assert.match(source, /drawSkyBeam/);
  assert.match(source, /highscore-sync/);
  assert.match(source, /syncHighscoreCloud/);
  assert.match(source, /hold-swap/);
  assert.match(source, /tetris-fullscreen/);
  assert.match(source, /organizeon-tetris-menu-position/);
  assert.match(source, /beamParticles/);
  assert.match(source, /airParticles/);
  assert.match(source, /drawBeamAtmosphere/);
  assert.match(source, /playFillSfx/);
});

test("download manifest hashes match every listed file", async () => {
  const manifest = JSON.parse(await text("download-manifest.json"));
  for (const file of manifest.files) {
    const data = await readFile(new URL(file.path, root));
    assert.equal(data.length, file.size, `${file.path} size`);
    assert.equal(createHash("sha256").update(data).digest("hex"), file.sha256, `${file.path} hash`);
  }
});
