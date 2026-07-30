import { Terminal } from "./vendor/xterm.mjs";

const config = window.__ORGANIZEON_CONFIG__;
const tokenKey = "organizeon-access-token";
const dashboardMobile =
  window.matchMedia("(max-width: 700px)").matches ||
  navigator.userAgentData?.mobile === true ||
  /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
const state = {
  account: null,
  permissions: [],
  monitoring: null,
  monitorSocket: null,
  monitorRefreshPending: false,
  monitorRefreshStartedAt: 0,
  requestDomain: "all",
  logs: [],
  logSocket: null,
  logsPaused: false,
  terminal: null,
};
const terminalView = new Terminal({
  allowProposedApi: false,
  convertEol: true,
  cursorBlink: false,
  disableStdin: true,
  fontFamily:
    '"JetBrains Mono", "Fira Code", "Cascadia Mono", monospace',
  fontSize: dashboardMobile ? 10 : 13,
  lineHeight: dashboardMobile ? 1.15 : 1.25,
  scrollback: 5000,
  theme: {
    background: "#030807",
    foreground: "#d7e7e2",
    cursor: "#5df0c8",
    selectionBackground: "#285f53",
    black: "#1b2522",
    red: "#ff6b75",
    green: "#5df0a8",
    yellow: "#f2cf66",
    blue: "#68a7ff",
    magenta: "#d58cff",
    cyan: "#48d8e8",
    white: "#d7e7e2",
    brightBlack: "#65756f",
    brightRed: "#ff9298",
    brightGreen: "#8ff5c4",
    brightYellow: "#ffe08a",
    brightBlue: "#91bdff",
    brightMagenta: "#e4adff",
    brightCyan: "#82edf5",
    brightWhite: "#ffffff",
  },
});
let terminalOpened = false;
setupDashboardMobileMode();

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});
document.getElementById("back-link").addEventListener("click", () => {
  if (window.parent !== window) {
    window.parent.postMessage(
      { type: "organizeon:open-main", openSidebar: true },
      "*",
    );
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
  .getElementById("monitor-refresh")
  .addEventListener("click", refreshMonitoringRoutes);
document
  .getElementById("request-domain-select")
  .addEventListener("change", (event) => {
    state.requestDomain = event.currentTarget.value;
    if (state.monitoring) renderMonitoring(state.monitoring);
  });
document
  .getElementById("logs-pause")
  .addEventListener("click", toggleLogsPause);
document
  .getElementById("logs-clear")
  .addEventListener("click", () => {
    state.logs = [];
    renderLogs();
  });
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
  .getElementById("terminal-scroll-up")
  .addEventListener("click", () => terminalView.scrollLines(-12));
document
  .getElementById("terminal-scroll-down")
  .addEventListener("click", () => terminalView.scrollLines(12));
document
  .getElementById("terminal-scroll-bottom")
  .addEventListener("click", () => terminalView.scrollToBottom());
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
  if (name === "terminal") ensureTerminalOpen();
  if (name === "logs") connectLogs();
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
  renderServerFacts(monitoring);
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
  const refresh = document.getElementById("monitor-refresh");
  refresh.disabled =
    state.monitorSocket?.readyState !== WebSocket.OPEN ||
    state.monitorRefreshPending;
  refresh.textContent = state.monitorRefreshPending
    ? "↻ Atualizando…"
    : "↻ Atualizar";
  if (!monitoring.active) return;

  document.getElementById("cpu-value").textContent =
    `${monitoring.cpu.percent.toFixed(1)}%`;
  document.getElementById("cpu-detail").textContent =
    `${monitoring.cpu.cores} cores · ${monitoring.cpu.model}`;
  document.getElementById("ram-value").textContent =
    `${monitoring.ram.percent.toFixed(1)}%`;
  document.getElementById("ram-detail").textContent =
    `${formatBytes(monitoring.ram.usedBytes)} / ${formatBytes(monitoring.ram.totalBytes)}`;
  updateRequestDomainOptions(monitoring.requests);
  const requestStats = selectedRequestStats(monitoring.requests);
  document.getElementById("rpm-value").textContent =
    requestStats.perMinute;
  document.getElementById("request-detail").textContent =
    `${requestStats.totalSinceStart || 0} total · ${requestStats.trackedFiveMinutes} em 5 min · ${requestStats.averageResponseMs.toFixed(1)} ms médio`;
  document.getElementById("uptime-value").textContent =
    formatDuration(monitoring.uptimeSeconds);
  document.getElementById("process-detail").textContent =
    `Node RSS ${formatBytes(monitoring.ram.processRssBytes)} · ${monitoring.viewers || 1} viewer(s)`;
  renderCharts(monitoring.history);
}

function renderServerFacts(monitoring) {
  const service = monitoring.service || {};
  const requests = monitoring.requests || {};
  const domain = service.publicDomain || "Não configurado";
  const domainOnline = service.domainStatus === "online";
  document.getElementById("domain-value").textContent = domain;
  document.getElementById("domain-detail").innerHTML =
    `<span class="status-dot${domainOnline ? "" : " unverified"}"></span>` +
    (domainOnline
      ? `Online · visto ${formatRelativeTime(service.domainLastSeenAt)}`
      : "Ainda não recebeu tráfego por esse domínio");
  document.getElementById("service-status").textContent =
    service.status === "online" ? "Online" : "Indisponível";
  document.getElementById("service-detail").textContent =
    `${service.apiPrefix || config.apiPrefix} · ${(service.transports || ["HTTP", "WebSocket", "WISP"]).join(" / ")}`;
  const publicPort = service.publicPort || 443;
  const internalPort = service.internalPort || 5000;
  document.getElementById("ports-value").textContent =
    `${publicPort} / ${internalPort}`;
  document.getElementById("ports-detail").textContent =
    `HTTPS público ${publicPort} · origem TCP ${internalPort}`;
  document.getElementById("server-uptime-value").textContent =
    formatDuration(monitoring.uptimeSeconds || 0);
  document.getElementById("server-uptime-detail").textContent =
    `${requests.totalSinceStart || 0} requests · ${requests.webSocketUpgradesSinceStart || 0} WebSockets`;
  renderRoutes(service.routes || []);
}

function renderRoutes(routes) {
  const body = document.getElementById("routes-status-body");
  if (!routes.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "O backend ainda não informou as rotas.";
    row.append(cell);
    body.replaceChildren(row);
    return;
  }
  body.replaceChildren(
    ...routes.map((route) => {
      const row = document.createElement("tr");
      const serviceCell = document.createElement("td");
      serviceCell.textContent = route.label;
      if (route.used) {
        const badge = document.createElement("span");
        badge.className = "used-badge";
        badge.textContent = "em uso";
        serviceCell.append(badge);
      }
      const routeCell = document.createElement("td");
      const url = document.createElement("span");
      url.className = "route-url";
      url.textContent = route.url;
      url.title = route.url;
      const purpose = document.createElement("small");
      purpose.className = "route-purpose";
      purpose.textContent = route.purpose;
      routeCell.append(url, purpose);
      const statusCell = document.createElement("td");
      const status = document.createElement("span");
      status.className = `route-status ${route.status || "pending"}`;
      status.textContent = routeStatusLabel(route);
      statusCell.append(status);
      const responseCell = document.createElement("td");
      responseCell.textContent =
        route.statusCode === null || route.statusCode === undefined
          ? route.error || "—"
          : `HTTP ${route.statusCode} · ${route.latencyMs.toFixed(0)} ms`;
      row.append(serviceCell, routeCell, statusCell, responseCell);
      return row;
    }),
  );
}

function routeStatusLabel(route) {
  if (route.status === "online") return "Online";
  if (route.status === "offline") return "Offline";
  if (route.status === "unexpected") return "Resposta inesperada";
  return "Aguardando";
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
      const snapshot = JSON.parse(event.data);
      const newestRouteCheck = Math.max(
        0,
        ...(snapshot.service?.routes || []).map(
          (route) => new Date(route.checkedAt || 0).getTime() || 0,
        ),
      );
      if (newestRouteCheck >= state.monitorRefreshStartedAt) {
        state.monitorRefreshPending = false;
      }
      renderMonitoring(snapshot);
    } catch {
      showToast("Snapshot de monitoramento inválido.");
    }
  });
  socket.addEventListener("open", () => {
    renderMonitoring(state.monitoring);
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

function refreshMonitoringRoutes() {
  const socket = state.monitorSocket;
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  state.monitorRefreshPending = true;
  state.monitorRefreshStartedAt = Date.now();
  renderMonitoring(state.monitoring);
  socket.send(JSON.stringify({ type: "refresh-routes" }));
  window.setTimeout(() => {
    if (!state.monitorRefreshPending) return;
    state.monitorRefreshPending = false;
    state.monitorRefreshStartedAt = 0;
    renderMonitoring(state.monitoring);
    showToast("A atualização das rotas demorou mais que o esperado.");
  }, 6500);
}

function disconnectMonitoring() {
  const socket = state.monitorSocket;
  state.monitorSocket = null;
  state.monitorRefreshPending = false;
  state.monitorRefreshStartedAt = 0;
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
    history.map((point) => ({
      ...point,
      selectedRequestsPerMinute:
        state.requestDomain === "all"
          ? point.requestsPerMinute
          : point.requestsPerMinuteByDomain?.[state.requestDomain] || 0,
    })),
    [{ key: "selectedRequestsPerMinute", color: "#67e8d1" }],
    Math.max(
      5,
      ...history.map((point) =>
        state.requestDomain === "all"
          ? point.requestsPerMinute
          : point.requestsPerMinuteByDomain?.[state.requestDomain] || 0,
      ),
    ),
  );
}

function updateRequestDomainOptions(requests) {
  const select = document.getElementById("request-domain-select");
  const domains = (requests.byDomain || []).map((entry) => entry.domain);
  if (
    state.requestDomain !== "all" &&
    !domains.includes(state.requestDomain)
  ) {
    state.requestDomain = "all";
  }
  const expected = ["all", ...domains];
  const current = [...select.options].map((option) => option.value);
  if (expected.join("\0") !== current.join("\0")) {
    select.replaceChildren(
      ...expected.map((domain) => {
        const option = document.createElement("option");
        option.value = domain;
        option.textContent =
          domain === "all" ? "Todos os domínios" : domain;
        return option;
      }),
    );
  }
  select.value = state.requestDomain;
}

function selectedRequestStats(requests) {
  if (state.requestDomain === "all") return requests;
  return (
    (requests.byDomain || []).find(
      (entry) => entry.domain === state.requestDomain,
    ) || {
      perMinute: 0,
      trackedFiveMinutes: 0,
      totalSinceStart: 0,
      averageResponseMs: 0,
    }
  );
}

function connectLogs() {
  if (
    state.logSocket &&
    state.logSocket.readyState <= WebSocket.OPEN
  ) {
    return;
  }
  const token = localStorage.getItem(tokenKey);
  const base =
    `${config.apiOrigin.replace(/^http/, "ws")}` +
    `${config.apiPrefix}/logs/`;
  const url = token ? `${base}${encodeURIComponent(token)}/` : base;
  const socket = new WebSocket(url);
  state.logSocket = socket;
  document.getElementById("logs-status").textContent = "Conectando…";
  socket.addEventListener("open", () => {
    document.getElementById("logs-status").textContent =
      "Conectado · atualização em tempo real";
  });
  socket.addEventListener("message", (event) => {
    if (state.logsPaused) return;
    try {
      const message = JSON.parse(event.data);
      if (message.type === "snapshot") {
        state.logs = message.entries || [];
      } else if (message.type === "entry" && message.entry) {
        state.logs.push(message.entry);
        if (state.logs.length > 500) state.logs = state.logs.slice(-500);
      }
      renderLogs();
    } catch {
      showToast("Evento de log inválido.");
    }
  });
  socket.addEventListener("close", () => {
    if (state.logSocket === socket) state.logSocket = null;
    document.getElementById("logs-status").textContent = "Desconectado";
  });
  socket.addEventListener("error", () => {
    document.getElementById("logs-status").textContent =
      "Falha ao conectar";
  });
}

function toggleLogsPause() {
  state.logsPaused = !state.logsPaused;
  document.getElementById("logs-pause").textContent =
    state.logsPaused ? "Continuar" : "Pausar";
  document.getElementById("logs-status").textContent =
    state.logsPaused
      ? "Pausado localmente"
      : state.logSocket?.readyState === WebSocket.OPEN
        ? "Conectado · atualização em tempo real"
        : "Desconectado";
}

function renderLogs() {
  const list = document.getElementById("logs-list");
  if (!state.logs.length) {
    const empty = document.createElement("div");
    empty.className = "log-empty";
    empty.textContent = "Nenhum evento para mostrar.";
    list.replaceChildren(empty);
    return;
  }
  const nearBottom =
    list.scrollHeight - list.scrollTop - list.clientHeight < 80;
  list.replaceChildren(
    ...state.logs.map((entry) => {
      const row = document.createElement("div");
      row.className = "log-entry";
      const time = document.createElement("span");
      time.className = "log-time";
      time.textContent = new Date(entry.at).toLocaleTimeString("pt-BR");
      const direction = document.createElement("span");
      direction.className =
        `log-direction ${entry.direction === "sent" ? "sent" : ""}`;
      direction.textContent =
        entry.direction === "sent" ? "↑ ENVIO" : "↓ RECEB.";
      const channel = document.createElement("span");
      channel.className = "log-channel";
      channel.textContent = entry.channel || "—";
      const path = document.createElement("span");
      path.className = "log-path";
      path.textContent =
        `${entry.method || ""} ${entry.path || entry.message || ""}`.trim();
      path.title = entry.message || "";
      const meta = document.createElement("span");
      meta.className = "log-meta";
      meta.textContent = logMeta(entry);
      row.append(time, direction, channel, path, meta);
      return row;
    }),
  );
  if (nearBottom) list.scrollTop = list.scrollHeight;
}

function logMeta(entry) {
  const parts = [];
  if (entry.statusCode) parts.push(`HTTP ${entry.statusCode}`);
  if (Number.isFinite(entry.durationMs)) {
    parts.push(`${entry.durationMs.toFixed(0)} ms`);
  }
  if (entry.bytes) parts.push(formatBytes(entry.bytes));
  return parts.join(" · ") || "—";
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
  setTerminalConnectionState("connecting");
  setTerminalStatus("Conectando…");
  appendTerminal("\r\n\x1b[36mConectando ao terminal seguro…\x1b[0m\r\n");
  socket.addEventListener("message", (event) => {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      appendTerminal("\x1b[31mResposta inválida do servidor.\x1b[0m\r\n");
      return;
    }
    if (message.type === "terminal-ready") {
      setTerminalConnectionState("connected");
      setTerminalStatus(`Conectado · ${message.shell}`);
      document.getElementById("terminal-input").disabled = false;
      document.getElementById("terminal-input").focus();
      appendTerminal(
        `\x1b[32mSessão iniciada como ${message.username}.\x1b[0m\r\n`,
      );
    } else if (message.type === "output") {
      appendTerminal(message.data);
    } else if (message.type === "error") {
      appendTerminal(`\x1b[31mErro: ${message.message}\x1b[0m\r\n`);
    } else if (message.type === "exit") {
      appendTerminal(
        `\r\n\x1b[33mShell encerrado (${message.code ?? message.signal}).\x1b[0m\r\n`,
      );
    }
  });
  socket.addEventListener("close", (event) => {
    if (!socket.organizeonDisconnectMessageShown) {
      appendTerminal(
        `\r\n\x1b[33mConexão do terminal encerrada${event.reason ? `: ${event.reason}` : "."}\x1b[0m\r\n`,
      );
      socket.organizeonDisconnectMessageShown = true;
    }
    setTerminalConnectionState("disconnected");
    setTerminalStatus("Desconectado");
    document.getElementById("terminal-input").disabled = true;
    if (state.terminal === socket) state.terminal = null;
  });
  socket.addEventListener("error", () => {
    appendTerminal(
      "\x1b[31mFalha ao conectar ao terminal.\x1b[0m\r\n",
    );
  });
}

