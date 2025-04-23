import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const pageParam = event.context.params?.page as string
  const pageMatch = pageParam.match(/category-sitemap-(\d+)/)

  if (!pageMatch) {
    return new Response('Invalid page format', { status: 400 })
  }

  const page = parseInt(pageMatch[1])

  // Get the base URL from the environment variable
  const sanctumBaseUrl = process.env.NUXT_PUBLIC_SANCTUM_BASE_URL;

  const response = await fetch(`${sanctumBaseUrl}/api/categories-sitemap-urls?page=${page}`)
  const data = await response.json()

  const categoryUrls = data.data.map((item: { loc: string, lastmod: string, 'image:loc'?: string, title?: string }) => ({
    loc: item.loc,
    lastmod: item.lastmod,
    'image:loc': item['image:loc'] || null,
    title: item.title || null,
  }))

  const escapeXml = (str: string) => str.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
    return c;
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categoryUrls.map(url => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${escapeXml(url.lastmod)}</lastmod>
    ${url['image:loc'] ? `
    <image:image>
      <image:loc>${escapeXml(url['image:loc'])}</image:loc>
      <image:title>${escapeXml(url.title)}</image:title>
    </image:image>` : ''}
  </url>
  `).join('')}
</urlset>`

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
})
