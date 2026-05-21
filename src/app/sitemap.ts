import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://damageexpert.rs';
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/#usluge`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/#kalkulator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/#prijava`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/#blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/#faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#kontakt`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
