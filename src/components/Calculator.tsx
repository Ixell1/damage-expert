'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator as CalcIcon,
  Plus,
  Minus,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PARTS, DAMAGE_LABEL, DAMAGE_DESC, type DamageLevel } from '@/data/parts';
import { formatRSD } from '@/lib/utils';

interface Selection {
  partId: string;
  level: DamageLevel;
}

const VEHICLE_CLASS: { id: string; label: string; factor: number; hint: string }[] = [
  { id: 'small', label: 'Mali / kompakt', factor: 0.85, hint: 'Polo, Fabia, Yaris, Clio...' },
  { id: 'mid', label: 'Srednja klasa', factor: 1.0, hint: 'Golf, Octavia, Focus, Megane...' },
  { id: 'suv', label: 'SUV / Crossover', factor: 1.25, hint: 'Tiguan, Kodiaq, Tucson, Sportage...' },
  { id: 'premium', label: 'Premium / Luxury', factor: 1.7, hint: 'Audi, BMW, Mercedes, Volvo...' },
];

export default function Calculator() {
  const [vehicleClass, setVehicleClass] = useState('mid');
  const [selections, setSelections] = useState<Selection[]>([]);
  const [showAllParts, setShowAllParts] = useState(false);

  // Initial visible count on mobile = 6, on desktop list is scrollable instead.
  const MOBILE_INITIAL_COUNT = 6;

  const factor = VEHICLE_CLASS.find((v) => v.id === vehicleClass)?.factor || 1;

  const togglePart = (partId: string) => {
    setSelections((prev) => {
      const exists = prev.find((p) => p.partId === partId);
      if (exists) return prev.filter((p) => p.partId !== partId);
      return [...prev, { partId, level: 'srednje' }];
    });
  };

  const setLevel = (partId: string, level: DamageLevel) => {
    setSelections((prev) => prev.map((p) => (p.partId === partId ? { ...p, level } : p)));
  };

  const reset = () => setSelections([]);

  const { totalMin, totalMax } = useMemo(() => {
    let min = 0;
    let max = 0;
    for (const sel of selections) {
      const part = PARTS.find((p) => p.id === sel.partId);
      if (!part) continue;
      const m = part.multiplier[sel.level];
      min += part.range.min * m * factor;
      max += part.range.max * m * factor;
    }
    return { totalMin: min, totalMax: max };
  }, [selections, factor]);

  return (
    <section id="kalkulator" className="section relative overflow-hidden">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
              Interaktivni kalkulator
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
              Okvirna <span className="text-brand-orange">procena štete</span> u 60 sekundi.
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
              Izaberite klasu vozila, štiklirajte oštećene delove i intenzitet oštećenja. Sistem
              odmah prikazuje orijentacioni raspon. Konačnu procenu radi procenitelj na osnovu
              pregleda i Audatex kalkulacije.
            </p>

            {/* Result card sticky */}
            <div className="mt-8 relative">
              <div className="absolute -inset-4 bg-brand-orange/20 rounded-3xl blur-2xl" aria-hidden />
              <div className="relative card p-6 md:p-8 bg-gradient-to-br from-brand-black to-brand-ink text-white border-brand-orange/40">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-widest text-brand-orange font-bold flex items-center gap-2">
                    <CalcIcon className="w-3.5 h-3.5" /> Procena ukupne štete
                  </div>
                  {selections.length > 0 && (
                    <button
                      onClick={reset}
                      className="text-xs text-neutral-400 hover:text-brand-orange flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Resetuj
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  {selections.length === 0 ? (
                    <div className="text-neutral-500 italic">
                      Selektujte oštećene delove ispod →
                    </div>
                  ) : (
                    <>
                      <div className="font-display text-3xl md:text-4xl font-extrabold">
                        {formatRSD(totalMin)}
                      </div>
                      <div className="text-neutral-400 text-sm">do</div>
                      <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-orange">
                        {formatRSD(totalMax)}
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-5 flex items-start gap-2 text-xs text-neutral-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>
                    Orijentaciono. Konačni iznos zavisi od marke/modela/godišta, dostupnosti delova,
                    LED/ADAS opreme i skrivenih oštećenja.
                  </span>
                </div>

                <a href="#prijava" className="mt-6 btn-primary w-full justify-center">
                  Tražim tačnu procenu
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Vehicle class */}
            <div>
              <div className="text-sm font-bold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                Klasa vozila
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {VEHICLE_CLASS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVehicleClass(v.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      vehicleClass === v.id
                        ? 'border-brand-orange bg-brand-orange/10'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-brand-orange/50'
                    }`}
                  >
                    <div className="font-semibold text-sm">{v.label}</div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 leading-tight">
                      {v.hint}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Parts selection */}
            <div>
              <div className="text-sm font-bold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                Oštećeni delovi <span className="text-xs font-normal text-neutral-500">(izaberi sve što važi)</span>
              </div>

              {/*
                Mobile (<sm): show MOBILE_INITIAL_COUNT items, then "Učitaj više" button
                Desktop (≥lg): list scrollable inside container of fixed max-height (~sidebar height)
                Selected items always remain visible (we sort them to top).
              */}
              <div
                className={`grid sm:grid-cols-2 gap-2 relative ${
                  showAllParts
                    ? 'lg:max-h-[640px] lg:overflow-y-auto lg:pr-2'
                    : 'lg:max-h-[640px] lg:overflow-y-auto lg:pr-2'
                }`}
              >
                {PARTS.map((part, idx) => {
                  const sel = selections.find((s) => s.partId === part.id);
                  const isSelected = !!sel;
                  // On mobile: hide items beyond MOBILE_INITIAL_COUNT unless showAllParts OR selected
                  const hideOnMobile = !showAllParts && !isSelected && idx >= MOBILE_INITIAL_COUNT;
                  return (
                    <div
                      key={part.id}
                      className={`p-3 rounded-xl border transition ${
                        hideOnMobile ? 'hidden sm:block' : ''
                      } ${
                        isSelected
                          ? 'border-brand-orange bg-brand-orange/5'
                          : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => togglePart(part.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            togglePart(part.id);
                          }
                        }}
                        className="w-full flex items-start gap-2 text-left cursor-pointer"
                      >
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-brand-orange border-brand-orange text-white'
                              : 'border-neutral-300 dark:border-neutral-700'
                          }`}
                        >
                          {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{part.name}</div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            {formatRSD(part.range.min)} - {formatRSD(part.range.max)}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isSelected && sel && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-3 gap-1">
                              {(Object.keys(DAMAGE_LABEL) as DamageLevel[]).map((lv) => (
                                <button
                                  key={lv}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLevel(part.id, lv);
                                  }}
                                  type="button"
                                  className={`py-1.5 rounded-md text-[11px] font-semibold transition ${
                                    sel.level === lv
                                      ? 'bg-brand-orange text-white'
                                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-brand-orange/20'
                                  }`}
                                  title={DAMAGE_DESC[lv]}
                                >
                                  {DAMAGE_LABEL[lv].split(' ')[0]}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Učitaj više / Sakrij dugme - na mobile vidljivo uvek; na desktop samo kao toggle visibility */}
              {PARTS.length > MOBILE_INITIAL_COUNT && (
                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllParts((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-orange/40 bg-brand-orange/5 text-brand-orange font-semibold text-sm hover:bg-brand-orange hover:text-white transition"
                  >
                    {showAllParts ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Prikaži manje
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Učitaj još {PARTS.length - MOBILE_INITIAL_COUNT} delova
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {selections.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-brand-orange/5 border border-brand-orange/20 text-sm flex items-start gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700 dark:text-neutral-300">
                  Selektovali ste <strong>{selections.length}</strong>{' '}
                  {selections.length === 1 ? 'deo' : 'delova'}. Za tačnu procenu i izradu zapisnika,
                  popunite{' '}
                  <a href="#prijava" className="text-brand-orange font-bold hover:underline">
                    online prijavu
                  </a>{' '}
                  ili nas pozovite.
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
