import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://horeca-plus.gr/sitemap.xml',
    host: 'https://horeca-plus.gr',
  };
}