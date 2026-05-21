'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  X as XIcon,
  Send,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react';
import { SITE } from '@/data/site';

type Step = 0 | 1 | 2 | 3 | 4;

interface FormData {
  damageType: string;
  brand: string;
  model: string;
  year: string;
  km: string;
  damagedParts: string[];
  damageDescription: string;
  files: File[];
  fullName: string;
  phone: string;
  email: string;
  city: string;
  isUrgent: boolean;
  hasPoliceReport: boolean;
  insurance: string;
}

const initial: FormData = {
  damageType: '',
  brand: '',
  model: '',
  year: '',
  km: '',
  damagedParts: [],
  damageDescription: '',
  files: [],
  fullName: '',
  phone: '',
  email: '',
  city: '',
  isUrgent: false,
  hasPoliceReport: false,
  insurance: '',
};

const DAMAGE_TYPES = [
  { id: 'nezgoda', label: 'Saobraćajna nezgoda', icon: '🚗' },
  { id: 'parking', label: 'Oštećenje na parkingu', icon: '🅿️' },
  { id: 'totalna', label: 'Totalna šteta', icon: '⚠️' },
  { id: 'kasko', label: 'Procena za kasko', icon: '🛡️' },
  { id: 'lizing', label: 'Procena za lizing', icon: '📄' },
];

const PART_OPTIONS = [
  'Prednji branik',
  'Zadnji branik',
  'Hauba',
  'Krov',
  'Gepek',
  'Vrata',
  'Blatobran',
  'Farovi',
  'Stop lampe',
  'Retrovizori',
  'Stakla',
  'Šasija/podvozje',
  'Felne',
  'Drugo',
];

