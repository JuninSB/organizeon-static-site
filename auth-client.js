const config = window.__ORGANIZEON_CONFIG__;
const tokenStorageKey = "organizeon-access-token";
const proxyServerStorageKey = "organizeon-proxy-server";
const wispBandwidthStorageKey = "organizeon-wisp-bandwidth-limit";
const browserIdentityStorageKey = "organizeon-browser-identity";
const gameCacheName = "organizeon-games-v1";
const browserIdentityOptions = Object.freeze([
  Object.freeze({
    id: "edge",
    name: "Microsoft Edge",
    description: "Compatibilidade com sites feitos para navegadores Chromium.",
  }),
  Object.freeze({
    id: "duckduckgo",
    name: "DuckDuckGo",
    description: "Identidade do navegador DuckDuckGo com proteção de privacidade.",
  }),
  Object.freeze({
    id: "firefox",
    name: "Mozilla Firefox",
    description: "Identidade Gecko/Firefox para sites que distinguem o navegador.",
  }),
]);
const proxyServerOptions = Object.freeze([
  Object.freeze({
    id: "organizeon",
    name: "OrganizeOn",
    description: "Servidor próprio, autenticado e recomendado.",
    url: null,
    beta: false,
  }),
  Object.freeze({
    id: "fern-original",
    name: "Fern original",
    description: "Servidor WISP público usado pelo cliente original.",
    url: "wss://fern.best/wisp/",
    beta: true,
  }),
  Object.freeze({
    id: "legacy-chicago",
    name: "Original — Chicago",
    description: "Rota WISP legada encontrada no código original.",
    url: "wss://girlspreples.org/wi/",
    beta: true,
  }),
]);
let appStarted = false;
let controlSocket = null;
let controlReady = false;
let controlReconnectTimer = null;
let controlReconnectAttempts = 0;
let maintainControlConnection = false;
let dashboardPanelCleanup = null;
window.organizeonOpenProxyServerDialog = showProxyServerDialog;
window.organizeonResetAndLogout = resetAuthenticationForDataWipe;
window.organizeonOpenQuickApp = openQuickApp;
window.organizeonOpenGameCatalog = showGameCatalog;
setupMobileMode();
hideDefaultHomepageShortcuts();
setupWispBandwidthSetting();
setupBrowserIdentitySetting();
window.addEventListener("storage", (event) => {
  if (
    event.key === tokenStorageKey &&
    event.oldValue &&
    event.newValue === null
  ) {
    maintainControlConnection = false;
    window.clearTimeout(controlReconnectTimer);
    controlSocket?.close(1000, "Logged out in another tab");
    restartClientAtMain();
  }
});

if (!config?.authenticationRequired) {
  startApplication();
} else {
  showConnectionStatus(
    "Validando sessão…",
    "Confirmando seu token com o servidor.",
  );
  validateExistingSession();
}

async function validateExistingSession() {
  const token = localStorage.getItem(tokenStorageKey);

  try {
    const response = await apiRequest("/auth/session", { method: "GET" });
    if (!response.ok) throw new Error("session_expired");
    const session = await response.json();
    scheduleExpiration(session.expiresAt);
    await startApplication(token, session);
  } catch {
    localStorage.removeItem(tokenStorageKey);
    hideConnectionStatus();
    showLogin(token ? "Sua sessão expirou. Entre novamente." : "");
  }
}

async function startApplication(
  token = localStorage.getItem(tokenStorageKey),
  account = null,
) {
  if (appStarted) return;
  appStarted = true;

  const proxyServer = getSelectedProxyServer();
  const browserIdentity = getSelectedBrowserIdentity();
  window.__FERN_WISP_URL__ = buildProxyWispUrl(proxyServer, token);
  window.__ORGANIZEON_USER_AGENT__ = browserIdentity.userAgent;
  window.organizeonBrowserIdentity = Object.freeze({
    id: browserIdentity.id,
    name: browserIdentity.name,
  });
  window.organizeonProxyServer = Object.freeze({
    id: proxyServer.id,
    name: proxyServer.name,
    beta: proxyServer.beta,
  });

  removeLogin();
  configureAccountNavigation(account);
  try {
    maintainControlConnection = true;
    showConnectionStatus(
      "Conectando ao servidor proxy…",
      "Abrindo WebSocket e realizando handshake autenticado.",
    );
    try {
      await connectControlSocket(token);
      showConnectionStatus(
        "Servidor proxy conectado",
        "Handshake concluído. Baixando ativos essenciais…",
        35,
      );
    } catch (error) {
      console.warn("WebSocket de controle indisponível:", error);
      showConnectionStatus(
        "Servidor respondeu, mas o WebSocket falhou",
        "O cliente continuará e tentará reconectar em segundo plano.",
      );
    }

    await import(config.appModule);
    showConnectionStatus(
      "Cliente pronto",
      controlReady
        ? `${proxyServer.name} selecionado e ativos essenciais carregados.`
        : "Ativos carregados; reconectando o proxy em segundo plano.",
      100,
      8000,
    );
  } catch (error) {
    appStarted = false;
    console.error("Falha ao carregar o aplicativo:", error);
    hideConnectionStatus();
    showLogin("Não foi possível carregar o aplicativo. Tente novamente.");
  }
}

function connectControlSocket(token = localStorage.getItem(tokenStorageKey)) {
  if (
    controlReady &&
    controlSocket?.readyState === WebSocket.OPEN
  ) {
    return Promise.resolve();
  }
  if (controlSocket?.readyState === WebSocket.CONNECTING) {
    controlSocket.close(1000, "Restarting handshake");
  }

  const socketBase =
    `${config.apiOrigin.replace(/^http/, "ws")}` +
    `${config.apiPrefix}/connect/`;
  const socketUrl = token
    ? `${socketBase}${encodeURIComponent(token)}/`
    : socketBase;

  return new Promise((resolve, reject) => {
    let settled = false;
    const socket = new WebSocket(socketUrl);
    const timeout = window.setTimeout(() => {
      if (socket.readyState < WebSocket.CLOSING) {
        socket.close(4000, "Handshake timeout");
      }
      finish(new Error("Tempo limite do handshake excedido."));
    }, 8000);

    controlSocket = socket;
    controlReady = false;
    publishConnectionState("connecting");

    socket.addEventListener("message", (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        socket.close(1007, "Invalid server message");
        return;
      }

      if (
        message.type === "handshake" &&
        message.protocol === 1 &&
        message.authenticated
      ) {
        socket.send(
          JSON.stringify({
            type: "client-ready",
            protocol: 1,
            clientVersion:
              window.__ORGANIZEON_CLIENT_VERSION__ || "unknown",
          }),
        );
        return;
      }

      if (message.type === "ready" && message.protocol === 1) {
        controlReady = true;
        controlReconnectAttempts = 0;
        publishConnectionState("connected");
        finish();
      }
    });

    socket.addEventListener("error", () => {
      finish(new Error("Falha ao abrir o WebSocket de controle."));
    });

    socket.addEventListener("close", () => {
      const wasReady = controlReady;
      controlReady = false;
      if (controlSocket === socket) controlSocket = null;
      publishConnectionState("disconnected");
      if (!settled) {
        finish(new Error("O servidor encerrou o handshake."));
      }
      if (maintainControlConnection) {
        scheduleControlReconnect(wasReady);
      }
    });

    function finish(error) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      if (error) reject(error);
      else resolve();
    }
  });
}

function scheduleControlReconnect(wasReady) {
  if (controlReconnectTimer || !maintainControlConnection) return;
  controlReconnectAttempts += 1;
  const delay = Math.min(
    1000 * 2 ** Math.min(controlReconnectAttempts - 1, 5),
    30000,
  );
  if (wasReady || controlReconnectAttempts > 1) {
    showConnectionStatus(
      "Reconectando ao servidor proxy…",
      `Nova tentativa em ${(delay / 1000).toFixed(0)}s.`,
    );
  }
  controlReconnectTimer = window.setTimeout(async () => {
    controlReconnectTimer = null;
    try {
      await connectControlSocket();
      showConnectionStatus(
        "Servidor proxy reconectado",
        "Handshake autenticado concluído.",
        100,
        8000,
      );
    } catch {
      scheduleControlReconnect(false);
    }
  }, delay);
}

function publishConnectionState(state) {
  window.dispatchEvent(
    new CustomEvent("organizeon:connection", {
      detail: { state, authenticated: controlReady },
    }),
  );
}

