'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { INSURANCE_PARTNERS } from '@/data/site';

export default function Authority() {
  // Globos je prvi (aktivan partner), ostali odmah za njim
  const ordered = [...INSURANCE_PARTNERS];
  // Duplicate for seamless marquee
  const items = [...ordered, ...ordered];

  return (
    <section className="relative py-10 md:py-12 border-y border-neutral-200 dark:border-neutral-900 bg-neutral-50/60 dark:bg-brand-ink/40">
      <div className="container-x">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex w-9 h-9 rounded-full bg-brand-orange/15 items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
          </span>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-semibold">
              Saradnja sa osiguranjima
            </div>
            <div className="font-display font-bold text-neutral-900 dark:text-white">
              Sarađujemo sa svim osiguravajućim kućama u Srbiji
            </div>
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
