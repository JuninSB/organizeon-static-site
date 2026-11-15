const config = window.__ORGANIZEON_CONFIG__;
const tokenStorageKey = "organizeon-access-token";
const guestStorageKey = "organizeon-guest-mode";
const proxyServerStorageKey = "organizeon-proxy-server";
const wispBandwidthStorageKey = "organizeon-wisp-bandwidth-limit";
const browserIdentityStorageKey = "organizeon-browser-identity";
const gameCacheName = "organizeon-games-v1";
const gameControlSettingsStorageKey = "organizeon-game-controls-v1";
const virtualGameKeyDefinitions = Object.freeze([
  Object.freeze({ label: "W", code: "KeyW", keyCode: 87, direction: "up" }),
  Object.freeze({ label: "A", code: "KeyA", keyCode: 65, direction: "left" }),
  Object.freeze({ label: "S", code: "KeyS", keyCode: 83, direction: "down" }),
  Object.freeze({ label: "D", code: "KeyD", keyCode: 68, direction: "right" }),
  Object.freeze({ label: "↑", code: "ArrowUp", keyCode: 38, key: "ArrowUp", direction: "up" }),
  Object.freeze({ label: "←", code: "ArrowLeft", keyCode: 37, key: "ArrowLeft", direction: "left" }),
  Object.freeze({ label: "↓", code: "ArrowDown", keyCode: 40, key: "ArrowDown", direction: "down" }),
  Object.freeze({ label: "→", code: "ArrowRight", keyCode: 39, key: "ArrowRight", direction: "right" }),
  Object.freeze({ label: "E", code: "KeyE", keyCode: 69 }),
  Object.freeze({ label: "F", code: "KeyF", keyCode: 70 }),
  Object.freeze({ label: "Q", code: "KeyQ", keyCode: 81 }),
  Object.freeze({ label: "R", code: "KeyR", keyCode: 82 }),
  Object.freeze({ label: "J", code: "KeyJ", keyCode: 74 }),
  Object.freeze({ label: "K", code: "KeyK", keyCode: 75 }),
  Object.freeze({ label: "X", code: "KeyX", keyCode: 88 }),
  Object.freeze({ label: "C", code: "KeyC", keyCode: 67 }),
  Object.freeze({ label: "Shift", code: "ShiftLeft", keyCode: 16, key: "Shift" }),
  Object.freeze({ label: "Ctrl", code: "ControlLeft", keyCode: 17, key: "Control" }),
  Object.freeze({ label: "Alt", code: "AltLeft", keyCode: 18, key: "Alt" }),
  Object.freeze({ label: "Enter", code: "Enter", keyCode: 13, key: "Enter" }),
  Object.freeze({ label: "Tab", code: "Tab", keyCode: 9, key: "Tab" }),
  Object.freeze({ label: "Espaço", code: "Space", keyCode: 32, key: " ", wide: true }),
]);
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
let guestMode = false;
let clientUiPromise = null;
let toastHost = null;

function clientUiPaths() {
  const base = new URL(window.__groveBase || "./", document.baseURI);
  return {
    script: new URL("ui-dist/client-ui.js", base).href,
    stylesheet: new URL("ui-dist/client-ui.css", base).href,
  };
}

function loadClientUi() {
  if (!clientUiPromise) {
    const paths = clientUiPaths();
    clientUiPromise = import(paths.script).then((module) => ({ module, stylesheet: paths.stylesheet })).catch((error) => {
      clientUiPromise = null;
      throw error;
    });
  }
  return clientUiPromise;
}

function disposeClientSurface(host) {
  if (!host) return;
  host.__organizeonCleanup?.();
  host.remove();
}

async function renderClientSurface(host, props) {
  const { module, stylesheet } = await loadClientUi();
  if (!host.isConnected) return;
  host.__organizeonCleanup = module.mountClientSurface(host, props, stylesheet);
}

async function ensureClientToaster() {
  if (toastHost?.isConnected) return loadClientUi();
  toastHost = document.createElement("div");
  toastHost.id = "organizeon-ui-toaster";
  Object.assign(toastHost.style, { position: "fixed", inset: "0", zIndex: "2147483647", pointerEvents: "none" });
  document.body.appendChild(toastHost);
  const { module, stylesheet } = await loadClientUi();
  toastHost.__organizeonCleanup = module.mountClientToaster(toastHost, stylesheet);
  return { module, stylesheet };
}

function toastClient(message, kind = "info", id) {
  void ensureClientToaster().then(({ module }) => module.showClientToast(message, kind, id)).catch((error) => {
    console.error("Falha ao carregar a interface de notificações:", error);
  });
}

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
    event.key === guestStorageKey &&
    event.oldValue === "1" &&
    event.newValue === null &&
    guestMode
  ) {
    restartClientAtMain();
    return;
  }
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

if (localStorage.getItem(guestStorageKey) === "1") {
  startGuestApplication();
} else if (!config?.authenticationRequired) {
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

  guestMode = account?.role === "guest";
  window.__ORGANIZEON_GUEST__ = guestMode;
  const proxyServer = getSelectedProxyServer(guestMode);
  const browserIdentity = getSelectedBrowserIdentity();
  window.__FERN_WISP_URL__ = guestMode
    ? proxyServer.url
    : buildProxyWispUrl(proxyServer, token);
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
    if (guestMode) {
      maintainControlConnection = false;
      installGuestNetworkIsolation();
      showConnectionStatus(
        "Modo convidado",
        `API e relay OrganizeOn desligados; usando ${proxyServer.name}.`,
        30,
      );
      await import(config.appModule);
      installInternalNavigationGuard();
      showConnectionStatus(
        "Modo convidado pronto",
        "Jogos usam o GitHub; pesquisas usam somente um relay público externo.",
        100,
        8000,
      );
      return;
    }
    maintainControlConnection = true;
    showConnectionStatus(
      "Conectando ao servidor proxy…",
      "Abrindo WebSocket e realizando handshake autenticado.",
    );
    // O handshake e o carregamento do aplicativo são independentes. Antes,
    // um relay lento segurava o primeiro paint por até o timeout do socket.
    // Inicie os dois ao mesmo tempo e mantenha o socket em segundo plano.
    const controlPromise = connectControlSocket(token)
      .then(() => {
        showConnectionStatus(
          "Servidor proxy conectado",
          "Handshake concluído. Carregando ativos essenciais…",
          35,
        );
        return true;
      })
      .catch((error) => {
        console.warn("WebSocket de controle indisponível:", error);
        showConnectionStatus(
          "Servidor respondeu, mas o WebSocket falhou",
          "O cliente continuará e tentará reconectar em segundo plano.",
        );
        return false;
      });

    // Restaure as preferências antes de montar o app. Caso contrário o React
    // inicializa com os valores locais e pode sobrescrever o backup restaurado.
    await initializeCloudBackup({ timeoutMs: 3500 }).catch((error) => {
      console.warn("Backup em nuvem indisponível:", error);
    });
    // Não aguarde o socket aqui: a tela e as páginas podem carregar enquanto
    // a conexão é estabelecida. A promessa sempre trata o erro acima.
    await import(config.appModule);
    installInternalNavigationGuard();
    // O estado do socket pode mudar depois que a tela já está pronta; não
    // segure a navegação aguardando o timeout do handshake.
    const controlConnected = controlReady;
    showConnectionStatus(
      "Cliente pronto",
      controlConnected
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

function startGuestApplication() {
  localStorage.removeItem(tokenStorageKey);
  return startApplication(null, {
    username: "guest",
    role: "guest",
    permissions: [],
  });
}

function installGuestNetworkIsolation() {
  if (window.__ORGANIZEON_GUEST_NETWORK_GUARD__) return;
  window.__ORGANIZEON_GUEST_NETWORK_GUARD__ = true;
  const privateHost = new URL(config.apiOrigin).host;
  const isPrivateUrl = (value) => {
    try {
      const raw = value instanceof Request ? value.url : String(value);
      return new URL(raw, document.baseURI).host === privateHost;
    } catch {
      return false;
    }
  };
  const blockedError = () =>
    new DOMException(
      "A API e o relay OrganizeOn estão bloqueados no modo convidado.",
      "SecurityError",
    );

  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    if (isPrivateUrl(input)) return Promise.reject(blockedError());
    return nativeFetch(input, init);
  };

  const NativeWebSocket = window.WebSocket;
  window.WebSocket = class GuestWebSocket extends NativeWebSocket {
    constructor(url, protocols) {
      if (isPrivateUrl(url)) throw blockedError();
      if (protocols === undefined) super(url);
      else super(url, protocols);
    }
  };

  const nativeXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...args) {
    if (isPrivateUrl(url)) throw blockedError();
    return nativeXhrOpen.call(this, method, url, ...args);
  };
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

function showConnectionStatus(title, detail = "", percent = null, autoHideMs = 8000) {
  const percentage = Number.isFinite(percent) ? ` · ${Math.max(0, Math.min(100, percent))}%` : "";
  const message = `${title}${percentage}${detail ? ` — ${detail}` : ""}`;
  toastClient(message, Number.isFinite(percent) && percent >= 100 ? "success" : "loading", "organizeon-connection");
  window.clearTimeout(window.__organizeonConnectionToastTimer);
  if (autoHideMs > 0) window.__organizeonConnectionToastTimer = window.setTimeout(hideConnectionStatus, autoHideMs);
}

function hideConnectionStatus() {
  window.clearTimeout(window.__organizeonConnectionToastTimer);
  void ensureClientToaster().then(({ module }) => module.dismissClientToast("organizeon-connection")).catch(() => {});
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
    permissions: Array.isArray(account.permissions) ? account.permissions : [],
  };
  window.organizeonAccount = Object.freeze(normalized);
  disposeClientSurface(document.getElementById("organizeon-account-navigation"));
  const host = document.createElement("div");
  host.id = "organizeon-account-navigation";
  Object.assign(host.style, { position: "fixed", inset: "0", zIndex: "2147483645", pointerEvents: "none" });
  document.body.appendChild(host);
  const selectedProxy = getSelectedProxyServer();
  void renderClientSurface(host, {
    type: "account",
    username: normalized.username,
    role: normalized.role,
    guest: normalized.role === "guest",
    canOpenDashboard: normalized.permissions.includes("admin.dashboard"),
    proxyLabel: selectedProxy.beta ? "BETA" : "ATIVO",
    onNavigate: (action) => {
      if (action !== "logout") disposeClientSurface(host);
      if (action === "home") navigateClientRoute("/");
      if (action === "games") showGameCatalog();
      if (action === "settings") navigateClientRoute("/settings");
      if (action === "data") showDataPanel();
      if (action === "proxy") showProxyServerDialog();
      if (action === "dashboard") openDashboardWindow();
      if (action === "logout") window.organizeonAuth.logout();
    },
  }).catch((error) => {
    host.remove();
    console.error("Falha ao abrir navegação da conta:", error);
  });
}