function showConnectionStatus(
  title,
  detail = "",
  percent = null,
  autoHideMs = 8000,
) {
  const element = ensureConnectionStatus();
  element.querySelector(".title").textContent = title;
  element.querySelector(".detail").textContent = detail;
  const progress = element.querySelector(".bar span");
  if (Number.isFinite(percent)) {
    progress.classList.remove("indeterminate");
    progress.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  } else {
    progress.classList.add("indeterminate");
    progress.style.width = "38%";
  }
  element.hidden = false;
  window.clearTimeout(element.hideTimer);
  if (autoHideMs > 0) {
    element.hideTimer = window.setTimeout(
      () => hideConnectionStatus(),
      autoHideMs,
    );
  }
}

function hideConnectionStatus() {
  const element = document.getElementById("organizeon-network-status");
  if (element) element.hidden = true;
}

function ensureConnectionStatus() {
  let element = document.getElementById("organizeon-network-status");
  if (element) return element;

  element = document.createElement("div");
  element.id = "organizeon-network-status";
  element.setAttribute("role", "status");
  element.setAttribute("aria-live", "polite");
  element.innerHTML = `
    <style>
      #organizeon-network-status {
        position: fixed; right: 14px; bottom: 14px; z-index: 2147483646;
        width: min(390px, calc(100% - 28px)); padding: 14px 16px;
        border: 1px solid rgba(75, 247, 210, .3); border-radius: 13px;
        color: #eafff9; background: rgba(7, 20, 18, .95);
        box-shadow: 0 16px 48px rgba(0,0,0,.48);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      #organizeon-network-status[hidden] { display: none; }
      #organizeon-network-status .title {
        padding-right: 28px; color: #70f2d0; font-size: 14px; font-weight: 750;
      }
      #organizeon-network-status .close {
        position: absolute; top: 7px; right: 8px; width: 30px; height: 30px;
        display: grid; place-items: center; padding: 0; border: 0;
        border-radius: 8px; cursor: pointer; color: #9db8b1;
        background: transparent; font: 700 19px/1 system-ui, sans-serif;
      }
      #organizeon-network-status .close:hover {
        color: #fff; background: rgba(255,255,255,.08);
      }
      #organizeon-network-status .detail {
        margin-top: 4px; color: #9db8b1; font-size: 12px; line-height: 1.4;
      }
      #organizeon-network-status .bar {
        height: 6px; margin-top: 10px; overflow: hidden;
        border-radius: 999px; background: rgba(95, 255, 218, .12);
      }
      #organizeon-network-status .bar span {
        display: block; height: 100%; border-radius: inherit;
        background: linear-gradient(90deg, #39d9b5, #63f2d5, #43caee);
        transition: width .2s ease;
      }
      #organizeon-network-status .bar span.indeterminate {
        animation: organizeon-status-slide 1.1s ease-in-out infinite alternate;
      }
      @keyframes organizeon-status-slide {
        from { transform: translateX(-35%); }
        to { transform: translateX(200%); }
      }
    </style>
    <button class="close" type="button" aria-label="Fechar notificação">×</button>
    <div class="title"></div>
    <div class="detail"></div>
    <div class="bar"><span class="indeterminate"></span></div>
  `;
  element.querySelector(".close").addEventListener(
    "click",
    hideConnectionStatus,
  );
  document.body.appendChild(element);
  return element;
}

window.organizeonStatus = Object.freeze({
  show: showConnectionStatus,
  hide: hideConnectionStatus,
  get connectionState() {
    return controlReady ? "connected" : "disconnected";
  },
});

function configureAccountNavigation(account) {
  if (!account) return;
  const normalized = {
    username: account.username,
    role: account.role,
    permissions: Array.isArray(account.permissions)
      ? account.permissions
      : [],
  };
  window.organizeonAccount = Object.freeze(normalized);

  document.getElementById("organizeon-account-navigation")?.remove();
  const navigation = document.createElement("div");
  navigation.id = "organizeon-account-navigation";
  const canOpenDashboard =
    normalized.permissions.includes("admin.dashboard");
  navigation.innerHTML = `
    <style>
      #organizeon-account-navigation {
        position: fixed; inset: 0 auto auto 0; z-index: 2147483645;
        color: #eafff9; font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      #organizeon-account-navigation * { box-sizing: border-box; }
      #organizeon-account-navigation .trigger {
        position: fixed; top: 14px; left: 14px; width: 43px; height: 43px;
        display: grid; place-items: center; border: 1px solid rgba(93,242,208,.3);
        border-radius: 13px; cursor: pointer; color: #72efd1;
        background: rgba(8,20,18,.88); box-shadow: 0 10px 35px rgba(0,0,0,.32);
        backdrop-filter: blur(12px);
      }
      #organizeon-account-navigation .glyph {
        display: grid; grid-template-columns: 5px 15px; gap: 5px;
        align-items: center; width: 25px;
      }
      #organizeon-account-navigation .glyph i {
        height: 3px; border-radius: 9px; background: currentColor;
      }
      #organizeon-account-navigation .glyph i:nth-child(odd) {
        width: 5px; height: 5px;
      }
      #organizeon-account-navigation .drawer {
        position: fixed; inset: 0 auto 0 0; width: min(310px, 86vw);
        padding: 78px 18px 20px; transform: translateX(-105%);
        border-right: 1px solid rgba(255,255,255,.1);
        background: rgba(7,15,13,.97); box-shadow: 25px 0 70px rgba(0,0,0,.4);
        transition: transform .22s ease; backdrop-filter: blur(18px);
      }
      #organizeon-account-navigation .backdrop {
        position: fixed; inset: 0; display: none; border: 0;
        background: rgba(0,0,0,.44); backdrop-filter: blur(2px);
      }
      #organizeon-account-navigation.open .backdrop { display: block; }
      #organizeon-account-navigation.open .drawer { transform: translateX(0); }
      #organizeon-account-navigation .account {
        margin: 0 8px 22px; color: #8eaaa2; font-size: 12px;
      }
      #organizeon-account-navigation .account strong {
        display: block; margin-bottom: 3px; color: #eafff9; font-size: 15px;
      }
      #organizeon-account-navigation .item {
        width: 100%; min-height: 46px; margin: 5px 0; padding: 0 14px;
        display: flex; align-items: center; gap: 11px; border: 0;
        border-radius: 11px; cursor: pointer; color: #cfe1dc;
        background: transparent; text-align: left; font-weight: 650;
      }
      #organizeon-account-navigation .item:hover {
        color: #75f2d2; background: rgba(79,235,199,.1);
      }
      #organizeon-account-navigation .item.logout {
        color: #ff9ca4; background: rgba(255, 83, 96, .06);
      }
      #organizeon-account-navigation .item.logout:hover {
        color: #ffd6d9; background: rgba(255, 83, 96, .16);
      }
      #organizeon-account-navigation .badge {
        margin-left: auto; padding: 3px 8px; border-radius: 99px;
        color: #73ecca; background: rgba(79,235,199,.12); font-size: 10px;
      }
    </style>
    <button class="trigger" type="button" aria-label="Abrir menu">
      <span class="glyph"><i></i><i></i><i></i><i></i></span>
    </button>
    <button class="backdrop" type="button" aria-label="Fechar menu"></button>
    <aside class="drawer">
      <div class="account">
        <strong></strong>
        <span></span>
      </div>
      <button class="item main" type="button">⌂ <span>Main</span></button>
      <button class="item settings" type="button">⚙ <span>Settings</span></button>
      <button class="item proxy-server" type="button">
        ⇄ <span>Proxy Server</span>
        <small class="badge proxy-badge"></small>
      </button>
      ${
        canOpenDashboard
          ? '<button class="item dashboard" type="button">◫ <span>Dashboard</span><small class="badge">ADMIN</small></button>'
          : ""
      }
      <button class="item logout" type="button">⇥ <span>Sair</span></button>
    </aside>
  `;
  navigation.querySelector(".account strong").textContent =
    normalized.username;
  navigation.querySelector(".account span").textContent =
    normalized.role === "admin" ? "Administrador" : "Usuário";
  const selectedProxy = getSelectedProxyServer();
  navigation.querySelector(".proxy-badge").textContent =
    selectedProxy.beta ? "BETA" : "ATIVO";
  navigation.querySelector(".trigger").addEventListener("click", () => {
    navigation.classList.toggle("open");
  });
  navigation.querySelector(".backdrop").addEventListener("click", () => {
    navigation.classList.remove("open");
  });
  navigation.querySelector(".main").addEventListener("click", () => {
    navigation.classList.remove("open");
    navigateClientRoute("/");
  });
  navigation.querySelector(".settings").addEventListener("click", () => {
    navigation.classList.remove("open");
    navigateClientRoute("/settings");
  });
  navigation
    .querySelector(".proxy-server")
    .addEventListener("click", () => {
      navigation.classList.remove("open");
      showProxyServerDialog();
    });
  navigation
    .querySelector(".dashboard")
    ?.addEventListener("click", () => {
      openDashboardWindow();
      navigation.classList.remove("open");
    });
  navigation.querySelector(".logout").addEventListener("click", () => {
    const confirmed = window.confirm(
      "Deseja realmente sair desta conta?",
    );
    if (!confirmed) return;
    window.organizeonAuth.logout();
  });
  document.body.appendChild(navigation);
}

