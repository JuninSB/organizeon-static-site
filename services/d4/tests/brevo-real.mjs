import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const cookie = (await readFile(process.env.D4_COOKIE_FILE, "utf8")).trim();
const origin = "https://organizeon.com.br",
  prefix = origin + "/d4/api";
async function api(path, method = "GET", body) {
  const response = await fetch(prefix + path, {
    method,
    headers: {
      Cookie: cookie,
      Origin: origin,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok)
    throw Error(path + " " + response.status + " " + JSON.stringify(result));
  return result;
}
const box = (await api("/mailboxes")).items.find(
  (x) => x.address === "organizeon@organizeon.com.br",
);
if (!box) throw Error("Owner test mailbox missing");
const settings = await api("/settings");
if (settings.mode !== "brevo" || "password" in settings)
  throw Error("Managed SMTP configuration invalid");
const marker = "D4-BREVO-" + Date.now();
const bytes = Buffer.from(
  "Verificação real de envio Brevo, recebimento Cloudflare e integridade de anexo.\n" +
    marker,
);
const draft = await api("/drafts", "POST", {
  mailbox: box.id,
  to: [box.address],
  subject: "OrganizeOn · " + marker,
  body:
    "Mensagem de diagnóstico enviada pelo próprio D4 via Brevo para a própria caixa. " +
    marker,
  attachments: [
    {
      name: "verificacao-brevo.txt",
      mime: "text/plain",
      data: bytes.toString("base64"),
    },
  ],
});
const sent = await api("/messages/" + draft.id + "/send", "POST", {});
const report = {
  marker,
  id: sent.id,
  delivery: JSON.parse(sent.delivery),
  folder: sent.folder,
  attachmentVerified: false,
};
console.log("SUBMISSION", JSON.stringify(report));
if (report.delivery.status === "accepted") {
  for (let attempt = 0; attempt < 24; attempt++) {
    const inbox = await api(
      "/messages?" +
        new URLSearchParams({ mailbox: box.id, folder: "inbox", q: marker }),
    );
    if (inbox.items.length) {
      const received = await api("/messages/" + inbox.items[0].id);
      const file = received.attachments.find(
        (x) => x.name === "verificacao-brevo.txt",
      );
      if (!file) throw Error("Received attachment missing");
      const response = await fetch(prefix + "/attachments/" + file.id, {
        headers: { Cookie: cookie },
      });
      if (!response.ok) throw Error("Attachment download failed");
      const digest = (b) => createHash("sha256").update(b).digest("hex");
      if (digest(Buffer.from(await response.arrayBuffer())) !== digest(bytes))
        throw Error("Attachment content mismatch");
      report.receivedId = received.id;
      report.attachmentVerified = true;
      console.log("ROUND_TRIP_CONFIRMED", received.id);
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
await writeFile(
  "/tmp/d4-brevo-real-report.json",
  JSON.stringify(report, null, 2),
);
console.log("FINAL", JSON.stringify(report));