function disconnectTerminal() {
  const socket = state.terminal;
  if (socket?.readyState < WebSocket.CLOSING) {
    appendTerminal(
      "\r\n\x1b[33mTerminal desconectado pelo administrador.\x1b[0m\r\n",
    );
    socket.organizeonDisconnectMessageShown = true;
    socket.close(1000, "Admin disconnected");
  }
  state.terminal = null;
  document.getElementById("terminal-input").disabled = true;
  setTerminalConnectionState("disconnected");
  setTerminalStatus("Desconectado");
}

function sendTerminalCommand(event) {
  event.preventDefault();
  const input = document.getElementById("terminal-input");
  if (state.terminal?.readyState !== WebSocket.OPEN || !input.value) return;
  appendTerminal(`\x1b[38;5;244m$ ${input.value}\x1b[0m\r\n`);
  state.terminal.send(
    JSON.stringify({ type: "input", data: `${input.value}\n` }),
  );
  input.value = "";
}

function appendTerminal(text) {
  ensureTerminalOpen();
  terminalView.write(text);
}

function setTerminalStatus(text) {
  document.getElementById("terminal-status").textContent = text;
}

function setTerminalConnectionState(connectionState) {
  const connect = document.getElementById("terminal-connect");
  const disconnect = document.getElementById("terminal-disconnect");
  if (connectionState === "connecting") {
    connect.textContent = "Conectando…";
    connect.disabled = true;
    disconnect.hidden = false;
    return;
  }
  if (connectionState === "connected") {
    connect.textContent = "Terminal conectado ✓";
    connect.disabled = true;
    disconnect.hidden = false;
    return;
  }
  connect.textContent = "Conectar terminal";
  connect.disabled = false;
  disconnect.hidden = true;
}

