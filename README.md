# Damage Expert · damageexpert.rs

Profesionalni Next.js sajt za **Damage Expert — Marko Janković PR Niš**.
Procena štete na vozilima · Audatex sistem · Zapisnik za 24h · Niš i okolina.

## Tech stack

- **Next.js 14** (App Router, RSC)
- **React 18** + **TypeScript**
- **Tailwind CSS 3** (custom brand palette: narandzasta `#FF6A00`, crna, bela)
- **Framer Motion** za animacije
- **Lucide React** za ikone
- SEO: metadata, OG tags, JSON-LD (LocalBusiness, Person, FAQPage), sitemap, robots.txt

## Sekcije

1. **Hero** — headline + brojke + brza timeline kartica
2. **Authority traka** — saradnja sa osiguranjima (Globos aktivan, ostali kao mete)
3. **Usluge** — 4 tipa procene + 6 tipova vozila
4. **Interaktivni dijagram vozila** — klikom na deo dobijaš prosečnu cenu (top + side view)
5. **Kalkulator procene** — multi-step sa klasom vozila + selektovanjem delova + nivoom oštećenja
6. **Kako funkcioniše** — 3 koraka (prijava → pregled → zapisnik)
7. **Zašto Damage Expert** — USP grid sa Saobraćajni fakultet + rent a car industrija
8. **Pre/Posle** — interaktivni primeri razlike između procene osiguranja i Audatex procene
9. **Prijava štete online** — 5-step wizard sa upload-om i WhatsApp/Viber/Email submit
10. **FAQ** — sa JSON-LD schema za Google rich results
11. **Edukacija/Blog** — teaser sekcija za buduće postove (SEO)
12. **Kontakt** — telefon, WhatsApp, Viber, email, kancelarija, radno vreme
13. **Floating CTA** — sticky kontakt dugme

## Lokalno pokretanje

```bash
cd damage-expert
npm install
npm run dev
```

Otvori http://localhost:3000

## Deploy na Vercel

### Brzo (Vercel CLI)

```bash
npm i -g vercel
cd damage-expert
vercel
```

### GitHub + Vercel dashboard

1. Push repo na GitHub
2. Idi na vercel.com → "Add New" → "Project"
3. Import GitHub repo, Vercel automatski detektuje Next.js
4. Deploy

### Custom domen

Nakon deploy-a, u Vercel dashboard-u:
1. Project → Settings → Domains → Add `damageexpert.rs`
2. Konfiguriši DNS kod registrara (A zapis na Vercel IP ili CNAME)

## Konfiguracija sadržaja

Sve glavne konstante su u `src/data/`:
- `site.ts` — naziv, telefon, email, adresa, lista osiguranja
- `parts.ts` — cene delova, opis, kategorije (Marko može lako da menja)
- `faq.ts` — pitanja i odgovori

## Tema (dark/light)

- Default: **bela pozadina + crn font + narandzasti akcenti**
- Crni toggle gore desno → uključuje dark mode
- Preference se čuva u `localStorage` pod `de-theme`

## SEO

- Meta description optimizovan za "procena štete", "procena štete Niš"
- Local SEO ključne reči (Niš, Prokuplje, Aleksinac, Pirot, Knjaževac, Zaječar)
- JSON-LD: `LocalBusiness` + `Person` + `FAQPage`
- Sitemap auto-generisan (`/sitemap.xml`)
- `robots.txt` u `/public`

## Disclaimer cena u kalkulatoru i dijagramu

Sve cene su **orijentacione**, bazirane na javno dostupnim cenovnicima
limarsko-farbarskih radova u Srbiji (2025–2026), AMSS katalogu i Audatex bazi.
Konačni iznos procene radi isključivo procenitelj na osnovu konkretnog vozila.

---

**Kontakt:** Marko Janković · +381 64 11 18 914 · marko.jankovic@proceniteljstete.rs
**Adresa:** Vazduhoplovaca 24, Aerodrom Konstantin Veliki, Niš
