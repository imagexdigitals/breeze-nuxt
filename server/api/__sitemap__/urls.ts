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
      loc: '/track-order', // Track My Order page
      lastmod: new Date().toISOString(),
      priority: 0.8, // High priority
      changefreq: 'monthly', // Frequency of changes
    },
    {
      loc: '/my-account', // My Account page
      lastmod: new Date().toISOString(),
      priority: 0.8, // High priority
      changefreq: 'monthly', // Frequency of changes
    },
    {
      loc: '/return-and-refund', // Return & Refund page
      lastmod: new Date().toISOString(),
      priority: 0.6, // Medium priority
      changefreq: 'yearly', // Frequency of changes
    },
    {
      loc: '/shipping-policy', // Shipping Policy page
      lastmod: new Date().toISOString(),
      priority: 0.6, // Medium priority
      changefreq: 'yearly', // Frequency of changes
    },
    {
      loc: '/privacy-policy', // Privacy Policy page
      lastmod: new Date().toISOString(),
      priority: 0.6, // Medium priority
      changefreq: 'yearly', // Frequency of changes
    },
    {
      loc: '/terms-and-condition', // Terms and Condition page
      lastmod: new Date().toISOString(),
      priority: 0.6, // Medium priority
      changefreq: 'yearly', // Frequency of changes
    },
    {
      loc: '/about', // About NxtKart page
      lastmod: new Date().toISOString(),
      priority: 0.8, // High priority
      changefreq: 'monthly', // Frequency of changes
    },
    {
      loc: '/careers', // Careers page
      lastmod: new Date().toISOString(),
      priority: 0.7, // Medium-high priority
      changefreq: 'monthly', // Frequency of changes
    },
    {
      loc: '/blog', // Blog page
      lastmod: new Date().toISOString(),
      priority: 0.7, // Medium-high priority
      changefreq: 'weekly', // Frequency of changes
    }
  ];

  return urls satisfies SitemapUrlInput[];
});
