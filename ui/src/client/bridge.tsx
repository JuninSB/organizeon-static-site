import { configureAccountTransport } from "@/services/account-api";
import { afterStyles } from "@/lib/style-ready";
import { ConnectionStatus } from "@/components/client/connection-status";
import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import type { ComponentProps, ReactNode } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ClientSurface, type SurfaceProps } from "@/components/client/surfaces";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortalContextProvider } from "@/components/ui/portal-context";
import "@/styles/ui.css";
import { GameCard, type GameCardData } from "@/components/client/game-card";
import {
  CatalogToolbar,
  type CatalogToolbarProps,
} from "@/components/client/catalog-toolbar";
import {
  ConfirmActionDialog,
  GameControlSettingsDialog,
  GameCreditsDialog,
} from "@/components/client/game-dialogs";
import {
  PreferenceCard,
  type PreferenceCardProps,
} from "@/components/client/preference-card";
import { D2Login } from "@/components/client/d2-login";
import { D2Dashboard } from "@/components/client/d2-dashboard";

type ClientMount = {
  root: Root;
  shadow: ShadowRoot;
  container: HTMLDivElement;
};
const mounts = new WeakMap<HTMLElement, ClientMount>();
const inlineMounts = new WeakMap<HTMLElement, Root>();
const preferenceMounts = new WeakMap<HTMLElement, Root>();

function ensureDocumentStylesheet(href: string, host?: HTMLElement) {
  const tree = host?.getRootNode();
  const scope = tree instanceof ShadowRoot ? tree : document;
  const existing = scope.querySelector<HTMLLinkElement>(
    'link[data-organizeon-ui="client"]',
  );
  if (existing) return existing;
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = href;
  stylesheet.dataset.organizeonUi = "client";
  if (scope instanceof ShadowRoot) scope.append(stylesheet);
  else document.head.append(stylesheet);
  return stylesheet;
}

export function mountGameCard(
  host: HTMLElement,
  game: GameCardData,
  stylesheetHref: string,
) {
  inlineMounts.get(host)?.unmount();
  ensureDocumentStylesheet(stylesheetHref, host);
  const root = createRoot(host);
  let current=game;
  const render=()=>flushSync(()=>root.render(<div className="organizeon-ui dark min-h-full"><GameCard game={current}/></div>));
  render();inlineMounts.set(host,root);
  return {update:(patch:Partial<GameCardData>)=>{current={...current,...patch};render();}};
}

export function unmountGameCard(host: HTMLElement) {
  inlineMounts.get(host)?.unmount();
  inlineMounts.delete(host);
}

export function mountCatalogToolbar(
  host: HTMLElement,
  props: CatalogToolbarProps,
  stylesheetHref: string,
) {
  ensureDocumentStylesheet(stylesheetHref, host);
  const root = createRoot(host);
  const render = (next: CatalogToolbarProps) =>
    flushSync(() =>
      root.render(
        <div className="organizeon-ui organizeon-inline-ui dark">
          <CatalogToolbar {...next} />
        </div>,
      ),
    );
  render(props);
  return {
    update: (count: number, categories: string[]) =>
      render({ ...props, count, categories }),
    unmount: () => root.unmount(),
  };
}

export function mountPreferenceCard(
  host: HTMLElement,
  props: PreferenceCardProps,
  stylesheetHref: string,
) {
  preferenceMounts.get(host)?.unmount();
  ensureDocumentStylesheet(stylesheetHref, host);
  const root = createRoot(host);
  flushSync(() =>
    root.render(
      <div className="organizeon-ui organizeon-inline-ui dark">
        <PreferenceCard {...props} />
      </div>,
    ),
  );
  preferenceMounts.set(host, root);
}

export function unmountPreferenceCard(host: HTMLElement) {
  preferenceMounts.get(host)?.unmount();
  preferenceMounts.delete(host);
}

