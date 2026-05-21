import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://proceniteljstete.rs'),
  title: {
    default: 'Procenitelj štete - Damage Expert | Profesionalna procena štete na vozilima Niš',
    template: '%s · Damage Expert',
  },
  description:
    'Procenitelj štete na vozilima u Nišu i okolini. Damage Expert. Audatex procena koju prihvataju sve osiguravajuće kuće u Srbiji. Zapisnik za 24h, dolazak na adresu, 5+ godina iskustva (Sixt rent a car), Saobraćajni fakultet. Jedini sa online prijavom štete u Srbiji.',
  applicationName: 'Damage Expert',
  authors: [{ name: 'Damage Expert Marko Janković PR Niš', url: 'https://proceniteljstete.rs' }],
  creator: 'Damage Expert - Marko Janković PR Niš',
  publisher: 'Damage Expert - Marko Janković PR Niš',
  generator: 'Next.js',
  keywords: [
    'procenitelj štete',
    'procenitelj štete Niš',
    'procenitelj štete vozila',
    'procenitelj štete na vozilima',
    'procena štete na vozilima',
    'procena štete Niš',
    'procena štete vozila Niš',
    'online procena štete',
    'online prijava štete',
    'naplata štete Niš',
    'vestačenje vozila',
    'audatex procena',
    'audatex Niš',
    'audatex sistem Srbija',
    'kasko procena štete',
    'totalna šteta',
    'delimicna šteta',
    'procenitelj vozila Niš',
    'sudski procenitelj vozila',
    'osiguranje vozila procena',
    'damage expert',
    'damage expert Niš',
    'Marko Janković procenitelj',
    'procena štete Prokuplje',
    'procena štete Aleksinac',
    'procena štete Pirot',
    'procena štete Knjaževac',
    'procena štete Zaječar',
    'procenitelj havarisana vozila',
    'procenitelj saobraćajne nezgode',
    'zapisnik o oštećenju vozila',
    'procena vrednosti vozila Niš',
    'naknada štete vozila Niš',
    'procenitelj za lizing',
    'Globos osiguranje Niš',
  ],
  referrer: 'origin-when-cross-origin',
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://proceniteljstete.rs',
    siteName: 'Damage Expert - Procenitelj štete',
    title: 'Procenitelj štete - Damage Expert | Zapisnik za 24h | Niš',
    description:
      'Procenitelj štete na vozilima Niš. Damage Expert. Audatex procena koju prihvataju sve osiguravajuće kuće. Dolazimo na adresu. Zapisnik za 24h. Jedini sa online prijavom štete u Srbiji.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Damage Expert - Procenitelj štete na vozilima Niš',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Procenitelj štete - Damage Expert',
    description:
      'Procenitelj štete na vozilima u Nišu. Zapisnik za 24h. Audatex sistem. Procene 20% veće od konkurencije.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://proceniteljstete.rs',
    languages: {
      'sr-RS': 'https://proceniteljstete.rs',
      'sr-Latn-RS': 'https://proceniteljstete.rs',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'Automotive',
  classification: 'Vehicle Damage Assessment Services',
  other: {
    // Local SEO - geo meta tags
    'geo.region': 'RS-18',
    'geo.placename': 'Niš',
    'geo.position': '43.3373;21.8537',
    'ICBM': '43.3373, 21.8537',
    // Verification tagovi - placeholder. Korisnik treba da postavi prave vrednosti
    // 'google-site-verification': 'XXXXXXXXXXXXXXXXXXXXXXXX',
    // 'msvalidate.01': 'XXXXXXXXXXXXXXXXXXXXXXXX',
    // 'yandex-verification': 'XXXXXXXXXXXXXXXX',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ============================================================================
// JSON-LD Structured Data
// Multiple schemas u jednom @graph za max SEO impact:
// 1. LocalBusiness + AutomotiveBusiness (Google ima posebnu kategoriju)
// 2. Organization
// 3. Person (Marko - founder)
// 4. WebSite + SearchAction
// 5. Service (4 podusluge: delimicna, totalna, kasko, lizing)
// 6. BreadcrumbList
// 7. FAQPage (već postoji u Faq.tsx)
// ============================================================================
const SITE_URL = 'https://proceniteljstete.rs';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. LocalBusiness + AutomotiveBusiness (kombinovano za max recognition)
    {
      '@type': ['LocalBusiness', 'AutomotiveBusiness', 'ProfessionalService'],
      '@id': `${SITE_URL}/#business`,
      name: 'Damage Expert - Marko Janković PR Niš',
      legalName: 'Damage Expert Marko Janković PR Niš',
      alternateName: ['Damage Expert', 'Procenitelj štete - Damage Expert'],
      image: [`${SITE_URL}/og.png`, `${SITE_URL}/logo-mark.png`],
      logo: `${SITE_URL}/logo-mark.png`,
      url: SITE_URL,
      telephone: '+381641118914',
      email: 'jankovic.marko0202@gmail.com',
      priceRange: 'RSD',
      currenciesAccepted: 'RSD',
      paymentAccepted: ['Cash', 'Bank transfer'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vazduhoplovaca 24',
        addressLocality: 'Niš',
        addressRegion: 'Nišavski okrug',
        postalCode: '18000',
        addressCountry: {
          '@type': 'Country',
          name: 'Srbija',
          alternateName: 'RS',
        },
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.3373,
        longitude: 21.8537,
      },
      areaServed: [
        { '@type': 'City', name: 'Niš', '@id': 'https://www.wikidata.org/wiki/Q83203' },
        { '@type': 'City', name: 'Prokuplje' },
        { '@type': 'City', name: 'Aleksinac' },
        { '@type': 'City', name: 'Pirot' },
        { '@type': 'City', name: 'Knjaževac' },
        { '@type': 'City', name: 'Zaječar' },
        {
          '@type': 'GeoCircle',
          geoMidpoint: { '@type': 'GeoCoordinates', latitude: 43.3373, longitude: 21.8537 },
          geoRadius: '50000',
        },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '17:00',
        },
      ],
      description:
        'Procenitelj štete - Damage Expert. Profesionalna procena štete na vozilima u Nišu i okolini (Prokuplje, Aleksinac, Pirot, Knjaževac, Zaječar). Audatex procena koju prihvataju sve osiguravajuće kuće u Srbiji. Dolazak na adresu, zapisnik za 24 sata. Jedini u Srbiji sa online prijavom štete.',
      slogan: 'Procena u 3 koraka - bez odugovlačenja i čekanja',
      knowsLanguage: ['sr', 'sr-Latn', 'en'],
      foundingDate: '2026-03-01',
      founder: { '@id': `${SITE_URL}/#marko` },
      employee: { '@id': `${SITE_URL}/#marko` },
      hasOfferCatalog: { '@id': `${SITE_URL}/#offer-catalog` },
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Procena delimične štete',
          priceCurrency: 'RSD',
          price: '10000',
          description: 'Audatex procena delimične štete na vozilu - udari, ogrebotine, lomovi.',
        },
        {
          '@type': 'Offer',
          name: 'Procena totalne štete',
          priceCurrency: 'RSD',
          price: '10000',
          description:
            'Audatex procena ekonomski totalne štete kada troškovi popravke prelaze tržišnu vrednost.',
        },
        {
          '@type': 'Offer',
          name: 'Procena za kasko osiguranje',
          priceCurrency: 'RSD',
          price: '10000',
          description: 'Detaljna procena za kasko polise, prihvatljiva za osiguravajuća društva.',
        },
        {
          '@type': 'Offer',
          name: 'Procena za lizing kompanije',
          priceCurrency: 'RSD',
          price: '10000',
          description: 'Procena štete i stanja vozila za lizing kompanije pri raskidu ili povratu.',
        },
      ],
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/#prijava`,
          inLanguage: 'sr-Latn-RS',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'Reservation',
          name: 'Online prijava procene štete',
        },
      },
      sameAs: [],
    },

    // 2. Organization (za brand recognition)
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Damage Expert',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-mark.png`,
        width: 512,
        height: 512,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+381641118914',
        contactType: 'customer service',
        email: 'jankovic.marko0202@gmail.com',
        areaServed: 'RS',
        availableLanguage: ['Serbian', 'English'],
      },
    },

    // 3. Person (Marko - founder + procenitelj)
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#marko`,
      name: 'Marko Janković',
      jobTitle: 'Procenitelj štete na vozilima',
      worksFor: { '@id': `${SITE_URL}/#business` },
      affiliation: { '@id': `${SITE_URL}/#business` },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Saobraćajni fakultet',
      },
      knowsAbout: [
        'Audatex sistem',
        'Procena štete na vozilima',
        'Kasko osiguranje',
        'Totalna šteta',
        'Delimična šteta',
        'Procena za lizing',
        'Auto industrija',
        'Rent a car operacije',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Procenitelj štete na vozilima',
        occupationLocation: { '@type': 'City', name: 'Niš' },
        skills: 'Audatex sistem, procena štete, Sixt rent a car iskustvo, Saobraćajni fakultet',
        experienceRequirements: '5+ godina u rent a car industriji',
      },
    },

    // 4. WebSite + SearchAction (omogućava sitelinks search box u Google)
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Damage Expert - Procenitelj štete',
      description: 'Profesionalna procena štete na vozilima u Nišu i okolini',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'sr-Latn-RS',
    },

    // 5. WebPage (root)
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Procenitelj štete - Damage Expert | Niš',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      description:
        'Procenitelj štete na vozilima u Nišu. Audatex procena prihvaćena u svim osiguravajućim kućama. Zapisnik za 24h.',
      inLanguage: 'sr-Latn-RS',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
      },
      breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
    },

    // 6. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Početna',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Procena štete na vozilima',
          item: `${SITE_URL}/#usluge`,
        },
      ],
    },

    // 7. Service - glavna usluga + offerCatalog
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service`,
      name: 'Procena štete na vozilima',
      alternateName: 'Damage Expert procena štete',
      serviceType: 'Vehicle damage assessment',
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: [
        { '@type': 'City', name: 'Niš' },
        { '@type': 'City', name: 'Prokuplje' },
        { '@type': 'City', name: 'Aleksinac' },
        { '@type': 'City', name: 'Pirot' },
        { '@type': 'City', name: 'Knjaževac' },
        { '@type': 'City', name: 'Zaječar' },
      ],
      description:
        'Profesionalna procena štete na vozilima u Audatex sistemu. Zapisnik za 24h, dolazak na adresu, prihvatljiva za sve osiguravajuće kuće u Srbiji.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'RSD',
        price: '10000',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/#prijava`,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        '@id': `${SITE_URL}/#offer-catalog`,
        name: 'Usluge procene štete',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Vrste procene',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Procena delimične štete',
                  description: 'Audatex procena udara, ogrebotina, lomova i vandalizma.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Procena totalne štete',
                  description:
                    'Audatex procena havarisanih vozila i ekonomski totalne štete.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Procena za kasko osiguranje',
                  description: 'Procena prihvatljiva za sve osiguravajuće kuće u Srbiji.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Procena za lizing kompanije',
                  description: 'Procena štete i stanja vozila pri raskidu ili povratu.',
                },
              },
            ],
          },
        ],
      },
      audience: {
        '@type': 'Audience',
        audienceType: 'Vozači, osiguravajuća društva, lizing kompanije, advokati',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr-Latn-RS" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://proceniteljstete.rs" />

        {/* DNS prefetch + preconnect za fonts + analytics */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Damage Expert" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Theme color hardcoded fallback */}
        <meta name="theme-color" content="#FF6A00" />

        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('de-theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e){}
            `,
          }}
        />
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