export default function ClaimWizard() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(4, (s + 1) as Step));
  const prev = () => setStep((s) => Math.max(0, (s - 1) as Step));

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const togglePart = (part: string) => {
    setData((d) => ({
      ...d,
      damagedParts: d.damagedParts.includes(part)
        ? d.damagedParts.filter((p) => p !== part)
        : [...d.damagedParts, part],
    }));
  };

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 8);
    setData((d) => ({ ...d, files: [...d.files, ...arr].slice(0, 8) }));
  };

  const removeFile = (i: number) =>
    setData((d) => ({ ...d, files: d.files.filter((_, idx) => idx !== i) }));

  const canProceed = useMemo(() => {
    if (step === 0) return !!data.damageType;
    if (step === 1) return !!(data.brand && data.model && data.year);
    if (step === 2) return data.damagedParts.length > 0;
    if (step === 3) return true; // files optional
    if (step === 4) return !!(data.fullName && data.phone);
    return true;
  }, [step, data]);

  // Build message for WhatsApp / Viber / Email
  const buildMessage = () => {
    const lines = [
      `🔧 NOVA PRIJAVA ŠTETE — Damage Expert`,
      ``,
      `📋 Tip štete: ${DAMAGE_TYPES.find((d) => d.id === data.damageType)?.label || data.damageType}`,
      `🚗 Vozilo: ${data.brand} ${data.model} (${data.year})`,
      data.km ? `📊 Kilometraža: ${data.km} km` : '',
      ``,
      `🔨 Oštećeni delovi:`,
      ...data.damagedParts.map((p) => `   • ${p}`),
      ``,
      data.damageDescription ? `📝 Opis: ${data.damageDescription}` : '',
      ``,
      `👤 Klijent: ${data.fullName}`,
      `📞 Telefon: ${data.phone}`,
      data.email ? `📧 Email: ${data.email}` : '',
      data.city ? `📍 Grad: ${data.city}` : '',
      data.insurance ? `🛡️ Osiguranje: ${data.insurance}` : '',
      data.hasPoliceReport ? '✅ Ima policijski zapisnik' : '',
      data.isUrgent ? '🚨 HITNO — istog dana' : '',
      ``,
      `📷 Broj fotografija: ${data.files.length}`,
      ``,
      `— Poslato preko damageexpert.rs`,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const submit = () => {
    setSubmitted(true);
  };

  const message = buildMessage();
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
  const viberLink = `viber://chat?number=%2B${SITE.viber}&draft=${encodeURIComponent(message)}`;
  const mailLink = `mailto:${SITE.email}?subject=${encodeURIComponent(
    'Prijava štete — ' + (data.fullName || 'web prijava')
  )}&body=${encodeURIComponent(message)}`;

  return (
    <section id="prijava" className="section bg-neutral-50 dark:bg-brand-ink relative overflow-hidden">
      <div className="absolute -top-20 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" aria-hidden />
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-orange font-bold mb-3">
            Online prijava štete
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Prijavite štetu za <span className="text-brand-orange">2 minuta</span>.
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-pretty">
            Bez gomile poziva. Popunite kratak wizard, opciono dodajte fotografije i dobićete
            potvrdu prijema. Zapisnik za 24h.
          </p>
        </div>

        <div className="max-w-4xl mx-auto card p-6 md:p-10">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[0, 1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    s <= step ? 'bg-brand-orange' : 'bg-neutral-200 dark:bg-neutral-800'
                  }`}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <SubmittedView
                key="submitted"
                waLink={waLink}
                viberLink={viberLink}
                mailLink={mailLink}
                message={message}
                onReset={() => {
                  setData(initial);
                  setStep(0);
                  setSubmitted(false);
                }}
              />
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="min-h-[360px]"
              >
                {step === 0 && (
                  <div>
                    <StepHeader number={1} title="Tip štete" subtitle="Šta se dogodilo?" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {DAMAGE_TYPES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            update('damageType', t.id);
                            setTimeout(next, 200);
                          }}
                          className={`p-5 rounded-2xl border-2 text-left transition group ${
                            data.damageType === t.id
                              ? 'border-brand-orange bg-brand-orange/10'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-brand-orange/50'
                          }`}
                        >
                          <div className="text-3xl mb-2">{t.icon}</div>
                          <div className="font-bold">{t.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <StepHeader number={2} title="Podaci o vozilu" subtitle="Marka, model, godište" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Marka" value={data.brand} onChange={(v) => update('brand', v)} placeholder="npr. Volkswagen" />
                      <Field label="Model" value={data.model} onChange={(v) => update('model', v)} placeholder="npr. Passat" />
                      <Field
                        label="Godište"
                        value={data.year}
                        onChange={(v) => update('year', v)}
                        placeholder="npr. 2018"
                        type="number"
                      />
                      <Field
                        label="Kilometraža (opciono)"
                        value={data.km}
                        onChange={(v) => update('km', v)}
                        placeholder="npr. 150000"
                        type="number"
                      />
                    </div>
                    <div className="mt-4 grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Osiguranje krivca / vaše"
                        value={data.insurance}
                        onChange={(v) => update('insurance', v)}
                        placeholder="npr. Globos, Dunav..."
                      />
                      <div className="flex items-center gap-2 pt-7">
                        <Checkbox
                          checked={data.hasPoliceReport}
                          onChange={(v) => update('hasPoliceReport', v)}
                          label="Imam policijski zapisnik / EU obrazac"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <StepHeader
                      number={3}
                      title="Oštećeni delovi"
                      subtitle="Štiklirajte sve što je vidljivo oštećeno"
                    />
                    <div className="flex flex-wrap gap-2">
                      {PART_OPTIONS.map((p) => {
                        const active = data.damagedParts.includes(p);
                        return (
                          <button
                            key={p}
                            onClick={() => togglePart(p)}
                            className={`px-4 py-2.5 rounded-full border-2 text-sm font-medium transition ${
                              active
                                ? 'border-brand-orange bg-brand-orange text-white'
                                : 'border-neutral-200 dark:border-neutral-800 hover:border-brand-orange'
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5 inline-block mr-1" />}
                            {p}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-bold mb-2">Opis oštećenja (opciono)</label>
                      <textarea
                        value={data.damageDescription}
                        onChange={(e) => update('damageDescription', e.target.value)}
                        rows={4}
                        placeholder="Kratko opišite šta se desilo i koja su glavna oštećenja..."
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-brand-black focus:outline-none focus:border-brand-orange transition resize-none"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <StepHeader
                      number={4}
                      title="Fotografije"
                      subtitle="Opciono — pomaže nam da pripremimo procenu"
                    />
                    <label
                      htmlFor="files"
                      className="block border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-10 text-center cursor-pointer hover:border-brand-orange transition group"
                    >
                      <Upload className="w-10 h-10 mx-auto text-neutral-400 group-hover:text-brand-orange transition mb-3" />
                      <div className="font-bold">Kliknite ili prevucite fotografije</div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Preporuka: 4 ugla vozila + foto svakog oštećenja izbliza. Max 8 fotografija.
                      </div>
                      <input
                        id="files"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => onFiles(e.target.files)}
                        className="hidden"
                      />
                    </label>

                    {data.files.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {data.files.map((f, i) => (
                          <div
                            key={i}
                            className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={URL.createObjectURL(f)}
                              alt={f.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => removeFile(i)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-brand-orange"
                              aria-label="Ukloni"
                            >
                              <XIcon className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <StepHeader number={5} title="Kontakt podaci" subtitle="Da Vas brzo kontaktiramo" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Ime i prezime *"
                        value={data.fullName}
                        onChange={(v) => update('fullName', v)}
                        placeholder="Marko Marković"
                      />
                      <Field
                        label="Telefon *"
                        value={data.phone}
                        onChange={(v) => update('phone', v)}
                        placeholder="+381 6X XXX XXXX"
                        type="tel"
                      />
                      <Field
                        label="Email (opciono)"
                        value={data.email}
                        onChange={(v) => update('email', v)}
                        placeholder="ime@email.com"
                        type="email"
                      />
                      <Field
                        label="Grad / lokacija"
                        value={data.city}
                        onChange={(v) => update('city', v)}
                        placeholder="Niš"
                      />
                    </div>
                    <div className="mt-4">
                      <Checkbox
                        checked={data.isUrgent}
                        onChange={(v) => update('isUrgent', v)}
                        label="🚨 Hitan slučaj — potreban mi je zapisnik istog dana"
                      />
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-600 dark:text-neutral-400">
                      Klikom na „Pošalji prijavu" slažete se da Vas kontaktiramo radi izrade
                      procene. Vaši podaci se koriste isključivo za potrebe izrade zapisnika i ne
                      prosleđuju se trećim licima.
                    </div>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={prev}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Nazad
                  </button>
                  {step < 4 ? (
                    <button
                      onClick={next}
                      disabled={!canProceed}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Dalje
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={!canProceed}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Pošalji prijavu
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function StepHeader({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-mono text-brand-orange font-bold mb-1">KORAK {number}/5</div>
      <h3 className="font-display text-2xl md:text-3xl font-extrabold">{title}</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-brand-black focus:outline-none focus:border-brand-orange transition"
      />
    </div>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left w-full p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
    >
      <div
        className={`w-5 h-5 mt-0.5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition ${
          checked ? 'bg-brand-orange border-brand-orange' : 'border-neutral-300 dark:border-neutral-700'
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function SubmittedView({
  waLink,
  viberLink,
  mailLink,
  message,
  onReset,
}: {
  waLink: string;
  viberLink: string;
  mailLink: string;
  message: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 rounded-full bg-brand-orange/15 flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-brand-orange" />
      </div>
      <h3 className="font-display text-3xl font-extrabold mb-3">Prijava je spremna za slanje</h3>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8">
        Izaberite kanal preko kog želite da pošaljete prijavu Marku. Vaši podaci su već
        formatirani — samo kliknite, otvoriće se aplikacija sa pripremljenom porukom.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
        <a
          href={waLink}
          target="_blank"
          rel="noopener"
          className="p-5 rounded-2xl bg-[#25D366] text-white hover:bg-[#1eb958] transition group"
        >
          <MessageCircle className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition" />
          <div className="font-bold">WhatsApp</div>
          <div className="text-xs opacity-90 mt-1">Pošalji odmah</div>
        </a>
        <a
          href={viberLink}
          className="p-5 rounded-2xl bg-[#7360F2] text-white hover:bg-[#5d4cd1] transition group"
        >
          <Phone className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition" />
          <div className="font-bold">Viber</div>
          <div className="text-xs opacity-90 mt-1">Pošalji odmah</div>
        </a>
        <a
          href={mailLink}
          className="p-5 rounded-2xl bg-brand-orange text-white hover:bg-brand-orangeDark transition group"
        >
          <Mail className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition" />
          <div className="font-bold">Email</div>
          <div className="text-xs opacity-90 mt-1">Pošalji odmah</div>
        </a>
      </div>

      <details className="mt-8 max-w-2xl mx-auto text-left">
        <summary className="cursor-pointer text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-orange">
          Pregledaj poruku koja se šalje
        </summary>
        <pre className="mt-3 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-xs whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
          {message}
        </pre>
      </details>

      <button onClick={onReset} className="mt-8 text-sm text-neutral-500 hover:text-brand-orange">
        ← Nova prijava
      </button>
    </motion.div>
  );
}