function navigateClientRoute(route) {
  const routeUrl = new URL(route, "https://organizeon.invalid/");
  const routePath = routeUrl.pathname;
  const target = new URL(window.location.href);
  const objectStorageHost =
    target.hostname === "storage.googleapis.com" ||
    target.hostname === "s3.amazonaws.com" ||
    /\.s3[.-][^.]*\.amazonaws\.com$/i.test(target.hostname) ||
    /\.storage\.googleapis\.com$/i.test(target.hostname);

  if (objectStorageHost) {
    target.searchParams.delete("route");
    if (routePath !== "/") target.searchParams.set("route", routePath);
  } else {
    const base = new URL("./", document.baseURI);
    target.pathname =
      routePath === "/"
        ? base.pathname
        : `${base.pathname.replace(/\/+$/, "")}${routePath}`;
    target.searchParams.delete("route");
  }

  for (const [key, value] of routeUrl.searchParams) {
    target.searchParams.set(key, value);
  }
  target.hash = routeUrl.hash;

  window.history.pushState({}, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function installInternalNavigationGuard() {
  if (window.__organizeonInternalNavigationInstalled) return;
  window.__organizeonInternalNavigationInstalled = true;
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button > 0) return;
    const anchor = event.target.closest?.("a[href]");
    if (!anchor || anchor.hasAttribute("download")) return;
    let url;
    try { url = new URL(anchor.href, document.baseURI); } catch { return; }
    if (!["http:", "https:"].includes(url.protocol)) return;
    event.preventDefault();
    event.stopPropagation();
    anchor.removeAttribute("target");
    const canonical = new URL("https://juninsb.github.io/organizeon-static-site/");
    if (
      url.origin === canonical.origin &&
      url.pathname.startsWith(canonical.pathname)
    ) {
      const relative = `/${url.pathname.slice(canonical.pathname.length)}`
        .replace(/\/index\.html$/, "/");
      navigateClientRoute(`${relative === "//" ? "/" : relative}${url.search}${url.hash}`);
      return;
    }
    if (url.origin === location.origin) {
      const base = new URL("./", document.baseURI);
      const relative = url.pathname.startsWith(base.pathname)
        ? `/${url.pathname.slice(base.pathname.length)}`
        : url.pathname;
      navigateClientRoute(`${relative || "/"}${url.search}${url.hash}`);
      return;
    }
    navigateInternalSearch(url.href);
  }, true);
}

function navigateInternalSearch(url) {
  const target = new URL(window.location.href);
  const encoded = window.btoa(unescape(encodeURIComponent(url)));
  const objectStorageHost =
    target.hostname === "storage.googleapis.com" ||
    target.hostname === "s3.amazonaws.com" ||
    /\.s3[.-][^.]*\.amazonaws\.com$/i.test(target.hostname) ||
    /\.storage\.googleapis\.com$/i.test(target.hostname);
  if (objectStorageHost) {
    target.searchParams.set("route", "/search");
  } else {
    const base = new URL("./", document.baseURI);
    target.pathname = `${base.pathname.replace(/\/+$/, "")}/search`;
    target.searchParams.delete("route");
  }
  target.searchParams.set("query", encoded);
  window.history.pushState({}, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

const cloudBackupPreferenceKeys = new Set([
  "star-settings",
  "star-theme",
  "quickApps",
  "quickAppsVersion",
  proxyServerStorageKey,
  wispBandwidthStorageKey,
  browserIdentityStorageKey,
  gameControlSettingsStorageKey,
]);
const cloudBackupExcludedKeys = new Set([
  tokenStorageKey,
  guestStorageKey,
  "organizeon-update-version-v2",
  "organizeon-update-manifest-v2",
  "organizeon-update-files-v2",
  "organizeon-cloud-backup-restored-at",
]);
let cloudBackupEnabled = false;
let cloudBackupTimer = null;

function isCloudPreferenceStorageKey(key) {
  const value = String(key || "");
  return cloudBackupPreferenceKeys.has(value) ||
    value.startsWith("organizeon-") ||
    value.startsWith("star-") ||
    value.startsWith("fern-");
}

function isGameProgressStorageKey(key) {
  const value = String(key || "").toLowerCase();
  return value === "organizeon-tetris-progress" ||
    value.startsWith("__uv$") ||
    value.startsWith("ruffle") ||
    value.includes("@worlds") ||
    value.includes("eaglercraft");
}

async function initializeCloudBackup({ timeoutMs = 3500 } = {}) {
  if (guestMode) return;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await apiRequest("/account/backup", { method: "GET", signal: controller.signal });
    if (!response.ok) return;
    const status = await response.json();
    cloudBackupEnabled = status.enabled === true;
    if (cloudBackupEnabled) {
      const account = String(window.organizeonAccount?.username || "");
      let marker = null;
      try { marker = JSON.parse(localStorage.getItem("organizeon-cloud-backup-restored-at") || "null"); } catch {}
      const lastRestore = marker?.username === account ? String(marker.updatedAt || "") : "";
      if (!lastRestore || String(status.updatedAt || "") > lastRestore) {
        await restoreCloudBackup({ silent: true, signal: controller.signal });
        if (status.updatedAt) {
          localStorage.setItem("organizeon-cloud-backup-restored-at", JSON.stringify({ username: account, updatedAt: status.updatedAt }));
        }
      }
      scheduleCloudBackup();
    }
    if (!window.__organizeonBackupListenersInstalled) {
      window.__organizeonBackupListenersInstalled = true;
      window.addEventListener("storage", scheduleCloudBackup);
      for (const method of ["setItem", "removeItem", "clear"]) {
        const original = Storage.prototype[method];
        Storage.prototype[method] = function (...args) {
          const result = original.apply(this, args);
          if (this === localStorage && (method === "clear" || !cloudBackupExcludedKeys.has(args[0]))) {
            scheduleCloudBackup();
          }
          return result;
        };
      }
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") scheduleCloudBackup(0);
      });
    }
  } finally {
    window.clearTimeout(timeout);
  }
}

function scheduleCloudBackup(delay = 2500) {
  if (!cloudBackupEnabled || guestMode) return;
  window.clearTimeout(cloudBackupTimer);
  cloudBackupTimer = window.setTimeout(() => {
    saveCloudBackup().catch((error) => console.warn("Falha no backup:", error));
  }, delay);
}

async function collectCloudBackup() {
  const preferences = {};
  const gameProgress = {};
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key || cloudBackupExcludedKeys.has(key)) continue;
    const target = isGameProgressStorageKey(key) ? gameProgress : isCloudPreferenceStorageKey(key) ? preferences : gameProgress;
    target[key] = localStorage.getItem(key);
  }
  let indexedDB = [];
  try {
    indexedDB = await exportIndexedDatabases();
  } catch (error) {
    // Um banco de jogo incompatível não pode impedir o backup de tema e
    // preferências. O banco problemático será ignorado nesta rodada.
    console.warn("Não foi possível exportar todos os bancos locais:", error);
  }
  return {
    version: 1,
    savedAt: new Date().toISOString(),
    preferences,
    gameProgress,
    indexedDB,
    cookies: document.cookie,
  };
}

async function saveCloudBackup() {
  if (!cloudBackupEnabled) throw new Error("cloud_backup_disabled");
  const snapshot = await collectCloudBackup();
  const payload = JSON.stringify(snapshot);
  const response = await apiRequest("/account/backup", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "backup_failed");
  const status = await response.json();
  localStorage.setItem(
    "organizeon-cloud-backup-restored-at",
    status.updatedAt || snapshot.savedAt,
  );
  return status;
}

async function flushCloudBackup() {
  if (guestMode) return;
  window.clearTimeout(cloudBackupTimer);
  // O usuário pode sair logo depois de ativar o recurso, antes da consulta
  // inicial terminar. Confirme o estado no servidor antes de apagar o token.
  if (!cloudBackupEnabled) {
    const response = await apiRequest("/account/backup", { method: "GET" });
    if (!response.ok) return;
    const status = await response.json();
    cloudBackupEnabled = status.enabled === true;
  }
  if (cloudBackupEnabled) await saveCloudBackup();
}

async function restoreCloudBackup({ silent = false, signal } = {}) {
  const response = await apiRequest("/account/backup/data", { method: "GET", signal });
  if (response.status === 404) return false;
  if (!response.ok) throw new Error("restore_failed");
  const backup = await response.json();
  for (const [key, value] of Object.entries(backup.preferences || {})) {
    if (!cloudBackupExcludedKeys.has(key)) localStorage.setItem(key, value);
  }
  for (const [key, value] of Object.entries(backup.gameProgress || {})) {
    if (!cloudBackupExcludedKeys.has(key)) localStorage.setItem(key, value);
  }
  await importIndexedDatabases(backup.indexedDB || []);
  if (backup.cookies) restoreCookies(backup.cookies);
  localStorage.setItem(
    "organizeon-cloud-backup-restored-at",
    backup.savedAt || new Date().toISOString(),
  );
  if (!silent) showConnectionStatus("Backup restaurado", "Tema, preferências e progresso foram recuperados.", 100, 5000);
  return true;
}

async function exportIndexedDatabases() {
  if (!("indexedDB" in window) || typeof indexedDB.databases !== "function") return [];
  const databases = await indexedDB.databases();
  const exported = [];
  for (const descriptor of databases) {
    if (!descriptor.name) continue;
    let db = null;
    try {
      db = await openIndexedDatabase(descriptor.name);
      const stores = [];
      for (const storeName of db.objectStoreNames) {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const [keys, values] = await Promise.all([
          idbRequest(store.getAllKeys()),
          idbRequest(store.getAll()),
        ]);
        stores.push({
          name: storeName,
          keyPath: store.keyPath,
          autoIncrement: store.autoIncrement,
          records: await Promise.all(values.map(async (value, index) => ({
            key: await toPortable(keys[index]),
            value: await toPortable(value),
          }))),
        });
      }
      exported.push({ name: descriptor.name, version: descriptor.version || db.version, stores });
    } catch (error) {
      console.warn(`Banco local ignorado no backup (${descriptor.name}):`, error);
    } finally {
      db?.close();
    }
  }
  return exported;
}

