'use client';

import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

const POSTS = [
  {
    title: 'Kako se obračunava totalna a kako delimična šteta?',
    excerpt:
      'Ekonomski totalna šteta nastaje kada troškovi popravke prelaze tržišnu vrednost vozila. Delimična se računa preko stvarnih troškova.',
    readTime: '4 min',
    tag: 'Vodič',
    color: 'from-brand-orange/30 to-brand-orange/5',
  },
  {
    title: 'Šta sve treba uraditi nakon saobraćajne nezgode?',
    excerpt:
      'EU obrazac, fotografije, policija, osiguranje, procena. Korak-po-korak vodič koji Vam štedi nedelje i hiljade dinara.',
    readTime: '6 min',
    tag: 'Praktično',
    color: 'from-neutral-900/40 to-neutral-900/5 dark:from-white/30 dark:to-white/5',
  },
  {
    title: 'Zašto Audatex procena vredi više nego brza procena osiguranja?',
    excerpt:
      'Audatex je sistem koji koriste osiguravajuća društva širom Evrope. Procena je transparentna, standardizovana i teško osporiva.',
    readTime: '5 min',
    tag: 'Stručno',
    color: 'from-brand-orange/20 to-transparent',
  },
];

export default function BlogTeaser() {
  return (
    <section id="blog" className="section bg-neutral-50 dark:bg-brand-ink">
      <div className="container-x">
        <div className="flex items-baseline justify-between gap-4 mb-12 flex-wrap">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Edukacija
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
              Razumevanje{' '}
              <span className="text-brand-orange">prava i procesa</span> štedi vam novac.
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Uskoro - Blog sa praktičnim vodičima
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {POSTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 relative overflow-hidden group cursor-pointer h-full flex flex-col"
            >
              <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${p.color} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700`} aria-hidden />
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-orange">
                    {p.tag}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {p.readTime}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                  {p.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  Uskoro
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
