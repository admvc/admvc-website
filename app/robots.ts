import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/membros/', '/api/'],
    },
    sitemap: 'https://igrejaadmvc.org/sitemap.xml',
  }
}
