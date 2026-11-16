import { useLayoutEffect, useRef, useState } from 'react';
export function useServiceTheme(key: string) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return localStorage.getItem(key) === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });
  useLayoutEffect(() => {
    const root = rootRef.current?.closest('.organizeon-ui');
    if (!root) return;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem(key, theme); } catch { /* Theme still works without storage. */ }
  }, [key, theme]);
  return { rootRef, theme, toggleTheme: () => setTheme(value => value === 'dark' ? 'light' : 'dark') };
}
