import { createContext, useContext, type PropsWithChildren } from "react";

export type PortalContainer = HTMLElement | ShadowRoot | null;
const PortalContext = createContext<PortalContainer>(null);

export function PortalContextProvider({ container, children }: PropsWithChildren<{ container: PortalContainer }>) {
  return <PortalContext.Provider value={container}>{children}</PortalContext.Provider>;
}

export function usePortalContainer() {
  return useContext(PortalContext);
}
