'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, Bot, ArrowRight } from 'lucide-react';

export default function UspBanner() {
  return (
    <section className="section relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent -z-10"
      />
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-black via-brand-ink to-brand-black p-8 md:p-12 border border-brand-orange/30"
        >
          {/* Animated grid background */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,106,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-96 h-96 bg-brand-orange/40 rounded-full blur-3xl"
          />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider mb-5">
                <Bot className="w-3.5 h-3.5" />
                Jedini u Srbiji
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
                Online prijava štete{' '}
                <span className="gradient-text">koju niko drugi nema.</span>
              </h2>
              <p className="mt-5 text-lg text-neutral-300 text-pretty leading-relaxed">
                Dok konkurencija zahteva 10 telefonskih poziva i čeka termin nedeljama, kod nas
                popunite formu za 2 minuta i dobijate zapisnik za 24h. Potpuno automatizovan proces
                nam omogućava{' '}
                <strong className="text-brand-orange">
                  brzinu i preciznost koju nijedna agencija u Srbiji nema
                </strong>
                .
              </p>
              <a href="#prijava" className="mt-7 btn-primary">
                Probaj online prijavu — 2 minuta
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <UspCard
                icon={Zap}
                title="Automatizovan proces"
                value="2 min"
                desc="Online prijava + foto upload"
                accent
              />
              <UspCard
                icon={TrendingUp}
                title="Procene veće"
                value="+20%"
                desc="U proseku iznad konkurencije"
              />
              <UspCard
                icon={Bot}
                title="Audatex sistem"
                value="100%"
                desc="Procena prihvatljiva za osiguranja"
              />
              <UspCard
                icon={Zap}
                title="Brzina obrade"
                value="24h"
                desc="Zapisnik na vašem e-mail-u"
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-xs text-neutral-500 dark:text-neutral-400 text-center max-w-2xl mx-auto">
          *Procena +20% bazirana na poređenju Audatex kalkulacije sa standardnim procenama
          osiguravajućih društava i drugih procenitelja u regionu (originalni delovi, ADAS kalibracija,
          rad limara/farbara po realnim satnicama).
        </div>
      </div>
    </section>
  );
}

function UspCard({
  icon: Icon,
  title,
  value,
  desc,
  accent,
}: {
  icon: typeof Zap;
  title: string;
  value: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-2xl border transition ${
        accent
          ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/30'
          : 'bg-white/5 border-white/10 backdrop-blur'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
          accent ? 'bg-white/20' : 'bg-brand-orange/15'
        }`}
      >
        <Icon className={`w-5 h-5 ${accent ? 'text-white' : 'text-brand-orange'}`} />
      </div>
      <div className={`font-display text-2xl md:text-3xl font-extrabold ${accent ? 'text-white' : 'text-white'}`}>
        {value}
      </div>
      <div className={`text-sm font-semibold mt-1 ${accent ? 'text-white' : 'text-neutral-300'}`}>
        {title}
      </div>
      <div className={`text-xs mt-0.5 ${accent ? 'text-white/85' : 'text-neutral-400'}`}>
        {desc}
      </div>
    </div>
  );
}
