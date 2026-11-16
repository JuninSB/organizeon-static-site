import { useLayoutEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { createPath, Router, type Navigator, type To } from 'react-router-dom';

const tabs: Record<string, string> = { '/': 'estado', '/history': 'historico', '/logs': 'eventos', '/settings': 'configuracoes' };
export function publicHref(to: To): string {
  const path = typeof to === 'string' ? to : createPath(to);
  if (path === '/login') return '/d3/login';
  const route = path.split(/[?#]/)[0];
  return route === '/' ? '/d3' : `/d3#${tabs[route] || 'estado'}`;
}
function readLocation() {
  const hash = window.location.hash.replace(/^#(?:tab\/)?/, '');
  const tab = Object.entries(tabs).find(([, value]) => value === hash)?.[0];
  const pathname = window.location.pathname.replace(/^\/d3\/?/, '/') || '/';
  return { pathname: pathname === '/login' ? '/login' : tab || pathname, search: '', hash: '', state: window.history.state, key: 'default' };
}
/** Login has its own pathname; authenticated screens share /d3 and use fragments. */
export function ServiceRouter({ children }: PropsWithChildren) {
  const [location, setLocation] = useState(readLocation);
  useLayoutEffect(() => {
    const sync = () => setLocation(readLocation());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, []);
  const navigator = useMemo<Navigator>(() => ({
    createHref: publicHref,
    go: delta => window.history.go(delta),
    push: (to, state) => { window.history.pushState(state, '', publicHref(to)); setLocation(readLocation()); },
    replace: (to, state) => { window.history.replaceState(state, '', publicHref(to)); setLocation(readLocation()); },
  }), []);
  return <Router location={location} navigator={navigator}>{children}</Router>;
}
