import { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { D2Login } from "@/components/client/d2-login";
import { api, post } from "./api";
import { Boundary } from "./boundary";
import { PortalContextProvider } from "@/components/ui/portal-context";
import "@/styles/ui.css";
import "./mail.css";
const MailShell = lazy(() => import("./shell"));
function App() {
  const [session, setSession] = useState<{
      username: string;
      role: string;
      authenticated: boolean;
    } | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    api("/session")
      .then((value) => {
        setSession(value);
        if (!value.authenticated && location.pathname != "/d4/login")
          location.replace("/d4/login");
        if (value.authenticated && location.pathname === "/d4/login")
          location.replace("/d4/");
      })
      .catch((e) => setError(e.message));
  }, []);
  if (error)
    return (
      <div role="alert" className="p-8">
        {error}
        <button onClick={() => location.reload()}>Tentar novamente</button>
      </div>
    );
  if (!session)
    return (
      <div className="grid min-h-svh place-items-center text-sm text-muted-foreground">
        Carregando acesso…
      </div>
    );
  if (!session.authenticated)
    return (
      <D2Login
        endpoint={4}
        label="E-mail"
        onSubmit={async (username, password) => {
          await api("/login", post({ username, password }));
          location.replace("/d4/");
        }}
      />
    );
  return (
    <Suspense fallback={<div className="p-8">Carregando e-mail…</div>}>
      <MailShell session={session} />
    </Suspense>
  );
}
const container = document.getElementById("root")!;
createRoot(container).render(
  <PortalContextProvider container={container}>
    <Boundary>
      <App />
    </Boundary>
  </PortalContextProvider>,
);
