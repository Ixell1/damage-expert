'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { SITE } from '@/data/site';

export default function Contact() {
  return (
    <section id="kontakt" className="section relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/15 rounded-full blur-3xl"
      />
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            Kontakt
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Pozovite, ili pišite. <span className="text-brand-orange">Brz odgovor.</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Pon–Sub · 09:00–17:00 · Niš
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <motion.a
            href={`tel:${SITE.phone}`}
            whileHover={{ y: -4 }}
            className="card p-6 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 group-hover:bg-brand-orange flex items-center justify-center mb-4 transition-colors">
              <Phone className="w-6 h-6 text-brand-orange group-hover:text-white transition-colors" />
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
              Telefon
            </div>
            <div className="font-display text-xl font-bold mt-1">{SITE.phoneDisplay}</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Pozovi za brz odgovor
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-brand-orange font-semibold text-sm">
              Pozovi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          <motion.a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener"
            whileHover={{ y: -4 }}
            className="card p-6 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 group-hover:bg-[#25D366] flex items-center justify-center mb-4 transition-colors">
              <MessageCircle className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" />
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
              WhatsApp / Viber
            </div>
            <div className="font-display text-xl font-bold mt-1">{SITE.phoneDisplay}</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Brza poruka, slike - sve u jednom mestu
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-brand-orange font-semibold text-sm">
              Otvori chat
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          <motion.a
            href={`mailto:${SITE.email}`}
            whileHover={{ y: -4 }}
            className="card p-6 group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-white group-hover:bg-brand-orange flex items-center justify-center mb-4 transition-colors">
              <Mail className="w-6 h-6 text-brand-orange dark:text-brand-black group-hover:text-white transition-colors" />
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
              Email
            </div>
            <div className="font-display text-lg font-bold mt-1 break-all">{SITE.email}</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Za detaljne upite i dokumenta
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-brand-orange font-semibold text-sm">
              Pošalji email
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
                  Kancelarija
                </div>
                <div className="font-display text-lg font-bold mt-1">{SITE.address}</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  Klijent može doći u kancelariju ili Vam dolazimo na adresu u radijusu od 50km.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SITE.serviceArea.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-xs font-semibold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 md:p-8 bg-gradient-to-br from-brand-black to-brand-ink text-white border-brand-orange/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-brand-orange font-bold">
                  Radno vreme
                </div>
                <div className="font-display text-lg font-bold mt-1">{SITE.hours}</div>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                  Hitni slučajevi van radnog vremena - pošaljite WhatsApp poruku ili Viber, javimo
                  se čim budemo u mogućnosti.
                </p>
                <a href="#prijava" className="mt-4 btn-primary">
                  Prijavi štetu online
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
