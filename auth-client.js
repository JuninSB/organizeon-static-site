const config = window.__ORGANIZEON_CONFIG__;
const tokenStorageKey = "organizeon-access-token";
let appStarted = false;
let controlSocket = null;
let controlReady = false;
let controlReconnectTimer = null;
let controlReconnectAttempts = 0;
let maintainControlConnection = false;

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

  const wispBase =
    `${config.apiOrigin.replace(/^http/, "ws")}${config.apiPrefix}/wisp/`;
  window.__FERN_WISP_URL__ = token
    ? `${wispBase}${encodeURIComponent(token)}/`
    : wispBase;

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
        ? "Proxy autenticado e ativos essenciais carregados."
        : "Ativos carregados; reconectando o proxy em segundo plano.",
      100,
      1800,
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
        1400,
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
  autoHideMs = 0,
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
        color: #70f2d0; font-size: 14px; font-weight: 750;
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
    <div class="title"></div>
    <div class="detail"></div>
    <div class="bar"><span class="indeterminate"></span></div>
  `;
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
      #organizeon-account-navigation .badge {
        margin-left: auto; padding: 3px 8px; border-radius: 99px;
        color: #73ecca; background: rgba(79,235,199,.12); font-size: 10px;
      }
    </style>
    <button class="trigger" type="button" aria-label="Abrir menu">
      <span class="glyph"><i></i><i></i><i></i><i></i></span>
    </button>
    <aside class="drawer">
      <div class="account">
        <strong></strong>
        <span></span>
      </div>
      <button class="item main" type="button">⌂ <span>Main</span></button>
      <button class="item settings" type="button">⚙ <span>Settings</span></button>
      ${
        canOpenDashboard
          ? '<button class="item dashboard" type="button">◫ <span>Dashboard</span><small class="badge">ADMIN</small></button>'
          : ""
      }
    </aside>
  `;
  navigation.querySelector(".account strong").textContent =
    normalized.username;
  navigation.querySelector(".account span").textContent =
    normalized.role === "admin" ? "Administrador" : "Usuário";
  navigation.querySelector(".trigger").addEventListener("click", () => {
    navigation.classList.toggle("open");
  });
  navigation.querySelector(".main").addEventListener("click", () => {
    navigation.classList.remove("open");
    if (window.parent !== window) {
      window.parent.postMessage({ type: "organizeon:open-main" }, "*");
      return;
    }
    window.location.href = new URL("./", document.baseURI).href;
  });
  navigation.querySelector(".settings").addEventListener("click", () => {
    navigation.classList.remove("open");
    const settingsUrl = new URL("./", document.baseURI);
    settingsUrl.searchParams.set("route", "/settings");
    window.location.href = settingsUrl.href;
  });
  navigation
    .querySelector(".dashboard")
    ?.addEventListener("click", () => {
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: "organizeon:open-dashboard" },
          "*",
        );
      } else {
        const dashboardUrl = new URL("./", document.baseURI);
        dashboardUrl.searchParams.set("dashboard", "1");
        window.open(dashboardUrl.href, "_blank", "noopener");
      }
      navigation.classList.remove("open");
    });
  document.body.appendChild(navigation);
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
    window.location.reload();
  }, delay);
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
      window.location.reload();
    }
  },
});
