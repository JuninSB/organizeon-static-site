const config = window.__ORGANIZEON_CONFIG__;
const tokenKey = "organizeon-access-token";
const state = {
  account: null,
  permissions: [],
  monitoring: null,
  monitorSocket: null,
  terminal: null,
};

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});
document.getElementById("main-link").addEventListener("click", () => {
  if (window.parent !== window) {
    window.parent.postMessage({ type: "organizeon:open-main" }, "*");
    return;
  }
  window.location.href = new URL("./", document.baseURI).href;
});
document
  .getElementById("monitor-toggle")
  .addEventListener("click", toggleMonitoring);
document
  .getElementById("monitor-activate")
  .addEventListener("click", toggleMonitoring);
document
  .getElementById("create-user")
  .addEventListener("click", openCreateUser);
document
  .getElementById("user-form")
  .addEventListener("submit", createUser);
document.querySelector(".cancel-dialog").addEventListener("click", () => {
  document.getElementById("user-dialog").close();
});
document
  .getElementById("terminal-connect")
  .addEventListener("click", connectTerminal);
document
  .getElementById("terminal-disconnect")
  .addEventListener("click", disconnectTerminal);
document
  .getElementById("terminal-form")
  .addEventListener("submit", sendTerminalCommand);
window.addEventListener("resize", () => {
  if (state.monitoring?.active) renderCharts(state.monitoring.history);
});

initialize().catch((error) => {
  console.error(error);
  showToast(
    error.message === "forbidden"
      ? "Esta conta não possui acesso ao Dashboard."
      : "Não foi possível conectar ao servidor.",
    0,
  );
});

async function initialize() {
  const response = await api("/admin/status");
  if (response.status === 401 || response.status === 403) {
    throw new Error("forbidden");
  }
  const result = await response.json();
  state.account = result.account;
  state.monitoring = result.monitoring;
  document.getElementById("account-name").textContent =
    result.account.username;
  document.getElementById("account-role").textContent =
    result.account.role === "admin" ? "Administrador" : "Usuário";

  document.querySelectorAll("[data-permission]").forEach((button) => {
    button.hidden = !result.account.permissions.includes(
      button.dataset.permission,
    );
  });
  document.getElementById("monitor-toggle").hidden =
    !result.account.permissions.includes("admin.monitoring");
  document.getElementById("monitor-activate").hidden =
    !result.account.permissions.includes("admin.monitoring");
  renderMonitoring(result.monitoring);
}

function showView(name) {
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.id !== `view-${name}`;
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === name);
  });
  if (name === "users") loadUsers();
}

async function toggleMonitoring() {
  if (state.monitorSocket) {
    disconnectMonitoring();
    return;
  }
  connectMonitoring();
}

function renderMonitoring(monitoring) {
  state.monitoring = monitoring;
  document.getElementById("monitoring-off").hidden = monitoring.active;
  document.getElementById("monitoring-content").hidden = !monitoring.active;
  const toggle = document.getElementById("monitor-toggle");
  toggle.textContent = state.monitorSocket
    ? "Stop monitoring"
    : monitoring.active
      ? "Join monitoring"
      : "Activate monitoring";
  toggle.classList.toggle("danger", Boolean(state.monitorSocket));
  toggle.classList.toggle("primary", !state.monitorSocket);
  if (!monitoring.active) return;

  document.getElementById("cpu-value").textContent =
    `${monitoring.cpu.percent.toFixed(1)}%`;
  document.getElementById("cpu-detail").textContent =
    `${monitoring.cpu.cores} cores · ${monitoring.cpu.model}`;
  document.getElementById("ram-value").textContent =
    `${monitoring.ram.percent.toFixed(1)}%`;
  document.getElementById("ram-detail").textContent =
    `${formatBytes(monitoring.ram.usedBytes)} / ${formatBytes(monitoring.ram.totalBytes)}`;
  document.getElementById("rpm-value").textContent =
    monitoring.requests.perMinute;
  document.getElementById("request-detail").textContent =
    `${monitoring.requests.averageResponseMs.toFixed(1)} ms médio · ${monitoring.requests.errorsFiveMinutes} erros`;
  document.getElementById("uptime-value").textContent =
    formatDuration(monitoring.uptimeSeconds);
  document.getElementById("process-detail").textContent =
    `Node RSS ${formatBytes(monitoring.ram.processRssBytes)} · ${monitoring.viewers || 1} viewer(s)`;
  renderCharts(monitoring.history);
}

