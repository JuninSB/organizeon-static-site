import { fetchExternalGame } from "./core/games/external-download.js?v=runtime-6c57f9e998b24962";
import {toPortable,fromPortable} from "./core/storage/portable.js?v=runtime-6c57f9e998b24962";
import { clientNotificationsEnabled, installNotificationSettings } from "./core/ui/client-notifications.js?v=runtime-6c57f9e998b24962";
import { installBrandFavicon } from "./core/ui/brand.js?v=runtime-6c57f9e998b24962";
import { startWispMonitor } from "./core/network/wisp-monitor.js?v=runtime-6c57f9e998b24962";
import { openBackupDatabase } from "./core/storage/indexed-db.js?v=runtime-6c57f9e998b24962";
const CLIENT_UI_REVISION = "ui-dbfc7147370f032f";
const RUNTIME_ASSETS_REVISION = "runtime-6c57f9e998b24962";
// Shared lazy UI loader: all surfaces use the same compiled React bundle.
let clientUIPromise;
function loadClientUI() {
  if (!clientUIPromise) clientUIPromise = (async () => {
    const base = new URL(window.__groveBase || "./", document.baseURI);
    const script = new URL("ui-dist/client-ui.js?v=runtime-6c57f9e998b24962", base);
    const css = new URL("ui-dist/client-ui.css?v=runtime-6c57f9e998b24962", base);
    const version = window.__ORGANIZEON_CLIENT_VERSION__ || CLIENT_UI_REVISION;
    if (version) { script.searchParams.set("v", version); css.searchParams.set("v", version); }
    return { ui: await import(script.href), css: css.href };
  })().catch(error => { clientUIPromise = null; throw error; });
  return clientUIPromise;
}
let notificationUI;
async function notificationService() {
  if (!notificationUI) notificationUI = loadClientUI().then(({ ui, css }) => {
    const host = document.createElement("div"); host.id = "organizeon-notifications";
    host.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none";
    document.body.append(host); ui.mountClientToaster(host, css); return ui;
  }).catch(error => { notificationUI = null; throw error; });
  return notificationUI;
}
async function showToast(message, kind = "info", id) {
  if(kind!=="error"&&!clientNotificationsEnabled())return;
  try { (await notificationService()).showClientToast(String(message), kind, id); }
  catch (error) { console.warn("Falha ao exibir notificação:", error); }
}
async function mountClientPage(id, props) {
  const previous = document.getElementById(id); previous?.__cleanup?.(); previous?.remove();
  const host = document.createElement('section'); host.id = id;
  host.style.cssText = 'position:fixed;inset:0;z-index:2147483646;overflow:auto;background:#09090b';
  host.textContent = 'Carregando interface…'; document.body.append(host);
  try {
    const { ui, css } = await loadClientUI();
    if (!host.isConnected) return null;
    host.textContent = '';
    const mounted = ui.mountReactiveSurface(host, props, css);
    host.__cleanup = mounted.unmount;
    return { host, ...mounted, close: () => { mounted.unmount(); host.remove(); } };
  } catch (error) {
    host.textContent = '';
    host.style.cssText += ';display:grid;place-content:center;gap:16px;padding:24px;color:#fafafa;font:14px system-ui';
    const title = document.createElement('h1'); title.textContent = ":'( Um erro ocorreu ao carregar esta página!";
    const detail = document.createElement('pre');detail.textContent = String(error?.message || error);detail.style.whiteSpace = 'pre-wrap';
    const close = document.createElement('button');close.textContent = 'Voltar';close.onclick = () => host.remove();
    host.append(title,detail,close);return null;
  }
}