function ensureTerminalOpen() {
  if (!terminalOpened) {
    terminalView.open(document.getElementById("terminal-output"));
    terminalOpened = true;
    terminalView.writeln(
      '\x1b[38;5;244mClique em “Conectar terminal” para iniciar.\x1b[0m',
    );
  }
  window.requestAnimationFrame(() => terminalView.refresh(0, 23));
}

function setupDashboardMobileMode() {
  if (!dashboardMobile) return;
  document.documentElement.classList.add("organizeon-mobile");
  window.setTimeout(() => showToast("Modo mobile ativado"), 50);
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

function showToast(message, autoHide = 8000) {
  const toast = document.getElementById("toast");
  toast.replaceChildren();
  const text = document.createElement("span");
  text.textContent = message;
  const close = document.createElement("button");
  close.type = "button";
  close.className = "toast-close";
  close.setAttribute("aria-label", "Fechar notificação");
  close.textContent = "×";
  close.addEventListener("click", () => {
    window.clearTimeout(toast.timer);
    toast.hidden = true;
  });
  toast.append(text, close);
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

function formatRelativeTime(value) {
  if (!value) return "agora";
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(value).getTime()) / 1000),
  );
  if (seconds < 10) return "agora";
  if (seconds < 60) return `há ${seconds}s`;
  return `há ${Math.floor(seconds / 60)}min`;
}
