'use client';

import { useState, useMemo } from 'react';
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
          <div className="lg:col-span-7 card p-4 md:p-8 relative">
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

            <div className="relative aspect-[16/10] w-full">
              {view === 'top' ? (
                <TopView active={activePart?.id} onSelect={(id) => setActivePart(PARTS.find((p) => p.id === id) || null)} />
              ) : (
                <SideView active={activePart?.id} onSelect={(id) => setActivePart(PARTS.find((p) => p.id === id) || null)} />
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

function PartShape({
  id,
  d,
  active,
  onSelect,
  label,
  cx,
  cy,
}: {
  id: string;
  d: string;
  active?: string;
  onSelect: (id: string) => void;
  label: string;
  cx: number;
  cy: number;
}) {
  const isActive = active === id;
  return (
    <g
      onClick={() => onSelect(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(id);
      }}
      aria-label={label}
    >
      <title>{label}</title>
      <path d={d} className={`car-part ${isActive ? 'active' : ''}`} />
      {isActive && (
        <g>
          <circle cx={cx} cy={cy} r={4} fill="#fff" stroke="#FF6A00" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={9} fill="none" stroke="#FF6A00" strokeWidth={1.5} opacity={0.4}>
            <animate attributeName="r" from="6" to="14" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </g>
  );
}

function TopView({ active, onSelect }: { active?: string; onSelect: (id: string) => void }) {
  // Top-down stylized car silhouette. Coordinates within 800x500 viewBox.
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.04" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Body outline */}
      <path
        d="M 200 80 Q 400 40 600 80 Q 700 100 720 200 L 720 300 Q 700 400 600 420 Q 400 460 200 420 Q 100 400 80 300 L 80 200 Q 100 100 200 80 Z"
        fill="url(#bodyGrad)"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />

      {/* Front bumper */}
      <PartShape
        id="prednji-branik"
        d="M 200 80 Q 400 40 600 80 L 600 110 Q 400 70 200 110 Z"
        active={active}
        onSelect={onSelect}
        label="Prednji branik"
        cx={400}
        cy={75}
      />

      {/* Hood */}
      <PartShape
        id="hauba"
        d="M 220 110 Q 400 80 580 110 L 580 200 Q 400 195 220 200 Z"
        active={active}
        onSelect={onSelect}
        label="Hauba"
        cx={400}
        cy={150}
      />

      {/* Roof */}
      <PartShape
        id="krov"
        d="M 240 215 Q 400 210 560 215 L 560 290 Q 400 295 240 290 Z"
        active={active}
        onSelect={onSelect}
        label="Krov"
        cx={400}
        cy={252}
      />

      {/* Trunk lid */}
      <PartShape
        id="gepek-vrata"
        d="M 220 305 Q 400 310 580 305 L 580 395 Q 400 415 220 395 Z"
        active={active}
        onSelect={onSelect}
        label="Gepek vrata"
        cx={400}
        cy={350}
      />

      {/* Rear bumper */}
      <PartShape
        id="zadnji-branik"
        d="M 200 395 Q 400 415 600 395 L 600 425 Q 400 460 200 425 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnji branik"
        cx={400}
        cy={430}
      />

      {/* Left front fender */}
      <PartShape
        id="prednji-levi-blatobran"
        d="M 80 200 Q 100 130 200 110 L 220 200 Z"
        active={active}
        onSelect={onSelect}
        label="Prednji levi blatobran"
        cx={150}
        cy={170}
      />

      {/* Right front fender */}
      <PartShape
        id="prednji-desni-blatobran"
        d="M 580 110 Q 700 130 720 200 L 580 200 Z"
        active={active}
        onSelect={onSelect}
        label="Prednji desni blatobran"
        cx={650}
        cy={170}
      />

      {/* Left front door */}
      <PartShape
        id="prednja-leva-vrata"
        d="M 90 210 L 220 210 L 220 290 L 90 290 Z"
        active={active}
        onSelect={onSelect}
        label="Prednja leva vrata"
        cx={155}
        cy={250}
      />
      {/* Right front door */}
      <PartShape
        id="prednja-desna-vrata"
        d="M 580 210 L 710 210 L 710 290 L 580 290 Z"
        active={active}
        onSelect={onSelect}
        label="Prednja desna vrata"
        cx={645}
        cy={250}
      />
      {/* Left rear door */}
      <PartShape
        id="zadnja-leva-vrata"
        d="M 90 295 L 220 295 L 220 395 Q 100 400 90 295 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnja leva vrata"
        cx={155}
        cy={345}
      />
      {/* Right rear door */}
      <PartShape
        id="zadnja-desna-vrata"
        d="M 580 295 L 710 295 Q 700 400 580 395 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnja desna vrata"
        cx={645}
        cy={345}
      />

      {/* Headlights */}
      <PartShape
        id="levi-far"
        d="M 220 90 L 280 105 L 270 130 L 220 115 Z"
        active={active}
        onSelect={onSelect}
        label="Levi far"
        cx={250}
        cy={107}
      />
      <PartShape
        id="desni-far"
        d="M 580 90 L 520 105 L 530 130 L 580 115 Z"
        active={active}
        onSelect={onSelect}
        label="Desni far"
        cx={550}
        cy={107}
      />

      {/* Stop lamps */}
      <PartShape
        id="leva-stop-lampa"
        d="M 220 395 L 280 410 L 270 430 L 220 420 Z"
        active={active}
        onSelect={onSelect}
        label="Leva stop lampa"
        cx={250}
        cy={412}
      />
      <PartShape
        id="desna-stop-lampa"
        d="M 580 395 L 520 410 L 530 430 L 580 420 Z"
        active={active}
        onSelect={onSelect}
        label="Desna stop lampa"
        cx={550}
        cy={412}
      />

      {/* Mirrors */}
      <PartShape
        id="levi-retrovizor"
        d="M 60 200 L 90 195 L 95 215 L 65 220 Z"
        active={active}
        onSelect={onSelect}
        label="Levi retrovizor"
        cx={78}
        cy={207}
      />
      <PartShape
        id="desni-retrovizor"
        d="M 740 200 L 710 195 L 705 215 L 735 220 Z"
        active={active}
        onSelect={onSelect}
        label="Desni retrovizor"
        cx={722}
        cy={207}
      />

      {/* Windshield */}
      <PartShape
        id="vetrobransko-staklo"
        d="M 230 200 L 570 200 L 555 215 L 245 215 Z"
        active={active}
        onSelect={onSelect}
        label="Vetrobransko staklo"
        cx={400}
        cy={208}
      />

      {/* Rear glass */}
      <PartShape
        id="zadnje-staklo"
        d="M 245 290 L 555 290 L 570 305 L 230 305 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnje staklo"
        cx={400}
        cy={297}
      />

      {/* Labels */}
      <text x="400" y="490" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="11" fontFamily="monospace">
        SCHEMA · TOP VIEW
      </text>
    </svg>
  );
}

function SideView({ active, onSelect }: { active?: string; onSelect: (id: string) => void }) {
  // Side view: 800x500
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bodyGradSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.04" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Body outline */}
      <path
        d="M 60 320 L 120 320 Q 130 230 230 220 L 360 200 Q 400 180 500 190 L 620 220 Q 680 240 700 280 L 740 290 L 740 350 L 60 350 Z"
        fill="url(#bodyGradSide)"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />

      {/* Roof */}
      <PartShape
        id="krov"
        d="M 270 215 Q 400 178 520 192 L 500 215 L 290 215 Z"
        active={active}
        onSelect={onSelect}
        label="Krov"
        cx={395}
        cy={200}
      />

      {/* Hood */}
      <PartShape
        id="hauba"
        d="M 120 320 Q 145 245 250 235 L 250 280 L 120 320 Z"
        active={active}
        onSelect={onSelect}
        label="Hauba"
        cx={185}
        cy={285}
      />

      {/* Front bumper */}
      <PartShape
        id="prednji-branik"
        d="M 60 305 L 120 305 L 120 340 L 60 340 Z"
        active={active}
        onSelect={onSelect}
        label="Prednji branik"
        cx={90}
        cy={322}
      />

      {/* Headlight */}
      <PartShape
        id="levi-far"
        d="M 78 290 L 120 290 L 120 310 L 80 310 Z"
        active={active}
        onSelect={onSelect}
        label="Levi far"
        cx={100}
        cy={300}
      />

      {/* Front fender */}
      <PartShape
        id="prednji-levi-blatobran"
        d="M 120 320 L 250 280 L 250 350 L 120 350 Z"
        active={active}
        onSelect={onSelect}
        label="Prednji levi blatobran"
        cx={185}
        cy={325}
      />

      {/* Front door */}
      <PartShape
        id="prednja-leva-vrata"
        d="M 255 232 L 385 215 L 385 345 L 255 345 Z"
        active={active}
        onSelect={onSelect}
        label="Prednja leva vrata"
        cx={320}
        cy={290}
      />

      {/* Rear door */}
      <PartShape
        id="zadnja-leva-vrata"
        d="M 388 218 L 510 198 L 510 345 L 388 345 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnja leva vrata"
        cx={449}
        cy={285}
      />

      {/* Rear fender */}
      <PartShape
        id="zadnja-leva-vrata-blatobran"
        d="M 515 200 L 620 220 L 620 350 L 515 350 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnja leva vrata"
        cx={568}
        cy={290}
      />

      {/* Trunk */}
      <PartShape
        id="gepek-vrata"
        d="M 625 222 Q 680 245 700 280 L 700 340 L 625 340 Z"
        active={active}
        onSelect={onSelect}
        label="Gepek vrata"
        cx={665}
        cy={285}
      />

      {/* Rear bumper */}
      <PartShape
        id="zadnji-branik"
        d="M 700 305 L 740 305 L 740 340 L 700 340 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnji branik"
        cx={720}
        cy={322}
      />

      {/* Rear stop lamp */}
      <PartShape
        id="leva-stop-lampa"
        d="M 700 290 L 740 290 L 740 305 L 700 305 Z"
        active={active}
        onSelect={onSelect}
        label="Leva stop lampa"
        cx={720}
        cy={297}
      />

      {/* Windshield */}
      <PartShape
        id="vetrobransko-staklo"
        d="M 250 280 L 270 215 L 290 215 L 270 285 Z"
        active={active}
        onSelect={onSelect}
        label="Vetrobransko staklo"
        cx={270}
        cy={250}
      />

      {/* Rear glass */}
      <PartShape
        id="zadnje-staklo"
        d="M 500 218 L 522 218 L 540 285 L 510 285 Z"
        active={active}
        onSelect={onSelect}
        label="Zadnje staklo"
        cx={518}
        cy={250}
      />

      {/* Side window */}
      <PartShape
        id="bocna-stakla"
        d="M 275 230 L 498 215 L 498 280 L 275 280 Z"
        active={active}
        onSelect={onSelect}
        label="Bočno staklo"
        cx={386}
        cy={250}
      />

      {/* Mirror */}
      <PartShape
        id="levi-retrovizor"
        d="M 248 230 L 268 220 L 270 240 L 250 245 Z"
        active={active}
        onSelect={onSelect}
        label="Levi retrovizor"
        cx={260}
        cy={232}
      />

      {/* Side skirt */}
      <PartShape
        id="pragovi"
        d="M 125 350 L 700 350 L 700 370 L 125 370 Z"
        active={active}
        onSelect={onSelect}
        label="Pragovi"
        cx={400}
        cy={360}
      />

      {/* Wheels (felne) */}
      <g
        role="button"
        tabIndex={0}
        onClick={() => onSelect('felne')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onSelect('felne');
        }}
        className="cursor-pointer"
      >
        <title>Felna</title>
        <circle cx={190} cy={375} r={42} className={`car-part ${active === 'felne' ? 'active' : ''}`} />
        <circle cx={190} cy={375} r={20} fill="currentColor" opacity="0.2" />
        <circle cx={610} cy={375} r={42} className={`car-part ${active === 'felne' ? 'active' : ''}`} />
        <circle cx={610} cy={375} r={20} fill="currentColor" opacity="0.2" />
      </g>

      {/* Underbody / chassis */}
      <PartShape
        id="sasija-podvozje"
        d="M 60 350 L 740 350 L 740 365 L 60 365 Z"
        active={active}
        onSelect={onSelect}
        label="Šasija / podvozje"
        cx={400}
        cy={358}
      />

      <text x="400" y="450" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="11" fontFamily="monospace">
        SCHEMA · SIDE VIEW
      </text>
    </svg>
  );
}
