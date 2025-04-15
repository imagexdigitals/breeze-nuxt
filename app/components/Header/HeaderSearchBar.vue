<template>
  <div class="flex flex-col items-center justify-center flex-grow relative">
    <!-- Search Bar -->
    <div class="px-2 md:px-0 relative w-full">
      <input type="text" placeholder="Search for products..." v-model="searchQuery" @input="searchProducts"
        @keydown.down="navigateResults('down')" @keydown.up="navigateResults('up')" @keydown.enter="handleEnterKey"
        class="w-full border border-zinc-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-nxtkartsecondaryBlue bg-zinc-50" />
      <Icon name="lucide:search" class="absolute left-4 md:left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
    <!-- Search Results with Overlay -->
    <div v-if="searchResults.length" class="search-results-overlay mt-2 md:mt-0">
      <ul class="md:border border-zinc-300 md:rounded-md bg-white shadow-lg">
        <li v-for="(product, index) in searchResults" :key="product.id"
          :class="['px-4 py-1 border-b border-zinc-200', { 'bg-zinc-100': index === selectedIndex }]"
          @mouseover="selectedIndex = index">
          <NuxtLink :to="product.slug" class="block" @click.prevent="selectResult(product.slug)">
            <span class="font-semibold" v-html="highlightMatch(product.name)"></span><br />
            <span class="text-sm">SKU: </span><span class="text-sm" v-html="highlightMatch(product.sku)"></span>
          </NuxtLink>
        </li>

        <!-- See More Results -->
        <li v-if="seeMore"
          class="px-4 py-2 text-center text-white bg-nxtkartsecondaryBlue hover:bg-nxtkartBlue cursor-pointer font-medium"
          @click="viewMoreResults">
          See More Results
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRuntimeConfig, useRouter } from '#app';
const sanctumFetch = useSanctumClient();

// Define the Product interface
interface Product {
  id: number;
  name: string;
  sku: string;
  sale_price: string;
  mrp_price: string;
  slug: string;
}

const config = useRuntimeConfig();
const backendUrl = config.public.BACKEND_URL;
const router = useRouter();

const searchQuery = ref('');
const searchResults = ref<Product[]>([]); // Type the searchResults array
const seeMore = ref(false); // Flag to indicate if there are more results
const selectedIndex = ref<number | null>(null); // Index of the selected result

const searchProducts = async () => {
  if (searchQuery.value.trim().length < 3) {
    searchResults.value = [];
    seeMore.value = false;
    selectedIndex.value = null;
    return;
  }

  try {
    const payload = {
      query: searchQuery.value,
      source: 'nuxt_nxtkart'
    };

    const data = await sanctumFetch('/api/search-products', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Directly use the data since it's already in JSON format
    console.log('Fetched data:', data); // Debugging line
    searchResults.value = data.products;
    seeMore.value = data.seeMore;
    selectedIndex.value = 0; // Set the first result as selected
    console.log('Search Results:', searchResults.value); // Debugging line
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

const highlightMatch = (text: string): string => {
  if (!searchQuery.value.trim()) {
    return text;
  }
  const regex = new RegExp(searchQuery.value.trim(), 'gi');
  return text.replace(regex, (match) => `<span style="background-color: #fdff32;">${match}</span>`);
};

const navigateResults = (direction: 'up' | 'down') => {
  if (searchResults.value.length === 0) return;

  if (direction === 'down') {
    if (selectedIndex.value === null || selectedIndex.value < searchResults.value.length - 1) {
      selectedIndex.value = (selectedIndex.value ?? -1) + 1;
    }
  } else if (direction === 'up') {
    if (selectedIndex.value !== null && selectedIndex.value > 0) {
      selectedIndex.value--;
    }
  }
};

const handleEnterKey = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    // Navigate to the search results page with the current search query
    router.push({ path: '/search', query: { query: searchQuery.value } });
    resetSearch();
  }
};

const selectResult = (slug: string) => {
  router.push(slug);
  resetSearch();
};

const resetSearch = () => {
  searchQuery.value = '';
  searchResults.value = [];
  seeMore.value = false;
  selectedIndex.value = null;
};

const viewMoreResults = () => {
  router.push({ path: '/search', query: { query: searchQuery.value } });
  resetSearch();
};
</script>


<style scoped>
/* Add custom styles for the overlay effect */
.search-results-overlay {
  position: absolute;
  top: 100%;
  /* Position below the search bar */
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 700px;
  /* Adjust as needed */
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.95);
  /* Semi-transparent background */
  border-radius: 0 0 8px 8px;
  /* Rounded corners at the bottom */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Shadow for elevation effect */
}
</style>
