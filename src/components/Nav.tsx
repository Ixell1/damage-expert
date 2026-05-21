'use client';

import { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { SITE } from '@/data/site';

const LINKS = [
  { href: '#usluge', label: 'Usluge' },
  { href: '#dijagram', label: 'Delovi vozila' },
  { href: '#kalkulator', label: 'Kalkulator' },
  { href: '#prijava', label: 'Prijavi štetu' },
  { href: '#blog', label: 'Edukacija' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-brand-black/85 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-900'
          : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <a href="#top" aria-label="Damage Expert početna">
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors rounded-lg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange text-white text-sm font-semibold hover:bg-brand-orangeDark transition-colors shadow-lg shadow-brand-orange/30"
          >
            <Phone className="w-4 h-4" />
            <span>Pozovi</span>
          </a>
          <ThemeToggle />
          <button
            aria-label="Meni"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-brand-black">
          <nav className="container-x py-4 grid gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${SITE.phone}`}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-orange text-white font-semibold"
            >
              <Phone className="w-4 h-4" />
              {SITE.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
