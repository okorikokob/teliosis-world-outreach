"use client";
import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return 'system';
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  if (resolved === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>(() => getPreferredTheme());

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => { if (getPreferredTheme() === 'system') applyTheme('system'); };
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  function cycleTheme() {
    setTheme(prev => {
      const next: Theme = prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  const label = theme === 'light' ? 'Switch to dark mode' : theme === 'dark' ? 'Use system theme' : 'Switch to light mode';
  const icon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🖥️';

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className="btn-base btn-ghost h-8 w-8 p-0 text-lg leading-none"
    >
      <span aria-hidden>{icon}</span>
    </button>
  );
}
