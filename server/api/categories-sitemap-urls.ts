// server/api/categories-sitemap-urls.ts
import { defineSitemapEventHandler } from '#imports';
import type { SitemapUrlInput } from '#sitemap/types';

export default defineSitemapEventHandler(async () => {
  // Fetch or generate dynamic category URLs
  const categories = await fetchCategoriesFromDatabaseOrAPI();

  return categories.map(category => ({
    loc: `/categories/${category.slug}`,
    lastmod: category.updatedAt ? new Date(category.updatedAt).toISOString() : new Date().toISOString(),
  })) satisfies SitemapUrlInput[];
});

async function fetchCategoriesFromDatabaseOrAPI() {
  // Replace this with your actual data fetching logic
  return [
    { slug: 'category1', updatedAt: '2023-10-01T00:00:00Z' },
    { slug: 'category2', updatedAt: '2023-10-02T00:00:00Z' },
    // Add more categories as needed
  ];
}