function navigateClientRoute(route) {
  const target = new URL(window.location.href);
  const objectStorageHost =
    target.hostname === "storage.googleapis.com" ||
    target.hostname === "s3.amazonaws.com" ||
    /\.s3[.-][^.]*\.amazonaws\.com$/i.test(target.hostname) ||
    /\.storage\.googleapis\.com$/i.test(target.hostname);

  if (objectStorageHost) {
    target.searchParams.delete("route");
    if (route !== "/") target.searchParams.set("route", route);
  } else {
    const base = new URL("./", document.baseURI);
    target.pathname =
      route === "/"
        ? base.pathname
        : `${base.pathname.replace(/\/+$/, "")}${route}`;
    target.searchParams.delete("route");
  }

  window.history.pushState({}, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function restartClientAtMain() {
  // Settings and search are virtual SPA routes. Reloading one of those paths
  // directly makes static hosts such as GitHub Pages look for a real file and
  // return 404, so move history to the actual client root before reloading.
  navigateClientRoute("/");
  window.location.reload();
}

function openDashboardWindow() {
  const dashboardUrl = new URL("admin.html", document.baseURI).href;
  const dashboardOrigin = new URL(dashboardUrl).origin;
  dashboardPanelCleanup?.();

  const panel = document.createElement("section");
  panel.id = "organizeon-dashboard-panel";
  panel.setAttribute("aria-label", "Dashboard administrativo");
  panel.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;height:100dvh;" +
    "z-index:2147483647;background:#07100e";

  const frame = document.createElement("iframe");
  frame.title = "OrganizeOn Dashboard";
  frame.src = dashboardUrl;
  frame.allow = "clipboard-read; clipboard-write";
  frame.style.cssText =
    "display:block;width:100%;height:100%;border:0;background:#07100e";
  panel.appendChild(frame);
  document.body.appendChild(panel);

  const removeDashboard = () => {
    window.removeEventListener("message", closeDashboard);
    panel.remove();
    if (dashboardPanelCleanup === removeDashboard) {
      dashboardPanelCleanup = null;
    }
  };
  const closeDashboard = (event) => {
    if (
      event.source !== frame.contentWindow ||
      event.origin !== dashboardOrigin ||
      event.data?.type !== "organizeon:open-main"
    ) {
      return;
    }
    removeDashboard();
    if (event.data.openSidebar) {
      document
        .getElementById("organizeon-account-navigation")
        ?.classList.add("open");
    }
  };
  dashboardPanelCleanup = removeDashboard;
  window.addEventListener("message", closeDashboard);
}

async function openQuickApp(app, navigate) {
  if (app?.id === "games") {
    showGameCatalog();
    return true;
  }
  const handledByOriginalLauncher = new Set([
    "yt",
    "gfn",
    "bw",
    "roblox",
    "chat",
    "play",
  ]);
  if (
    !app ||
    handledByOriginalLauncher.has(app.id) ||
    typeof navigate !== "function"
  ) {
    return false;
  }

  let url = String(app.url || "").trim();
  if (!url) return true;
  if (!/^[a-z][a-z\d+.-]*:/i.test(url)) url = `https://${url}`;

  try {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("unsupported_protocol");
    }
    url = parsedUrl.href;
  } catch {
    showConnectionStatus(
      "Aplicativo inválido",
      "Edite o app e informe uma URL válida.",
      undefined,
      8000,
    );
    return true;
  }

  showConnectionStatus(
    `Abrindo ${app.name || "aplicativo"}…`,
    `Usando ${getSelectedProxyServer().name} pela conexão atual.`,
  );
  navigate({
    to: "/search",
    search: { query: window.btoa(url) },
  });
  return true;
}

async function showGameCatalog() {
  document.getElementById("organizeon-game-catalog")?.remove();
  const previousOverflow = document.body.style.overflow;
  const wrapper = document.createElement("section");
  wrapper.id = "organizeon-game-catalog";
  wrapper.setAttribute("aria-label", "Catálogo de jogos");
  wrapper.innerHTML = `
    <style>
      #organizeon-game-catalog {
        position: fixed; inset: 0; z-index: 2147483646;
        overflow: auto; color: #eafff8; background:
          radial-gradient(circle at 50% -10%, #173c34 0, transparent 38%),
          #070d0b; font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      #organizeon-game-catalog * { box-sizing: border-box; }
      #organizeon-game-catalog .shell {
        width: min(1180px, 100%); min-height: 100%; margin: auto;
        padding: 28px clamp(16px, 4vw, 42px) 48px;
      }
      #organizeon-game-catalog .topbar {
        display: flex; align-items: center; gap: 13px; margin-bottom: 28px;
      }
      #organizeon-game-catalog .back {
        width: 44px; height: 44px; flex: 0 0 auto; border-radius: 12px;
        border: 1px solid rgba(101,238,207,.24); cursor: pointer;
        color: #80efd3; background: rgba(65,208,176,.08); font-size: 23px;
      }
      #organizeon-game-catalog h1 {
        margin: 0; font-size: clamp(28px, 6vw, 48px); line-height: 1;
      }
      #organizeon-game-catalog .subtitle {
        margin: 6px 0 0; color: #8da9a1; font-size: 13px;
      }
      #organizeon-game-catalog .search {
        width: min(320px, 100%); min-height: 43px; margin-left: auto;
        padding: 0 14px; border: 1px solid rgba(255,255,255,.12);
        border-radius: 12px; outline: 0; color: #eafff8;
        background: rgba(255,255,255,.045); font: inherit;
      }
      #organizeon-game-catalog .search:focus {
        border-color: rgba(94,239,205,.6);
      }
      #organizeon-game-catalog .grid {
        display: grid; grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 18px;
      }
      #organizeon-game-catalog .card {
        overflow: hidden; border: 1px solid rgba(255,255,255,.1);
        border-radius: 18px; background: rgba(15,27,24,.9);
        box-shadow: 0 18px 50px rgba(0,0,0,.2);
      }
      #organizeon-game-catalog .cover {
        display: block; width: 100%; aspect-ratio: 16/10;
        object-fit: cover; background: #10201c;
      }
      #organizeon-game-catalog .copy { padding: 15px; }
      #organizeon-game-catalog .name-row {
        display: flex; align-items: flex-start; gap: 8px;
      }
      #organizeon-game-catalog h2 {
        margin: 0; font-size: 18px; line-height: 1.25;
      }
      #organizeon-game-catalog .size {
        margin-left: auto; padding: 4px 7px; border-radius: 999px;
        color: #7feace; background: rgba(79,226,191,.1);
        font-size: 10px; font-weight: 750; white-space: nowrap;
      }
      #organizeon-game-catalog .description {
        min-height: 39px; margin: 8px 0 13px; color: #91aaa3;
        font-size: 12px; line-height: 1.5;
      }
      #organizeon-game-catalog .actions { display: flex; gap: 8px; }
      #organizeon-game-catalog .action {
        min-height: 42px; flex: 1; padding: 0 12px; border-radius: 10px;
        border: 1px solid rgba(91,238,204,.28); cursor: pointer;
        color: #062019; background: #63e4c4; font-weight: 800;
      }
      #organizeon-game-catalog .remove {
        display: none; width: 42px; min-height: 42px; border-radius: 10px;
        border: 1px solid rgba(255,116,130,.24); cursor: pointer;
        color: #ffabb4; background: rgba(255,92,108,.08);
      }
      #organizeon-game-catalog .card.installed .remove { display: block; }
      #organizeon-game-catalog .progress {
        display: none; height: 5px; margin-top: 11px; overflow: hidden;
        border-radius: 999px; background: rgba(96,235,202,.12);
      }
      #organizeon-game-catalog .progress span {
        display: block; width: 0; height: 100%; border-radius: inherit;
        background: linear-gradient(90deg,#54dfbd,#58cbef);
        transition: width .12s linear;
      }
      #organizeon-game-catalog .card.downloading .progress { display: block; }
      #organizeon-game-catalog .empty {
        grid-column: 1/-1; padding: 70px 20px; text-align: center;
        color: #89a098;
      }
      #organizeon-game-catalog .player {
        position: fixed; inset: 0; z-index: 2; display: none;
        flex-direction: column; background: #050807;
      }
      #organizeon-game-catalog.playing .player { display: flex; }
      #organizeon-game-catalog .player-head {
        min-height: 58px; display: flex; align-items: center; gap: 12px;
        padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,.1);
        background: #091310;
      }
      #organizeon-game-catalog .player-head strong {
        min-width: 0; overflow: hidden; text-overflow: ellipsis;
        white-space: nowrap;
      }
      #organizeon-game-catalog .player iframe {
        display: block; width: 100%; flex: 1; border: 0; background: #050807;
      }
      @media (max-width: 820px) {
        #organizeon-game-catalog .grid {
          grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px;
        }
        #organizeon-game-catalog .topbar { flex-wrap: wrap; }
        #organizeon-game-catalog .search {
          order: 3; width: 100%; margin-left: 0;
        }
      }
      @media (max-width: 480px) {
        #organizeon-game-catalog .shell { padding-inline: 12px; }
        #organizeon-game-catalog .grid {
          grid-template-columns: minmax(0,1fr);
        }
        #organizeon-game-catalog .description { min-height: 0; }
      }
    </style>
    <div class="shell">
      <header class="topbar">
        <button class="back" type="button" aria-label="Voltar">←</button>
        <div><h1>Jogos</h1><p class="subtitle">Baixe uma vez e jogue direto do cache.</p></div>
        <input class="search" type="search" placeholder="Pesquisar jogos…" aria-label="Pesquisar jogos">
      </header>
      <div class="grid"><div class="empty">Carregando catálogo…</div></div>
    </div>
    <div class="player">
      <header class="player-head">
        <button class="back player-back" type="button" aria-label="Voltar ao catálogo">←</button>
        <strong></strong>
      </header>
      <iframe title="Jogo" sandbox="allow-scripts allow-modals"></iframe>
    </div>
  `;
  document.body.style.overflow = "hidden";
  document.body.appendChild(wrapper);

  const grid = wrapper.querySelector(".grid");
  const search = wrapper.querySelector(".search");
  const player = wrapper.querySelector(".player");
  const frame = player.querySelector("iframe");
  let catalog = [];
  let playerUrl = null;
  const assetUrl = (path) => {
    const basePath = window.__groveBase || new URL("./", location.href).pathname;
    const base = new URL(basePath, location.origin);
    return new URL(path.replace(/^\/+/, ""), base);
  };
  const close = () => {
    if (playerUrl) URL.revokeObjectURL(playerUrl);
    document.body.style.overflow = previousOverflow;
    wrapper.remove();
  };
  wrapper.querySelector(".topbar .back").addEventListener("click", close);
  wrapper.querySelector(".player-back").addEventListener("click", () => {
    wrapper.classList.remove("playing");
    frame.removeAttribute("src");
    if (playerUrl) URL.revokeObjectURL(playerUrl);
    playerUrl = null;
  });
  search.addEventListener("input", () => renderCatalog(search.value));

  try {
    const response = await fetch(
      assetUrl("games/catalog.json"),
      { cache: "no-cache" },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    catalog = Array.isArray(payload.games) ? payload.games : [];
    await renderCatalog();
  } catch (error) {
    grid.innerHTML = "";
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent =
      "Não foi possível carregar o catálogo. Verifique a conexão e tente novamente.";
    grid.appendChild(empty);
    console.error("Falha ao abrir catálogo de jogos:", error);
  }

  async function renderCatalog(query = "") {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    const games = catalog.filter((game) =>
      `${game.name} ${game.description} ${game.category}`
        .toLocaleLowerCase("pt-BR")
        .includes(normalized),
    );
    grid.innerHTML = "";
    if (!games.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "Nenhum jogo encontrado.";
      grid.appendChild(empty);
      return;
    }
    await Promise.all(
      games.map(async (game) => {
        const card = createGameCard(game);
        grid.appendChild(card);
        setCardInstalled(
          card,
          await isGameInstalled(game),
        );
      }),
    );
  }

  function createGameCard(game) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.gameId = game.id;
    const cover = document.createElement("img");
    cover.className = "cover";
    cover.src = assetUrl(`games/${game.cover}`).href;
    cover.alt = `Capa de ${game.name}`;
    cover.loading = "lazy";
    const copy = document.createElement("div");
    copy.className = "copy";
    const nameRow = document.createElement("div");
    nameRow.className = "name-row";
    const title = document.createElement("h2");
    title.textContent = game.name;
    const size = document.createElement("span");
    size.className = "size";
    size.textContent = formatGameBytes(game.size);
    nameRow.append(title, size);
    const description = document.createElement("p");
    description.className = "description";
    description.textContent = game.description;
    const actions = document.createElement("div");
    actions.className = "actions";
    const action = document.createElement("button");
    action.className = "action";
    action.type = "button";
    action.textContent = "Verificando…";
    action.disabled = true;
    action.addEventListener("click", async () => {
      if (card.classList.contains("installed")) {
        await playGame(game);
      } else {
        await installGame(game, card);
      }
    });
    const remove = document.createElement("button");
    remove.className = "remove";
    remove.type = "button";
    remove.title = "Apagar jogo do cache";
    remove.setAttribute("aria-label", `Apagar ${game.name} do cache`);
    remove.textContent = "×";
    remove.addEventListener("click", async () => {
      const cache = await caches.open(gameCacheName);
      await cache.delete(gameUrl(game));
      setCardInstalled(card, false);
    });
    const progress = document.createElement("div");
    progress.className = "progress";
    progress.innerHTML = "<span></span>";
    actions.append(action, remove);
    copy.append(nameRow, description, actions, progress);
    card.append(cover, copy);
    return card;
  }

  function setCardInstalled(card, installed) {
    card.classList.toggle("installed", installed);
    const action = card.querySelector(".action");
    action.disabled = false;
    action.textContent = installed ? "Jogar" : "Baixar";
  }

  async function isGameInstalled(game) {
    if (!("caches" in window)) return false;
    const cache = await caches.open(gameCacheName);
    const cached = await cache.match(gameUrl(game));
    return cached?.headers.get("X-OrganizeOn-Game-Hash") === game.sha256;
  }

  async function installGame(game, card) {
    if (!("caches" in window)) {
      window.alert("Este navegador não oferece armazenamento em cache.");
      return;
    }
    const action = card.querySelector(".action");
    const bar = card.querySelector(".progress span");
    card.classList.add("downloading");
    action.disabled = true;
    action.textContent = "Baixando 0%";
    try {
      const response = await fetch(gameUrl(game), { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const reader = response.body?.getReader();
      const chunks = [];
      let received = 0;
      if (reader) {
        while (true) {
          const result = await reader.read();
          if (result.done) break;
          chunks.push(result.value);
          received += result.value.byteLength;
          const percent = Math.min(
            100,
            Math.round((received / Math.max(1, game.size)) * 100),
          );
          bar.style.width = `${percent}%`;
          action.textContent = `Baixando ${percent}%`;
        }
      } else {
        const fallback = new Uint8Array(await response.arrayBuffer());
        chunks.push(fallback);
        received = fallback.byteLength;
      }
      const contents = new Uint8Array(received);
      let offset = 0;
      chunks.forEach((chunk) => {
        contents.set(chunk, offset);
        offset += chunk.byteLength;
      });
      const actualHash = await sha256Hex(contents);
      if (actualHash && actualHash !== game.sha256) {
        throw new Error("O arquivo baixado falhou na verificação.");
      }
      const headers = new Headers(response.headers);
      headers.set("Content-Type", "text/html; charset=utf-8");
      headers.set("X-OrganizeOn-Game-Hash", game.sha256);
      const cache = await caches.open(gameCacheName);
      await cache.put(
        gameUrl(game),
        new Response(contents, { status: 200, headers }),
      );
      setCardInstalled(card, true);
      bar.style.width = "100%";
    } catch (error) {
      action.disabled = false;
      action.textContent = "Tentar novamente";
      window.alert(
        `Não foi possível baixar ${game.name}: ${
          error instanceof Error ? error.message : "erro desconhecido"
        }`,
      );
    } finally {
      window.setTimeout(() => {
        card.classList.remove("downloading");
        bar.style.width = "0";
      }, 350);
    }
  }

  async function playGame(game) {
    const cache = await caches.open(gameCacheName);
    const response = await cache.match(gameUrl(game));
    if (!response) {
      await renderCatalog(search.value);
      return;
    }
    if (playerUrl) URL.revokeObjectURL(playerUrl);
    playerUrl = URL.createObjectURL(await response.blob());
    player.querySelector("strong").textContent = game.name;
    frame.title = game.name;
    frame.src = playerUrl;
    wrapper.classList.add("playing");
  }

  function gameUrl(game) {
    return assetUrl(`games/${game.entry}`).href;
  }

  async function sha256Hex(contents) {
    if (!window.crypto?.subtle) return "";
    const digest = await window.crypto.subtle.digest("SHA-256", contents);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function formatGameBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
}

function getSelectedProxyServer() {
  const selectedId =
    localStorage.getItem(proxyServerStorageKey) || "organizeon";
  return (
    proxyServerOptions.find((option) => option.id === selectedId) ||
    proxyServerOptions[0]
  );
}

function buildProxyWispUrl(
  proxyServer,
  token = localStorage.getItem(tokenStorageKey),
) {
  if (proxyServer.id !== "organizeon") return proxyServer.url;
  const wispBase =
    `${config.apiOrigin.replace(/^http/, "ws")}${config.apiPrefix}/wisp/`;
  if (!token) return wispBase;
  return isWispBandwidthLimitEnabled()
    ? `${wispBase}limited/${encodeURIComponent(token)}/`
    : `${wispBase}${encodeURIComponent(token)}/`;
}

function isWispBandwidthLimitEnabled() {
  return localStorage.getItem(wispBandwidthStorageKey) !== "off";
}

function getSelectedBrowserIdentity() {
  const selectedId =
    localStorage.getItem(browserIdentityStorageKey) || "firefox";
  const selected =
    browserIdentityOptions.find((option) => option.id === selectedId) ||
    browserIdentityOptions[2];
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
    navigator.userAgent,
  );
  const userAgents = mobile
    ? {
        edge:
          "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36 " +
          "EdgA/138.0.0.0",
        duckduckgo:
          "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36 " +
          "DuckDuckGo/5",
        firefox:
          "Mozilla/5.0 (Android 13; Mobile; rv:140.0) " +
          "Gecko/140.0 Firefox/140.0",
      }
    : {
        edge:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 " +
          "Safari/537.36 Edg/138.0.0.0",
        duckduckgo:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 " +
          "Safari/537.36 DuckDuckGo/5",
        firefox:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) " +
          "Gecko/20100101 Firefox/140.0",
      };
  return { ...selected, userAgent: userAgents[selected.id] };
}

function setupBrowserIdentitySetting() {
  const style = document.createElement("style");
  style.id = "organizeon-browser-identity-setting-styles";
  style.textContent = `
    #organizeon-browser-identity-setting {
      padding: 20px; border: 1px solid hsl(var(--border));
      border-radius: 12px; background: hsl(var(--card) / .8);
    }
    #organizeon-browser-identity-setting .row {
      display: flex; align-items: center; justify-content: space-between;
      gap: 18px;
    }
    #organizeon-browser-identity-setting h2 {
      margin: 0; color: hsl(var(--foreground)); font-size: 18px;
      font-weight: 600;
    }
    #organizeon-browser-identity-setting p {
      margin: 5px 0 0; max-width: 650px;
      color: hsl(var(--muted-foreground)); font-size: 13px;
      line-height: 1.5;
    }
    #organizeon-browser-identity-setting .controls {
      display: flex; align-items: center; gap: 8px; flex: 0 0 auto;
    }
    #organizeon-browser-identity-setting select,
    #organizeon-browser-identity-setting button {
      min-height: 40px; padding: 0 12px; border-radius: 8px;
      border: 1px solid hsl(var(--border)); font: inherit;
    }
    #organizeon-browser-identity-setting select {
      color: hsl(var(--foreground)); background: hsl(var(--background));
    }
    #organizeon-browser-identity-setting button {
      border-color: hsl(var(--primary) / .35);
      color: hsl(var(--primary-foreground));
      background: hsl(var(--primary)); font-weight: 600; cursor: pointer;
    }
    #organizeon-browser-identity-setting button:disabled {
      opacity: .5; cursor: default;
    }
    @media (max-width: 760px) {
      #organizeon-browser-identity-setting { padding: 16px; }
      #organizeon-browser-identity-setting .row {
        align-items: stretch; flex-direction: column;
      }
      #organizeon-browser-identity-setting .controls {
        width: 100%; flex-direction: column; align-items: stretch;
      }
      #organizeon-browser-identity-setting select,
      #organizeon-browser-identity-setting button { width: 100%; }
    }
  `;
  document.head.appendChild(style);

  const apply = () => {
    const settingsHeading = [...document.querySelectorAll("h1")].find(
      (heading) => heading.textContent?.trim().toLowerCase() === "settings",
    );
    const existing = document.getElementById(
      "organizeon-browser-identity-setting",
    );
    if (!settingsHeading) {
      existing?.remove();
      return;
    }
    if (existing) return;
    const settingsContainer = settingsHeading.closest(
      '[class~="max-w-5xl"]',
    );
    if (!settingsContainer) return;

    const card = document.createElement("section");
    card.id = "organizeon-browser-identity-setting";
    card.setAttribute("aria-labelledby", "organizeon-browser-identity-title");
    const row = document.createElement("div");
    row.className = "row";
    const copy = document.createElement("div");
    const title = document.createElement("h2");
    title.id = "organizeon-browser-identity-title";
    title.textContent = "Identidade do navegador";
    const description = document.createElement("p");
    description.textContent =
      "Escolhe como os sites abertos pelo proxy reconhecem o navegador. " +
      "A alteração vale para Ultraviolet e Scramjet após recarregar o cliente.";
    copy.append(title, description);

    const controls = document.createElement("div");
    controls.className = "controls";
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Identidade do navegador");
    browserIdentityOptions.forEach((identity) => {
      const option = document.createElement("option");
      option.value = identity.id;
      option.textContent = identity.name;
      select.appendChild(option);
    });
    select.value = getSelectedBrowserIdentity().id;
    select.title =
      browserIdentityOptions.find((item) => item.id === select.value)
        ?.description || "";

    const applyButton = document.createElement("button");
    applyButton.type = "button";
    applyButton.textContent = "Aplicar";
    applyButton.disabled = true;
    select.addEventListener("change", () => {
      applyButton.disabled =
        select.value === getSelectedBrowserIdentity().id;
      select.title =
        browserIdentityOptions.find((item) => item.id === select.value)
          ?.description || "";
    });
    applyButton.addEventListener("click", () => {
      localStorage.setItem(browserIdentityStorageKey, select.value);
      restartClientAtMain();
    });
    controls.append(select, applyButton);
    row.append(copy, controls);
    card.appendChild(row);

    const bandwidthCard = document.getElementById(
      "organizeon-bandwidth-setting",
    );
    if (bandwidthCard?.parentElement === settingsContainer) {
      bandwidthCard.insertAdjacentElement("afterend", card);
    } else {
      const headerBlock = settingsHeading.parentElement;
      if (headerBlock?.parentElement === settingsContainer) {
        headerBlock.insertAdjacentElement("afterend", card);
      } else {
        settingsContainer.prepend(card);
      }
    }
  };

  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("popstate", apply);
  apply();
}

function setupWispBandwidthSetting() {
  const style = document.createElement("style");
  style.id = "organizeon-bandwidth-setting-styles";
  style.textContent = `
    #organizeon-bandwidth-setting {
      padding: 20px; border: 1px solid hsl(var(--border));
      border-radius: 12px; background: hsl(var(--card) / .8);
    }
    #organizeon-bandwidth-setting .row {
      display: flex; align-items: center; justify-content: space-between;
      gap: 18px;
    }
    #organizeon-bandwidth-setting h2 {
      margin: 0; color: hsl(var(--foreground)); font-size: 18px;
      font-weight: 600;
    }
    #organizeon-bandwidth-setting p {
      margin: 5px 0 0; max-width: 650px;
      color: hsl(var(--muted-foreground)); font-size: 13px;
      line-height: 1.5;
    }
    #organizeon-bandwidth-setting .controls {
      display: flex; align-items: center; gap: 8px; flex: 0 0 auto;
    }
    #organizeon-bandwidth-setting select,
    #organizeon-bandwidth-setting button {
      min-height: 40px; padding: 0 12px; border-radius: 8px;
      border: 1px solid hsl(var(--border)); font: inherit;
    }
    #organizeon-bandwidth-setting select {
      color: hsl(var(--foreground)); background: hsl(var(--background));
    }
    #organizeon-bandwidth-setting button {
      border-color: hsl(var(--primary) / .35);
      color: hsl(var(--primary-foreground));
      background: hsl(var(--primary)); font-weight: 600; cursor: pointer;
    }
    #organizeon-bandwidth-setting button:disabled {
      opacity: .5; cursor: default;
    }
    @media (max-width: 760px) {
      #organizeon-bandwidth-setting { padding: 16px; }
      #organizeon-bandwidth-setting .row {
        align-items: stretch; flex-direction: column;
      }
      #organizeon-bandwidth-setting .controls {
        width: 100%; flex-direction: column; align-items: stretch;
      }
      #organizeon-bandwidth-setting select,
      #organizeon-bandwidth-setting button { width: 100%; }
    }
  `;
  document.head.appendChild(style);

  const apply = () => {
    const settingsHeading = [...document.querySelectorAll("h1")].find(
      (heading) => heading.textContent?.trim().toLowerCase() === "settings",
    );
    const existing = document.getElementById(
      "organizeon-bandwidth-setting",
    );
    if (!settingsHeading) {
      existing?.remove();
      return;
    }
    if (existing) return;

    const settingsContainer = settingsHeading.closest(
      '[class~="max-w-5xl"]',
    );
    if (!settingsContainer) return;

    const card = document.createElement("section");
    card.id = "organizeon-bandwidth-setting";
    card.setAttribute("aria-labelledby", "organizeon-bandwidth-title");

    const row = document.createElement("div");
    row.className = "row";
    const copy = document.createElement("div");
    const title = document.createElement("h2");
    title.id = "organizeon-bandwidth-title";
    title.textContent = "Limite de streaming do YouTube";
    const description = document.createElement("p");
    description.textContent =
      "O OrganizeOn limita somente a mídia do YouTube a 6 Mbps por conta. " +
      "Pesquisa, páginas, CSS, scripts e outros sites ficam sem limite. " +
      "“Sem limite” também libera o vídeo. Não afeta WISPs externos.";
    copy.append(title, description);

    const controls = document.createElement("div");
    controls.className = "controls";
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Limite de banda do WISP");
    const limited = document.createElement("option");
    limited.value = "limited";
    limited.textContent = "6 Mbps (padrão)";
    const unlimited = document.createElement("option");
    unlimited.value = "off";
    unlimited.textContent = "Sem limite";
    select.append(limited, unlimited);
    select.value = isWispBandwidthLimitEnabled() ? "limited" : "off";

    const applyButton = document.createElement("button");
    applyButton.type = "button";
    applyButton.textContent = "Aplicar";
    applyButton.disabled = true;
    select.addEventListener("change", () => {
      const currentValue = isWispBandwidthLimitEnabled()
        ? "limited"
        : "off";
      applyButton.disabled = select.value === currentValue;
    });
    applyButton.addEventListener("click", () => {
      if (select.value === "off") {
        localStorage.setItem(wispBandwidthStorageKey, "off");
      } else {
        localStorage.removeItem(wispBandwidthStorageKey);
      }
      restartClientAtMain();
    });
    controls.append(select, applyButton);
    row.append(copy, controls);
    card.appendChild(row);

    const headerBlock = settingsHeading.parentElement;
    if (headerBlock?.parentElement === settingsContainer) {
      headerBlock.insertAdjacentElement("afterend", card);
    } else {
      settingsContainer.prepend(card);
    }
  };

  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("popstate", apply);
  apply();
}

function hideDefaultHomepageShortcuts() {
  const hiddenLabels = new Set(["Chat", "Movies"]);
  const apply = () => {
    document
      .querySelectorAll('nav[class~="fixed"][class~="top-0"]')
      .forEach((navigation) => {
        const shortcuts = navigation.firstElementChild;
        if (!shortcuts) return;
        shortcuts.querySelectorAll("button, a").forEach((item) => {
          const label = item.querySelector("span")?.textContent?.trim();
          if (!hiddenLabels.has(label)) return;
          item.hidden = true;
          item.style.setProperty("display", "none", "important");
          item.setAttribute("aria-hidden", "true");
        });
      });
  };
  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList: true, subtree: true });
  apply();
}