const config = window.__ORGANIZEON_CONFIG__;
installBrandFavicon(new URL(window.__groveBase||"./",document.baseURI));
const mainStylesheet=document.querySelector('link[rel="stylesheet"][href*="assets/jdht-s-SOkYHzV0.css"]');
if(mainStylesheet){const href=new URL(mainStylesheet.href);href.searchParams.set("v",RUNTIME_ASSETS_REVISION);mainStylesheet.href=href.href;}
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
window.organizeonOpenProxyServerDialog = showProxyServerDialog;
window.organizeonResetAndLogout = resetAuthenticationForDataWipe;
window.organizeonOpenQuickApp = openQuickApp;
window.organizeonOpenGameCatalog = showGameCatalog;
setupMobileMode();
hideDefaultHomepageShortcuts();
setupWispBandwidthSetting();
setupBrowserIdentitySetting();
installNotificationSettings(loadClientUI);
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
        window.__ORGANIZEON_LIVE__ ? "Jogos disponíveis no OrganizeOn; pesquisas usam o relay selecionado." : "Jogos usam o GitHub; pesquisas usam somente um relay público externo.",
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
  if(!clientNotificationsEnabled())return;
  void notificationService().then(ui => ui.showConnectionToast(title, detail, percent, autoHideMs));
}
function hideConnectionStatus() {
  void notificationService().then(ui => ui.dismissClientToast('connection-status'));
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
  const normalized = { username: account.username, role: account.role, permissions: Array.isArray(account.permissions) ? account.permissions : [] };
  window.organizeonAccount = Object.freeze(normalized);
  const previous=document.getElementById('organizeon-account-navigation-react');previous?.__cleanup?.();previous?.remove();
  document.getElementById('organizeon-account-navigation')?.remove();
  const host=document.createElement('div');host.id='organizeon-account-navigation-react';
  host.style.cssText='position:fixed;inset:0;z-index:2147483645;pointer-events:none';document.body.append(host);
  const failed=error=>{
    if(!host.isConnected)return;
    host.__cleanup?.();host.__cleanup=null;
    const root=host.shadowRoot || host;root.replaceChildren();
    const retry=document.createElement('button');retry.textContent='Menu indisponível · Tentar novamente';
    retry.style.cssText='position:fixed;top:12px;left:12px;pointer-events:auto;padding:12px;border:1px solid #27272a;border-radius:8px;background:#111113;color:#fafafa;font:14px system-ui';
    retry.onclick=()=>configureAccountNavigation(normalized);root.append(retry);
    console.error('Falha ao carregar navegação:',error);
  };
  void loadClientUI().then(({ui,css})=>{
    if(!host.isConnected)return;
    host.__cleanup=ui.mountNavigation(host, {
      type:'account',username:normalized.username,role:normalized.role,guest:normalized.role==='guest',
      canOpenDashboard:normalized.permissions.includes('admin.dashboard'),proxyLabel:getSelectedProxyServer().beta?'BETA':'ATIVO',
      onNavigate:(action)=>{
        if (action === "home") navigateClientRoute("/");
        if (action === "settings") navigateClientRoute("/settings");
        if(action==='games')void showGameCatalog();
        if(action==='data')void showDataPanel();
        if(action==='proxy')void showProxyServerDialog();
        if(action==='dashboard')openDashboardWindow();
        if(action==='logout')void window.organizeonAuth.logout();
      },
    },css);
    host.shadowRoot.querySelector('link[rel="stylesheet"]').addEventListener('error',()=>failed(Error('Estilos da navegação indisponíveis.')),{once:true});
  }).catch(failed);
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
          indexes: Array.from(store.indexNames, name => { const index=store.index(name);return {name,keyPath:index.keyPath,unique:index.unique,multiEntry:index.multiEntry}; }),
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
    const db = await openBackupDatabase(backup);
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
  let page;
  page = await mountClientPage('organizeon-data-panel', {
    type: 'data', username: window.organizeonAccount?.username || 'Conta',
    getStatus: async () => { const response = await apiRequest('/account/backup', { method: 'GET' }); if (!response.ok) throw Error('Falha ao consultar backup.'); return response.json(); },
    getGames: async () => { const base = new URL(window.__groveBase || './', document.baseURI); const response = await fetch(new URL('games/catalog.json', base)); if (!response.ok) throw Error('Falha ao carregar catálogo.'); return (await response.json()).games || []; },
    toggleBackup: async enabled => { const response = await apiRequest('/account/backup', { method: 'PATCH', body: JSON.stringify({ enabled }) }); if (!response.ok) throw Error('Falha ao alterar backup.'); cloudBackupEnabled = enabled; },
    saveBackup: saveCloudBackup, restoreBackup: restoreCloudBackup,
    clearAllProgress: clearAllGameProgress, clearGameProgress, clearPreferences,
    onClose: () => page?.close(),
  });
}

function formatCloudBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function restartClientAtMain() {
  // Settings and search are virtual SPA routes. Reloading one of those paths
  // directly makes static hosts such as GitHub Pages look for a real file and
  // return 404, so move history to the actual client root before reloading.
  navigateClientRoute("/");
  window.location.reload();
}

function openDashboardWindow() {
  const dashboardLocation = new URL("admin.html", document.baseURI);
  dashboardLocation.searchParams.set("v", window.__ORGANIZEON_CLIENT_VERSION__ || CLIENT_UI_REVISION);
  const dashboardUrl = dashboardLocation.href;
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
    if (event.data.loggedOut) { restartClientAtMain(); return; }
    if (event.data.openSidebar) {
      document.getElementById("organizeon-account-navigation-react")?.shadowRoot?.querySelector('button[aria-label="Abrir menu"]')?.click();
    }
  };
  dashboardPanelCleanup = removeDashboard;
  window.addEventListener("message", closeDashboard);
}

