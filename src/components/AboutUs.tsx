'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Cpu,
  Award,
  Target,
  Heart,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const TIMELINE = [
  {
    year: '2014–2019',
    title: 'Saobraćajni fakultet',
    desc: 'Diplomirao na Saobraćajnom fakultetu — stručna osnova za razumevanje konstrukcije vozila, propisa i procesa procene štete.',
    icon: GraduationCap,
  },
  {
    year: '2019–2024',
    title: '5+ godina u Sixt rent a car',
    desc: 'Rad na rukovodećim pozicijama u jednoj od najvećih rent a car kompanija u Evropi. Obrada hiljada slučajeva štete na flotama vozila — od ogrebotina na parkingu do totalnih šteta.',
    icon: Briefcase,
  },
  {
    year: '2025',
    title: 'Audatex sertifikacija',
    desc: 'Obuka i licenca za rad u Audatex sistemu — softveru koji koriste osiguravajuća društva širom Evrope za standardizovanu procenu štete na vozilima.',
    icon: Cpu,
  },
  {
    year: '2026',
    title: 'Damage Expert',
    desc: 'Pokretanje preduzetničke firme Damage Expert Marko Janković PR Niš. Saradnja sa Globos osiguranjem. Cilj: digitalizovati proces procene štete u Srbiji.',
    icon: Award,
  },
];

const VALUES = [
  {
    icon: Target,
    title: 'Preciznost',
    desc: 'Audatex kalkulacija sa OEM cenama delova, realnim satnicama rada i tačnim opisom oštećenja.',
  },
  {
    icon: Heart,
    title: 'Brzina',
    desc: 'Zapisnik za 24h, hitni slučajevi istog dana. Bez čekanja nedeljama na termin.',
  },
  {
    icon: CheckCircle2,
    title: 'Transparentnost',
    desc: 'Klijent vidi svaki deo procene. Bez skrivenih troškova ili nejasnih stavki.',
  },
];

export default function AboutUs() {
  return (
    <section id="o-nama" className="section relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-20 -left-32 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl"
      />
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            O nama
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Iza svakog zapisnika stoji{' '}
            <span className="text-brand-orange">stručnost, ne improvizacija</span>.
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
            Damage Expert nije „još jedna agencija". Ovo je preduzetnički poduhvat baziran na
            višegodišnjem iskustvu u industriji obrade šteta — sa jasnim ciljem da procena štete u
            Srbiji postane brza, transparentna i moderna.
          </p>
        </div>

        {/* Marko card */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-orange/30 to-transparent rounded-3xl blur-2xl" aria-hidden />
              <div className="relative card p-6 md:p-8 bg-gradient-to-br from-brand-black to-brand-ink text-white border-brand-orange/40">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-brand-orange flex items-center justify-center text-white font-display font-extrabold text-3xl shadow-lg shadow-brand-orange/40">
                    MJ
                  </div>
                  <div>
                    <div className="font-display text-2xl font-extrabold">Marko Janković</div>
                    <div className="text-sm text-brand-orange font-semibold mt-0.5">
                      Procenitelj štete · Osnivač
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Damage Expert · Niš
                    </div>
                  </div>
                </div>

                <p className="text-neutral-300 leading-relaxed text-pretty">
                  „U rent a car industriji sam obradio hiljade slučajeva štete — od malih ogrebotina
                  do totalno havarisanih vozila. Tu nema mesta za grešku, jer iza svake procene stoji
                  konkretan račun ka klijentu ili lizingu. Tu rigoroznost donosim u svaki zapisnik
                  koji izrađujem za Damage Expert."
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="font-display text-2xl font-extrabold text-brand-orange">5+</div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-1">
                      Godina iskustva
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-extrabold text-brand-orange">1000+</div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-1">
                      Obrađenih slučajeva
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-extrabold text-brand-orange">24h</div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-1">
                      Maks. zapisnik
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-5">
              Profesionalni put
            </div>
            <ol className="relative space-y-5">
              <div
                aria-hidden
                className="absolute left-[19px] top-3 bottom-3 w-px bg-neutral-200 dark:bg-neutral-800"
              />
              {TIMELINE.map((t, i) => (
                <motion.li
                  key={t.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-4 pl-2"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white dark:bg-brand-ink border-2 border-brand-orange flex items-center justify-center flex-shrink-0">
                    <t.icon className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-xs font-mono font-bold text-brand-orange">{t.year}</div>
                    <div className="font-display font-bold text-lg mt-0.5">{t.title}</div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-neutral-200 dark:border-neutral-900 pt-12">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            Naše vrednosti
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-8 max-w-2xl">
            Tri principa po kojima radimo svaku procenu.
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="font-display text-xl font-bold mb-2">{v.title}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#prijava" className="btn-primary">
              Prijavi štetu sada
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#kontakt" className="btn-secondary">
              Kontaktiraj Marka
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
