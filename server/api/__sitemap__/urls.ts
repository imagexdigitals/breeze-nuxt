// server/api/__sitemap__/urls.ts
import { defineSitemapEventHandler } from '#imports';
import type { SitemapUrlInput } from '#sitemap/types';

export default defineSitemapEventHandler(() => {
  return [
    {
      loc: '/', // Homepage
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/about', // About page
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/contacts', // Contact page
      lastmod: new Date().toISOString(),
    },
    // Add more URLs as needed
  ] satisfies SitemapUrlInput[];
});
