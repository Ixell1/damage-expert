'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Camera, FileCheck2 } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Prijavite štetu',
    desc: 'Pozovite, pošaljite Viber/WhatsApp ili popunite online formu. Reći ćemo Vam šta nam tačno treba.',
    time: '~5 min',
  },
  {
    icon: Camera,
    number: '02',
    title: 'Pregledamo vozilo',
    desc: 'Dolazimo na vašu adresu ili Vi dolazite u kancelariju na Aerodromu Konstantin Veliki. Slike, dimenzije, identifikacija delova.',
    time: 'Do 6h od poziva',
  },
  {
    icon: FileCheck2,
    number: '03',
    title: 'Šaljemo zapisnik',
    desc: 'Audatex zapisnik na e-mail u roku od 24h (hitni slučajevi — istog dana). Predajete osiguranju i nastavljate naplatu.',
    time: 'Maks. 24h',
  },
];

export default function Process() {
  return (
    <section className="section relative bg-neutral-50 dark:bg-brand-ink">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            Kako funkcioniše
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Od poziva do <span className="text-brand-orange">zapisnika</span> u 3 koraka.
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
            Bez gomile telefonskih poziva i čekanja. Najduže 24 sata od pregleda do zapisnika u
            vašem inbox-u.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute left-[10%] right-[10%] top-[60px] h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" aria-hidden />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="card p-6 md:p-8 h-full relative">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-brand-black dark:bg-white flex items-center justify-center">
                      <s.icon className="w-7 h-7 text-brand-orange dark:text-brand-black" />
                    </div>
                    <div className="font-mono text-5xl font-extrabold text-brand-orange/20 leading-none">
                      {s.number}
                    </div>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-wider mb-3">
                    {s.time}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