async function importIndexedDatabases(databases) {
  for (const backup of databases) {
    if (!backup?.name || !Array.isArray(backup.stores)) continue;
    const existing = await openIndexedDatabase(backup.name).catch(() => null);
    const nextVersion = Math.max(Number(backup.version) || 1, existing?.version || 0) + 1;
    existing?.close();
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(backup.name, nextVersion);
      request.onupgradeneeded = () => {
        for (const definition of backup.stores) {
          if (!request.result.objectStoreNames.contains(definition.name)) {
            const options = { autoIncrement: definition.autoIncrement === true };
            if (definition.keyPath != null) options.keyPath = definition.keyPath;
            request.result.createObjectStore(definition.name, options);
          }
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    for (const definition of backup.stores) {
      if (!db.objectStoreNames.contains(definition.name)) continue;
      const transaction = db.transaction(definition.name, "readwrite");
      const store = transaction.objectStore(definition.name);
      store.clear();
      for (const record of definition.records || []) {
        const value = fromPortable(record.value);
        const key = fromPortable(record.key);
        if (store.keyPath == null) store.put(value, key); else store.put(value);
      }
      await idbTransaction(transaction);
    }
    db.close();
  }
}

function openIndexedDatabase(name) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbTransaction(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

async function toPortable(value, seen = new WeakSet()) {
  if (value instanceof Blob) return {
    __organizeonType: "Blob",
    type: value.type,
    data: arrayBufferToBase64(await value.arrayBuffer()),
  };
  if (typeof value === "bigint") return {
    __organizeonType: "BigInt",
    data: String(value),
  };
  if (value instanceof ArrayBuffer) return {
    __organizeonType: "ArrayBuffer",
    data: arrayBufferToBase64(value),
  };
  if (ArrayBuffer.isView(value)) return {
    __organizeonType: value.constructor.name,
    data: arrayBufferToBase64(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength)),
  };
  if (Array.isArray(value)) {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const result = await Promise.all(value.map((item) => toPortable(item, seen)));
    seen.delete(value);
    return result;
  }
  if (value && typeof value === "object") {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const output = {};
    for (const [key, item] of Object.entries(value)) output[key] = await toPortable(item, seen);
    seen.delete(value);
    return output;
  }
  return value;
}

function fromPortable(value) {
  if (!value || typeof value !== "object") return value;
  if (value.__organizeonType === "BigInt") return BigInt(value.data);
  if (value.__organizeonType === "Blob") return new Blob([base64ToArrayBuffer(value.data)], { type: value.type });
  if (value.__organizeonType === "ArrayBuffer") return base64ToArrayBuffer(value.data);
  if (value.__organizeonType && globalThis[value.__organizeonType]?.BYTES_PER_ELEMENT) {
    return new globalThis[value.__organizeonType](base64ToArrayBuffer(value.data));
  }
  if (Array.isArray(value)) return value.map(fromPortable);
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, fromPortable(item)]));
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

function base64ToArrayBuffer(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes.buffer;
}

function restoreCookies(serialized) {
  serialized.split(";").forEach((part) => {
    const separator = part.indexOf("=");
    if (separator < 1) return;
    document.cookie = `${part.slice(0, separator).trim()}=${part.slice(separator + 1).trim()};path=/;SameSite=Lax`;
  });
}

async function clearAllGameProgress() {
  for (const key of Object.keys(localStorage)) {
    if (isGameProgressStorageKey(key) ||
      !cloudBackupExcludedKeys.has(key) && !cloudBackupPreferenceKeys.has(key) && !key.startsWith("organizeon-")) {
      localStorage.removeItem(key);
    }
  }
  if (typeof indexedDB.databases === "function") {
    const databases = await indexedDB.databases();
    await Promise.all(databases.filter((db) => db.name).map((db) => new Promise((resolve) => {
      const request = indexedDB.deleteDatabase(db.name);
      request.onsuccess = request.onerror = request.onblocked = resolve;
    })));
  }
  scheduleCloudBackup(0);
}

function clearPreferences() {
  for (const key of Object.keys(localStorage)) {
    if (!isGameProgressStorageKey(key) &&
      isCloudPreferenceStorageKey(key) && !cloudBackupExcludedKeys.has(key)) {
      localStorage.removeItem(key);
    }
  }
  scheduleCloudBackup(0);
}

async function clearGameProgress(gameId) {
  const needle = String(gameId || "").trim().toLowerCase();
  if (!needle) return;
  for (const key of Object.keys(localStorage)) {
    if (key.toLowerCase().includes(needle)) localStorage.removeItem(key);
  }
  if (typeof indexedDB.databases === "function") {
    const databases = await indexedDB.databases();
    for (const descriptor of databases.filter((database) => database.name)) {
      if (descriptor.name.toLowerCase().includes(needle)) {
        await new Promise((resolve) => {
          const request = indexedDB.deleteDatabase(descriptor.name);
          request.onsuccess = request.onerror = request.onblocked = resolve;
        });
        continue;
      }
      const db = await openIndexedDatabase(descriptor.name).catch(() => null);
      if (!db) continue;
      for (const storeName of db.objectStoreNames) {
        const transaction = db.transaction(storeName, "readwrite");
        const cursorRequest = transaction.objectStore(storeName).openCursor();
        cursorRequest.onsuccess = () => {
          const cursor = cursorRequest.result;
          if (!cursor) return;
          let searchable = String(cursor.key).toLowerCase();
          try { searchable += ` ${JSON.stringify(cursor.value).toLowerCase()}`; } catch {}
          if (searchable.includes(needle)) cursor.delete();
          cursor.continue();
        };
        await idbTransaction(transaction).catch(() => {});
      }
      db.close();
    }
  }
  scheduleCloudBackup(0);
}