function connectMonitoring() {
  const token = localStorage.getItem(tokenKey);
  const base =
    `${config.apiOrigin.replace(/^http/, "ws")}` +
    `${config.apiPrefix}/monitoring/`;
  const url = token ? `${base}${encodeURIComponent(token)}/` : base;
  const socket = new WebSocket(url);
  state.monitorSocket = socket;
  renderMonitoring(
    state.monitoring || {
      active: false,
      history: [],
    },
  );

  socket.addEventListener("message", (event) => {
    try {
      renderMonitoring(JSON.parse(event.data));
    } catch {
      showToast("Snapshot de monitoramento inválido.");
    }
  });
  socket.addEventListener("close", () => {
    if (state.monitorSocket !== socket) return;
    state.monitorSocket = null;
    renderMonitoring({
      ...state.monitoring,
      active: false,
      viewers: 0,
      history: [],
    });
  });
  socket.addEventListener("error", () => {
    if (state.monitorSocket === socket) {
      showToast("Não foi possível ativar o monitoramento.");
    }
  });
}

function disconnectMonitoring() {
  const socket = state.monitorSocket;
  state.monitorSocket = null;
  socket?.close(1000, "Monitoring disabled");
  renderMonitoring({
    ...state.monitoring,
    active: false,
    viewers: 0,
    history: [],
  });
}

function renderCharts(history) {
  drawChart(
    document.getElementById("resource-chart"),
    history,
    [
      { key: "cpuPercent", color: "#5df0c8" },
      { key: "ramPercent", color: "#39c9ef" },
    ],
    100,
  );
  drawChart(
    document.getElementById("request-chart"),
    history,
    [{ key: "requestsPerMinute", color: "#67e8d1" }],
    Math.max(5, ...history.map((point) => point.requestsPerMinute)),
  );
}

