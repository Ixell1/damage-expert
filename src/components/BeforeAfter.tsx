'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal, TrendingUp, ArrowRight } from 'lucide-react';
import { formatRSD } from '@/lib/utils';

const CASES = [
  {
    title: 'Bočni udar — Volkswagen Passat B8',
    insurance: 85000,
    actual: 215000,
    parts: ['Zadnja desna vrata', 'Desni zadnji blatobran', 'Desna stop lampa', 'Bočno staklo'],
    insurer: 'tipičan slučaj',
  },
  {
    title: 'Prednji udar — Škoda Octavia III',
    insurance: 140000,
    actual: 320000,
    parts: ['Prednji branik', 'Hauba', 'Levi far', 'Vetrobransko staklo'],
    insurer: 'tipičan slučaj',
  },
  {
    title: 'Parking oštećenje — Hyundai Tucson',
    insurance: 18000,
    actual: 62000,
    parts: ['Zadnji branik', 'Zadnja vrata', 'Desni retrovizor'],
    insurer: 'tipičan slučaj',
  },
];

export default function BeforeAfter() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CASES[activeIdx];
  const diff = active.actual - active.insurance;
  const percent = Math.round((diff / active.insurance) * 100);

  return (
    <section className="section bg-neutral-50 dark:bg-brand-ink relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-orange/15 rounded-full blur-3xl"
      />
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            Realni primeri · Pre / Posle procene
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Razlika između ponude osiguranja i{' '}
            <span className="text-brand-orange">stvarne procene</span> štete.
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
            Tipični primeri iz prakse. Detaljna Audatex procena često otkrije skrivene troškove
            (originalni delovi, ADAS kalibracija, antikorozivna zaštita) koje brza procena osiguranja
            propusti.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CASES.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                i === activeIdx
                  ? 'bg-brand-orange text-white'
                  : 'border border-neutral-300 dark:border-neutral-700 hover:border-brand-orange'
              }`}
            >
              {c.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        <div className="card p-6 md:p-10">
          <div className="mb-2 inline-block px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-wider">
            {active.insurer}
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-6">{active.title}</h3>

          {/* Comparison bars */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ComparisonBar
              label="Procena osiguranja"
              amount={active.insurance}
              max={active.actual}
              variant="muted"
            />
            <ComparisonBar
              label="Audatex procena"
              amount={active.actual}
              max={active.actual}
              variant="orange"
            />
          </div>

          {/* Diff highlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-orange/20 to-brand-orange/5 border border-brand-orange/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-brand-orange font-bold">
                Razlika u korist klijenta
              </div>
              <div className="font-display text-2xl md:text-3xl font-extrabold">
                +{formatRSD(diff)}{' '}
                <span className="text-base font-bold text-brand-orange">(+{percent}%)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">
                Oštećeni delovi u proceni
              </div>
              <ul className="space-y-1.5">
                {active.parts.map((p) => (
                  <li key={p} className="text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900">
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">
                Zašto razlika
              </div>
              <ul className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• Originalni delovi (OEM) umesto generičkih</li>
                <li>• Rad limara/farbara po realnim satnicama</li>
                <li>• ADAS kalibracija nakon zamene stakla</li>
                <li>• Antikorozivna zaštita šasije</li>
              </ul>
            </div>
          </div>

          <a href="#prijava" className="mt-8 btn-primary">
            Pokreni proceu za moje vozilo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-6 text-xs text-neutral-500 dark:text-neutral-400 flex items-start gap-2">
          <MoveHorizontal className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Demonstracioni primeri tipičnih slučajeva iz prakse. Konkretni iznosi zavise od vozila,
            opreme i obima oštećenja.
          </span>
        </div>
      </div>
    </section>
  );
}

function ComparisonBar({
  label,
  amount,
  max,
  variant,
}: {
  label: string;
  amount: number;
  max: number;
  variant: 'muted' | 'orange';
}) {
  const pct = (amount / max) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-sm font-bold">{label}</div>
        <div
          className={`font-display text-2xl font-extrabold ${
            variant === 'orange' ? 'text-brand-orange' : 'text-neutral-700 dark:text-neutral-300'
          }`}
        >
          {formatRSD(amount)}
        </div>
      </div>
      <div className="h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={`h-full ${
            variant === 'orange'
              ? 'bg-gradient-to-r from-brand-orange to-brand-orangeLight'
              : 'bg-neutral-400 dark:bg-neutral-600'
          }`}
        />
      </div>
    </div>
  );
}