async function showDataPanel() {
  disposeClientSurface(document.getElementById("organizeon-data-panel"));
  const host = document.createElement("div");
  host.id = "organizeon-data-panel";
  host.style.cssText = "position:fixed;inset:0;z-index:2147483647";
  document.body.appendChild(host);
  const basePath = window.__groveBase || new URL("./", document.baseURI).pathname;
  const catalogUrl = new URL("games/catalog.json", new URL(basePath, location.origin));
  void renderClientSurface(host, {
    type: "data",
    username: window.organizeonAccount?.username || "",
    getStatus: async () => {
      const response = await apiRequest("/account/backup", { method: "GET" });
      if (!response.ok) throw new Error("Não foi possível consultar o backup na nuvem.");
      const status = await response.json();
      cloudBackupEnabled = status.enabled === true;
      return status;
    },
    getGames: async () => {
      const response = await fetch(catalogUrl, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      return (Array.isArray(payload.games) ? payload.games : [])
        .filter((game) => game && game.id)
        .sort((left, right) => String(left.name || left.id).localeCompare(String(right.name || right.id), "pt-BR"))
        .map((game) => ({ id: game.id, name: game.name || game.id }));
    },
    toggleBackup: async (enabled) => {
      const response = await apiRequest("/account/backup", { method: "PATCH", body: JSON.stringify({ enabled }) });
      if (!response.ok) throw new Error("Não foi possível alterar o backup.");
      cloudBackupEnabled = enabled;
      if (enabled) await saveCloudBackup();
    },
    saveBackup: () => saveCloudBackup(),
    restoreBackup: () => restoreCloudBackup(),
    clearAllProgress: () => clearAllGameProgress(),
    clearGameProgress: (id) => clearGameProgress(id),
    clearPreferences: () => clearPreferences(),
    onClose: () => disposeClientSurface(host),
  }).catch((error) => {
    console.error("Falha ao montar a tela de dados:", error);
    disposeClientSurface(host);
    showConnectionStatus("Não foi possível abrir os dados", "A interface atualizada não carregou.", null, 0);
  });
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
  wrapper.className = "organizeon-ui dark";
  wrapper.setAttribute("aria-label", "Catálogo de jogos");
  wrapper.innerHTML = `
    <style>
      #organizeon-game-catalog {
        position: fixed; inset: 0; z-index: 2147483646;
        overflow: auto; color: rgb(var(--foreground)); background: rgb(var(--background));
        font-family: "Geist Variable", Inter, ui-sans-serif, system-ui, sans-serif;
      }
      #organizeon-game-catalog * { box-sizing: border-box; }
      #organizeon-game-catalog button {
        user-select: none; -webkit-user-select: none;
        -webkit-touch-callout: none;
      }
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
      #organizeon-game-catalog .filters {
        display: flex; gap: 8px; margin: -12px 0 20px; overflow-x: auto;
        scrollbar-width: none;
      }
      #organizeon-game-catalog .filters::-webkit-scrollbar { display: none; }
      #organizeon-game-catalog .category-filters { display: contents; }
      #organizeon-game-catalog .filter {
        min-height: 38px; padding: 0 15px; flex: 0 0 auto;
        border: 1px solid rgba(255,255,255,.12); border-radius: 999px;
        color: #9cb7af; background: rgba(255,255,255,.035);
        font: 750 12px inherit; cursor: pointer;
      }
      #organizeon-game-catalog .filter.active {
        color: #062019; border-color: #63e4c4; background: #63e4c4;
      }
      #organizeon-game-catalog .grid {
        display: grid; grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 18px;
      }
      #organizeon-game-catalog .badges {
        display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 9px;
      }
      #organizeon-game-catalog .badge {
        padding: 3px 7px; border-radius: 999px; color: #81d8c1;
        background: rgba(105,220,190,.09); font-size: 9px; font-weight: 850;
        letter-spacing: .04em; text-transform: uppercase;
      }
      #organizeon-game-catalog .badge.flash {
        color: #ffd574; background: rgba(255,193,59,.11);
      }
      #organizeon-game-catalog .badge.hot {
        color: #ffb4a4; background: rgba(255,102,74,.13);
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
        min-height: 39px; margin: 8px 0 5px; color: #91aaa3;
        font-size: 12px; line-height: 1.5;
      }
      #organizeon-game-catalog .attribution {
        min-height: 17px; margin: 0 0 11px; color: #5f8d81;
        font-size: 10px; line-height: 1.4;
      }
      #organizeon-game-catalog .game-stats {
        display: flex; gap: 11px; min-height: 17px; margin: -5px 0 10px;
        color: #789d93; font-size: 10px; font-weight: 720;
      }
      #organizeon-game-catalog .actions { display: flex; gap: 8px; }
      #organizeon-game-catalog .credits {
        min-height: 42px; padding: 0 10px; border-radius: 10px;
        border: 1px solid rgba(255,255,255,.12); cursor: pointer;
        color: #9fc2b9; background: rgba(255,255,255,.035); font-weight: 750;
      }
      #organizeon-game-catalog .empty {
        grid-column: 1/-1; padding: 70px 20px; text-align: center;
        color: #89a098;
      }
      #organizeon-game-catalog .player {
        position: fixed; inset: 0; z-index: 2; display: none;
        width: 100vw; height: 100vh; height: 100dvh;
        min-width: 0; min-height: 0; flex-direction: column; background: #050807;
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
      #organizeon-game-catalog .player-help {
        min-width: 0; overflow: hidden; color: #7f9b93; font-size: 11px;
        text-overflow: ellipsis; white-space: nowrap;
      }
      #organizeon-game-catalog .player iframe {
        display: block; width: 100%; height: 0; min-width: 0; min-height: 0;
        flex: 1 1 0; border: 0; background: #050807;
      }
      #organizeon-game-catalog .controls-toggle,
      #organizeon-game-catalog .controls-settings {
        min-height: 40px; padding: 0 12px;
        border: 1px solid rgba(99,228,196,.25); border-radius: 10px;
        color: #78e8cd; background: rgba(99,228,196,.08);
        font-weight: 800; cursor: pointer;
      }
      #organizeon-game-catalog .controls-toggle { margin-left: auto; }
      #organizeon-game-catalog .player-menu-trigger {
        display: none;
      }
      #organizeon-game-catalog .controls {
        display: none; flex-wrap: wrap; align-items: center; gap: 7px;
        padding: 9px; border-top: 1px solid rgba(255,255,255,.1);
        background: #091310; touch-action: none; user-select: none;
      }
      #organizeon-game-catalog .player.controls-open .controls { display: flex; }
      #organizeon-game-catalog .control-zone {
        display: contents;
      }
      #organizeon-game-catalog .key {
        min-width: 39px; height: 39px; padding: 0 9px; border-radius: 9px;
        border: 1px solid rgba(255,255,255,.16); color: #dffbf3;
        background: #17241f; font: 800 12px system-ui; cursor: pointer;
        touch-action: none; user-select: none; -webkit-user-select: none;
      }
      #organizeon-game-catalog .key.needed {
        border-color: rgba(255,204,97,.7); color: #ffe09a;
        background: rgba(255,193,59,.1);
      }
      #organizeon-game-catalog .key.pressed {
        color: #061d17; border-color: #65e7c7; background: #65e7c7;
        transform: translateY(1px);
      }
      #organizeon-game-catalog .key.space { min-width: 88px; }
      #organizeon-game-catalog .control-help {
        width: 100%; margin: 0 2px 2px; color: #71978c;
        font: 650 10px/1.35 system-ui;
      }
      #organizeon-game-catalog .dialog-backdrop {
        position: fixed; inset: 0; z-index: 5; display: grid; place-items: center;
        padding: 18px; background: rgba(0,0,0,.72);
      }
      #organizeon-game-catalog .dialog {
        width: min(470px,100%); padding: 22px; border-radius: 17px;
        border: 1px solid rgba(255,255,255,.13); background: #111d19;
        box-shadow: 0 24px 80px rgba(0,0,0,.55);
      }
      #organizeon-game-catalog .dialog h2 { margin: 0 0 14px; font-size: 22px; }
      #organizeon-game-catalog .dialog p {
        margin: 8px 0; color: #9bb5ad; font-size: 13px; line-height: 1.5;
      }
      #organizeon-game-catalog .dialog a { color: #6be5c7; }
      #organizeon-game-catalog .dialog-close {
        width: 100%; min-height: 42px; margin-top: 15px; border: 0;
        border-radius: 10px; color: #062019; background: #63e4c4;
        font-weight: 850; cursor: pointer;
      }
      #organizeon-game-catalog .key-settings {
        width: min(560px,100%); max-height: min(720px,calc(100dvh - 28px));
        overflow: auto;
      }
      #organizeon-game-catalog .key-settings-grid {
        display: grid; grid-template-columns: repeat(4,minmax(0,1fr));
        gap: 8px; margin: 15px 0;
      }
      #organizeon-game-catalog .key-choice {
        display: flex; align-items: center; gap: 8px; min-width: 0;
        min-height: 43px; padding: 8px 10px; border-radius: 10px;
        border: 1px solid rgba(255,255,255,.1);
        color: #d9f5ed; background: rgba(255,255,255,.035);
        user-select: none; -webkit-user-select: none;
      }
      #organizeon-game-catalog .key-choice input {
        width: 18px; height: 18px; accent-color: #63e4c4;
      }
      #organizeon-game-catalog .key-settings-actions {
        display: grid; grid-template-columns: 1fr 1fr; gap: 9px;
      }
      #organizeon-game-catalog .key-settings-actions button {
        min-height: 43px; border-radius: 10px; cursor: pointer;
        font-weight: 820;
      }
      #organizeon-game-catalog .keys-reset {
        border: 1px solid rgba(255,255,255,.14);
        color: #b4ccc5; background: rgba(255,255,255,.04);
      }
      #organizeon-game-catalog .keys-save {
        border: 0; color: #062019; background: #63e4c4;
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
      @media (max-width: 700px), (pointer: coarse) {
        #organizeon-game-catalog .shell { padding-inline: 12px; }
        #organizeon-game-catalog .description { min-height: 0; }
        #organizeon-game-catalog .player {
          position: fixed; display: none; overflow: hidden;
        }
        #organizeon-game-catalog.playing .player { display: block; }
        #organizeon-game-catalog .player iframe {
          position: absolute; inset: 0; width: 100%; height: 100%;
        }
        #organizeon-game-catalog .player-head {
          position: absolute; z-index: 4;
          top: max(4px, env(safe-area-inset-top)); left: 6px; right: 6px;
          min-height: 44px; display: grid;
          grid-template-columns: 40px minmax(0,1fr) 40px 40px 40px;
          gap: 7px; padding: 4px;
          border: 1px solid rgba(255,255,255,.1); border-radius: 13px;
          background: rgba(5,13,11,.72);
          box-shadow: 0 8px 28px rgba(0,0,0,.25);
          backdrop-filter: blur(10px);
          opacity: 0; visibility: hidden; pointer-events: none;
          transform: translateY(-10px);
          transition:
            opacity .16s ease, transform .16s ease, visibility .16s;
        }
        #organizeon-game-catalog .player.menu-open .player-head {
          opacity: 1; visibility: visible; pointer-events: auto;
          transform: translateY(0);
        }
        #organizeon-game-catalog .player-head .back {
          width: 38px; height: 38px; border-radius: 10px;
        }
        #organizeon-game-catalog .player-head strong {
          align-self: center; font-size: 12px;
        }
        #organizeon-game-catalog .player-help {
          display: none;
        }
        #organizeon-game-catalog .player-head .controls-toggle {
          grid-column: 3; grid-row: 1;
        }
        #organizeon-game-catalog .player-head .controls-settings {
          grid-column: 4; grid-row: 1;
        }
        #organizeon-game-catalog .player-head .player-back {
          grid-column: 1; grid-row: 1;
        }
        #organizeon-game-catalog .controls-toggle,
        #organizeon-game-catalog .controls-settings {
          width: 38px; min-height: 38px; margin: 0; padding: 0;
          border-radius: 10px; font-size: 0;
        }
        #organizeon-game-catalog .controls-toggle::after {
          content: "⌨"; font-size: 17px;
        }
        #organizeon-game-catalog .controls-settings::after {
          content: "⚙"; font-size: 17px;
        }
        #organizeon-game-catalog .controls-toggle[hidden] {
          display: none;
        }
        #organizeon-game-catalog .player-menu-trigger {
          position: absolute; z-index: 5;
          top: max(10px, calc(env(safe-area-inset-top) + 6px)); right: 10px;
          display: grid; place-items: center;
          width: 38px; height: 38px; padding: 0;
          border: 1px solid rgba(99,228,196,.3); border-radius: 11px;
          color: #a9f5e2; background: rgba(5,18,15,.74);
          box-shadow: 0 8px 24px rgba(0,0,0,.24);
          backdrop-filter: blur(9px);
          font: 900 24px/1 system-ui; letter-spacing: 1px;
          cursor: pointer;
        }
        #organizeon-game-catalog .player.menu-open .player-menu-trigger {
          color: #e9fff9; background: rgba(30,50,44,.9);
        }
        #organizeon-game-catalog .controls {
          position: absolute; z-index: 3;
          left: 0; right: 0; bottom: 0;
          min-height: clamp(150px, 24vh, 210px);
          padding:
            12px max(12px, env(safe-area-inset-right))
            max(12px, env(safe-area-inset-bottom))
            max(12px, env(safe-area-inset-left));
          grid-template-columns: minmax(132px,1fr) minmax(94px,1fr);
          align-items: end; gap: clamp(20px,8vw,72px);
          overflow: visible; border: 0;
          background: linear-gradient(
            0deg,
            rgba(2,8,7,.62) 0,
            rgba(2,8,7,.2) 62%,
            transparent 100%
          );
          pointer-events: none;
        }
        #organizeon-game-catalog .player.controls-open .controls {
          display: grid;
        }
        #organizeon-game-catalog .control-zone {
          min-width: 0; pointer-events: none;
        }
        #organizeon-game-catalog .movement-zone {
          display: grid; justify-content: start; align-content: end;
        }
        #organizeon-game-catalog .action-zone {
          display: flex; flex-wrap: wrap-reverse; align-items: flex-end;
          justify-content: flex-end; align-content: flex-end;
          gap: clamp(9px,2.8vw,16px);
        }
        #organizeon-game-catalog .dpad {
          width: min(48vw, 210px);
          grid-template-columns: repeat(3,minmax(48px,1fr));
          grid-template-rows: repeat(3,minmax(48px,1fr));
          gap: clamp(7px,2vw,12px);
        }
        #organizeon-game-catalog .dpad .key {
          width: 100%; height: 100%; min-width: 0; min-height: 60px;
          padding: 0; border-radius: 17px; font-size: 24px;
        }
        #organizeon-game-catalog .dpad .up { grid-column: 2; grid-row: 1; }
        #organizeon-game-catalog .dpad .left { grid-column: 1; grid-row: 2; }
        #organizeon-game-catalog .dpad .down { grid-column: 2; grid-row: 3; }
        #organizeon-game-catalog .dpad .right { grid-column: 3; grid-row: 2; }
        #organizeon-game-catalog .movement-row {
          display: flex; align-items: end; gap: clamp(12px,4vw,22px);
        }
        #organizeon-game-catalog .movement-row .key {
          width: clamp(64px,20vw,92px); height: clamp(62px,18vw,86px);
          padding: 0; border-radius: 19px; font-size: 25px;
        }
        #organizeon-game-catalog .action-zone .key {
          min-width: clamp(54px,15vw,72px);
          height: clamp(54px,15vw,72px);
          padding: 0 10px; border-radius: 50%;
          border-color: rgba(255,211,111,.58);
          color: #ffe7aa; background: rgba(36,31,18,.72);
          box-shadow: 0 8px 22px rgba(0,0,0,.24);
          font-size: 12px; backdrop-filter: blur(7px);
          pointer-events: auto;
        }
        #organizeon-game-catalog .action-zone .key.space {
          min-width: clamp(76px,23vw,106px); border-radius: 22px;
        }
        #organizeon-game-catalog .movement-zone .key {
          border-color: rgba(103,235,204,.56);
          color: #cffff3; background: rgba(13,38,32,.72);
          box-shadow: 0 8px 22px rgba(0,0,0,.24);
          backdrop-filter: blur(7px); pointer-events: auto;
        }
        #organizeon-game-catalog .key.pressed {
          color: #061d17; border-color: #65e7c7; background: #65e7c7;
          transform: scale(.95);
        }
        #organizeon-game-catalog .control-help { display: none; }
        #organizeon-game-catalog .controls.no-movement {
          grid-template-columns: 1fr;
        }
        #organizeon-game-catalog .controls.no-movement .action-zone {
          justify-content: flex-end;
        }
        #organizeon-game-catalog .controls.no-actions {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 700px) and (orientation: landscape),
             (pointer: coarse) and (orientation: landscape) {
        #organizeon-game-catalog .controls {
          min-height: clamp(88px, 27vh, 118px);
          grid-template-columns: minmax(180px,1fr) minmax(180px,1fr);
          gap: clamp(48px,18vw,180px);
          padding-top: 7px;
        }
        #organizeon-game-catalog .dpad {
          width: min(48vw, 360px);
          grid-template-columns: repeat(4,minmax(52px,1fr));
          grid-template-rows: minmax(54px,1fr);
          gap: clamp(7px,1.6vw,12px);
        }
        #organizeon-game-catalog .dpad .key {
          min-height: clamp(54px,19vh,72px);
        }
        #organizeon-game-catalog .dpad .left {
          grid-column: 1; grid-row: 1;
        }
        #organizeon-game-catalog .dpad .up {
          grid-column: 2; grid-row: 1;
        }
        #organizeon-game-catalog .dpad .down {
          grid-column: 3; grid-row: 1;
        }
        #organizeon-game-catalog .dpad .right {
          grid-column: 4; grid-row: 1;
        }
        #organizeon-game-catalog .movement-row .key {
          width: clamp(68px,12vw,98px); height: clamp(58px,18vh,82px);
        }
        #organizeon-game-catalog .action-zone .key {
          min-width: clamp(54px,9vw,74px);
          height: clamp(54px,16vh,74px);
        }
      }
      @media (max-width: 480px) {
        #organizeon-game-catalog .grid {
          grid-template-columns: minmax(0,1fr);
        }
        #organizeon-game-catalog .key-settings-grid {
          grid-template-columns: repeat(3,minmax(0,1fr));
        }
      }
    
      #organizeon-game-catalog { color:#fafafa; background:#09090b; }
      #organizeon-game-catalog .back,#organizeon-game-catalog .filter,#organizeon-game-catalog .credits,#organizeon-game-catalog .controls-toggle,#organizeon-game-catalog .controls-settings { border-color:#3f3f46; border-radius:7px; color:#d4d4d8; background:#18181b; box-shadow:none; }
      #organizeon-game-catalog .filter.active,#organizeon-game-catalog .dialog-close { border-color:#e4e4e7; color:#18181b; background:#e4e4e7; }
      #organizeon-game-catalog .search { border-color:#3f3f46; border-radius:7px; color:#fafafa; background:#09090b; }
      #organizeon-game-catalog .search:focus-visible,#organizeon-game-catalog button:focus-visible { outline:2px solid #a1a1aa; outline-offset:2px; }
      #organizeon-game-catalog .filter,#organizeon-game-catalog button { transition:color .15s ease,background .15s ease,border-color .15s ease; }
      @media(max-width:700px){#organizeon-game-catalog .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}}
      @media(max-width:440px){#organizeon-game-catalog .grid{grid-template-columns:1fr}#organizeon-game-catalog .topbar{flex-wrap:wrap}#organizeon-game-catalog .search{order:3;width:100%;margin:4px 0 0}}
      @media(prefers-reduced-motion:reduce){#organizeon-game-catalog *{transition:none!important;animation:none!important}}
</style>
    <div class="shell">
      <div id="catalog-toolbar"></div>
      <div class="grid"><div class="empty">Carregando catálogo…</div></div>
    </div>
    <div class="player">
      <button class="player-menu-trigger" type="button"
        aria-label="Abrir menu do jogo" aria-expanded="false">&#8942;</button>
      <header class="player-head">
        <button class="back player-back" type="button" aria-label="Voltar ao catálogo">←</button>
        <strong></strong>
        <span class="player-help"></span>
        <button class="controls-toggle" type="button" aria-expanded="false">Controles</button>
        <button class="controls-settings" type="button" aria-label="Configurar teclas">Teclas</button>
      </header>
      <iframe title="Jogo"
        sandbox="allow-scripts allow-modals allow-same-origin allow-pointer-lock allow-forms allow-downloads"
        allow="fullscreen; gamepad; clipboard-read; clipboard-write" allowfullscreen></iframe>
      <div class="controls" aria-label="Controles virtuais"></div>
    </div>
  `;
  document.body.style.overflow = "hidden";
  document.body.appendChild(wrapper);

  const { module: clientUi, stylesheet } = await loadClientUi();

  const grid = wrapper.querySelector(".grid");
  const toolbarHost = wrapper.querySelector("#catalog-toolbar");
  const player = wrapper.querySelector(".player");
  const frame = player.querySelector("iframe");
  const controls = player.querySelector(".controls");
  const controlsToggle = player.querySelector(".controls-toggle");
  const controlsSettings = player.querySelector(".controls-settings");
  const playerMenuTrigger = player.querySelector(".player-menu-trigger");
  const closedMenuGlyph = String.fromCodePoint(0x22ee);
  const openMenuGlyph = String.fromCodePoint(0x00d7);
  let catalog = [];
  let gameStats = { games: {}, trending: [] };
  let playerUrl = null;
  let activeFilter = "all";
  let searchQuery = "";
  let activeGame = null;
  const isMobileViewport = matchMedia("(max-width: 700px), (pointer: coarse)").matches;
  const assetUrl = (path) => {
    const basePath = window.__groveBase || new URL("./", location.href).pathname;
    const base = new URL(basePath, location.origin);
    return new URL(path.replace(/^\/+/, ""), base);
  };
  const close = () => {
    if (playerUrl) URL.revokeObjectURL(playerUrl);
    toolbarMount.unmount();
    grid.querySelectorAll(":scope > article").forEach((card) => clientUi.unmountGameCard(card));
    document.body.style.overflow = previousOverflow;
    wrapper.remove();
  };
  const toolbarMount = clientUi.mountCatalogToolbar(toolbarHost, {
    count: 0,
    categories: [],
    onBack: close,
    onQueryChange: (query) => { searchQuery = query; void renderCatalog(query); },
    onFilterChange: (filter) => { activeFilter = filter; void renderCatalog(searchQuery); },
  }, stylesheet);
  wrapper.querySelector(".player-back").addEventListener("click", () => {
    wrapper.classList.remove("playing");
    player.classList.remove("controls-open", "menu-open");
    playerMenuTrigger.textContent = closedMenuGlyph;
    playerMenuTrigger.setAttribute("aria-expanded", "false");
    playerMenuTrigger.setAttribute("aria-label", "Abrir menu do jogo");
    frame.removeAttribute("src");
    if (playerUrl) URL.revokeObjectURL(playerUrl);
    playerUrl = null;
  });
  controlsToggle.addEventListener("click", () => {
    const open = !player.classList.contains("controls-open");
    player.classList.toggle("controls-open", open);
    controlsToggle.setAttribute("aria-expanded", String(open));
    if (isMobileViewport) {
      player.classList.remove("menu-open");
      playerMenuTrigger.textContent = closedMenuGlyph;
      playerMenuTrigger.setAttribute("aria-expanded", "false");
    }
  });
  controlsSettings.addEventListener("click", () => {
    if (!activeGame) return;
    player.classList.remove("menu-open");
    playerMenuTrigger.textContent = closedMenuGlyph;
    playerMenuTrigger.setAttribute("aria-expanded", "false");
    showGameControlSettings(activeGame);
  });
  playerMenuTrigger.addEventListener("click", () => {
    const open = !player.classList.contains("menu-open");
    player.classList.toggle("menu-open", open);
    playerMenuTrigger.textContent =
      open ? openMenuGlyph : closedMenuGlyph;
    playerMenuTrigger.setAttribute("aria-expanded", String(open));
    playerMenuTrigger.setAttribute(
      "aria-label",
      open ? "Fechar menu do jogo" : "Abrir menu do jogo",
    );
  });
  frame.addEventListener("load", installEmbeddedGameInputGuard);

  try {
    const response = await fetch(
      assetUrl("games/catalog.json"),
      { cache: "no-cache" },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    catalog = Array.isArray(payload.games) ? payload.games : [];
    const categories = Array.from(
      new Set(catalog.map((game) => game.category).filter(Boolean)),
    ).sort((left, right) => left.localeCompare(right, "pt-BR"));
    toolbarMount.update(catalog.length, categories);
    await pruneRemovedGameCache(catalog).catch((error) => {
      console.warn("Não foi possível limpar jogos removidos do cache:", error);
    });
    await renderCatalog();
    refreshGameStats().catch((error) => {
      console.warn("Estatísticas de jogos indisponíveis:", error);
    });
  } catch (error) {
    grid.querySelectorAll(":scope > article").forEach((card) => clientUi.unmountGameCard(card));
    grid.replaceChildren();
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent =
      "Não foi possível carregar o catálogo. Verifique a conexão e tente novamente.";
    grid.appendChild(empty);
    console.error("Falha ao abrir catálogo de jogos:", error);
  }

  function installEmbeddedGameInputGuard() {
    try {
      const documentRoot = frame.contentDocument;
      if (!documentRoot?.head || documentRoot.getElementById(
        "organizeon-game-input-guard"
      )) {
        return;
      }
      const style = documentRoot.createElement("style");
      style.id = "organizeon-game-input-guard";
      style.textContent = `
        button, [role="button"], canvas, .controls, .pad {
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        button, [role="button"] {
          touch-action: manipulation;
        }
      `;
      documentRoot.head.appendChild(style);
    } catch {
      // Flash and any future cross-origin package keep their own input rules.
    }
  }

  async function renderCatalog(query = searchQuery) {
    searchQuery = query;
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    const trendingOrder = new Map(
      (gameStats.trending || []).map((gameId, index) => [gameId, index]),
    );
    const games = catalog.filter((game) => {
      const matchesQuery = `${game.name} ${game.description} ${game.category} ${game.type}`
        .toLocaleLowerCase("pt-BR")
        .includes(normalized);
      if (!matchesQuery) return false;
      if (activeFilter === "trending") return trendingOrder.has(game.id);
      if (activeFilter === "flash") return game.type === "flash";
      if (activeFilter.startsWith("category:")) {
        return game.category === activeFilter.slice("category:".length);
      }
      if (activeFilter === "pc" || activeFilter === "mobile") {
        return (game.platforms || ["pc"]).includes(activeFilter);
      }
      return true;
    });
    if (activeFilter === "trending") {
      games.sort((left, right) =>
        trendingOrder.get(left.id) - trendingOrder.get(right.id)
      );
    }
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
        if (game.type === "external-download") {
          const action = card.querySelector(".action");
          action.disabled = false;
          setActionLabel(action, "Baixar HTML");
          return;
        }
        if (game.type === "remote") {
          const action = card.querySelector(".action");
          action.disabled = false;
          setActionLabel(action, "Jogar online");
          return;
        }
        setCardInstalled(
          card,
          await isGameInstalled(game),
        );
      }),
    );
  }

  function createGameCard(game) {
    const card = document.createElement("article");
    card.className = "game-card-host min-w-0";
    if (isMobileViewport && game.mobileWarning) {
      card.classList.add("mobile-warning");
    }
    card.dataset.gameId = game.id;
    const gameView = {
      id: game.id,
      name: game.name,
      description: game.description,
      category: game.category || "",
      type: game.type,
      platforms: game.platforms || ["pc"],
      cover: assetUrl(`games/${game.cover}`).href,
      sizeLabel: game.type === "flash"
        ? `${formatGameBytes(game.size)} + Ruffle`
        : game.type === "external-download"
          ? `HTML ${formatGameBytes(game.externalDownload.outputSize)}`
          : game.type === "remote" ? "Servidor BR" : formatGameBytes(game.size),
      attribution: game.type === "flash"
        ? `${game.attribution || "OrganizeOn"} · Ruffle ~15 MB no 1º uso`
        : game.type === "external-download"
          ? `${game.attribution || "Download externo"} · não usa o relay`
          : game.type === "remote"
            ? `${game.attribution || "Servidor OrganizeOn"} · multiplayer dedicado`
            : game.attribution || "OrganizeOn",
      mobileWarning: Boolean(isMobileViewport && game.mobileWarning),
      trending: Boolean((gameStats.trending || []).includes(game.id)),
      relayUrl: game.relayUrl,
      relaySupport: game.relaySupport,
      hasCredits: Boolean(game.license || game.attribution || game.source),
      onAction: async () => {
      if (game.type === "external-download") {
        await downloadExternalGame(game, card);
        return;
      }
      if (game.type === "remote") {
        await launchRemoteGame(game);
        return;
      }
      if (card.classList.contains("installed")) {
        await playGame(game);
      } else {
        await installGame(game, card);
      }
      },
      onRelay: async () => {
        await navigator.clipboard.writeText(game.relayUrl);
        clientUi.showClientToast("Relay copiado.", "success");
      },
      onRemove: async () => {
      const cache = await caches.open(gameCacheName);
      await Promise.all(gameFiles(game).map((file) =>
        cache.delete(gameFileUrl(file)),
      ));
      setCardInstalled(card, false);
      },
      onCredits: () => showGameCredits(game),
    };
    clientUi.mountGameCard(card, gameView, stylesheet);
    const statistics = card.querySelector(".game-stats");
    updateGameStatsElement(statistics, game.id);
    return card;
  }

  function setActionLabel(action, label) {
    const target = action.querySelector("[data-action-label]");
    if (target) target.textContent = label;
    else action.textContent = label;
  }

  function setCardInstalled(card, installed) {
    card.classList.toggle("installed", installed);
    const action = card.querySelector(".action");
    action.disabled = false;
    setActionLabel(action, installed ? "Jogar" : "Baixar");
    card.querySelector(".remove").hidden = !installed;
    card.querySelector(".progress").hidden = true;
  }

  function showGameCredits(game) {
    const host = document.createElement("div");
    wrapper.append(host);
    let cleanup;
    const closeDialog = () => {
      cleanup?.();
      host.remove();
    };
    cleanup = clientUi.mountGameCreditsDialog(host, game, closeDialog, stylesheet);
  }


  function readGameControlSettings() {
    try {
      const parsed = JSON.parse(
        localStorage.getItem(gameControlSettingsStorageKey) || "{}",
      );
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function configuredGameKeys(game) {
    const saved = readGameControlSettings()[game.id];
    return Array.isArray(saved) ? saved : (game.keys || []);
  }

  function showGameControlSettings(game) {
    const isClassicTetris = String(game.id || "").toLowerCase() === "classic-tetris" ||
      String(game.entry || "").toLowerCase().endsWith("classic-tetris.html") ||
      String(game.name || "").trim().toLowerCase() === "tetris";
    const host = document.createElement("div");
    wrapper.append(host);
    let cleanup;
    const closeDialog = () => {
      cleanup?.();
      host.remove();
    };
    cleanup = clientUi.mountGameControlSettingsDialog(host, {
      name: game.name,
      definitions: virtualGameKeyDefinitions,
      selectedKeys: configuredGameKeys(game),
      defaultKeys: game.keys || [],
      isTetris: isClassicTetris,
      initialLeftHanded: localStorage.getItem("organizeon-tetris-left-handed") === "1",
      onClose: closeDialog,
      onSave: (keys, leftHanded) => {
        const settings = readGameControlSettings();
        settings[game.id] = keys;
        localStorage.setItem(gameControlSettingsStorageKey, JSON.stringify(settings));
        if (isClassicTetris) {
          localStorage.setItem("organizeon-tetris-left-handed", leftHanded ? "1" : "0");
          frame.contentWindow?.postMessage({ type: "organizeon-tetris-settings", leftHanded }, "*");
        }
        buildVirtualControls(game);
        closeDialog();
      },
      onFullscreen: async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else await (frame.requestFullscreen?.() || frame.contentDocument?.documentElement?.requestFullscreen?.());
        } catch (error) {
          console.warn("Tela cheia indisponível:", error);
        }
      },
    }, stylesheet);
  }

  async function pruneRemovedGameCache(games) {
    if (!("caches" in window)) return;
    const allowed = new Set(
      games.flatMap(gameFiles).map((file) => gameFileUrl(file).href),
    );
    const libraryPath = assetUrl("games/library/").pathname;
    const cache = await caches.open(gameCacheName);
    const requests = await cache.keys();
    await Promise.all(requests.map((request) => {
      const requestUrl = new URL(request.url);
      if (
        requestUrl.origin === location.origin &&
        requestUrl.pathname.startsWith(libraryPath) &&
        !allowed.has(requestUrl.href)
      ) {
        return cache.delete(request);
      }
      return false;
    }));
  }

  async function isGameInstalled(game) {
    if (!("caches" in window)) return false;
    const cache = await caches.open(gameCacheName);
    const checks = await Promise.all(gameFiles(game).map(async (file) => {
      const cached = await cache.match(gameFileUrl(file));
      return cached?.headers.get("X-OrganizeOn-Game-Hash") === file.sha256;
    }));
    return checks.every(Boolean);
  }

  async function downloadExternalGame(game, card) {
    const download = game.externalDownload;
    if (!download?.url || !download.filename) return;
    const approved = await clientUi.confirmClientAction(
      `${game.name} será baixado diretamente do GitHub e salvo como ` +
      `${download.filename}. O OrganizeOn verificará a integridade antes de ` +
      "entregar o HTML. Continuar?",
      stylesheet,
      "Baixar jogo externo?",
      "Baixar e verificar",
    );
    if (!approved) return;

    const action = card.querySelector(".action");
    const bar = card.querySelector(".progress span");
    card.classList.add("downloading");
    card.querySelector(".progress").hidden = false;
    action.disabled = true;
    setActionLabel(action, "Conectando ao GitHub…");
    try {
      const response = await fetch(download.url, { cache: "no-store" });
      if (!response.ok) throw new Error(`GitHub respondeu HTTP ${response.status}`);
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
            Math.round((received / Math.max(1, download.size)) * 100),
          );
          bar.style.width = `${percent}%`;
          setActionLabel(action,
            `GitHub ${formatGameBytes(received)}/${formatGameBytes(download.size)} · ${percent}%`);
        }
      } else {
        const fallback = new Uint8Array(await response.arrayBuffer());
        chunks.push(fallback);
        received = fallback.byteLength;
      }
      const archive = new Uint8Array(received);
      let offset = 0;
      chunks.forEach((chunk) => {
        archive.set(chunk, offset);
        offset += chunk.byteLength;
      });
      const archiveHash = await sha256Hex(archive);
      if (archiveHash && archiveHash !== download.sha256) {
        throw new Error("o SHA-256 recebido não corresponde à revisão fixada");
      }

      setActionLabel(action, download.format === "zip-single-html"
        ? "Extraindo HTML…"
        : "Verificando HTML…");
      const html = download.format === "zip-single-html"
        ? await extractSingleHtmlFromZip(archive, download.filename)
        : archive;
      if (download.outputSize && html.byteLength !== download.outputSize) {
        throw new Error("o tamanho do HTML extraído é inesperado");
      }
      const outputHash = await sha256Hex(html);
      if (outputHash && outputHash !== download.outputSha256) {
        throw new Error("o SHA-256 do HTML é inesperado");
      }

      const blobUrl = URL.createObjectURL(
        new Blob([html], { type: "text/html;charset=utf-8" }),
      );
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = download.filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      reportGameEvent(game, "download");
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      bar.style.width = "100%";
      setActionLabel(action, "HTML baixado");
    } catch (error) {
      setActionLabel(action, "Tentar novamente");
      window.alert(
        `Não foi possível baixar ${game.name}: ${
          error instanceof Error ? error.message : "erro desconhecido"
        }`,
      );
    } finally {
      action.disabled = false;
      window.setTimeout(() => {
        card.classList.remove("downloading");
        card.querySelector(".progress").hidden = true;
        bar.style.width = "0";
        if (action.querySelector("[data-action-label]")?.textContent === "HTML baixado") {
          setActionLabel(action, "Baixar novamente");
        }
      }, 900);
    }
  }

  async function extractSingleHtmlFromZip(archive, expectedFilename) {
    const view = new DataView(
      archive.buffer,
      archive.byteOffset,
      archive.byteLength,
    );
    let endOffset = -1;
    const minimumOffset = Math.max(0, archive.byteLength - 65_557);
    for (let offset = archive.byteLength - 22; offset >= minimumOffset; offset -= 1) {
      if (view.getUint32(offset, true) === 0x06054b50) {
        endOffset = offset;
        break;
      }
    }
    if (endOffset < 0) throw new Error("arquivo ZIP inválido");
    if (view.getUint16(endOffset + 10, true) !== 1) {
      throw new Error("o pacote deveria conter exatamente um HTML");
    }
    const centralOffset = view.getUint32(endOffset + 16, true);
    if (view.getUint32(centralOffset, true) !== 0x02014b50) {
      throw new Error("diretório do ZIP inválido");
    }
    const method = view.getUint16(centralOffset + 10, true);
    const compressedSize = view.getUint32(centralOffset + 20, true);
    const outputSize = view.getUint32(centralOffset + 24, true);
    const nameLength = view.getUint16(centralOffset + 28, true);
    const localOffset = view.getUint32(centralOffset + 42, true);
    const filename = new TextDecoder().decode(
      archive.subarray(centralOffset + 46, centralOffset + 46 + nameLength),
    );
    if (filename !== expectedFilename || !filename.toLowerCase().endsWith(".html")) {
      throw new Error("nome do HTML dentro do ZIP é inesperado");
    }
    if (view.getUint32(localOffset, true) !== 0x04034b50) {
      throw new Error("entrada local do ZIP inválida");
    }
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataOffset = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = archive.slice(dataOffset, dataOffset + compressedSize);
    let output;
    if (method === 0) {
      output = compressed;
    } else if (method === 8 && typeof DecompressionStream === "function") {
      const stream = new Blob([compressed]).stream().pipeThrough(
        new DecompressionStream("deflate-raw"),
      );
      output = new Uint8Array(await new Response(stream).arrayBuffer());
    } else {
      throw new Error("este navegador não consegue extrair o ZIP automaticamente");
    }
    if (output.byteLength !== outputSize) {
      throw new Error("HTML extraído com tamanho inválido");
    }
    return output;
  }

  async function installGame(game, card) {
    if (!("caches" in window)) {
      window.alert("Este navegador não oferece armazenamento em cache.");
      return;
    }
    const action = card.querySelector(".action");
    const bar = card.querySelector(".progress span");
    card.classList.add("downloading");
    card.querySelector(".progress").hidden = false;
    action.disabled = true;
    setActionLabel(action, "Baixando 0%");
    try {
      const cache = await caches.open(gameCacheName);
      const files = gameFiles(game);
      let completedBytes = 0;
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const response = await fetch(gameFileUrl(file), { cache: "no-cache" });
        if (!response.ok) throw new Error(`${file.path}: HTTP ${response.status}`);
        const reader = response.body?.getReader();
        const chunks = [];
        let fileBytes = 0;
        if (reader) {
          while (true) {
            const result = await reader.read();
            if (result.done) break;
            chunks.push(result.value);
            fileBytes += result.value.byteLength;
            updateGameDownloadProgress(
              completedBytes + fileBytes,
              game.size,
              index + 1,
              files.length,
            );
          }
        } else {
          const fallback = new Uint8Array(await response.arrayBuffer());
          chunks.push(fallback);
          fileBytes = fallback.byteLength;
        }
        const contents = new Uint8Array(fileBytes);
        let offset = 0;
        chunks.forEach((chunk) => {
          contents.set(chunk, offset);
          offset += chunk.byteLength;
        });
        const actualHash = await sha256Hex(contents);
        if (actualHash && actualHash !== file.sha256) {
          throw new Error(`${file.path}: verificação de integridade falhou.`);
        }
        const headers = new Headers(response.headers);
        headers.set("X-OrganizeOn-Game-Hash", file.sha256);
        await cache.put(
          gameFileUrl(file),
          new Response(contents, { status: 200, headers }),
        );
        completedBytes += fileBytes;
        updateGameDownloadProgress(
          completedBytes,
          game.size,
          index + 1,
          files.length,
        );
      }
      setCardInstalled(card, true);
      reportGameEvent(game, "download");
      bar.style.width = "100%";
    } catch (error) {
      action.disabled = false;
      setActionLabel(action, "Tentar novamente");
      window.alert(
        `Não foi possível baixar ${game.name}: ${
          error instanceof Error ? error.message : "erro desconhecido"
        }`,
      );
    } finally {
      window.setTimeout(() => {
        card.classList.remove("downloading");
        card.querySelector(".progress").hidden = true;
        bar.style.width = "0";
      }, 350);
    }

    function updateGameDownloadProgress(received, total, file, fileCount) {
      const percent = Math.min(
        100,
        Math.round((received / Math.max(1, total)) * 100),
      );
      bar.style.width = `${percent}%`;
      setActionLabel(action, fileCount > 1
        ? `Baixando ${file}/${fileCount} · ${percent}%`
        : `Baixando ${percent}%`);
    }
  }

  async function playGame(game) {
    const cache = await caches.open(gameCacheName);
    const response = await cache.match(gameUrl(game));
    if (!response) {
      await renderCatalog(searchQuery);
      return;
    }
    if (playerUrl) URL.revokeObjectURL(playerUrl);
    playerUrl = null;
    player.querySelector("strong").textContent = game.name;
    player.querySelector(".player-help").textContent =
      game.instructions || "Toque direto na tela para clicar.";
    frame.title = game.name;
    activeGame = game;
    player.classList.remove("menu-open");
    playerMenuTrigger.textContent = closedMenuGlyph;
    playerMenuTrigger.setAttribute("aria-expanded", "false");
    playerMenuTrigger.setAttribute("aria-label", "Abrir menu do jogo");
    buildVirtualControls(game);
    if (game.type === "flash" || game.packageRoot) {
      try {
        await ensureGameServiceWorker();
      } catch (error) {
        console.warn("O cache offline do Ruffle não pôde ser ativado:", error);
      }
      if (game.type === "flash") {
        const playerDocument = game.ruffleRuntime === "legacy"
          ? "games/flash-player-legacy.html"
          : "games/flash-player.html";
        const flashPlayerUrl = assetUrl(playerDocument);
        flashPlayerUrl.searchParams.set("swf", game.entry);
        frame.src = flashPlayerUrl.href;
      } else {
        frame.src = gameUrl(game);
      }
    } else {
      playerUrl = URL.createObjectURL(await response.blob());
      frame.src = playerUrl;
    }
    wrapper.classList.add("playing");
    reportGameEvent(game, "play");
  }

  async function launchRemoteGame(game) {
    let url = new URL(game.remoteUrl);
    if (!guestMode) {
      const themeId = document.documentElement.getAttribute("data-theme") || "maple";
      const response = await apiRequest("/games/survival/session", {
        method: "POST",
        body: JSON.stringify({ themeId }),
      });
      if (!response.ok) {
        showToast("Não foi possível autorizar a sessão do Survival.");
        return;
      }
      const session = await response.json();
      url = new URL(session.url || game.remoteUrl);
      url.searchParams.set("organizeonToken", session.token);
    }
    player.querySelector("strong").textContent = game.name;
    player.querySelector(".player-help").textContent =
      game.instructions || "Escolha um nick e entre na partida.";
    frame.title = game.name;
    frame.src = url.href;
    activeGame = game;
    player.classList.remove("menu-open");
    buildVirtualControls(game);
    wrapper.classList.add("playing");
    reportGameEvent(game, "play");
  }

  async function refreshGameStats() {
    const response = await fetch(
      `${config.apiOrigin}${config.apiPrefix}/games/stats`,
      { cache: "no-store", credentials: "omit" },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    gameStats = {
      games: payload.games && typeof payload.games === "object"
        ? payload.games
        : {},
      trending: [],
    };
    // Recompute locally so an older API response cannot mark every played game
    // as trending while the server is being updated.
    rebuildTrendingGames();
    if (wrapper.isConnected) await renderCatalog(searchQuery);
  }

  async function reportGameEvent(game, event) {
    try {
      const response = await fetch(
        `${config.apiOrigin}${config.apiPrefix}/games/stats`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId: game.id, event }),
          credentials: "omit",
          keepalive: true,
        },
      );
      if (!response.ok) return;
      const payload = await response.json();
      if (payload.game) {
        gameStats.games[game.id] = payload.game;
        rebuildTrendingGames();
        wrapper.querySelectorAll(`[data-game-id="${game.id}"] .game-stats`)
          .forEach((element) => updateGameStatsElement(element, game.id));
      }
    } catch (error) {
      console.warn("Não foi possível registrar a atividade do jogo:", error);
    }
  }

  function rebuildTrendingGames() {
    gameStats.trending = Object.entries(gameStats.games)
      .sort((left, right) =>
        (Number(right[1].downloads || 0) + Number(right[1].plays || 0)) -
          (Number(left[1].downloads || 0) + Number(left[1].plays || 0)) ||
        Number(right[1].plays7d || 0) - Number(left[1].plays7d || 0) ||
        Number(right[1].plays || 0) - Number(left[1].plays || 0)
      )
      .slice(0, 3)
      .map(([gameId]) => gameId);
  }

  function updateGameStatsElement(element, gameId) {
    const statistics = gameStats.games[gameId] || {};
    element.textContent = "";
    const downloads = document.createElement("span");
    downloads.textContent = `↓ ${formatGameCount(statistics.downloads)} downloads`;
    const plays = document.createElement("span");
    plays.textContent = `▶ ${formatGameCount(statistics.plays)} jogadas`;
    element.append(downloads, plays);
  }

  function formatGameCount(value) {
    return new Intl.NumberFormat("pt-BR", { notation: "compact" })
      .format(Number(value || 0));
  }

  async function ensureGameServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    const registration = await navigator.serviceWorker.register(
      assetUrl("games/game-sw.js").href,
      { scope: assetUrl("games/").pathname },
    );
    if (registration.active) return;
    const worker = registration.installing || registration.waiting;
    if (!worker) return;
    await new Promise((resolve, reject) => {
      const timeout = window.setTimeout(
        () => reject(new Error("Tempo esgotado ao iniciar o cache de jogos.")),
        8000,
      );
      worker.addEventListener("statechange", () => {
        if (worker.state === "activated") {
          clearTimeout(timeout);
          resolve();
        } else if (worker.state === "redundant") {
          clearTimeout(timeout);
          reject(new Error("Service worker rejeitado."));
        }
      });
    });
  }

  function buildVirtualControls(game) {
    controls.innerHTML = "";
    const required = new Set(configuredGameKeys(game));
    const keyDefinitions = virtualGameKeyDefinitions;
    const isRequired = (definition) =>
      required.has(definition.label) ||
      required.has(definition.code) ||
      required.has(definition.key);
    const requiredDefinitions = keyDefinitions.filter(isRequired);
    const showControls = requiredDefinitions.length > 0;
    const hasNativeTouchControls =
      isMobileViewport &&
      (game.controls || []).includes("touch");
    const openControlsByDefault =
      isMobileViewport && showControls && !hasNativeTouchControls;
    controlsToggle.hidden = !showControls;
    controlsToggle.setAttribute("aria-expanded", String(
      openControlsByDefault,
    ));
    player.classList.toggle(
      "controls-open",
      openControlsByDefault,
    );
    if (!showControls) return;

    if (isMobileViewport) {
      buildMobileControls(requiredDefinitions);
      return;
    }

    const help = document.createElement("p");
    help.className = "control-help";
    help.textContent =
      "Segure várias teclas ao mesmo tempo para combinações. No jogo: 1 toque = clique esquerdo; toque duplo ou 2 dedos = botão direito.";
    controls.appendChild(help);
    const movementZone = document.createElement("div");
    movementZone.className = "control-zone movement-zone";
    const actionZone = document.createElement("div");
    actionZone.className = "control-zone action-zone";
    keyDefinitions.forEach((definition) => {
      const button = createVirtualKey(definition);
      if (isRequired(definition)) button.classList.add("needed");
      (definition.direction ? movementZone : actionZone).appendChild(button);
    });
    controls.append(movementZone, actionZone);

    function buildMobileControls(definitions) {
      controls.classList.remove("no-movement", "no-actions");
      const arrowMovement = definitions.filter((definition) =>
        definition.direction && definition.code.startsWith("Arrow")
      );
      const letterMovement = definitions.filter((definition) =>
        definition.direction && definition.code.startsWith("Key")
      );
      const configuredMovement = new Set(game.movementKeys || []);
      const hasConfiguredMovement = definitions.some((definition) =>
        definition.direction &&
        (
          configuredMovement.has(definition.label) ||
          configuredMovement.has(definition.code) ||
          configuredMovement.has(definition.key)
        )
      );
      const movementDefinitions = hasConfiguredMovement
        ? definitions.filter((definition) =>
            definition.direction &&
            (
              configuredMovement.has(definition.label) ||
              configuredMovement.has(definition.code) ||
              configuredMovement.has(definition.key)
            )
          )
        : arrowMovement.length
          ? arrowMovement
          : letterMovement;
      const selectedMovement = new Set(movementDefinitions);
      const actionDefinitions = definitions.filter((definition) => {
        if (selectedMovement.has(definition)) return false;
        if (
          definition.direction &&
          !hasConfiguredMovement &&
          !game.preserveSecondaryMovement
        ) {
          return false;
        }
        return true;
      });

      if (movementDefinitions.length) {
        const movementZone = document.createElement("div");
        const hasFullDirectionPad = ["up", "left", "down", "right"].every(
          (direction) =>
            movementDefinitions.some(
              (definition) => definition.direction === direction,
            ),
        );
        movementZone.className =
          `control-zone movement-zone ${
            hasFullDirectionPad ? "dpad" : "movement-row"
          }`;
        movementDefinitions.forEach((definition) => {
          const button = createVirtualKey(definition);
          button.classList.add(definition.direction);
          movementZone.appendChild(button);
        });
        controls.appendChild(movementZone);
      } else {
        controls.classList.add("no-movement");
      }

      if (actionDefinitions.length) {
        const actionZone = document.createElement("div");
        actionZone.className = "control-zone action-zone";
        actionDefinitions.forEach((definition) => {
          actionZone.appendChild(createVirtualKey(definition));
        });
        controls.appendChild(actionZone);
      } else {
        controls.classList.add("no-actions");
      }
    }

    function createVirtualKey(definition) {
      const button = document.createElement("button");
      button.className = `key${definition.wide ? " space" : ""}`;
      button.type = "button";
      button.textContent = definition.label;
      button.dataset.code = definition.code;
      button.setAttribute("aria-label", `Tecla ${definition.label}`);
      const key = definition.key || definition.label;
      const release = (event) => {
        event.preventDefault();
        button.classList.remove("pressed");
        sendVirtualKey(
          key,
          definition.code,
          definition.keyCode,
          false,
        );
      };
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        button.setPointerCapture?.(event.pointerId);
        button.classList.add("pressed");
        sendVirtualKey(
          key,
          definition.code,
          definition.keyCode,
          true,
        );
      });
      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("contextmenu", (event) => event.preventDefault());
      return button;
    }
  }

  function sendVirtualKey(key, code, keyCode, down) {
    const data = {
      type: "organizeon-game-key", key, code, keyCode, down,
    };
    frame.contentWindow?.postMessage(data, "*");
    try {
      const options = {
        key, code, keyCode, which: keyCode, bubbles: true, cancelable: true,
      };
      frame.contentWindow?.dispatchEvent(
        new KeyboardEvent(down ? "keydown" : "keyup", options),
      );
      frame.contentWindow?.document.dispatchEvent(
        new KeyboardEvent(down ? "keydown" : "keyup", options),
      );
      frame.contentWindow?.focus();
    } catch {
      // The message bridge above handles isolated player frames.
    }
  }

  function gameUrl(game) {
    return assetUrl(`games/${game.entry}`).href;
  }

  function gameFileUrl(file) {
    return assetUrl(`games/${file.path}`).href;
  }

  function gameFiles(game) {
    if (game.type === "external-download") return [];
    return Array.isArray(game.files) && game.files.length
      ? game.files
      : [{ path: game.entry, size: game.size, sha256: game.sha256 }];
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

function getSelectedProxyServer(externalOnly = guestMode) {
  const selectedId =
    localStorage.getItem(proxyServerStorageKey) || "organizeon";
  if (externalOnly && selectedId === "organizeon") {
    return proxyServerOptions.find((option) => option.id === "fern-original");
  }
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
  const apply = () => {
    const settingsHeading = [...document.querySelectorAll("h1")].find(
      (heading) => heading.textContent?.trim().toLowerCase() === "settings",
    );
    const existing = document.getElementById(
      "organizeon-browser-identity-setting",
    );
    if (!settingsHeading) {
      if (existing) loadClientUi().then(({ module }) => module.unmountPreferenceCard(existing));
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
    loadClientUi().then(({ module, stylesheet }) => {
      if (!card.isConnected) return;
      module.mountPreferenceCard(card, {
        title: "Identidade do navegador",
        description: "Escolhe como os sites abertos pelo proxy reconhecem o navegador. A alteração vale para Ultraviolet e Scramjet após recarregar o cliente.",
        label: "Identidade do navegador",
        value: getSelectedBrowserIdentity().id,
        options: browserIdentityOptions.map(({ id, name, description }) => ({ value: id, label: name, description })),
        onApply: (value) => {
          localStorage.setItem(browserIdentityStorageKey, value);
          restartClientAtMain();
        },
      }, stylesheet);
    }).catch((error) => console.error("Não foi possível carregar as configurações do cliente.", error));
  };

  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("popstate", apply);
  apply();
}

function setupWispBandwidthSetting() {
  const apply = () => {
    const settingsHeading = [...document.querySelectorAll("h1")].find(
      (heading) => heading.textContent?.trim().toLowerCase() === "settings",
    );
    const existing = document.getElementById(
      "organizeon-bandwidth-setting",
    );
    if (!settingsHeading) {
      if (existing) loadClientUi().then(({ module }) => module.unmountPreferenceCard(existing));
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

    const headerBlock = settingsHeading.parentElement;
    if (headerBlock?.parentElement === settingsContainer) {
      headerBlock.insertAdjacentElement("afterend", card);
    } else {
      settingsContainer.prepend(card);
    }
    loadClientUi().then(({ module, stylesheet }) => {
      if (!card.isConnected) return;
      module.mountPreferenceCard(card, {
        title: "Limite de streaming do YouTube",
        description: "O OrganizeOn limita somente a mídia do YouTube a 6 Mbps por conta. Pesquisa, páginas, CSS, scripts e outros sites ficam sem limite. “Sem limite” também libera o vídeo. Não afeta WISPs externos.",
        label: "Limite de banda do WISP",
        value: isWispBandwidthLimitEnabled() ? "limited" : "off",
        options: [
          { value: "limited", label: "6 Mbps (padrão)" },
          { value: "off", label: "Sem limite" },
        ],
        onApply: (value) => {
          if (value === "off") localStorage.setItem(wispBandwidthStorageKey, "off");
          else localStorage.removeItem(wispBandwidthStorageKey);
          restartClientAtMain();
        },
      }, stylesheet);
    }).catch((error) => console.error("Não foi possível carregar as configurações do cliente.", error));
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
  disposeClientSurface(document.getElementById("organizeon-proxy-dialog"));
  const availableOptions = guestMode
    ? proxyServerOptions.filter((option) => option.id !== "organizeon")
    : proxyServerOptions;
  const current = getSelectedProxyServer(guestMode);
  const host = document.createElement("div");
  host.id = "organizeon-proxy-dialog";
  host.style.cssText = "position:fixed;inset:0;z-index:2147483647";
  document.body.appendChild(host);
  void renderClientSurface(host, {
    type: "proxy",
    options: availableOptions,
    currentId: current.id,
    latency: {},
    guestMode,
    onClose: () => disposeClientSurface(host),
    onApply: (id) => {
      localStorage.setItem(proxyServerStorageKey, id);
      disposeClientSurface(host);
      restartClientAtMain();
    },
  }).then(() => measureProxyServerOptions(host, availableOptions)).catch((error) => {
    console.error("Falha ao abrir a seleção de proxy:", error);
    disposeClientSurface(host);
    showConnectionStatus("Não foi possível abrir os servidores proxy", "A interface atualizada não carregou.", null, 0);
  });
}

async function measureProxyServerOptions(
  dialog,
  availableOptions = proxyServerOptions,
) {
  const token = guestMode ? null : localStorage.getItem(tokenStorageKey);
  const measurements = await Promise.all(
    availableOptions.map(async (option) => {
      const button = dialog.querySelector(
        `[data-proxy-id="${option.id}"]`,
      );
      const connection = button?.querySelector(".connection");
      const result = await measureWispHandshake(
        guestMode ? option.url : buildProxyWispUrl(option, token),
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
      padding: 8px 8px 8px 60px !important; overflow: visible !important;
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
  let wrapper = document.getElementById("organizeon-login");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "organizeon-login";
    document.body.appendChild(wrapper);
  }

  void renderClientSurface(wrapper, {
    type: "login",
    initialMessage: message,
    onGuest: async () => {
      localStorage.removeItem(tokenStorageKey);
      localStorage.setItem(guestStorageKey, "1");
      await startGuestApplication();
    },
    onSubmit: async ({ mode, username, password, loginCode }) => {
    showConnectionStatus(
      "Autenticando…",
      "Enviando credenciais com conexão segura.",
    );

    try {
      const response = await apiRequest(
        mode === "register" ? "/auth/register" : "/auth/login",
        {
        method: "POST",
        body: JSON.stringify(mode === "register"
          ? {
              username,
              password,
            }
          : mode === "code"
          ? { loginCode }
          : {
              username,
              password,
            }),
        },
      );
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.token) {
        if (response.status === 429) {
          throw new Error("Muitas tentativas. Aguarde 15 minutos.");
        }
        throw new Error(
          mode === "register"
            ? ({
                username_exists: "Esse usuário já existe.",
                invalid_username: "Use de 3 a 32 letras, números, ponto, hífen ou sublinhado.",
              })[result.error] || "Não foi possível criar a conta. Use uma senha com pelo menos 8 caracteres."
            : mode === "code"
            ? "Código inválido, expirado ou já utilizado."
            : "Usuário ou senha inválidos.",
        );
      }

      localStorage.setItem(tokenStorageKey, result.token);
      localStorage.removeItem(guestStorageKey);
      scheduleExpiration(result.expiresAt);
      await startApplication(result.token, result.account);
    } catch (error) {
      hideConnectionStatus();
      throw error instanceof Error ? error : new Error("Não foi possível conectar ao servidor.");
    }
    },
  }).catch((error) => {
    console.error("Falha ao carregar a interface de autenticação:", error);
    wrapper.textContent = "Não foi possível carregar a tela de acesso. Recarregue o cliente.";
  });
}

function apiRequest(path, options) {
  if (guestMode) {
    return Promise.reject(
      new Error("A API permanece desligada no modo convidado."),
    );
  }
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
    if (guestMode) return;
    try {
      await flushCloudBackup();
    } catch (error) {
      console.warn("Não foi possível concluir o backup antes da limpeza:", error);
    }
    await apiRequest("/auth/logout", { method: "POST" });
  } catch (error) {
    console.warn("Não foi possível invalidar o cookie da API:", error);
  } finally {
    maintainControlConnection = false;
    window.clearTimeout(controlReconnectTimer);
    controlSocket?.close(1000, "Site data reset");
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(guestStorageKey);
  }
}

window.organizeonAuth = Object.freeze({
  async logout() {
    try {
      if (!guestMode) {
        try {
          await flushCloudBackup();
        } catch (error) {
          console.warn("Não foi possível concluir o backup antes do logout:", error);
        }
        await apiRequest("/auth/logout", { method: "POST" });
      }
    } finally {
      maintainControlConnection = false;
      window.clearTimeout(controlReconnectTimer);
      controlSocket?.close(1000, "Logout");
      localStorage.removeItem(tokenStorageKey);
      localStorage.removeItem(guestStorageKey);
      restartClientAtMain();
    }
  },
});

// Jogos carregados em iframes no mesmo domínio podem confirmar um salvamento
// sem duplicar a lógica de autenticação ou expor o token ao jogo.
window.organizeonCloudBackup = Object.freeze({
  get enabled() {
    return cloudBackupEnabled && !guestMode;
  },
  async save() {
    if (!cloudBackupEnabled || guestMode) throw new Error("cloud_backup_disabled");
    return saveCloudBackup();
  },
});
