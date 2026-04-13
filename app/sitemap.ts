import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://horeca-plus.gr';
  const now = new Date();

  return [
    { url: `${base}/el/home`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/en/home`, lastModified: now, changeFrequency: 'weekly', priority: 1 },

    { url: `${base}/el/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/en/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    { url: `${base}/el/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/en/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },

    { url: `${base}/el/casestudies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/en/casestudies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    { url: `${base}/el/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/en/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}