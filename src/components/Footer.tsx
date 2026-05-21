import Logo from './Logo';
import { SITE } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 border-t border-neutral-900">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 text-sm text-neutral-400 max-w-md leading-relaxed">
              {SITE.fullName}. Profesionalna procena štete na vozilima u Audatex sistemu.
              Niš i okolina. Saobraćajni fakultet · Iskustvo iz najveće rent a car kompanije na svetu.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SITE.serviceArea.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-full bg-neutral-900 text-xs font-semibold text-neutral-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-4">
              Brzi linkovi
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#usluge" className="text-neutral-400 hover:text-brand-orange">
                  Usluge
                </a>
              </li>
              <li>
                <a href="#dijagram" className="text-neutral-400 hover:text-brand-orange">
                  Delovi vozila · cene
                </a>
              </li>
              <li>
                <a href="#kalkulator" className="text-neutral-400 hover:text-brand-orange">
                  Kalkulator procene
                </a>
              </li>
              <li>
                <a href="#o-nama" className="text-neutral-400 hover:text-brand-orange">
                  O nama · Marko Janković
                </a>
              </li>
              <li>
                <a href="#prijava" className="text-neutral-400 hover:text-brand-orange">
                  Prijavi štetu online
                </a>
              </li>
              <li>
                <a href="#faq" className="text-neutral-400 hover:text-brand-orange">
                  Česta pitanja
                </a>
              </li>
              <li>
                <a href="#blog" className="text-neutral-400 hover:text-brand-orange">
                  Edukacija
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-4">
              Kontakt
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${SITE.phone}`} className="text-white hover:text-brand-orange font-semibold">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-neutral-400 hover:text-brand-orange break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-neutral-400">{SITE.address}</li>
              <li className="text-neutral-400">{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            © {year} {SITE.fullName}. Sva prava zadržana.
          </div>
          <div className="flex items-center gap-4">
            <span>PIB / MB · na zahtev</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>Audatex sistem</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-900/70 text-center text-[11px] text-neutral-600">
          Sajt kreirao{' '}
          <span className="text-neutral-400 font-semibold">Ilija Jovanović PR</span> ·{' '}
          <a
            href="https://nobs.digital"
            target="_blank"
            rel="noopener"
            className="text-brand-orange font-semibold hover:underline"
          >
            NoBS Digital
          </a>{' '}
          agencija za marketing
        </div>
      </div>
    </footer>
  );
}
