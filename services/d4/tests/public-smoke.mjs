// Real production checks. Only the owner's own mailbox receives diagnostic messages.
import { readFile } from "node:fs/promises";
const base = "https://organizeon.com.br/d4/api";
let cookie = process.env.D4_COOKIE_FILE
  ? (await readFile(process.env.D4_COOKIE_FILE, "utf8")).trim()
  : "";
async function request(path, method = "GET", body) {
  const response = await fetch(base + path, {
    method,
    headers: {
      Origin: "https://organizeon.com.br",
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.headers.get("set-cookie"))
    cookie = response.headers.get("set-cookie").split(";")[0];
  const data = await response.json();
  if (!response.ok)
    throw Error(path + " " + response.status + " " + JSON.stringify(data));
  return data;
}
if (!cookie)
  await request("/login", "POST", {
    username: "organizeon",
    password: process.env.D4_PASSWORD,
  });
console.log("SESSION_OK");
let boxes = (await request("/mailboxes")).items;
let box = boxes.find((b) => b.address === "organizeon@organizeon.com.br");
if (!box)
  box = await request("/mailboxes", "POST", {
    local: "organizeon",
    label: "Principal",
  });
console.log("MAILBOX_READY", box.address);
const settings = await request("/settings");
console.log(
  "SMTP_MODE",
  settings.mode,
  "PASSWORD_HIDDEN",
  !("password" in settings),
);
if (process.argv.includes("--send")) {
  const draft = await request("/drafts", "POST", {
    mailbox: box.id,
    to: [box.address],
    subject: "OrganizeOn D4 · teste real de entrega",
    body: "Mensagem de diagnóstico enviada pelo próprio D4 para validar SMTP, Email Routing, Worker, túnel e caixa de entrada.",
    attachments: [
      {
        name: "d4-verificacao.txt",
        mime: "text/plain",
        data: Buffer.from("Verificação real de anexo D4").toString("base64"),
      },
    ],
  });
  const sent = await request("/messages/" + draft.id + "/send", "POST", {});
  console.log("SMTP_RESULT", sent.folder, sent.delivery);
}
console.log(
  "INBOX",
  JSON.stringify(
    await request("/messages?mailbox=" + box.id + "&folder=inbox"),
  ),
);