function showProxyServerDialog() {
  document.getElementById("organizeon-proxy-dialog")?.remove();
  const current = getSelectedProxyServer();
  let pendingId = current.id;
  const wrapper = document.createElement("div");
  wrapper.id = "organizeon-proxy-dialog";
  wrapper.innerHTML = `
    <style>
      #organizeon-proxy-dialog {
        position: fixed; inset: 0; z-index: 2147483647;
        display: grid; place-items: center; padding: 22px;
        color: #eafff9; background: rgba(1, 7, 6, .76);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        backdrop-filter: blur(10px);
      }
      #organizeon-proxy-dialog * { box-sizing: border-box; }
      #organizeon-proxy-dialog .panel {
        width: min(100%, 520px); padding: 24px;
        border: 1px solid rgba(104, 241, 210, .22); border-radius: 18px;
        background: #091512; box-shadow: 0 28px 90px rgba(0,0,0,.55);
      }
      #organizeon-proxy-dialog h2 { margin: 0; font-size: 22px; }
      #organizeon-proxy-dialog .intro {
        margin: 7px 0 18px; color: #91aaa3; font-size: 13px;
        line-height: 1.5;
      }
      #organizeon-proxy-dialog .option {
        width: 100%; margin: 8px 0; padding: 14px;
        display: flex; align-items: flex-start; gap: 12px;
        border: 1px solid rgba(255,255,255,.1); border-radius: 13px;
        color: #dcebe7; background: rgba(255,255,255,.025);
        cursor: pointer; text-align: left;
      }
      #organizeon-proxy-dialog .option:hover {
        border-color: rgba(97,239,207,.35);
      }
      #organizeon-proxy-dialog .option.selected {
        border-color: #54e3c2; background: rgba(72,224,190,.09);
      }
      #organizeon-proxy-dialog .radio {
        width: 17px; height: 17px; margin-top: 2px; flex: 0 0 auto;
        border: 2px solid #58716a; border-radius: 50%;
      }
      #organizeon-proxy-dialog .selected .radio {
        border: 5px solid #54e3c2;
      }
      #organizeon-proxy-dialog strong { font-size: 14px; }
      #organizeon-proxy-dialog .description {
        display: block; margin-top: 4px; color: #8ea69f;
        font-size: 12px; line-height: 1.4;
      }
      #organizeon-proxy-dialog .connection {
        display: flex; align-items: center; gap: 6px; margin-top: 7px;
        color: #88a099; font-size: 11px; font-weight: 650;
      }
      #organizeon-proxy-dialog .connection::before {
        width: 7px; height: 7px; border-radius: 50%;
        background: #71817d; content: "";
      }
      #organizeon-proxy-dialog .connection.online {
        color: #66e8c9;
      }
      #organizeon-proxy-dialog .connection.online::before {
        background: #4ee0bd; box-shadow: 0 0 9px rgba(78,224,189,.7);
      }
      #organizeon-proxy-dialog .connection.offline {
        color: #ff9da5;
      }
      #organizeon-proxy-dialog .connection.offline::before {
        background: #ff6b75;
      }
      #organizeon-proxy-dialog .option.best {
        box-shadow: inset 0 0 0 1px rgba(84,227,194,.18);
      }
      #organizeon-proxy-dialog .beta {
        margin-left: 7px; padding: 2px 6px; border-radius: 999px;
        color: #fbd38d; background: rgba(245,158,11,.13);
        font-size: 9px; letter-spacing: .05em;
      }
      #organizeon-proxy-dialog .warning {
        margin: 16px 0; padding: 11px 12px;
        border: 1px solid rgba(245,158,11,.22); border-radius: 10px;
        color: #d7b97b; background: rgba(245,158,11,.07);
        font-size: 11px; line-height: 1.45;
      }
      #organizeon-proxy-dialog .actions {
        display: flex; justify-content: flex-end; gap: 9px;
      }
      #organizeon-proxy-dialog .actions button {
        min-height: 40px; padding: 0 15px; border-radius: 10px;
        border: 1px solid rgba(255,255,255,.12); cursor: pointer;
        color: #dcebe7; background: transparent; font-weight: 700;
      }
      #organizeon-proxy-dialog .actions .apply {
        border-color: #54e3c2; color: #062018; background: #54e3c2;
      }
    </style>
    <section class="panel" role="dialog" aria-modal="true"
      aria-labelledby="organizeon-proxy-title">
      <h2 id="organizeon-proxy-title">Escolher servidor proxy</h2>
      <p class="intro">
        Isto escolhe o servidor WISP. Ultraviolet e Scramjet continuam
        disponíveis separadamente em Settings → Proxy. A latência abaixo é
        o tempo completo para abrir o WebSocket neste dispositivo, não ping
        ICMP.
      </p>
      <div class="options"></div>
      <p class="warning">
        Servidores BETA são externos, podem ficar lentos ou sair do ar e o
        tráfego de navegação não passará pelo backend OrganizeOn.
      </p>
      <div class="actions">
        <button class="cancel" type="button">Cancelar</button>
        <button class="apply" type="button">Aplicar e reiniciar</button>
      </div>
    </section>
  `;
  const options = wrapper.querySelector(".options");
  for (const option of proxyServerOptions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "option" + (option.id === pendingId ? " selected" : "");
    button.dataset.proxyId = option.id;
    button.innerHTML = `
      <span class="radio"></span>
      <span>
        <strong></strong>
        ${option.beta ? '<small class="beta">BETA</small>' : ""}
        <span class="description"></span>
        <span class="connection">Medindo latência WebSocket…</span>
      </span>
    `;
    button.querySelector("strong").textContent = option.name;
    button.querySelector(".description").textContent =
      option.description;
    button.addEventListener("click", () => {
      pendingId = option.id;
      options.querySelectorAll(".option").forEach((item) => {
        item.classList.toggle(
          "selected",
          item.dataset.proxyId === pendingId,
        );
      });
    });
    options.appendChild(button);
  }
  wrapper.querySelector(".cancel").addEventListener("click", () => {
    wrapper.remove();
  });
  wrapper.querySelector(".apply").addEventListener("click", () => {
    localStorage.setItem(proxyServerStorageKey, pendingId);
    restartClientAtMain();
  });
  wrapper.addEventListener("click", (event) => {
    if (event.target === wrapper) wrapper.remove();
  });
  document.body.appendChild(wrapper);
  measureProxyServerOptions(wrapper);
}

