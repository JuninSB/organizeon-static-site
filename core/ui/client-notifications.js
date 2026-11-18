const key = "organizeon-client-notifications";
export const clientNotificationsEnabled = () =>
  localStorage.getItem(key) !== "off";
export function installNotificationSettings(loadUI) {
  let host = null,
    ui = null,
    pending = false;
  const render = () => {
    if (!host?.isConnected || !ui) return;
    ui.mountPreferenceCard(
      host,
      {
        title: "Avisos do client",
        description:
          "Escolha se deseja receber avisos de modo mobile, conexão e carregamento.",
        label: "Avisos do client",
        value: clientNotificationsEnabled() ? "on" : "off",
        options: [
          { value: "on", label: "Ativados" },
          { value: "off", label: "Desativados" },
        ],
        onApply: (value) => {
          localStorage.setItem(key, value);
          if (value === "off") ui.dismissClientToast();
          render();
        },
      },
      host.dataset.stylesheet,
    );
  };
  const check = async () => {
    const heading = Array.from(document.querySelectorAll("h1")).find(
      (h) => h.textContent?.trim().toLowerCase() === "settings",
    );
    if (!heading) {
      if (host) {
        ui?.unmountPreferenceCard(host);
        host.remove();
        host = null;
      }
      return;
    }
    if (host?.isConnected || pending) return;
    const container = heading.closest('[class~="max-w-5xl"]');
    if (!container) return;
    pending = true;
    try {
      const loaded = await loadUI();
      if (!container.isConnected) return;
      ui = loaded.ui;
      host = document.createElement("section");
      host.id = "organizeon-notification-preferences";
      host.dataset.stylesheet = loaded.css;
      container.append(host);
      render();
    } finally {
      pending = false;
    }
  };
  const observer = new MutationObserver(() => void check());
  observer.observe(document.body, { subtree: true, childList: true });
  void check();
  return () => {
    observer.disconnect();
    if (host) ui?.unmountPreferenceCard(host);
    host?.remove();
  };
}
