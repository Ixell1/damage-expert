'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Clock, MapPin, ShieldCheck, GraduationCap, Car } from 'lucide-react';
import { SITE } from '@/data/site';

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0 -z-10 grain opacity-60" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-brand-orange/20 dark:bg-brand-orange/15 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[480px] h-[480px] bg-brand-orange/10 rounded-full blur-3xl -z-10"
      />

      <div className="container-x">
        {/* Badge row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Slobodni termini ove nedelje
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            Saobraćajni fakultet
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold">
            <Car className="w-3.5 h-3.5" />
            5+ god. Sixt rent a car
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Audatex sistem
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.05]"
            >
              Profesionalna{' '}
              <span className="relative inline-block">
                <span className="relative z-10 gradient-text">procena štete</span>
                <span
                  className="absolute left-0 right-0 bottom-1 h-4 bg-brand-orange/20 -z-0"
                  aria-hidden
                />
              </span>
              <br />
              na vozilima.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 text-pretty leading-relaxed"
            >
              Niš i okolina · zapisnik za <strong className="text-neutral-900 dark:text-white">24h</strong>{' '}
              · dolazimo na vašu adresu · besplatna konsultacija. Audatex procena prihvatljiva za
              osiguravajuća društva.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#prijava" className="btn-primary group">
                Prijavi štetu online
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={`tel:${SITE.phone}`} className="btn-secondary">
                <Phone className="w-4 h-4" />
                {SITE.phoneDisplay}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 grid grid-cols-3 gap-6 max-w-xl"
            >
              <Stat number="24h" label="Maks. izrada zapisnika" />
              <Stat number="50km" label="Radijus pokrivanja Niša" />
              <Stat number="10.000" label="RSD fiksna cena (besplatna konsultacija)" />
            </motion.div>
          </div>

          {/* Right visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-brand-orange/30 to-transparent rounded-3xl blur-2xl" aria-hidden />
              <div className="relative card p-6 md:p-8 bg-white/80 dark:bg-brand-ink/80 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                      Tipičan slučaj
                    </div>
                    <div className="font-display text-xl font-bold mt-1">
                      Vožnja → Niš → Zapisnik
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-brand-orange" />
                  </div>
                </div>

                <Timeline />

                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Niš · Prokuplje · Aleksinac · Pirot · Knjaževac · Zaječar
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
        {number}
      </div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">{label}</div>
    </div>
  );
}

function Timeline() {
  const steps = [
    { time: '0h', label: 'Prijava štete / poziv' },
    { time: '< 6h', label: 'Pregled vozila (teren ili kancelarija)' },
    { time: '< 24h', label: 'Zapisnik dostavljen na e-mail' },
  ];
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800" aria-hidden />
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="relative flex items-start gap-4">
            <div className="relative z-10 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold animate-pulse-orange">
              {i + 1}
            </div>
            <div className="flex-1 pt-1">
              <div className="text-xs font-mono font-semibold text-brand-orange">{s.time}</div>
              <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">
                {s.label}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
