'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MoveHorizontal, TrendingUp, ArrowRight, Camera, AlertTriangle } from 'lucide-react';
import { formatRSD } from '@/lib/utils';

interface CaseData {
  title: string;
  vehicle: string;
  insurance: number;
  actual: number;
  parts: string[];
  insurer: string;
  scenario: string;
  image: string;
}

const CASES: CaseData[] = [
  {
    title: 'Bočni udar — kompletna desna strana',
    vehicle: 'Volkswagen Passat B8 · 2018',
    insurance: 85000,
    actual: 215000,
    parts: ['Zadnja desna vrata', 'Desni zadnji blatobran', 'Desna stop lampa', 'Bočno staklo'],
    insurer: 'tipičan slučaj',
    scenario:
      'Vozilo udareno bočno na raskrsnici. Osiguranje krivca ponudilo procenu bez uvida u skrivena oštećenja unutrašnjih panela vrata i deformaciju C-stuba.',
    image: '/img/damage-passat.webp',
  },
  {
    title: 'Prednji udar — udarac u parkirano vozilo',
    vehicle: 'Škoda Octavia III · 2019',
    insurance: 140000,
    actual: 320000,
    parts: ['Prednji branik', 'Hauba', 'Levi far (LED)', 'Vetrobransko staklo'],
    insurer: 'tipičan slučaj',
    scenario:
      'Sleteo u parkirano vozilo. Osiguranje obračunalo halogene farove, dok je vozilo opremljeno full-LED tehnologijom. Nedostajala ADAS kalibracija stakla.',
    image: '/img/damage-octavia.webp',
  },
  {
    title: 'Parking oštećenje — više udaraca',
    vehicle: 'Hyundai Tucson · 2021',
    insurance: 18000,
    actual: 62000,
    parts: ['Zadnji branik', 'Zadnja vrata', 'Desni retrovizor'],
    insurer: 'tipičan slučaj',
    scenario:
      'Više udaraca na parkingu tokom nekoliko nedelja. Osiguranje obračunalo samo plastične delove, ali je bila potrebna kompletna boja zadnjih vrata i replacement retrovizora sa kamerom.',
    image: '/img/damage-tucson.webp',
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
            Pre / Posle · Realni primeri
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Razlika između početne procene osiguranja i{' '}
            <span className="text-brand-orange">Damage Expert procene</span>.
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
            Tipični slučajevi iz prakse. Detaljna Audatex procena često otkrije skrivene troškove
            (originalni delovi, ADAS kalibracija, antikorozivna zaštita, satnice rada) koje brza
            procena osiguranja propusti.
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
              Slučaj {i + 1}
            </button>
          ))}
        </div>

        {/* Main case card */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-6 md:p-10"
        >
          <div className="mb-2 inline-block px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-wider">
            {active.insurer}
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-2">{active.title}</h3>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">{active.vehicle}</div>

          {/* Image with overlays */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <DamageImage
              label="Stanje vozila"
              sublabel="Foto oštećenja sa pregleda"
              src={active.image}
              vehicle={active.vehicle}
            />
            <div className="grid grid-cols-1 gap-3">
              {/* Insurance estimate card */}
              <div className="relative rounded-2xl bg-neutral-100 dark:bg-neutral-900 p-5 border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Početna procena osiguranja
                </div>
                <div className="font-display text-2xl md:text-3xl font-extrabold text-neutral-700 dark:text-neutral-300">
                  {formatRSD(active.insurance)}
                </div>
              </div>
              {/* Damage Expert estimate card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 p-5 border border-brand-orange/40">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand-orange mb-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Procena Damage Experta
                </div>
                <div className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white">
                  {formatRSD(active.actual)}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-bold uppercase">
                  +{percent}%
                </div>
              </div>
            </div>
          </div>

          {/* Bars */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ComparisonBar
              label="Početna procena osiguranja"
              amount={active.insurance}
              max={active.actual}
              variant="muted"
            />
            <ComparisonBar
              label="Damage Expert procena"
              amount={active.actual}
              max={active.actual}
              variant="orange"
            />
          </div>

          {/* Diff highlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-orange/20 to-brand-orange/5 border border-brand-orange/30 flex items-center gap-4 mb-6">
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

          <div className="grid md:grid-cols-2 gap-6">
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
                Opis slučaja
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {active.scenario}
              </p>
            </div>
          </div>

          <a href="#prijava" className="mt-8 btn-primary">
            Pokreni procenu za moje vozilo
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="mt-6 text-xs text-neutral-500 dark:text-neutral-400 flex items-start gap-2">
          <MoveHorizontal className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Demonstracioni primeri tipičnih slučajeva iz prakse. Fotografije su ilustrativne (radi zaštite
            privatnosti klijenata nisu prikazane stvarne slike). Konkretni iznosi zavise od vozila,
            opreme i obima oštećenja.
          </span>
        </div>
      </div>
    </section>
  );
}

function DamageImage({
  label,
  sublabel,
  src,
  vehicle,
}: {
  label: string;
  sublabel: string;
  src: string;
  vehicle: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] flex items-end p-5 bg-neutral-900">
      <Image
        src={src}
        alt={`Foto oštećenja — ${vehicle}`}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      {/* Gradient overlay for label legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
      />
      {/* Camera grain noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
        }}
      />
      {/* Corner badge */}
      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider z-10">
        <Camera className="w-3 h-3" />
        Demo foto
      </div>
      {/* Bottom label */}
      <div className="relative z-10 text-white">
        <div className="text-xs uppercase tracking-wider font-bold opacity-90">{label}</div>
        <div className="text-sm font-semibold mt-0.5">{sublabel}</div>
      </div>
    </div>
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
