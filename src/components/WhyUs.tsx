'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, GraduationCap, Briefcase, Cpu, Zap } from 'lucide-react';

const USPS = [
  {
    icon: Clock,
    title: 'Zapisnik za 24h',
    desc: 'U hitnim slučajevima istog dana. Bez čekanja nedeljama na termin osiguranja.',
  },
  {
    icon: MapPin,
    title: 'Dolazimo na adresu',
    desc: 'Ako vozilo nije u voznom stanju ili Vam ne odgovara dolazak - izlazimo na lokaciju.',
  },
  {
    icon: GraduationCap,
    title: 'Saobraćajni fakultet',
    desc: 'Stručna pozadina, ne improvizacija. Razumemo i konstrukciju vozila i propise.',
  },
  {
    icon: Briefcase,
    title: '5+ god. u najvećoj rent a car kompaniji',
    desc: 'Iskustvo iz industrije obrade šteta na velikim flotama. Hiljade slučajeva.',
  },
  {
    icon: Cpu,
    title: 'Audatex sistem',
    desc: 'Procena u softveru koji koriste osiguravajuća društva širom Evrope.',
  },
  {
    icon: Zap,
    title: 'Besplatna konsultacija',
    desc: 'Prvi razgovor je bez obaveza. Recimo Vam da li uopšte ima smisla raditi procenu.',
  },
];

export default function WhyUs() {
  return (
    <section className="section relative">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
              Zašto Damage Expert
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
              Ne dobijate sertifikat za <span className="text-brand-orange">procenitelja</span>.
              <br />
              Dobijate ga kroz <span className="line-through opacity-50">papir</span> iskustvo.
            </h2>
            <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
              U Srbiji ne postoji formalni sertifikat za procenitelje štete na vozilima. Zato je
              najvažnije ko stoji iza procene - obrazovanje, godine prakse i sistemi sa kojima radi.
            </p>

            <div className="mt-8 p-6 rounded-3xl border-2 border-brand-orange/30 bg-brand-orange/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-display font-extrabold">
                  MJ
                </div>
                <div>
                  <div className="font-display font-bold">Marko Janković</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Procenitelj štete · Niš
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                „U rent a caru sam obradio hiljade slučajeva - od ogrebotina na parkingu do
                totalnih šteta na flotama. Tu nema mesta za grešku jer iza svake procene stoji
                račun ka klijentu. Tu rigoroznost donosim u svaki zapisnik koji izrađujem."
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {USPS.map((u, i) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="card p-5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 group-hover:bg-brand-orange/15 flex items-center justify-center mb-3 transition-colors">
                  <u.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <div className="font-bold mb-1">{u.title}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {u.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
