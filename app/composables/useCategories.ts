// composables/useCategories.ts
import { ref, onMounted } from 'vue';

const CACHE_KEY = 'categories_cache';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export function useCategories() {
  const categories = ref([]);

  const fetchCategories = async () => {
    try {
      const sanctumFetch = useSanctumClient();
      const payload = { source: 'nuxt_nxtkart' };
      const response = await sanctumFetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      categories.value = response;

      // Cache the data with a timestamp
      const cacheData = {
        data: response,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadCategories = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = new Date().getTime();

      // Check if the cache is still valid
      if (now - timestamp < CACHE_DURATION) {
        categories.value = data;
        return;
      }
    }

    // Fetch new data if cache is invalid or not present
    fetchCategories();
  };

  onMounted(() => {
    loadCategories();
  });

  return {
    categories,
    fetchCategories,
  };
}
