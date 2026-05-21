'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, Wrench, Sparkles } from 'lucide-react';
import { PARTS, type Part } from '@/data/parts';
import { formatRange } from '@/lib/utils';

export default function CarDiagram() {
  const [activePart, setActivePart] = useState<Part | null>(null);
  const [view, setView] = useState<'top' | 'side'>('top');

  return (
    <section id="dijagram" className="section bg-neutral-50 dark:bg-brand-ink relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-20 right-10 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl"
      />
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            Edukativni alat · Cene delova
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Kliknite na deo vozila i pogledajte{' '}
            <span className="text-brand-orange">prosečnu cenu</span> procene u Srbiji.
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
            Orijentacioni rasponi za putnička vozila bazirani na javnim cenovnicima
            limarsko-farbarskih radova, AMSS katalogu i Audatex bazi delova. Konačnu procenu radi
            isključivo procenitelj na osnovu konkretnog vozila i oštećenja.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Diagram */}
          <div className="lg:col-span-7 card p-4 md:p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setView('top')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    view === 'top'
                      ? 'bg-brand-orange text-white'
                      : 'border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  Pogled odozgo
                </button>
                <button
                  onClick={() => setView('side')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    view === 'side'
                      ? 'bg-brand-orange text-white'
                      : 'border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  Bočni pogled
                </button>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 hidden md:flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                Kliknite na bilo koji deo
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
              {view === 'top' ? (
                <TopViewWithImage
                  active={activePart?.id}
                  onSelect={(id) => setActivePart(PARTS.find((p) => p.id === id) || null)}
                />
              ) : (
                <SideViewWithImage
                  active={activePart?.id}
                  onSelect={(id) => setActivePart(PARTS.find((p) => p.id === id) || null)}
                />
              )}
            </div>

            <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>
                Sve cene su orijentacione i odnose se na prosečno putničko vozilo. Premium modeli
                (Audi, BMW, Mercedes) i vozila sa LED/ADAS opremom mogu imati znatno više cene.
              </span>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {activePart ? (
                <motion.div
                  key={activePart.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="card p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-2">
                        {activePart.category === 'prednji'
                          ? 'Prednji deo'
                          : activePart.category === 'zadnji'
                          ? 'Zadnji deo'
                          : activePart.category === 'bocni'
                          ? 'Bočni deo'
                          : activePart.category === 'gornji'
                          ? 'Gornji deo'
                          : activePart.category === 'donji'
                          ? 'Donji deo / podvozje'
                          : 'Enterijer'}
                      </div>
                      <h3 className="font-display text-2xl font-extrabold leading-tight">
                        {activePart.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setActivePart(null)}
                      className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:border-brand-orange"
                      aria-label="Zatvori"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {activePart.description}
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/30">
                    <div className="text-xs uppercase tracking-wider text-brand-orange font-bold">
                      Orijentaciona vrednost procene
                    </div>
                    <div className="mt-1 font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white">
                      {formatRange(activePart.range.min, activePart.range.max)}
                    </div>
                    <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                      Uključuje deo + limarsko-farbarski rad, bez PDV-a.
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <Tier label="Lakše" value={`× ${activePart.multiplier.lakse}`} />
                    <Tier label="Srednje" value={`× ${activePart.multiplier.srednje}`} highlight />
                    <Tier label="Teško" value={`× ${activePart.multiplier.tesko}`} />
                  </div>

                  <a
                    href="#prijava"
                    className="mt-6 btn-primary w-full justify-center"
                  >
                    <Wrench className="w-4 h-4" />
                    Tačna procena za moje vozilo
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card p-6 md:p-8 border-dashed"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 flex items-center justify-center mb-4">
                    <Info className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    Kliknite na deo vozila
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Selektujte bilo koji deo na dijagramu da vidite prosečan raspon cena procene
                    za to oštećenje u Srbiji. Promenite pogled između „odozgo" i „bočno" za više
                    detalja.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900">
                      <div className="font-bold text-brand-orange">23</div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Dela u bazi cena
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900">
                      <div className="font-bold text-brand-orange">3</div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Nivoa oštećenja
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tier({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`p-2 rounded-lg border text-xs ${
        highlight
          ? 'border-brand-orange bg-brand-orange/5'
          : 'border-neutral-200 dark:border-neutral-800'
      }`}
    >
      <div className="font-bold">{label}</div>
      <div className="text-neutral-500 dark:text-neutral-400 font-mono">{value}</div>
    </div>
  );
}

// Hotspot button with pulse animation overlaid on the car image.
function Hotspot({
  id,
  label,
  x,
  y,
  active,
  onSelect,
}: {
  id: string;
  label: string;
  x: number; // % from left
  y: number; // % from top
  active?: string;
  onSelect: (id: string) => void;
}) {
  const isActive = active === id;
  return (
    <button
      onClick={() => onSelect(id)}
      aria-label={label}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 group/hot transition-transform ${
        isActive ? 'scale-110' : 'hover:scale-110'
      }`}
    >
      {/* Pulse rings */}
      <span
        className={`absolute inset-0 rounded-full ${
          isActive
            ? 'bg-brand-orange/60 animate-ping'
            : 'bg-white/30 group-hover/hot:bg-brand-orange/40'
        }`}
      />
      <span
        className={`relative block w-5 h-5 rounded-full border-2 ${
          isActive
            ? 'bg-brand-orange border-white shadow-lg shadow-brand-orange/60'
            : 'bg-white/90 border-white group-hover/hot:bg-brand-orange group-hover/hot:border-brand-orange'
        }`}
      />
      {/* Label tooltip */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-7 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-semibold transition ${
          isActive
            ? 'bg-brand-orange text-white opacity-100'
            : 'bg-black/80 text-white opacity-0 group-hover/hot:opacity-100'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function TopViewWithImage({ active, onSelect }: { active?: string; onSelect: (id: string) => void }) {
  // Hotspot coordinates calibrated for /img/car-top.webp (car positioned roughly centered, nose left)
  const spots = [
    { id: 'prednji-branik', label: 'Prednji branik', x: 11, y: 50 },
    { id: 'hauba', label: 'Hauba', x: 25, y: 50 },
    { id: 'vetrobransko-staklo', label: 'Vetrobran', x: 40, y: 50 },
    { id: 'krov', label: 'Krov', x: 52, y: 50 },
    { id: 'zadnje-staklo', label: 'Zadnje staklo', x: 64, y: 50 },
    { id: 'gepek-vrata', label: 'Gepek', x: 78, y: 50 },
    { id: 'zadnji-branik', label: 'Zadnji branik', x: 89, y: 50 },
    { id: 'prednji-levi-blatobran', label: 'Levi blatobran', x: 22, y: 26 },
    { id: 'prednji-desni-blatobran', label: 'Desni blatobran', x: 22, y: 76 },
    { id: 'prednja-leva-vrata', label: 'Prednja leva vrata', x: 42, y: 26 },
    { id: 'prednja-desna-vrata', label: 'Prednja desna vrata', x: 42, y: 76 },
    { id: 'zadnja-leva-vrata', label: 'Zadnja leva vrata', x: 63, y: 26 },
    { id: 'zadnja-desna-vrata', label: 'Zadnja desna vrata', x: 63, y: 76 },
    { id: 'levi-far', label: 'Levi far', x: 15, y: 36 },
    { id: 'desni-far', label: 'Desni far', x: 15, y: 64 },
    { id: 'leva-stop-lampa', label: 'Leva stop lampa', x: 85, y: 36 },
    { id: 'desna-stop-lampa', label: 'Desna stop lampa', x: 85, y: 64 },
    { id: 'levi-retrovizor', label: 'Levi retrovizor', x: 30, y: 14 },
    { id: 'desni-retrovizor', label: 'Desni retrovizor', x: 30, y: 86 },
  ];

  return (
    <div className="relative w-full h-full">
      <Image
        src="/img/car-top.webp"
        alt="Šema vozila - pogled odozgo"
        fill
        className="object-contain"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      {spots.map((s) => (
        <Hotspot
          key={s.id}
          id={s.id}
          label={s.label}
          x={s.x}
          y={s.y}
          active={active}
          onSelect={onSelect}
        />
      ))}
      <div className="absolute bottom-2 right-3 text-[10px] font-mono uppercase tracking-wider text-white/40 pointer-events-none">
        Schema · Top View
      </div>
    </div>
  );
}

function SideViewWithImage({ active, onSelect }: { active?: string; onSelect: (id: string) => void }) {
  // Side view (nose left). Calibrated to /img/car-side.webp where the sedan body
  // sits roughly horizontally centered, roof at ~y28%, sill at ~y76%.
  const spots = [
    { id: 'prednji-branik', label: 'Prednji branik', x: 14, y: 63 },
    { id: 'levi-far', label: 'Far', x: 17, y: 58 },
    { id: 'hauba', label: 'Hauba', x: 28, y: 52 },
    { id: 'prednji-levi-blatobran', label: 'Blatobran', x: 27, y: 64 },
    { id: 'vetrobransko-staklo', label: 'Vetrobransko staklo', x: 37, y: 41 },
    { id: 'levi-retrovizor', label: 'Retrovizor', x: 41, y: 44 },
    { id: 'krov', label: 'Krov', x: 52, y: 30 },
    { id: 'bocna-stakla', label: 'Bočno staklo', x: 49, y: 44 },
    { id: 'prednja-leva-vrata', label: 'Prednja vrata', x: 47, y: 62 },
    { id: 'zadnja-leva-vrata', label: 'Zadnja vrata', x: 62, y: 62 },
    { id: 'zadnje-staklo', label: 'Zadnje staklo', x: 68, y: 42 },
    { id: 'gepek-vrata', label: 'Gepek', x: 80, y: 48 },
    { id: 'leva-stop-lampa', label: 'Stop lampa', x: 87, y: 55 },
    { id: 'zadnji-branik', label: 'Zadnji branik', x: 90, y: 65 },
    { id: 'pragovi', label: 'Pragovi', x: 55, y: 75 },
    { id: 'felne', label: 'Felne', x: 24, y: 78 },
  ];

  return (
    <div className="relative w-full h-full">
      <Image
        src="/img/car-side.webp"
        alt="Šema vozila - bočni pogled"
        fill
        className="object-contain"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      {spots.map((s) => (
        <Hotspot
          key={s.id}
          id={s.id}
          label={s.label}
          x={s.x}
          y={s.y}
          active={active}
          onSelect={onSelect}
        />
      ))}
      <div className="absolute bottom-2 right-3 text-[10px] font-mono uppercase tracking-wider text-white/40 pointer-events-none">
        Schema · Side View
      </div>
    </div>
  );
}
