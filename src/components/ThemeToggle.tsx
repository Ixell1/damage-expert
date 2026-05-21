'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('de-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('de-theme', next);
  };

  if (!mounted) {
    return (
      <button
        aria-label="Promeni temu"
        className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center"
      >
        <span className="sr-only">Tema</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Uključi svetlu temu' : 'Uključi tamnu temu'}
      className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:border-brand-orange transition-colors group"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-brand-orange group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-900 dark:text-white group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
