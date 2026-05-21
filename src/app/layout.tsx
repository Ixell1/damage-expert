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
  metadataBase: new URL('https://damageexpert.rs'),
  title: {
    default: 'Damage Expert — Profesionalna procena štete na vozilima | Niš',
    template: '%s · Damage Expert',
  },
  description:
    'Profesionalna procena štete na vozilima u Nišu i okolini. Zapisnik za 24h, dolazak na adresu, iskustvo iz Sixt rent a car industrije, Saobraćajni fakultet. Audatex procena za osiguranja i klijente.',
  keywords: [
    'procena štete na vozilima',
    'procena štete Niš',
    'procena štete vozila Niš',
    'naplata štete',
    'vestačenje vozila',
    'audatex procena',
    'kasko procena štete',
    'totalna šteta',
    'delimicna šteta',
    'procenitelj vozila Niš',
    'osiguranje vozila procena',
    'damage expert',
    'Marko Janković procena',
    'procena štete Prokuplje',
    'procena štete Aleksinac',
    'procena štete Pirot',
    'procena štete Knjaževac',
    'procena štete Zaječar',
  ],
  authors: [{ name: 'Damage Expert Marko Janković PR Niš' }],
  creator: 'Damage Expert',
  publisher: 'Damage Expert',
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://damageexpert.rs',
    siteName: 'Damage Expert',
    title: 'Damage Expert — Procena štete na vozilima | Zapisnik za 24h',
    description:
      'Profesionalna procena štete u Nišu i okolini. Audatex sistem. Dolazimo na adresu. Zapisnik za 24h. Besplatna konsultacija.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Damage Expert' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Damage Expert — Procena štete na vozilima',
    description:
      'Profesionalna procena štete na vozilima u Nišu. Zapisnik za 24h. Audatex sistem.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://damageexpert.rs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Automotive',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://damageexpert.rs/#business',
      name: 'Damage Expert — Marko Janković PR Niš',
      image: 'https://damageexpert.rs/og.png',
      url: 'https://damageexpert.rs',
      telephone: '+381641118914',
      email: 'jankovic.marko0202@gmail.com',
      priceRange: 'RSD',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vazduhoplovaca 24',
        addressLocality: 'Niš',
        postalCode: '18000',
        addressCountry: 'RS',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.3373,
        longitude: 21.8537,
      },
      areaServed: [
        { '@type': 'City', name: 'Niš' },
        { '@type': 'City', name: 'Prokuplje' },
        { '@type': 'City', name: 'Aleksinac' },
        { '@type': 'City', name: 'Pirot' },
        { '@type': 'City', name: 'Knjaževac' },
        { '@type': 'City', name: 'Zaječar' },
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
        'Profesionalna procena štete na vozilima u Nišu i okolini. Audatex sistem, dolazak na adresu, zapisnik za 24h.',
      sameAs: [],
    },
    {
      '@type': 'Person',
      '@id': 'https://damageexpert.rs/#marko',
      name: 'Marko Janković',
      jobTitle: 'Procenitelj štete na vozilima',
      worksFor: { '@id': 'https://damageexpert.rs/#business' },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Saobraćajni fakultet',
      },
      knowsAbout: ['Audatex', 'Procena štete', 'Kasko osiguranje', 'Totalna šteta'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('de-theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches === false && false)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e){}
            `,
          }}
        />
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
