import { initializeScramjet } from "./scramjet-bootstrap.js?v=runtime-c551e5374034b097";
/** One native engine browsing context, retained across URL changes. */
export async function createFrameSession(
  frame,
  { engine, base, onURL, onLoad, onStart, onError, direct = false },
) {
  if(!frame)throw new Error("A tela de pesquisa foi fechada.");
  let handle,
    closed = false,
    documentCleanup = () => {},
    boundDocument = null,
    currentURL = "",
    watch;
  if (engine === "scramjet" && !direct) {
    const controller = await initializeScramjet(base);
    handle = controller.createFrame(frame);
  }
  const describe = () => {
    try {
      if (handle?.url) return String(handle.url);
      const uv = frame.contentWindow?.__uv;
      if (uv?.meta?.url) return uv.meta.url.href;
      const url = frame.contentWindow?.location.href;
      if (
        url &&
        !url.startsWith("about:") &&
        !url.includes(base + "nq/") &&
        !url.includes(base + "dtix/")
      )
        return url;
    } catch {}
    return null;
  };
  const decode = (value) => {
    const url = new URL(value, currentURL || location.href);
    if (!direct && url.origin === location.origin) {
      if (engine === "scramjet" && url.pathname.startsWith(base + "dtix/"))
        return handle.controller.decodeUrl(url);
      if (engine !== "scramjet" && url.pathname.startsWith(base + "nq/"))
        return xorDecode(
          url.href.slice((location.origin + base + "nq/").length),
        );
    }
    return url.href;
  };
  const startWatch = () => {
    if(closed)return;
    clearInterval(watch);
    watch = setInterval(bindLinks, 150);
  };
  const navigate = (url) => {
    if (closed) return;
    currentURL = url;
    onStart?.();
    startWatch();
    if (direct) frame.src = url;
    else if (handle) handle.go(url);
    else frame.src = base + "nq/" + xorEncode(url);
  };
  function bindLinks() {
    if (closed) return;
    try {
      const doc = frame.contentDocument,
        win = frame.contentWindow;
      if (!doc || doc === boundDocument || doc.URL.startsWith("about:")) return;
      documentCleanup();
      boundDocument = doc;
      const click = (event) => {
        if (
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const anchor = event.target?.closest?.("a[href]");
        if (!anchor || anchor.hasAttribute("download")) return;
        const raw = anchor.getAttribute("href") || "";
        if (!raw || raw.startsWith("#") || /^javascript:/i.test(raw)) return;
        let destination;
        try {
          destination = decode(anchor.href || raw);
          if (!["http:", "https:"].includes(new URL(destination).protocol))
            return;
        } catch {
          return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        onURL?.(destination);
        navigate(destination);
      };
      const leaving = () => startWatch();
      win.addEventListener("click", click, true);
      win.addEventListener("pagehide", leaving);
      documentCleanup = () => {
        win.removeEventListener("click", click, true);
        win.removeEventListener("pagehide", leaving);
      };
      clearInterval(watch);
    } catch {}
  }
  const loaded = () => {
    clearInterval(watch);
    if (closed || !frame.getAttribute("src")) return;
    bindLinks();
    if(!direct&&!frame.contentDocument){onError?.("Não foi possível abrir esta página dentro do navegador.");return;}
    const url = describe();
    if (url) {
      currentURL = url;
      onURL?.(url, { replace: true });
    }
    onLoad?.();
  };
  const changed = (event) => {
    if (!closed && event.url) onURL?.(String(event.url), { replace: true });
  };
  const contextReady = () => bindLinks();
  const failed = () => onError?.("Não foi possível carregar esta página.");
  frame.addEventListener("load", loaded);
  frame.addEventListener("error", failed);
  handle?.addEventListener("urlchange", changed);
  handle?.addEventListener("contextInit", contextReady);
  return {
    go: navigate,
    back() {
      startWatch();
      handle ? handle.back() : frame.contentWindow?.history.back();
    },
    forward() {
      startWatch();
      handle ? handle.forward() : frame.contentWindow?.history.forward();
    },
    reload() {
      startWatch();
      handle ? handle.reload() : frame.contentWindow?.location.reload();
    },
    destroy() {
      closed = true;
      clearInterval(watch);
      documentCleanup();
      frame.removeEventListener("load", loaded);
      frame.removeEventListener("error", failed);
      handle?.removeEventListener("urlchange", changed);
      handle?.removeEventListener("contextInit", contextReady);
      frame.src = "about:blank";
    },
  };
}
function xorEncode(value) {
  return encodeURIComponent(
    Array.from(value, (character, index) =>
      index % 2 ? String.fromCharCode(character.charCodeAt(0) ^ 2) : character,
    ).join(""),
  );
}
function xorDecode(value) {
  return Array.from(decodeURIComponent(value), (character, index) =>
    index % 2 ? String.fromCharCode(character.charCodeAt(0) ^ 2) : character,
  ).join("");
}