export function mountClientDialog(
  host: HTMLElement,
  dialog: ReactNode,
  stylesheetHref: string,
) {
  host.classList.add("organizeon-ui", "organizeon-overlay-root", "dark");
  const stylesheet = ensureDocumentStylesheet(stylesheetHref, host);
  const root = createRoot(host);
  const cancel = afterStyles(stylesheet, () =>
    flushSync(() =>
      root.render(
        <div className="organizeon-ui dark">
          <PortalContextProvider container={host}>
            {dialog}
          </PortalContextProvider>
        </div>,
      ),
    ),
  );
  return () => {
    cancel();
    root.unmount();
  };
}

export function mountGameCreditsDialog(
  host: HTMLElement,
  game: {
    name: string;
    attribution?: string;
    copyright?: string;
    license?: string;
    source?: string;
    sourceLabel?: string;
  },
  onClose: () => void,
  stylesheetHref: string,
) {
  return mountClientDialog(
    host,
    <GameCreditsDialog game={game} onClose={onClose} />,
    stylesheetHref,
  );
}

export function mountGameControlSettingsDialog(
  host: HTMLElement,
  props: {
    name: string;
    definitions: { label: string; code: string; key?: string }[];
    selectedKeys: string[];
    defaultKeys: string[];
    isTetris: boolean;
    initialLeftHanded: boolean;
    onClose: () => void;
    onSave: (keys: string[], leftHanded: boolean) => void;
    onFullscreen: () => void;
  },
  stylesheetHref: string,
) {
  return mountClientDialog(
    host,
    <GameControlSettingsDialog {...props} />,
    stylesheetHref,
  );
}

export function confirmClientAction(
  description: string,
  stylesheetHref: string,
  title = "Confirmar ação",
  confirmLabel = "Continuar",
) {
  return new Promise<boolean>((resolve) => {
    const host = document.createElement("div");
    host.className = "organizeon-ui dark";
    document.body.append(host);
    ensureDocumentStylesheet(stylesheetHref, host);
    const root = createRoot(host);
    let settled = false;
    const finish = (confirmed: boolean) => {
      if (settled) return;
      settled = true;
      root.unmount();
      host.remove();
      resolve(confirmed);
    };
    flushSync(() =>
      root.render(
        <PortalContextProvider container={host}>
          <ConfirmActionDialog
            title={title}
            description={description}
            confirmLabel={confirmLabel}
            onCancel={() => finish(false)}
            onConfirm={() => finish(true)}
          />
        </PortalContextProvider>,
      ),
    );
  });
}

export function mountClientSurface(
  host: HTMLElement,
  props: SurfaceProps,
  stylesheetHref: string,
) {
  mounts.get(host)?.root.unmount();
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  shadow.replaceChildren();
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = stylesheetHref;
  shadow.append(stylesheet);
  const container = document.createElement("div");
  container.className =
    props.type === "account"
      ? "organizeon-ui organizeon-overlay-root dark"
      : "organizeon-ui dark";
  shadow.append(container);
  const root = createRoot(container);
  root.render(
    <PortalContextProvider container={container}>
      <TooltipProvider>
        <ClientSurface {...props} />
      </TooltipProvider>
    </PortalContextProvider>,
  );
  mounts.set(host, { root, shadow, container });
  return () => {
    const mount = mounts.get(host);
    if (!mount) return;
    mount.root.unmount();
    mount.shadow.replaceChildren();
    mounts.delete(host);
  };
}

export function mountNavigation(
  host: HTMLElement,
  props: SurfaceProps,
  stylesheetHref: string,
) {
  const shadow = host.attachShadow({ mode: "open" });
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = stylesheetHref;
  const container = document.createElement("div");
  container.className = "organizeon-ui organizeon-overlay-root dark";
  shadow.append(stylesheet, container);
  const root = createRoot(container);
  const cancel = afterStyles(stylesheet, () =>
    flushSync(() =>
      root.render(
        <PortalContextProvider container={container}>
          <TooltipProvider>
            <ClientSurface {...props} />
          </TooltipProvider>
        </PortalContextProvider>,
      ),
    ),
  );
  return () => {
    cancel();
    root.unmount();
    shadow.replaceChildren();
  };
}

