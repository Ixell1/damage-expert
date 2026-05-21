'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';
import { INSURANCE_PARTNERS } from '@/data/site';

export default function Authority() {
  // Duplicate for seamless marquee
  const items = [...INSURANCE_PARTNERS, ...INSURANCE_PARTNERS];

  return (
    <section className="relative py-10 md:py-12 border-y border-neutral-200 dark:border-neutral-900 bg-neutral-50/60 dark:bg-brand-ink/40">
      <div className="container-x">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="inline-flex w-9 h-9 rounded-full bg-brand-orange/15 items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-semibold">
                Saradnja sa osiguranjima
              </div>
              <div className="font-display font-bold text-neutral-900 dark:text-white">
                Procena prihvatljiva za osiguravajuća društva
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Star className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
            <span>
              Trenutni partner: <strong className="text-neutral-900 dark:text-white">Globos osiguranje</strong>
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-50 dark:from-brand-ink to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-50 dark:from-brand-ink to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex gap-3 w-[200%]">
            {items.map((p, i) => (
              <motion.div
                key={`${p.name}-${i}`}
                whileHover={{ scale: 1.04 }}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border ${
                  p.status === 'partner'
                    ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/30'
                    : 'bg-white dark:bg-brand-ink border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    p.status === 'partner' ? 'bg-white' : 'bg-neutral-400 dark:bg-neutral-600'
                  }`}
                />
                <span className="text-sm font-semibold whitespace-nowrap">{p.name}</span>
                {p.status === 'partner' && (
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-90">
                    Aktivan
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-neutral-500 dark:text-neutral-400 text-center">
          Cilj 2026: proširenje saradnje sa svim glavnim osiguravajućim kućama u Srbiji.
        </div>
      </div>
    </section>
  );
}
