/** Opens explicit shared links only when the account preference is enabled. */
export function bindInjectedLinks({ enabled, navigate }) {
  if (!enabled) return () => {};
  const receive = () => {
    if (!location.hash.startsWith("#inject=")) return;
    let target;
    try {
      target = new URL(decodeURIComponent(location.hash.slice(8)));
    } catch {
      return;
    }
    if (!["http:", "https:"].includes(target.protocol)) return;
    history.replaceState(
      history.state,
      "",
      location.pathname + location.search,
    );
    const encoded = btoa(unescape(encodeURIComponent(target.href)));
    navigate({ to: "/search", search: { query: encoded } });
  };
  window.addEventListener("hashchange", receive);
  receive();
  return () => window.removeEventListener("hashchange", receive);
}