export function mountD2Login(
  host: HTMLElement,
  onSubmit: (username: string, password: string) => Promise<void>,
  stylesheetHref: string,
) {
  const shadow = host.attachShadow({ mode: "open" });
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = stylesheetHref;
  const container = document.createElement("div");
  container.className = "organizeon-ui dark";
  shadow.append(stylesheet, container);
  const root = createRoot(container);
  flushSync(() => root.render(<D2Login onSubmit={onSubmit} />));
  return () => {
    root.unmount();
    shadow.replaceChildren();
  };
}

export function mountD2Dashboard(
  host: HTMLElement,
  props: ComponentProps<typeof D2Dashboard>,
  stylesheetHref: string,
) {
  const shadow = host.attachShadow({ mode: "open" });
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = stylesheetHref;
  const container = document.createElement("div");
  container.className = "organizeon-ui dark";
  shadow.append(stylesheet, container);
  const releaseProfileTransport = configureAccountTransport((path, options) => {
    const headers: Record<string, string> = {};
    new Headers(options.headers).forEach((value, key) => {
      headers[key] = value;
    });
    return props.request(path, { ...options, headers });
  });
  const root = createRoot(container);
  flushSync(() =>
    root.render(
      <PortalContextProvider container={container}>
        <D2Dashboard {...props} />
      </PortalContextProvider>,
    ),
  );
  return () => {
    root.unmount();
    releaseProfileTransport();
    shadow.replaceChildren();
  };
}

export function mountClientToaster(host: HTMLElement, stylesheetHref: string) {
  mounts.get(host)?.root.unmount();
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  shadow.replaceChildren();
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = stylesheetHref;
  shadow.append(stylesheet);
  const container = document.createElement("div");
  container.className = "organizeon-ui organizeon-overlay-root dark";
  shadow.append(container);
  const root = createRoot(container);
  root.render(
    <PortalContextProvider container={container}>
      <Toaster
        position="bottom-right"
        theme="dark"
        closeButton
        expand
        gap={12}
        visibleToasts={5}
        richColors={false}
      />
    </PortalContextProvider>,
  );
  mounts.set(host, { root, shadow, container });
  return () => {
    root.unmount();
    shadow.replaceChildren();
    mounts.delete(host);
  };
}

export function showClientToast(
  message: string,
  kind: "success" | "error" | "info" | "loading" = "info",
  id?: string,
) {
  toast[kind](message, id ? { id } : undefined);
}

export function dismissClientToast(id?: string) {
  toast.dismiss(id);
}

/** One root per surface; updates preserve local selection and focus. */
export function mountReactiveSurface(
  host: HTMLElement,
  props: SurfaceProps,
  stylesheetHref: string,
) {
  const shadow = host.attachShadow({ mode: "open" });
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = stylesheetHref;
  const loading = document.createElement("div");
  loading.textContent = "Carregando interface…";
  loading.style.cssText =
    "display:grid;place-items:center;min-height:100svh;background:#09090b;color:#a1a1aa;font:14px system-ui";
  const container = document.createElement("div");
  container.className = "organizeon-ui dark";
  shadow.append(link, loading, container);
  const root = createRoot(container);
  let ready = false;
  let current = props;
  const update = (next: SurfaceProps) => {
    current = next;
    if (ready)
      flushSync(() =>
        root.render(
          <PortalContextProvider container={container}>
            <TooltipProvider>
              <ClientSurface {...current} />
            </TooltipProvider>
          </PortalContextProvider>,
        ),
      );
  };
  const cancel = afterStyles(link, () => {
    ready = true;
    loading.remove();
    update(current);
  });
  link.addEventListener(
    "error",
    () => {
      loading.textContent =
        "Não foi possível carregar os estilos da interface.";
    },
    { once: true },
  );
  return {
    update,
    unmount: () => {
      cancel();
      root.unmount();
      shadow.replaceChildren();
    },
  };
}
export function showConnectionToast(
  title: string,
  detail: string,
  percent: number | null,
  duration: number,
) {
  toast.custom(
    (id) => (
      <ConnectionStatus
        title={title}
        detail={detail}
        percent={percent}
        onClose={() => toast.dismiss(id)}
      />
    ),
    { id: "connection-status", duration: duration > 0 ? duration : Infinity },
  );
}