async function measureProxyServerOptions(dialog) {
  const token = localStorage.getItem(tokenStorageKey);
  const measurements = await Promise.all(
    proxyServerOptions.map(async (option) => {
      const button = dialog.querySelector(
        `[data-proxy-id="${option.id}"]`,
      );
      const connection = button?.querySelector(".connection");
      const result = await measureWispHandshake(
        buildProxyWispUrl(option, token),
      );
      if (!dialog.isConnected || !button || !connection) return result;
      connection.classList.add(result.online ? "online" : "offline");
      connection.textContent = result.online
        ? `Saudável · ${result.latencyMs} ms`
        : result.reason;
      return { ...result, button, connection };
    }),
  );
  const healthy = measurements.filter(
    (measurement) => measurement.online && measurement.button,
  );
  if (!healthy.length) return;
  const best = healthy.reduce((current, measurement) =>
    measurement.latencyMs < current.latencyMs ? measurement : current,
  );
  best.button.classList.add("best");
  best.connection.textContent += " · melhor";
}

function measureWispHandshake(url) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    let settled = false;
    let socket;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      try {
        socket?.close(1000, "Latency check complete");
      } catch {}
      resolve(result);
    };
    const timeout = window.setTimeout(() => {
      finish({ online: false, latencyMs: null, reason: "Tempo esgotado" });
    }, 6000);
    try {
      socket = new WebSocket(url);
      socket.addEventListener(
        "open",
        () => {
          finish({
            online: true,
            latencyMs: Math.max(1, Math.round(performance.now() - startedAt)),
            reason: null,
          });
        },
        { once: true },
      );
      socket.addEventListener(
        "error",
        () => {
          finish({
            online: false,
            latencyMs: null,
            reason: "Indisponível deste dispositivo",
          });
        },
        { once: true },
      );
      socket.addEventListener(
        "close",
        () => {
          finish({
            online: false,
            latencyMs: null,
            reason: "Conexão recusada",
          });
        },
        { once: true },
      );
    } catch {
      finish({
        online: false,
        latencyMs: null,
        reason: "URL incompatível",
      });
    }
  });
}

