const config = window.__ORGANIZEON_CONFIG__;
const tokenStorageKey = "organizeon-access-token";
let appStarted = false;

if (!config?.authenticationRequired) {
  startApplication();
} else {
  validateExistingSession();
}

async function validateExistingSession() {
  const token = localStorage.getItem(tokenStorageKey);

  try {
    const response = await apiRequest("/auth/session", { method: "GET" });
    if (!response.ok) throw new Error("session_expired");
    const session = await response.json();
    scheduleExpiration(session.expiresAt);
    await startApplication(token);
  } catch {
    localStorage.removeItem(tokenStorageKey);
    showLogin(token ? "Sua sessão expirou. Entre novamente." : "");
  }
}

async function startApplication(token = localStorage.getItem(tokenStorageKey)) {
  if (appStarted) return;
  appStarted = true;

  const wispBase =
    `${config.apiOrigin.replace(/^http/, "ws")}${config.apiPrefix}/wisp/`;
  window.__FERN_WISP_URL__ = token
    ? `${wispBase}${encodeURIComponent(token)}/`
    : wispBase;

  removeLogin();
  try {
    await import(config.appModule);
  } catch (error) {
    appStarted = false;
    console.error("Falha ao carregar o aplicativo:", error);
    showLogin("Não foi possível carregar o aplicativo. Tente novamente.");
  }
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
    setMessage("");

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
      await startApplication(result.token);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível conectar ao servidor.",
      );
    } finally {
      button.disabled = false;
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
    localStorage.removeItem(tokenStorageKey);
    window.location.reload();
  }, delay);
}

window.organizeonAuth = Object.freeze({
  async logout() {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } finally {
      localStorage.removeItem(tokenStorageKey);
      window.location.reload();
    }
  },
});
