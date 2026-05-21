'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Script from 'next/script';
import { FAQ } from '@/data/faq';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section id="faq" className="section">
      <Script
        id="faq-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
              Česta pitanja
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
              Sve što biste me pitali na <span className="text-brand-orange">prvom pozivu</span>.
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-pretty">
              Ako Vam treba nešto specifično za Vaš slučaj, kontaktirajte me direktno — prva
              konsultacija je besplatna.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-2">
            {FAQ.map((f, i) => (
              <div
                key={i}
                className={`card overflow-hidden transition-colors ${
                  open === i ? 'border-brand-orange/40' : ''
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-display font-bold text-lg pr-4">{f.question}</span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                      open === i
                        ? 'border-brand-orange bg-brand-orange text-white rotate-45'
                        : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
                        {f.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
