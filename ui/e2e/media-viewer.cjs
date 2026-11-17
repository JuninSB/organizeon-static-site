const path = require("path");
const { chromium } = require("/tmp/replay-browser/node_modules/playwright");
(async () => {
  const { createServer } = await import("vite");
  const fixture = {
    name: "media-viewer-fixture",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/d4/media-viewer-test")) {
          res.setHeader("Content-Type", "text/html");
          res.end(
            await server.transformIndexHtml(
              "/d4/media-viewer-test",
              '<meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#09090b}</style><div id="root"></div><script type="module" src="/e2e/harness/media-viewer.tsx"></script>',
            ),
          );
        } else next();
      });
    },
  };
  const server = await createServer({
    configFile: path.resolve(__dirname, "../vite.d4.config.ts"),
    plugins: [fixture],
    server: { host: "127.0.0.1", port: 18769, strictPort: true },
    appType: "custom",
  });
  await server.listen();
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--no-proxy-server",
      "--in-process-gpu",
      "--disable-gpu-sandbox",
    ],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      acceptDownloads: true,
    });
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "canShare", {
        configurable: true,
        value: () => true,
      });
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: async (data) => {
          window.__sharedFiles = data.files.map((file) => ({
            name: file.name,
            size: file.size,
          }));
        },
      });
    });
    const page = await context.newPage();
    page.setDefaultTimeout(60000);
    const errors = [];
    page.on("pageerror", (e) => {
      errors.push(e.message);
      console.error("PAGE_ERROR", e.message);
    });
    const response = await page.goto(
      "http://127.0.0.1:18769/d4/media-viewer-test",
    );
    if (response.status() !== 200)
      throw Error("Fixture document " + response.status());
    const open = async () => {
      await page.getByRole("button", { name: "Ampliar exemplo.png" }).click();
      await page
        .getByRole("dialog", { name: "exemplo.png", exact: true })
        .waitFor();
      await page
        .locator(".oo-image-viewer-stage img")
        .evaluate((image) => image.decode());
    };
    const menu = async () =>
      page.getByRole("button", { name: "Mais opções da imagem" }).click();
    await open();
    const bounds = await page.locator(".oo-image-viewer").boundingBox();
    if (
      !bounds ||
      Math.abs(bounds.width - 390) > 1 ||
      Math.abs(bounds.height - 844) > 1 ||
      Math.abs(bounds.x) > 1 ||
      Math.abs(bounds.y) > 1
    )
      throw Error("Viewer is not full screen " + JSON.stringify(bounds));
    await page.getByRole("button", { name: "Aumentar zoom" }).click();
    if (
      (await page
        .getByRole("button", { name: "Restaurar zoom" })
        .textContent()) !== "150%"
    )
      throw Error("Zoom failed");
    await page.getByRole("button", { name: "Restaurar zoom" }).click();
    await page
      .getByRole("button", { name: "Salvar mensagem nos favoritos" })
      .click();
    await page
      .getByRole("button", { name: "Remover imagem dos salvos" })
      .waitFor();
    await menu();
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("menuitem", { name: "Salvar imagem", exact: true })
      .click();
    const download = await downloadPromise;
    if (download.suggestedFilename() !== "exemplo.png")
      throw Error("Wrong download");
    await menu();
    await page.screenshot({
      path: "/tmp/dm-image-viewer-menu-mobile.png",
      fullPage: true,
    });
    await page
      .getByRole("menuitem", { name: "Compartilhar", exact: true })
      .click();
    await page.waitForFunction(
      () => window.__sharedFiles?.[0]?.name === "exemplo.png",
    );
    await menu();
    const popupPromise = context.waitForEvent("page");
    await page.getByRole("menuitem", { name: "Abrir em nova aba" }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    if (!popup.url().startsWith("blob:"))
      throw Error("New tab does not use local image URL");
    await popup.close();
    await page.screenshot({
      path: "/tmp/dm-image-viewer-mobile.png",
      fullPage: true,
    });
    await page.getByRole("button", { name: "Fechar imagem" }).click();
    await page
      .getByRole("dialog", { name: "exemplo.png", exact: true })
      .waitFor({ state: "hidden" });
    await open();
    await page.goBack();
    await page
      .getByRole("dialog", { name: "exemplo.png", exact: true })
      .waitFor({ state: "hidden" });
    await open();
    await menu();
    await page
      .getByRole("menuitem", { name: "Encaminhar", exact: true })
      .click();
    await page
      .getByRole("dialog", { name: "Encaminhar", exact: true })
      .waitFor();
    if ((await page.getByRole("dialog").count()) !== 1)
      throw Error("Nested dialogs did not release focus");
    await page.getByRole("button", { name: "Cancelar", exact: true }).click();
    await open();
    await page.getByRole("button", { name: "Reagir", exact: true }).click();
    await page
      .getByRole("dialog", { name: "Reações da mensagem", exact: true })
      .waitFor();
    await page.getByRole("button", { name: "Cancelar", exact: true }).click();
    await open();
    await menu();
    await page.getByRole("menuitem", { name: "Ir para a mensagem" }).click();
    await page
      .getByRole("dialog", { name: "exemplo.png", exact: true })
      .waitFor({ state: "hidden" });
    await page.waitForFunction(
      () =>
        document.activeElement?.getAttribute("data-message-id") ===
        "fixture-message",
    );
    await open();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [
        { x: 140, y: 350 },
        { x: 250, y: 350 },
      ],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        { x: 100, y: 350 },
        { x: 290, y: 350 },
      ],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    if (
      parseInt(
        await page
          .getByRole("button", { name: "Restaurar zoom" })
          .textContent(),
      ) <= 100
    )
      throw Error("Pinch did not zoom");
    await page.getByRole("button", { name: "Restaurar zoom" }).click();
    await page.mouse.move(195, 350);
    await page.mouse.down();
    await page.mouse.move(195, 510, { steps: 6 });
    await page.mouse.up();
    await page
      .getByRole("dialog", { name: "exemplo.png", exact: true })
      .waitFor({ state: "hidden" });
    await page.setViewportSize({ width: 1365, height: 900 });
    await open();
    await page.screenshot({
      path: "/tmp/dm-image-viewer-desktop.png",
      fullPage: true,
    });
    await page.keyboard.press("Escape");
    await page
      .getByRole("dialog", { name: "exemplo.png", exact: true })
      .waitFor({ state: "hidden" });
    if (
      (await page.evaluate(
        () => document.documentElement.dataset.attachmentReads,
      )) !== "1"
    )
      throw Error(
        "Reopening the viewer reloads the attachment from the server",
      );
    if (errors.length) throw Error(errors.join("; "));
    console.log(
      "PASS fullscreen, zoom/pinch, download, share file, new tab, bookmark, back/Escape/swipe, forward/reaction modal handoff, jump/focus, mobile/desktop",
    );
  } finally {
    await browser.close();
    await server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
