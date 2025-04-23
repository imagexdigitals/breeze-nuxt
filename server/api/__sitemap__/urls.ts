// server/api/__sitemap__/urls.ts
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async (event) => {
  const urls: SitemapUrlInput[] = [
    {
      loc: '/', // Home page
      lastmod: new Date().toISOString(),
      priority: 1.0, // Highest priority
      changefreq: 'daily', // Frequency of changes
    },
    {
      loc: '/contact', // Contact page
      lastmod: new Date().toISOString(),
      priority: 0.8, // High priority
      changefreq: 'monthly', // Frequency of changes
    },
    {
      loc: '/about-us', // About Us page
      lastmod: new Date().toISOString(),
      priority: 0.8, // High priority
      changefreq: 'monthly', // Frequency of changes
    }
  ];

  return urls satisfies SitemapUrlInput[];
});