function setupMobileMode() {
  const mobileMedia = window.matchMedia(
    "(max-width: 760px), (max-width: 1024px) and (pointer: coarse)",
  );
  const mobileDevice =
    navigator.userAgentData?.mobile === true ||
    /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const style = document.createElement("style");
  style.id = "organizeon-mobile-styles";
  style.textContent = `
    html.organizeon-mobile,
    html.organizeon-mobile body,
    html.organizeon-mobile #root {
      width: 100%; max-width: 100%; overflow-x: hidden;
    }
    html.organizeon-mobile [class~="container"] {
      width: 100% !important; max-width: 100% !important;
      padding-left: 14px !important; padding-right: 14px !important;
    }
    html.organizeon-mobile [class~="w-screen"] {
      width: 100% !important; max-width: 100% !important;
    }
    html.organizeon-mobile [class~="h-screen"] {
      height: 100dvh !important;
    }
    html.organizeon-mobile [class~="min-h-screen"] {
      min-height: 100dvh !important;
    }
    html.organizeon-mobile [class~="w-96"] {
      width: min(24rem, calc(100dvw - 28px)) !important;
    }
    html.organizeon-mobile [class~="w-80"] {
      width: min(20rem, calc(100dvw - 24px)) !important;
    }
    html.organizeon-mobile [class~="p-8"] { padding: 16px !important; }
    html.organizeon-mobile [class~="px-8"] {
      padding-left: 16px !important; padding-right: 16px !important;
    }
    html.organizeon-mobile [class~="text-5xl"] {
      font-size: 2.1rem !important; line-height: 1.08 !important;
    }
    html.organizeon-mobile [class~="text-6xl"] {
      font-size: 2.45rem !important; line-height: 1.05 !important;
    }
    html.organizeon-mobile [class~="w-48"] {
      width: 100% !important; max-width: 100% !important;
    }
    html.organizeon-mobile [class~="flex"][class~="gap-8"] {
      flex-direction: column !important; gap: 18px !important;
    }
    html.organizeon-mobile [class~="grid-cols-3"],
    html.organizeon-mobile [class~="grid-cols-4"],
    html.organizeon-mobile [class~="grid-cols-5"],
    html.organizeon-mobile [class~="grid-cols-6"] {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
    html.organizeon-mobile nav {
      max-width: 100%; overflow-x: auto; overscroll-behavior-x: contain;
    }
    html.organizeon-mobile nav[class~="fixed"][class~="top-0"] {
      padding: 8px !important; overflow: visible !important;
      flex-wrap: nowrap !important;
    }
    html.organizeon-mobile nav[class~="fixed"][class~="top-0"]
      > div:first-child {
      min-width: 0; overflow-x: auto; scrollbar-width: none;
    }
    html.organizeon-mobile nav[class~="fixed"][class~="top-0"]
      > div:first-child::-webkit-scrollbar {
      display: none;
    }
    html.organizeon-mobile nav[class~="fixed"][class~="top-0"]
      > div:first-child > * {
      flex: 0 0 auto;
    }
    html.organizeon-mobile nav[class~="fixed"][class~="top-0"]
      > div:last-child {
      flex: 0 0 auto;
    }
    html.organizeon-mobile img,
    html.organizeon-mobile video,
    html.organizeon-mobile iframe {
      max-inline-size: 100% !important;
    }
    html.organizeon-mobile iframe[title="content-viewer"] {
      width: 100dvw !important; max-width: 100dvw !important;
      height: 100dvh !important; max-height: 100dvh !important;
    }
    html.organizeon-mobile [class~="flex"][class~="justify-between"] {
      flex-wrap: wrap;
    }
    html.organizeon-mobile button,
    html.organizeon-mobile input,
    html.organizeon-mobile select,
    html.organizeon-mobile textarea {
      max-width: 100%; min-height: 44px;
    }
    html.organizeon-mobile [role="dialog"] {
      max-width: calc(100vw - 24px) !important;
      max-height: calc(100dvh - 24px) !important;
      overflow-y: auto !important;
    }
    html.organizeon-mobile #organizeon-account-navigation .trigger {
      top: 12px; left: 12px;
    }
    #organizeon-mobile-notice {
      position: fixed; top: 14px; left: 50%; z-index: 2147483647;
      width: max-content; max-width: calc(100vw - 28px);
      padding: 10px 14px; transform: translateX(-50%);
      border: 1px solid rgba(93,240,200,.3); border-radius: 999px;
      color: #dffff6; background: rgba(5,22,18,.94);
      box-shadow: 0 12px 38px rgba(0,0,0,.35);
      font: 650 12px/1.3 Inter, ui-sans-serif, system-ui, sans-serif;
      transition: opacity .25s ease, transform .25s ease;
      backdrop-filter: blur(12px);
    }
    #organizeon-mobile-notice button {
      width: 25px; min-height: 25px; margin: -5px -7px -5px 7px;
      padding: 0; border: 0; border-radius: 999px; cursor: pointer;
      color: #a9c9c0; background: rgba(255,255,255,.06);
      font: 700 16px/1 system-ui, sans-serif;
    }
    #organizeon-mobile-notice.leaving {
      opacity: 0; transform: translate(-50%, -8px);
    }
    @media (max-width: 390px) {
      html.organizeon-mobile [class~="grid-cols-3"],
      html.organizeon-mobile [class~="grid-cols-4"],
      html.organizeon-mobile [class~="grid-cols-5"],
      html.organizeon-mobile [class~="grid-cols-6"] {
        grid-template-columns: minmax(0, 1fr) !important;
      }
    }
    @media (pointer: coarse) {
      html.organizeon-mobile button,
      html.organizeon-mobile a,
      html.organizeon-mobile input,
      html.organizeon-mobile select {
        touch-action: manipulation;
      }
    }
  `;
  document.head.appendChild(style);
  let noticeShown = false;

  const applyMode = () => {
    const enabled = mobileDevice || mobileMedia.matches;
    document.documentElement.classList.toggle(
      "organizeon-mobile",
      enabled,
    );
    if (!enabled || noticeShown) return;
    noticeShown = true;
    const notice = document.createElement("div");
    notice.id = "organizeon-mobile-notice";
    notice.setAttribute("role", "status");
    notice.append(document.createTextNode("Modo mobile ativado"));
    const close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Fechar notificação");
    close.textContent = "×";
    notice.appendChild(close);
    document.body.appendChild(notice);
    const dismiss = () => {
      notice.classList.add("leaving");
      window.setTimeout(() => notice.remove(), 300);
    };
    close.addEventListener("click", dismiss);
    window.setTimeout(dismiss, 8000);
  };

  applyMode();
  mobileMedia.addEventListener?.("change", applyMode);
}

