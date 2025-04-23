import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async (event) => {
  // Get the base URL from the environment variable
  const sanctumBaseUrl = process.env.NUXT_PUBLIC_SANCTUM_BASE_URL;

  // Fetch the initial data to get the total number of pages
  const response = await fetch(`${sanctumBaseUrl}/api/products-sitemap-urls?page=1`)
  const data = await response.json()
  const lastPage = data.last_page

  // Create an array of sitemap URLs
  const sitemapUrls: SitemapUrlInput[] = []

  for (let page = 1; page <= lastPage; page++) {
    sitemapUrls.push({
      loc: `/api/__sitemap__/products/product-sitemap-${page}.xml`,
      lastmod: new Date().toISOString(),
    })
  }

  return sitemapUrls satisfies SitemapUrlInput[]
})
