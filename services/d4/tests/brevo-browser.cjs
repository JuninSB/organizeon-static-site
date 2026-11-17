const fs = require("fs");
const { createHash } = require("crypto");
const { chromium } = require("/tmp/replay-browser/node_modules/playwright");
(async () => {
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
    });
    const token = fs.readFileSync(process.env.D4_COOKIE_FILE, "utf8").trim();
    await context.addCookies([
      {
        name: "organizeon_session",
        value: token.slice(token.indexOf("=") + 1),
        domain: "organizeon.com.br",
        path: "/d4/",
        secure: true,
        httpOnly: true,
        sameSite: "Strict",
      },
    ]);
    const prefix = "https://organizeon.com.br/d4/api";
    async function api(path, method = "GET", data) {
      const r = await context.request.fetch(prefix + path, {
        method,
        headers: { Origin: "https://organizeon.com.br" },
        ...(data === undefined ? {} : { data }),
      });
      if (!r.ok()) throw Error(path + " " + r.status());
      return r.json();
    }
    const boxes = (await api("/mailboxes")).items;
    const main = boxes.find(
      (b) => b.address === "organizeon@organizeon.com.br",
    );
    const resume = process.env.D4_RESUME_MESSAGE
      ? await api("/messages/" + process.env.D4_RESUME_MESSAGE)
      : null;
    const marker = resume ? resume.subject : "D4-UI-BREVO-" + Date.now();
    const box = resume
      ? boxes.find((b) => resume.sender.includes(b.address))
      : await api("/mailboxes", "POST", {
          local: "d4-brevo-" + Date.now(),
          label: "Validação SMTP",
        });
    if (!box) throw Error("Diagnostic sender mailbox not found");
    const bytes = Buffer.from("Anexo real de validação: " + marker);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    async function accepted() {
      await page
        .getByText("Aceito pelo servidor SMTP.", { exact: true })
        .waitFor({ timeout: 90000 });
      const id = new URL(page.url()).hash.split("/message/")[1];
      const message = await api("/messages/" + id);
      if (JSON.parse(message.delivery).status !== "accepted")
        throw Error("Submission not accepted");
      return message;
    }
    async function incoming(mailbox, kind) {
      for (let i = 0; i < 24; i++) {
        const result = await api(
          "/messages?" +
            new URLSearchParams({ mailbox, folder: "inbox", q: marker }),
        );
        const row = result.items.find((m) =>
          kind === "original"
            ? !/^(Re:|Fwd:)/i.test(m.subject)
            : m.subject.startsWith(kind),
        );
        if (row) return api("/messages/" + row.id);
        await page.waitForTimeout(5000);
      }
      throw Error("Incoming timeout " + kind);
    }
    let original;
    if (resume) {
      original = resume;
      console.log("RESUME_CONFIRMED_RECEIPT", original.id);
    } else {
      await page.goto("https://organizeon.com.br/d4/#/compose");
      await page
        .getByRole("heading", { name: "Nova mensagem", exact: true })
        .waitFor();
      await page
        .getByRole("combobox", { name: "Caixa postal" })
        .selectOption(box.id);
      await page.getByLabel("Para", { exact: true }).fill(main.address);
      await page.getByLabel("Assunto", { exact: true }).fill(marker);
      await page
        .getByLabel("Mensagem", { exact: true })
        .fill("Teste real de envio pelo navegador. " + marker);
      await page
        .getByLabel("Adicionar anexos", { exact: true })
        .setInputFiles({
          name: "teste-brevo.txt",
          mimeType: "text/plain",
          buffer: bytes,
        });
      await page.getByText("teste-brevo.txt", { exact: true }).waitFor();
      await page.getByRole("button", { name: "Enviar", exact: true }).click();
      const sent = await accepted();
      original = await incoming(main.id, "original");
      console.log("SEND_AND_RECEIVE_OK", sent.id, original.id);
    }
    await page.goto("https://organizeon.com.br/d4/#/message/" + original.id);
    await page.getByRole("button", { name: "Responder", exact: true }).click();
    await page
      .getByRole("heading", { name: "Responder", exact: true })
      .waitFor();
    if (
      (await page.getByLabel("Para", { exact: true }).inputValue()) !==
      box.address
    )
      throw Error("Wrong reply recipient");
    await page
      .getByLabel("Mensagem", { exact: true })
      .fill("Resposta real de diagnóstico. " + marker);
    await page.getByRole("button", { name: "Enviar", exact: true }).click();
    const reply = await accepted();
    const replyReceived = await incoming(box.id, "Re:");
    const raw = await context.request.get(
      prefix + "/messages/" + reply.id + "/raw",
    );
    if (!(await raw.text()).includes("In-Reply-To: " + original.messageId))
      throw Error("Reply threading missing");
    console.log("REPLY_AND_THREADING_OK", replyReceived.id);
    await page.goto("https://organizeon.com.br/d4/#/message/" + original.id);
    await page.getByRole("button", { name: "Encaminhar", exact: true }).click();
    await page
      .getByRole("heading", { name: "Encaminhar mensagem", exact: true })
      .waitFor();
    if (await page.getByLabel("Para", { exact: true }).inputValue())
      throw Error("Forward must ask for recipient");
    await page.getByText("teste-brevo.txt", { exact: true }).waitFor();
    await page.getByLabel("Para", { exact: true }).fill(box.address);
    await page.screenshot({
      path: "/tmp/d4-brevo-forward-mobile.png",
      fullPage: true,
    });
    await page.getByRole("button", { name: "Enviar", exact: true }).click();
    await accepted();
    const forwarded = await incoming(box.id, "Fwd:");
    const attachment = forwarded.attachments.find(
      (a) => a.name === "teste-brevo.txt",
    );
    if (!attachment) throw Error("Forwarded attachment missing");
    const downloaded = await context.request.get(
      prefix + "/attachments/" + attachment.id,
    );
    const hash = (b) => createHash("sha256").update(b).digest("hex");
    if (hash(await downloaded.body()) !== hash(bytes))
      throw Error("Forwarded attachment changed");
    await page.goto("https://organizeon.com.br/d4/#/settings");
    await page
      .getByText("Credencial configurada no servidor.", { exact: true })
      .waitFor();
    await page.screenshot({
      path: "/tmp/d4-brevo-settings-mobile.png",
      fullPage: true,
    });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      )
    )
      throw Error("Mobile overflow");
    if (errors.length) throw Error(JSON.stringify(errors));
    // Remove only messages/address created by this diagnostic run.
    for (const mailbox of [main.id, box.id])
      for (const folder of ["inbox", "sent", "drafts", "failed", "trash"]) {
        const rows = (
          await api(
            "/messages?" + new URLSearchParams({ mailbox, folder, q: marker }),
          )
        ).items;
        for (const row of rows) {
          if (!row.subject.includes(marker)) continue;
          if (folder !== "trash")
            await api("/messages/" + row.id, "PATCH", { folder: "trash" });
          await api("/messages/" + row.id, "DELETE");
        }
      }
    await api("/mailboxes/" + box.id, "DELETE");
    console.log(
      "BROWSER_REAL_SMTP_PASS send reply forward attachments permissions mobile no_page_errors",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