function drawChart(canvas, history, series, maximum) {
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(280, canvas.clientWidth);
  const height = 220;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const context = canvas.getContext("2d");
  context.scale(ratio, ratio);
  context.clearRect(0, 0, width, height);
  context.strokeStyle = "rgba(148,255,226,.09)";
  context.lineWidth = 1;
  for (let line = 0; line <= 4; line += 1) {
    const y = 10 + (line * (height - 25)) / 4;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  if (history.length < 2) return;
  for (const item of series) {
    context.beginPath();
    context.strokeStyle = item.color;
    context.lineWidth = 2;
    history.forEach((point, index) => {
      const x = (index / Math.max(1, history.length - 1)) * width;
      const y =
        height - 12 - (Math.min(maximum, point[item.key]) / maximum) * (height - 30);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
  }
}

async function loadUsers() {
  const response = await api("/admin/users");
  if (!response.ok) return showToast("Não foi possível carregar as contas.");
  const result = await response.json();
  state.permissions = result.permissions;
  renderPermissionChecks();
  renderUsers(result.users);
}

function renderUsers(users) {
  const body = document.getElementById("users-body");
  body.replaceChildren();
  for (const user of users) {
    const row = document.createElement("tr");
    const identity = document.createElement("td");
    const name = document.createElement("strong");
    name.textContent = user.username;
    identity.append(name);
    if (user.username === state.account.username) {
      identity.append(document.createTextNode(" (você)"));
    }

    const roleCell = document.createElement("td");
    const role = document.createElement("select");
    role.innerHTML =
      '<option value="user">User</option><option value="admin">Admin</option>';
    role.value = user.role;
    roleCell.append(role);

    const permissionsCell = document.createElement("td");
    const permissions = document.createElement("div");
    permissions.className = "permissions";
    const permissionInputs = state.permissions.map((permission) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = permission;
      input.checked = user.permissions.includes(permission);
      input.disabled = user.role === "admin";
      const caption = document.createElement("small");
      caption.textContent = permission;
      label.append(input, caption);
      permissions.append(label);
      return input;
    });
    permissionsCell.append(permissions);

    const statusCell = document.createElement("td");
    const disabled = document.createElement("input");
    disabled.type = "checkbox";
    disabled.checked = user.disabled;
    disabled.title = "Conta desativada";
    statusCell.append(disabled, document.createTextNode(" Desativada"));

    const actions = document.createElement("td");
    const save = button("Salvar", "button");
    const remove = button("Excluir", "button danger");
    remove.disabled = user.username === state.account.username;
    role.addEventListener("change", () => {
      permissionInputs.forEach((input) => {
        input.disabled = role.value === "admin";
        if (role.value === "admin") input.checked = true;
      });
    });
    save.addEventListener("click", async () => {
      const response = await api(
        `/admin/users/${encodeURIComponent(user.username)}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            role: role.value,
            disabled: disabled.checked,
            permissions: permissionInputs
              .filter((input) => input.checked)
              .map((input) => input.value),
          }),
        },
      );
      if (response.ok) {
        showToast("Conta atualizada.");
        loadUsers();
      } else {
        showToast(await apiError(response));
      }
    });
    remove.addEventListener("click", async () => {
      if (!window.confirm(`Excluir a conta ${user.username}?`)) return;
      const response = await api(
        `/admin/users/${encodeURIComponent(user.username)}`,
        { method: "DELETE" },
      );
      if (response.ok) {
        showToast("Conta excluída.");
        loadUsers();
      } else {
        showToast(await apiError(response));
      }
    });
    actions.append(save, document.createTextNode(" "), remove);
    row.append(identity, roleCell, permissionsCell, statusCell, actions);
    body.append(row);
  }
}

function renderPermissionChecks() {
  const container = document.getElementById("permission-checks");
  container.replaceChildren();
  for (const permission of state.permissions) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "permissions";
    input.value = permission;
    input.checked = permission === "proxy.use";
    label.append(input, document.createTextNode(permission));
    container.append(label);
  }
}

function openCreateUser() {
  document.getElementById("user-form").reset();
  renderPermissionChecks();
  document.getElementById("user-dialog").showModal();
}

async function createUser(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const response = await api("/admin/users", {
    method: "POST",
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
      role: formData.get("role"),
      permissions: formData.getAll("permissions"),
    }),
  });
  if (!response.ok) return showToast(await apiError(response));
  document.getElementById("user-dialog").close();
  showToast("Conta criada.");
  loadUsers();
}

function connectTerminal() {
  disconnectTerminal();
  const token = localStorage.getItem(tokenKey);
  const base =
    `${config.apiOrigin.replace(/^http/, "ws")}` +
    `${config.apiPrefix}/terminal/`;
  const url = token ? `${base}${encodeURIComponent(token)}/` : base;
  const socket = new WebSocket(url);
  state.terminal = socket;
  setTerminalStatus("Conectando…");
  appendTerminal("Conectando ao terminal seguro…\n");
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "terminal-ready") {
      setTerminalStatus(`Conectado · ${message.shell}`);
      document.getElementById("terminal-input").disabled = false;
      appendTerminal(`Sessão iniciada como ${message.username}.\n`);
    } else if (message.type === "output") {
      appendTerminal(stripAnsi(message.data));
    } else if (message.type === "error") {
      appendTerminal(`Erro: ${message.message}\n`);
    } else if (message.type === "exit") {
      appendTerminal(`\nShell encerrado (${message.code ?? message.signal}).\n`);
    }
  });
  socket.addEventListener("close", () => {
    setTerminalStatus("Desconectado");
    document.getElementById("terminal-input").disabled = true;
    if (state.terminal === socket) state.terminal = null;
  });
  socket.addEventListener("error", () => {
    appendTerminal("Falha ao conectar ao terminal.\n");
  });
}

function disconnectTerminal() {
  if (state.terminal?.readyState < WebSocket.CLOSING) {
    state.terminal.close(1000, "Admin disconnected");
  }
  state.terminal = null;
  document.getElementById("terminal-input").disabled = true;
  setTerminalStatus("Desconectado");
}

function sendTerminalCommand(event) {
  event.preventDefault();
  const input = document.getElementById("terminal-input");
  if (state.terminal?.readyState !== WebSocket.OPEN || !input.value) return;
  appendTerminal(`$ ${input.value}\n`);
  state.terminal.send(
    JSON.stringify({ type: "input", data: `${input.value}\n` }),
  );
  input.value = "";
}

function appendTerminal(text) {
  const output = document.getElementById("terminal-output");
  output.textContent += text;
  if (output.textContent.length > 250000) {
    output.textContent = output.textContent.slice(-180000);
  }
  output.scrollTop = output.scrollHeight;
}

function setTerminalStatus(text) {
  document.getElementById("terminal-status").textContent = text;
}

function api(path, options = {}) {
  const token = localStorage.getItem(tokenKey);
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

async function apiError(response) {
  const result = await response.json().catch(() => ({}));
  const messages = {
    username_exists: "Esse nome de usuário já existe.",
    invalid_username: "Nome de usuário inválido.",
    invalid_role: "Tipo de conta inválido.",
    invalid_permissions: "Permissões inválidas.",
    last_admin: "Não é possível remover o último administrador.",
    cannot_delete_current_user: "Você não pode excluir a própria conta.",
    forbidden: "Permissão insuficiente.",
  };
  return messages[result.error] || `Erro HTTP ${response.status}.`;
}

function showToast(message, autoHide = 2600) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toast.timer);
  if (autoHide > 0) {
    toast.timer = window.setTimeout(() => {
      toast.hidden = true;
    }, autoHide);
  }
}

function button(label, className) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = className;
  element.textContent = label;
  return element;
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit > 1 ? 1 : 0)} ${units[unit]}`;
}

function formatDuration(seconds) {
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)}h`;
  return `${(seconds / 86400).toFixed(1)}d`;
}

function stripAnsi(value) {
  return value.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001B\u009B][[\]()#;?]*(?:(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d/#&.:=?%@~_]+)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))/g,
    "",
  );
}