async function openQuickApp(app, navigate) {
  if (app?.id === "chat") return true;
  if (app?.id === "games") {
    showGameCatalog();
    return true;
  }
  const handledByOriginalLauncher = new Set([
    "yt",
    "gfn",
    "bw",
    "roblox",
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
  const { ui: catalogUI, css: catalogCSS } = await loadClientUI();
  document.getElementById("organizeon-game-catalog-host")?.__cleanup?.();
  document.getElementById("organizeon-game-catalog-host")?.remove();
  const catalogHost = document.createElement("div"); catalogHost.id = "organizeon-game-catalog-host";
  catalogHost.style.cssText = "position:fixed;inset:0;z-index:2147483646";
  const catalogShadow = catalogHost.attachShadow({mode:"open"});
  const catalogStyles=document.createElement('link');catalogStyles.rel='stylesheet';catalogStyles.href=catalogCSS;catalogStyles.dataset.organizeonUi='client';
  const catalogStylesReady=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Tempo limite ao carregar estilos do catálogo.')),15000);catalogStyles.onload=()=>{clearTimeout(timer);resolve();};catalogStyles.onerror=()=>{clearTimeout(timer);reject(Error('Falha ao carregar estilos do catálogo.'));};});
  catalogShadow.append(catalogStyles);
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
      #organizeon-game-catalog .shell > .grid {
        display: grid; grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 18px;
      }
      #organizeon-game-catalog .card {
        overflow: hidden; border: 1px solid rgba(255,255,255,.1);
        border-radius: 18px; background: rgba(15,27,24,.9);
        box-shadow: 0 18px 50px rgba(0,0,0,.2);
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
      #organizeon-game-catalog .legacy-game-stats {
        display: flex; gap: 11px; min-height: 17px; margin: -5px 0 10px;
        color: #789d93; font-size: 10px; font-weight: 720;
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
      #organizeon-game-catalog .credits {
        min-height: 42px; padding: 0 10px; border-radius: 10px;
        border: 1px solid rgba(255,255,255,.12); cursor: pointer;
        color: #9fc2b9; background: rgba(255,255,255,.035); font-weight: 750;
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
        #organizeon-game-catalog .shell > .grid {
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
        #organizeon-game-catalog .card.mobile-warning {
          border-color: rgba(255,198,73,.72);
          background: linear-gradient(180deg,rgba(64,48,18,.92),rgba(15,27,24,.95));
          box-shadow: 0 0 0 1px rgba(255,198,73,.08),0 18px 50px rgba(0,0,0,.2);
        }
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
        #organizeon-game-catalog .shell > .grid {
          grid-template-columns: minmax(0,1fr);
        }
        #organizeon-game-catalog .key-settings-grid {
          grid-template-columns: repeat(3,minmax(0,1fr));
        }
      }
    
      #organizeon-game-catalog { color:#fafafa; background:#09090b; }
      #organizeon-game-catalog .back,#organizeon-game-catalog .filter,#organizeon-game-catalog .credits,#organizeon-game-catalog .controls-toggle,#organizeon-game-catalog .controls-settings { border-color:#3f3f46; border-radius:7px; color:#d4d4d8; background:#18181b; box-shadow:none; }
      #organizeon-game-catalog .filter.active,#organizeon-game-catalog .action,#organizeon-game-catalog .dialog-close { border-color:#e4e4e7; color:#18181b; background:#e4e4e7; }
      #organizeon-game-catalog .card { border-color:#27272a; border-radius:9px; background:#111113; box-shadow:none; }
      #organizeon-game-catalog .search { border-color:#3f3f46; border-radius:7px; color:#fafafa; background:#09090b; }
      #organizeon-game-catalog .search:focus-visible,#organizeon-game-catalog button:focus-visible { outline:2px solid #a1a1aa; outline-offset:2px; }
      #organizeon-game-catalog .filter,#organizeon-game-catalog button { transition:color .15s ease,background .15s ease,border-color .15s ease; }
      @media(max-width:700px){#organizeon-game-catalog .shell > .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}}
      @media(max-width:440px){#organizeon-game-catalog .shell > .grid{grid-template-columns:1fr}#organizeon-game-catalog .topbar{flex-wrap:wrap}#organizeon-game-catalog .search{order:3;width:100%;margin:4px 0 0}}
      @media(prefers-reduced-motion:reduce){#organizeon-game-catalog *{transition:none!important;animation:none!important}}
</style>
    <div class="shell">
      <header class="topbar">
        <button class="back" type="button" aria-label="Voltar">←</button>
        <div><h1>Jogos</h1><p class="subtitle">Carregando biblioteca…</p></div>
        <input class="search" type="search" placeholder="🔎 Pesquisar por nome, gênero ou descrição…" aria-label="Pesquisar jogos">
      </header>
      <nav class="filters" aria-label="Filtrar jogos">
        <button class="filter active" type="button" data-filter="all">Todos</button>
        <button class="filter" type="button" data-filter="trending">🔥 Em alta</button>
        <button class="filter" type="button" data-filter="mobile">Mobile</button>
        <button class="filter" type="button" data-filter="pc">PC</button>
        <button class="filter" type="button" data-filter="flash">Flash</button>
        <span class="category-filters"></span>
      </nav>
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
  catalogShadow.append(wrapper);
  document.body.append(catalogHost);

  const grid = wrapper.querySelector(".grid");
  const search = wrapper.querySelector(".search");
  const filters = wrapper.querySelector(".filters");
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
  let activeGame = null;
  let toolbarUI = null;
  let catalogGeneration = 0;
  const cardControllers=new WeakMap();
  const updateCard=(card,patch)=>cardControllers.get(card)?.update(patch);
  wrapper.querySelector(".topbar").style.display = "none"; filters.style.display = "none";
  const isMobileViewport = matchMedia("(max-width: 700px), (pointer: coarse)").matches;
  const assetUrl = (path) => {
    const basePath = window.__groveBase || new URL("./", location.href).pathname;
    const base = new URL(basePath, location.origin);
    return new URL(path.replace(/^\/+/, ""), base);
  };
  const close = () => {
    catalogGeneration++;
    if (playerUrl) URL.revokeObjectURL(playerUrl);
    document.body.style.overflow = previousOverflow;
    toolbarUI?.unmount();
    grid.querySelectorAll("[data-game-id]").forEach(card => catalogUI.unmountGameCard(card));
    catalogHost.remove();
  };
  catalogHost.__cleanup = close;
  wrapper.querySelector(".topbar .back").addEventListener("click", close);
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
  search.addEventListener("input", () => renderCatalog(search.value));
  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter");
    if (!button) return;
    activeFilter = button.dataset.filter || "all";
    filters.querySelectorAll(".filter").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderCatalog(search.value);
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
    await catalogStylesReady;
    const catalogUrl=assetUrl("games/catalog.json");catalogUrl.searchParams.set("v",window.__ORGANIZEON_CLIENT_VERSION__||CLIENT_UI_REVISION);
    const response = await fetch(
      catalogUrl,
      { cache: "no-cache" },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    catalog = Array.isArray(payload.games) ? payload.games : [];
    const categoryFilters = wrapper.querySelector(".category-filters");
    const categories = Array.from(
      new Set(catalog.map((game) => game.category).filter(Boolean)),
    ).sort((left, right) => left.localeCompare(right, "pt-BR"));
    categoryFilters.replaceChildren(...categories.map((category) => {
      const button = document.createElement("button");
      button.className = "filter";
      button.type = "button";
      button.dataset.filter = `category:${category}`;
      button.textContent = category;
      return button;
    }));
    search.placeholder =
      `🔎 Pesquisar entre ${catalog.length} jogos…`;
    wrapper.querySelector(".subtitle").textContent =
      `${catalog.length} jogos · baixe uma vez e jogue direto do cache.`;
    const toolbarHost = document.createElement('div');
    wrapper.querySelector('.topbar').style.display = "none"; filters.style.display = "none";
    wrapper.querySelector('.shell').prepend(toolbarHost);
    wrapper.querySelector(".shell").style.padding = "0 0 32px";
    grid.style.padding = "0 16px";
    toolbarUI = catalogUI.mountCatalogToolbar(toolbarHost, { count: catalog.length, categories, onBack: close,
      onQueryChange: query => { search.value = query; void renderCatalog(query); },
      onFilterChange: filter => { activeFilter = filter; void renderCatalog(search.value); } }, catalogCSS);
    await pruneRemovedGameCache(catalog).catch((error) => {
      console.warn("Não foi possível limpar jogos removidos do cache:", error);
    });
    await renderCatalog();
    refreshGameStats().catch((error) => {
      console.warn("Estatísticas de jogos indisponíveis:", error);
    });
  } catch (error) {
    grid.innerHTML = "";
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent =
      "Não foi possível carregar o catálogo. Verifique a conexão e tente novamente.";
    grid.appendChild(empty);
    const back=document.createElement('button');back.textContent='Voltar ao OrganizeOn';back.onclick=close;back.style.cssText='padding:12px;background:#27272a;color:#fafafa;border:0;border-radius:8px';grid.append(back);
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

  async function renderCatalog(query = "") {
    const generation = ++catalogGeneration;
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
    grid.querySelectorAll("[data-game-id]").forEach(card => catalogUI.unmountGameCard(card));
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
        if(game.unavailableReason){updateCard(card,{actionDisabled:true,actionLabel:"Fonte indisponível"});return;}
        if (game.type === "external-download") {
          const action = card.querySelector(".action");
          updateCard(card,{actionDisabled:false,actionLabel:"Baixar ZIP"});
          return;
        }
        if (game.type === "remote") {
          const action = card.querySelector(".action");
          updateCard(card,{actionDisabled:false,actionLabel:"Jogar online"});
          return;
        }
        const installed = await isGameInstalled(game);
        if (generation === catalogGeneration && card.isConnected) setCardInstalled(card, installed);
      }),
    );
  }

  function createGameCard(game) {
    const card = document.createElement('article'); card.className = 'modern-game-card'; card.dataset.gameId = game.id;
    grid.append(card);
    const controller=catalogUI.mountGameCard(card, { ...game, cover: assetUrl(`games/${game.cover}`).href,
      platforms: game.platforms || ['pc'], attribution: game.attribution || 'OrganizeOn',
      sizeLabel: game.type === 'remote' ? 'Online' : formatGameBytes(game.size || 0),
      trending: (gameStats.trending || []).includes(game.id), hasCredits: Boolean(game.attribution || game.source || game.license),
      onAction: async () => { if (game.type === 'external-download') await downloadExternalGame(game, card); else if (game.type === 'remote') await launchRemoteGame(game); else if (card.classList.contains('installed')) await playGame(game); else await installGame(game, card); },
      onRemove: async () => { const cache = await caches.open(gameCacheName); await Promise.all(gameFiles(game).map(file => cache.delete(gameFileUrl(file)))); setCardInstalled(card, false); },
      onRelay: async () => { await navigator.clipboard.writeText(game.relayUrl); void showToast('Relay copiado'); },
      onCredits: () => showGameCredits(game),
    }, catalogCSS);
    cardControllers.set(card,controller);
    // React owns disabled/installed/progress visibility; DOM labels only show byte progress.
    updateGameStatsElement(card.querySelector('.game-stats'), game.id);
    return card;
  }

  function setCardInstalled(card, installed) {
    card.classList.toggle("installed", installed);
    updateCard(card,{installed,actionDisabled:false,actionLabel:installed?"Jogar":"Baixar"});
    const action = card.querySelector(".action");
    if (!action) return;
    action.disabled = false;
    const remove = card.querySelector(".remove"); if (remove) remove.hidden = !installed;
    (action.querySelector("[data-action-label]") || action).textContent = installed ? "Jogar" : "Baixar";
  }

  function dialogHost() {
    const host = document.createElement('div'); host.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:none'; document.body.append(host); return host;
  }
  function showGameCredits(game) {
    const host = dialogHost(); let cleanup;
    const close = () => { cleanup?.(); host.remove(); };
    cleanup = catalogUI.mountGameCreditsDialog(host, game, close, catalogCSS);
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

  function definitionIsSelected(definition, selectedKeys) {
    const selected = new Set(selectedKeys);
    return selected.has(definition.label) ||
      selected.has(definition.code) ||
      selected.has(definition.key);
  }

  function showGameControlSettings(game) {
    const host = dialogHost(); let cleanup;
    const close = () => { cleanup?.();host.remove(); };
    const isTetris = String(game.id || '').toLowerCase() === 'classic-tetris' || String(game.entry || '').toLowerCase().endsWith('classic-tetris.html') || String(game.name || '').toLowerCase() === 'tetris';
    cleanup = catalogUI.mountGameControlSettingsDialog(host, {
      name: game.name, definitions: virtualGameKeyDefinitions, selectedKeys: configuredGameKeys(game), defaultKeys: game.keys || [], isTetris,
      initialLeftHanded: localStorage.getItem('organizeon-tetris-left-handed') === '1', onClose: close,
      onSave: (keys, leftHanded) => { const settings = readGameControlSettings();settings[game.id] = keys;localStorage.setItem(gameControlSettingsStorageKey, JSON.stringify(settings));if(isTetris) {localStorage.setItem('organizeon-tetris-left-handed',leftHanded?'1':'0');frame.contentWindow?.postMessage({type:'organizeon-tetris-settings',leftHanded},'*');}buildVirtualControls(game);close(); },
      onFullscreen: async () => { if(document.fullscreenElement) await document.exitFullscreen();else await frame.requestFullscreen?.(); },
    }, catalogCSS);
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
    const approved = window.confirm(
      `${game.name} será baixado ${download.label === "OrganizeOn" ? "do servidor OrganizeOn" : "do GitHub ou do servidor OrganizeOn"}. ` +
      "O OrganizeOn verificará a integridade antes de " +
      "entregar o ZIP. Continuar?",
    );
    if (!approved) return;

    const action = card.querySelector(".action");
    const bar = card.querySelector(".progress span");
    card.classList.add("downloading");
    updateCard(card,{actionDisabled:true,downloading:true});
    action.disabled = true;
    (action.querySelector("[data-action-label]") || action).textContent = "Conectando ao GitHub…";
    try {
      const { bytes, filename, contentType } = await fetchExternalGame(download, {
        onProgress: ({ source, received, total }) => {
          const percent = Math.min(100, Math.round(received / total * 100));
          bar.style.width = `${percent}%`;
          (action.querySelector("[data-action-label]") || action).textContent =
            `${source} ${formatGameBytes(received)}/${formatGameBytes(total)} · ${percent}%`;
        },
      });

      const blobUrl = URL.createObjectURL(
        new Blob([bytes], { type: contentType }),
      );
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      reportGameEvent(game, "download");
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      bar.style.width = "100%";
      (action.querySelector("[data-action-label]") || action).textContent = "ZIP baixado";
    } catch (error) {
      updateCard(card,{actionLabel:"Tentar novamente",actionDisabled:false});
      window.alert(
        `Não foi possível baixar ${game.name}: ${
          error instanceof Error ? error.message : "erro desconhecido"
        }`,
      );
    } finally {
      action.disabled = false;
      window.setTimeout(() => {
        card.classList.remove("downloading");
        updateCard(card,{actionDisabled:false,downloading:false});
        bar.style.width = "0";
        if ((action.querySelector("[data-action-label]") || action).textContent === "ZIP baixado") {
          updateCard(card,{actionLabel:"Baixar novamente",actionDisabled:false});
        }
      }, 900);
    }
  }

  async function installGame(game, card) {
    if (!("caches" in window)) {
      window.alert("Este navegador não oferece armazenamento em cache.");
      return;
    }
    const action = card.querySelector(".action");
    const bar = card.querySelector(".progress span");
    card.classList.add("downloading");
    updateCard(card,{actionDisabled:true,downloading:true});
    action.disabled = true;
    (action.querySelector("[data-action-label]") || action).textContent = "Baixando 0%";
    try {
      const cache = await caches.open(gameCacheName);
      const files = gameFiles(game);
      let completedBytes = 0;
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const response = await fetch(new URL(`games/${file.path}`, "https://juninsb.github.io/organizeon-static-site/"), { cache: "no-cache" });
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
        for(const name of ["x-frame-options","content-security-policy","content-security-policy-report-only"])headers.delete(name);
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
      updateCard(card,{actionLabel:"Tentar novamente",actionDisabled:false});
      window.alert(
        `Não foi possível baixar ${game.name}: ${
          error instanceof Error ? error.message : "erro desconhecido"
        }`,
      );
    } finally {
      window.setTimeout(() => {
        card.classList.remove("downloading");
        updateCard(card,{actionDisabled:false,downloading:false});
        bar.style.width = "0";
      }, 350);
    }

    function updateGameDownloadProgress(received, total, file, fileCount) {
      const percent = Math.min(
        100,
        Math.round((received / Math.max(1, total)) * 100),
      );
      bar.style.width = `${percent}%`;
      (action.querySelector("[data-action-label]") || action).textContent = fileCount > 1
        ? `Baixando ${file}/${fileCount} · ${percent}%`
        : `Baixando ${percent}%`;
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
    if (wrapper.isConnected) await renderCatalog(search.value);
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
    downloads.textContent = `${formatGameCount(statistics.downloads)} downloads`;
    const plays = document.createElement("span");
    plays.textContent = `${formatGameCount(statistics.plays)} jogadas`;
    element.append(downloads, plays);
  }

  function formatGameCount(value) {
    return new Intl.NumberFormat("pt-BR", { notation: "compact" })
      .format(Number(value || 0));
  }

  async function ensureGameServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    const workerURL=assetUrl("games/game-sw.js?v=runtime-6c57f9e998b24962");workerURL.searchParams.set("v","games-runtime-2");
    const registration=await navigator.serviceWorker.register(workerURL.href,{scope:assetUrl("games/").pathname,updateViaCache:"none"});
    const worker=registration.installing||registration.waiting||registration.active;
    if(!worker||worker.state==="activated")return;
    await new Promise((resolve,reject)=>{
      const finish=error=>{clearTimeout(timeout);worker.removeEventListener("statechange",check);error?reject(error):resolve();};
      const check=()=>{if(worker.state==="activated")finish();else if(worker.state==="redundant")finish(new Error("Service worker rejeitado."));};
      const timeout=window.setTimeout(()=>finish(new Error("Tempo esgotado ao iniciar o cache de jogos.")),8000);
      worker.addEventListener("statechange",check);check();
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

async function showProxyServerDialog() {
  const availableOptions=guestMode?proxyServerOptions.filter(option=>option.id!=='organizeon'):proxyServerOptions;
  const latency=Object.fromEntries(availableOptions.map(option=>[option.id,{label:'Medindo conexão…',state:'pending'}]));
  let page,stop=()=>{};
  const props={type:'proxy',options:availableOptions,currentId:getSelectedProxyServer(guestMode).id,latency,guestMode,
    onClose:()=>{stop();page?.close();},
    onApply:id=>{stop();localStorage.setItem(proxyServerStorageKey,id);restartClientAtMain();}};
  page=await mountClientPage('organizeon-proxy-dialog',props);if(!page)return;
  const token=guestMode?null:localStorage.getItem(tokenStorageKey);
  stop=startWispMonitor({options:availableOptions,isOpen:()=>page.host.isConnected,
    measure:(option,signal)=>measureWispHandshake(guestMode?option.url:buildProxyWispUrl(option,token),signal),
    onResult:(option,result)=>{latency[option.id]={label:result.online?`${result.latencyMs} ms`:result.reason,state:result.online?'online':'offline'};page.update({...props,latency:{...latency}});}});
  const cleanup=page.host.__cleanup;page.host.__cleanup=()=>{stop();cleanup?.();};
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

function measureWispHandshake(url, signal) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    let settled = false;
    let socket;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      signal?.removeEventListener("abort",abort);
      try {
        socket?.close(1000, "Latency check complete");
      } catch {}
      resolve(result);
    };
    const abort=()=>finish({online:false,latencyMs:null,reason:"Cancelado"});
    const timeout = window.setTimeout(() => {
      finish({ online: false, latencyMs: null, reason: "Tempo esgotado" });
    }, 6000);
    if(signal?.aborted){abort();return;}
    signal?.addEventListener("abort",abort,{once:true});
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
    void showToast("Modo mobile ativado");
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
        color: #fafafa; background: #09090b;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      #organizeon-login * { box-sizing: border-box; }
      #organizeon-login form {
        width: min(100%, 390px); padding: 26px;
        border: 1px solid #27272a; border-radius: 10px;
        background: #111113;
      }
      #organizeon-login h1 { margin: 0 0 8px; font-size: 24px; font-weight: 600; letter-spacing: -.02em; }
      #organizeon-login p { margin: 0 0 22px; color: #a1a1aa; font-size: 14px; }
      #organizeon-login label { display: block; margin: 14px 0 6px; font-size: 13px; }
      #organizeon-login input {
        width: 100%; height: 44px; padding: 0 12px;
        border: 1px solid #3f3f46; border-radius: 7px;
        color: #fafafa; background: #09090b; outline: none;
      }
      #organizeon-login input:focus { border-color: #a1a1aa; }
      #organizeon-login button {
        width: 100%; height: 44px; margin-top: 20px;
        border: 1px solid #e4e4e7; border-radius: 7px; cursor: pointer;
        color: #18181b; background: #e4e4e7; font-weight: 600;
      }
      #organizeon-login button:disabled { cursor: wait; opacity: .65; }
      #organizeon-login .guest {
        margin-top: 10px; color: #d4d4d8;
        border: 1px solid #3f3f46; background: #18181b;
      }
      #organizeon-login .register {
        margin-top: 10px; color: #d4d4d8;
        border: 1px solid #3f3f46; background: transparent;
      }
      #organizeon-login .code-toggle {
        margin-top: 10px; color: #d4d4d8;
        border: 1px solid #3f3f46; background: transparent;
      }
      #organizeon-login .code-fields[hidden],
      #organizeon-login .password-fields[hidden] { display: none; }
      #organizeon-login .code-input {
        text-transform: uppercase; letter-spacing: .28em;
        text-align: center; font-size: 19px; font-weight: 800;
      }
      #organizeon-login .guest:hover { border-color: #a1a1aa; }
      #organizeon-login .guest-note {
        margin: 9px 0 0; color: #71717a; text-align: center; font-size: 12px;
      }
      #organizeon-login .message {
        min-height: 19px; margin: 14px 0 0;
        color: #fca5a5; font-size: 13px;
      }
    </style>
    <p class="login-loading" role="status">Carregando acesso…</p>
    <form autocomplete="on" hidden>
      <h1>Acesso privado</h1>
      <p>Entre no OrganizeOn para continuar.</p>
      <div class="password-fields">
        <label for="organizeon-username">Usuário</label>
        <input id="organizeon-username" name="username" autocomplete="username" required>
        <label for="organizeon-password">Senha</label>
        <input id="organizeon-password" name="password" type="password"
               autocomplete="current-password" required>
      </div>
      <div class="code-fields" hidden>
        <label for="organizeon-code">Código de login</label>
        <input class="code-input" id="organizeon-code" name="loginCode"
               maxlength="6" pattern="[A-Za-z0-9]{6}" autocomplete="one-time-code">
      </div>
      <button type="submit">Entrar</button>
      <button class="register" type="button">Registrar</button>
      <button class="code-toggle" type="button">Usar código de login</button>
      <button class="guest" type="button">Continuar como convidado</button>
      <p class="guest-note">Acesso convidado com recursos limitados</p>
      <div class="message" role="status" aria-live="polite"></div>
    </form>
  `;

  document.body.appendChild(wrapper);
  setMessage(message);

  const form = wrapper.querySelector("form");
  const loading = wrapper.querySelector(".login-loading");
  let fallbackShown = false;
  let pendingHost = null;
  let pendingCleanup = null;
  const showFallback = () => {
    if (fallbackShown || !wrapper.isConnected) return;
    fallbackShown = true;
    pendingCleanup?.();
    pendingHost?.remove();
    loading.remove();
    form.hidden = false;
  };
  const loginLoadTimeout = window.setTimeout(showFallback, 12000);
  const button = wrapper.querySelector('button[type="submit"]');
  const guestButton = wrapper.querySelector(".guest");
  const registerButton = wrapper.querySelector(".register");
  const codeToggle = wrapper.querySelector(".code-toggle");
  const passwordFields = wrapper.querySelector(".password-fields");
  const codeFields = wrapper.querySelector(".code-fields");
  let loginWithCode = false;
  let registrationMode = false;
  registerButton.addEventListener("click", () => {
    registrationMode = !registrationMode;
    loginWithCode = false;
    passwordFields.hidden = false;
    codeFields.hidden = true;
    form.elements.username.required = true;
    form.elements.password.required = true;
    form.elements.loginCode.required = false;
    wrapper.querySelector("h1").textContent = registrationMode
      ? "Criar conta"
      : "Acesso privado";
    button.textContent = registrationMode ? "Criar conta" : "Entrar";
    registerButton.textContent = registrationMode
      ? "Já tenho uma conta"
      : "Registrar";
    codeToggle.hidden = registrationMode;
    setMessage(registrationMode
      ? "A conta começa sem permissões. Um administrador pode liberá-las depois."
      : "");
  });
  codeToggle.addEventListener("click", () => {
    loginWithCode = !loginWithCode;
    passwordFields.hidden = loginWithCode;
    codeFields.hidden = !loginWithCode;
    form.elements.username.required = !loginWithCode;
    form.elements.password.required = !loginWithCode;
    form.elements.loginCode.required = loginWithCode;
    codeToggle.textContent = loginWithCode
      ? "Usar usuário e senha"
      : "Usar código de login";
    (loginWithCode ? form.elements.loginCode : form.elements.username).focus();
  });
  guestButton.addEventListener("click", async () => {
    button.disabled = true;
    guestButton.disabled = true;
    localStorage.removeItem(tokenStorageKey);
    localStorage.setItem(guestStorageKey, "1");
    await startGuestApplication();
  });
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
      const response = await apiRequest(
        registrationMode ? "/auth/register" : "/auth/login",
        {
        method: "POST",
        body: JSON.stringify(registrationMode
          ? {
              username: form.elements.username.value,
              password: form.elements.password.value,
            }
          : loginWithCode
          ? { loginCode: form.elements.loginCode.value }
          : {
              username: form.elements.username.value,
              password: form.elements.password.value,
            }),
        },
      );
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.token) {
        if (response.status === 429) {
          throw new Error("Muitas tentativas. Aguarde 15 minutos.");
        }
        throw new Error(
          registrationMode
            ? ({
                username_exists: "Esse usuário já existe.",
                invalid_username: "Use de 3 a 32 letras, números, ponto, hífen ou sublinhado.",
              })[result.error] || "Não foi possível criar a conta. Use uma senha com pelo menos 8 caracteres."
            : loginWithCode
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
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível conectar ao servidor.",
      );
    } finally {
      button.disabled = false;
      button.textContent = registrationMode ? "Criar conta" : "Entrar";
    }
  });

  const uiBase = new URL(window.__groveBase || "./", document.baseURI);
  const script = new URL("ui-dist/client-ui.js?v=runtime-6c57f9e998b24962", uiBase);
  const stylesheet = new URL("ui-dist/client-ui.css?v=runtime-6c57f9e998b24962", uiBase);
  const version = window.__ORGANIZEON_CLIENT_VERSION__ || CLIENT_UI_REVISION;
  if (version) { script.searchParams.set("v", version); stylesheet.searchParams.set("v", version); }
  void import(script.href).then((module) => {
    if (!wrapper.isConnected || fallbackShown) return;
    const host = document.createElement("div");
    pendingHost = host;
    host.style.cssText = "position:fixed;inset:0;z-index:2147483647;visibility:hidden";
    wrapper.appendChild(host);
    const cleanup = module.mountClientSurface(host, {
      type: "login", initialMessage: message,
      onGuest: async () => {
        localStorage.removeItem(tokenStorageKey);
        localStorage.setItem(guestStorageKey, "1");
        await startGuestApplication();
      },
      onSubmit: async ({ mode, username, password, loginCode }) => {
        const response = await apiRequest(mode === "register" ? "/auth/register" : "/auth/login", {
          method: "POST",
          body: JSON.stringify(mode === "code" ? { loginCode } : { username, password }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.token) {
          if (response.status === 429) throw new Error("Muitas tentativas. Aguarde 15 minutos.");
          if (mode === "register") throw new Error(({ username_exists: "Esse usuário já existe.", invalid_username: "Use de 3 a 32 letras, números, ponto, hífen ou sublinhado." })[result.error] || "Não foi possível criar a conta. Use uma senha com pelo menos 8 caracteres.");
          throw new Error(mode === "code" ? "Código inválido, expirado ou já utilizado." : "Usuário ou senha inválidos.");
        }
        localStorage.setItem(tokenStorageKey, result.token);
        localStorage.removeItem(guestStorageKey);
        scheduleExpiration(result.expiresAt);
        await startApplication(result.token, result.account);
      },
    }, stylesheet.href);
    pendingCleanup = cleanup;
    const link = host.shadowRoot.querySelector('link[rel="stylesheet"]');
    link.addEventListener("load", () => { window.clearTimeout(loginLoadTimeout); host.style.visibility = "visible"; loading.remove(); }, { once: true });
    link.addEventListener("error", () => { window.clearTimeout(loginLoadTimeout); showFallback(); }, { once: true });
  }).catch((error) => { window.clearTimeout(loginLoadTimeout); showFallback(); console.error("Falha ao carregar a tela de login:", error); });
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
