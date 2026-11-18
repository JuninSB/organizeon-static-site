export function installBrandFavicon(base) {
  let icon = document.getElementById("organizeon-favicon");
  if (!icon) {
    icon = document.createElement("link");
    icon.id = "organizeon-favicon";
    icon.rel = "icon";
    document.head.append(icon);
  }
  const update = () => {
    const light = document.documentElement.classList.contains("light");
    const href = new URL(
      light ? "brand/organizeon-icon-black.png" : "brand/organizeon-icon.png",
      base,
    ).href;
    if (icon.href !== href) icon.href = href;
  };
  update();
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });
  return () => observer.disconnect();
}
