import DOMPurify from "dompurify";

/** Render untrusted mail in a scriptless, opaque-origin frame. */
export function emailDocument(html: string) {
  const clean = DOMPurify.sanitize(html, {
    WHOLE_DOCUMENT: true,
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "input", "button", "meta", "base", "link"],
    FORBID_ATTR: ["srcset", "ping", "autofocus"],
  });
  const doc = new DOMParser().parseFromString(clean, "text/html");
  for (const anchor of doc.querySelectorAll("a")) {
    const href = anchor.getAttribute("href") || "";
    if (!/^(https?:|mailto:)/i.test(href)) anchor.removeAttribute("href");
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }
  for (const image of doc.querySelectorAll("img")) {
    const src = image.getAttribute("src") || "";
    if (src.startsWith("//")) image.src = "https:" + src;
    else if (!/^(https:\/\/|data:image\/(png|jpeg|gif|webp);base64,)/i.test(src)) image.removeAttribute("src");
    image.referrerPolicy = "no-referrer";
  }
  const csp = doc.createElement("meta");
  csp.httpEquiv = "Content-Security-Policy";
  csp.content = "default-src 'none'; style-src 'unsafe-inline'; img-src https: data:; font-src data:; form-action 'none'; base-uri 'none'";
  doc.head.prepend(csp);
  const viewport = doc.createElement("meta");
  viewport.name = "viewport";
  viewport.content = "width=device-width,initial-scale=1";
  doc.head.append(viewport);
  const style = doc.createElement("style");
  style.textContent = "body{font:14px system-ui;overflow-wrap:anywhere;margin:12px}img{max-width:100%;height:auto}table{max-width:100%}";
  doc.head.append(style);
  return "<!doctype html>" + doc.documentElement.outerHTML;
}
