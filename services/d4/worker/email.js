const hex = (buffer) =>
  [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
async function forward(env, key, record, raw) {
  const query = new URLSearchParams({ to: record.to, from: record.from });
  const url = new URL("/d4/api/inbound?" + query, env.BACKEND_URL);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const digest = hex(await crypto.subtle.digest("SHA-256", raw));
  const signing = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.INBOUND_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = hex(
    await crypto.subtle.sign(
      "HMAC",
      signing,
      new TextEncoder().encode(
        timestamp + "\n" + url.pathname + url.search + "\n" + digest,
      ),
    ),
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "message/rfc822",
      "X-D4-Timestamp": timestamp,
      "X-D4-Signature": signature,
    },
    body: raw,
    signal: AbortSignal.timeout(20000),
  });
  if (response.ok) {
    await env.PENDING.delete(key);
    return "accepted";
  }
  if (response.status === 404) {
    await env.PENDING.delete(key);
    return "unknown";
  }
  throw new Error("Backend unavailable: " + response.status);
}
export default {
  async email(message, env) {
    if (message.rawSize > 20 * 1024 * 1024) {
      message.setReject("Message exceeds 20 MB");
      return;
    }
    const raw = await new Response(message.raw).arrayBuffer();
    const key = "pending:" + crypto.randomUUID();
    const record = {
      to: message.to,
      from: message.from,
      created: new Date().toISOString(),
    };
    // Durable queue before delivery. No message bodies or addresses in logs.
    await env.PENDING.put(key, raw, { metadata: record });
    try {
      if ((await forward(env, key, record, raw)) === "unknown")
        message.setReject("Unknown mailbox");
    } catch {
      console.warn("D4 delivery deferred; retained in queue");
    }
  },
  async scheduled(event, env, ctx) {
    const batch = await env.PENDING.list({ prefix: "pending:", limit: 10 });
    for (const item of batch.keys) {
      try {
        const raw = await env.PENDING.get(item.name, "arrayBuffer");
        if (raw) await forward(env, item.name, item.metadata, raw);
      } catch {
        console.warn("D4 queued delivery deferred");
      }
    }
  },
  async fetch() {
    return new Response("OrganizeOn D4 email receiver", { status: 200 });
  },
};
