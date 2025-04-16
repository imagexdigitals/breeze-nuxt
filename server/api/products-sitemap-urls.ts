// server/api/products-sitemap-urls.ts
import { defineSitemapEventHandler } from '#imports';
import type { SitemapUrlInput } from '#sitemap/types';

export default defineSitemapEventHandler(async (e) => {
    // Get the current sitemap chunk index (provided by Nuxt Sitemap module)
    const chunkIndex = e.context.sitemap?.chunkIndex || 0;
    const page = chunkIndex + 1; // Convert to 1-based index
    
    // Fetch products with pagination
    const response = await fetchProductsFromDatabaseOrAPI(page);
    
    return response.data satisfies SitemapUrlInput[];
});

async function fetchProductsFromDatabaseOrAPI(page: number): Promise<{ data: any[] }> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/products-sitemap-urls?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return { data: [] };
    }
}