function showLogin(message = "") {
  if (document.getElementById("organizeon-login")) {
    setMessage(message);
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.id = "organizeon-login";
  wrapper.innerHTML = `
    <style>
      #organizeon-login {
        position: fixed; inset: 0; z-index: 2147483647;
        display: grid; place-items: center; padding: 24px;
        color: #f5f7f6; background:
          radial-gradient(circle at 50% 20%, rgba(56, 130, 96, .22), transparent 38%),
          #0b0e0d;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      #organizeon-login * { box-sizing: border-box; }
      #organizeon-login form {
        width: min(100%, 390px); padding: 30px;
        border: 1px solid rgba(255,255,255,.12); border-radius: 18px;
        background: rgba(22, 27, 25, .94);
        box-shadow: 0 24px 70px rgba(0,0,0,.45);
      }
      #organizeon-login h1 { margin: 0 0 8px; font-size: 28px; }
      #organizeon-login p { margin: 0 0 22px; color: #aab4b0; font-size: 14px; }
      #organizeon-login label { display: block; margin: 14px 0 6px; font-size: 13px; }
      #organizeon-login input {
        width: 100%; height: 44px; padding: 0 12px;
        border: 1px solid #39423e; border-radius: 10px;
        color: #fff; background: #111614; outline: none;
      }
      #organizeon-login input:focus { border-color: #76d6a8; }
      #organizeon-login button {
        width: 100%; height: 44px; margin-top: 20px;
        border: 0; border-radius: 10px; cursor: pointer;
        color: #08120d; background: #86e7b8; font-weight: 700;
      }
      #organizeon-login button:disabled { cursor: wait; opacity: .65; }
      #organizeon-login .message {
        min-height: 19px; margin: 14px 0 0;
        color: #ff9c9c; font-size: 13px;
      }
    </style>
    <form autocomplete="on">
      <h1>Acesso privado</h1>
      <p>A sessão permanece ativa por até 14 dias neste dispositivo.</p>
      <label for="organizeon-username">Usuário</label>
      <input id="organizeon-username" name="username" autocomplete="username" required>
      <label for="organizeon-password">Senha</label>
      <input id="organizeon-password" name="password" type="password"
             autocomplete="current-password" required>
      <button type="submit">Entrar</button>
      <div class="message" role="status" aria-live="polite"></div>
    </form>
  `;

  document.body.appendChild(wrapper);
  setMessage(message);

  const form = wrapper.querySelector("form");
  const button = wrapper.querySelector("button");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "Autenticando…";
    setMessage("");
    showConnectionStatus(
      "Autenticando…",
      "Enviando credenciais com conexão segura.",
    );

    try {
      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: form.elements.username.value,
          password: form.elements.password.value,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.token) {
        if (response.status === 429) {
          throw new Error("Muitas tentativas. Aguarde 15 minutos.");
        }
        throw new Error("Usuário ou senha inválidos.");
      }

      localStorage.setItem(tokenStorageKey, result.token);
      scheduleExpiration(result.expiresAt);
      await startApplication(result.token, result.account);
    } catch (error) {
      hideConnectionStatus();
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível conectar ao servidor.",
      );
    } finally {
      button.disabled = false;
      button.textContent = "Entrar";
    }
  });
}

