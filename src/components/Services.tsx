'use client';

import { motion } from 'framer-motion';
import {
  Car,
  AlertOctagon,
  ShieldCheck,
  FileText,
  Truck,
  Bike,
  Bus,
  Boxes,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Car,
    title: 'Delimična šteta',
    desc: 'Udari, ogrebotine, lomovi, vandalizam. Audatex procena za osiguranja i klijente.',
    tag: 'Najčešće',
  },
  {
    icon: AlertOctagon,
    title: 'Totalna šteta',
    desc: 'Procena ekonomski totalne štete kada troškovi popravke prelaze tržišnu vrednost.',
    tag: 'Stručno',
  },
  {
    icon: ShieldCheck,
    title: 'Procena za kasko',
    desc: 'Detaljna procena za kasko polise, prihvatljiva za osiguravajuća društva.',
    tag: 'Kasko',
  },
  {
    icon: FileText,
    title: 'Procena za lizing',
    desc: 'Procena štete i stanja vozila za lizing kompanije pri raskidu ili povratu.',
    tag: 'Lizing',
  },
];

const VEHICLES = [
  { icon: Car, label: 'Putnička vozila', primary: true },
  { icon: Truck, label: 'Kombiji', primary: false },
  { icon: Truck, label: 'Kamioni', primary: false },
  { icon: Bike, label: 'Motocikli', primary: false },
  { icon: Boxes, label: 'Prikolice', primary: false },
  { icon: Bus, label: 'Autobusi', primary: false },
];

export default function Services() {
  return (
    <section id="usluge" className="section relative">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            Šta radimo
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Procena štete koju{' '}
            <span className="relative">
              <span className="relative z-10">priznaju</span>
              <span className="absolute left-0 right-0 bottom-1 h-3 bg-brand-orange/30 -z-0" aria-hidden />
            </span>{' '}
            osiguranja.
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
            Sve procene se rade u Audatex sistemu - istom alatu koji koriste i osiguravajuća
            društva. Zapisnik je standardizovan, transparentan i može se koristiti kao validan
            dokument u procesu naplate štete.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="card p-6 group relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-orange/0 group-hover:bg-brand-orange/15 rounded-full transition-colors duration-500" aria-hidden />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-brand-black dark:bg-white flex items-center justify-center mb-4 group-hover:bg-brand-orange transition-colors">
                  <s.icon className="w-6 h-6 text-brand-orange dark:text-brand-black group-hover:text-white transition-colors" />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-brand-orange font-bold mb-1">
                  {s.tag}
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vehicle types */}
        <div className="mt-16 p-6 md:p-10 rounded-3xl bg-neutral-50 dark:bg-brand-ink border border-neutral-200 dark:border-neutral-900">
          <div className="flex items-baseline justify-between gap-4 mb-6 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-2">
                Tipovi vozila
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold">
                Putnička vozila su naš primarni fokus
              </h3>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Šira ponuda dostupna na zahtev
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {VEHICLES.map((v) => (
              <div
                key={v.label}
                className={`p-4 rounded-xl border text-center transition ${
                  v.primary
                    ? 'border-brand-orange bg-brand-orange/10'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-brand-black'
                }`}
              >
                <v.icon className={`w-6 h-6 mx-auto mb-2 ${v.primary ? 'text-brand-orange' : 'text-neutral-500'}`} />
                <div className="text-xs font-semibold">{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