function apiRequest(path, options) {
  const token = localStorage.getItem(tokenStorageKey);
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  return fetch(`${config.apiOrigin}${config.apiPrefix}${path}`, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });
}

function setMessage(message) {
  const element = document.querySelector("#organizeon-login .message");
  if (element) element.textContent = message;
}

function removeLogin() {
  document.getElementById("organizeon-login")?.remove();
}

function scheduleExpiration(expiresAt) {
  const delay = new Date(expiresAt).getTime() - Date.now();
  if (!Number.isFinite(delay) || delay <= 0) return;
  window.setTimeout(() => {
    maintainControlConnection = false;
    controlSocket?.close(1000, "Session expired");
    localStorage.removeItem(tokenStorageKey);
    restartClientAtMain();
  }, delay);
}

async function resetAuthenticationForDataWipe() {
  try {
    await apiRequest("/auth/logout", { method: "POST" });
  } catch (error) {
    console.warn("Não foi possível invalidar o cookie da API:", error);
  } finally {
    maintainControlConnection = false;
    window.clearTimeout(controlReconnectTimer);
    controlSocket?.close(1000, "Site data reset");
    localStorage.removeItem(tokenStorageKey);
  }
}

window.organizeonAuth = Object.freeze({
  async logout() {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } finally {
      maintainControlConnection = false;
      window.clearTimeout(controlReconnectTimer);
      controlSocket?.close(1000, "Logout");
      localStorage.removeItem(tokenStorageKey);
      restartClientAtMain();
    }
  },
});
