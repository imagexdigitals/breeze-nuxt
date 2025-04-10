<template>
  <div class="bg-gray-100 relative min-h-screen">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent">
      </div>
    </div>

    <template v-if="commonData && commonData.products.length">
      <div class="mx-auto py-5 flex gap-8 items-start justify-center">
        <div class="flex w-[90%] gap-x-3">
          <!-- Left Column (20% width) -->
          <div class="w-1/5">
            Filters
          </div>

          <!-- Right Side Column (80% width) -->
          <div class="w-4/5">
            <!-- Title and Sort Component -->
            <TitleSort
              :breadcrumbs="breadcrumbs"
              :title="commonData.name"
              :isBrandPage="isBrandPage"
              :searchQuery="searchQuery"
              :showingText="commonData.pagination.showing"
              :sortOrder="sortOrder"
            />

            <!-- ProductArchive -->
            <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-5 mt-4">
              <ProductArchive v-for="product in commonData.products" :key="product.id" :id="product.id"
                :image="product.image" :name="product.name" :salePrice="product.sale_price"
                :mrpPrice="product.mrp_price" :discountPercentage="product.discount_percentage"
                :brand="product.brand_name" :slug="product.slug" :status="product.status"
                :brandSlug="product.brand_slug" :minimum_qty="product.minimum_qty" />
            </div>

            <!-- Pagination Component -->
            <Pagination
              :currentPage="currentPage"
              :totalPages="commonData.pagination.last_page"
            />
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="!isLoading">
      No products available.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';
import ProductArchive from '@/components/ProductArchive.vue';
import TitleSort from '@/components/ArchiveList/TitleSort.vue';
import Pagination from '@/components/ArchiveList/Pagination.vue';

const config = useRuntimeConfig();
const frontendBaseUrl = config.public.frontendBaseUrl;

interface Breadcrumb {
  name: string;
  url: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  sku: number;
  sale_price: string;
  mrp_price: string;
  discount_percentage: string;
  brand_name: string | null;
  brand_slug: string | null;
  slug: string;
  status: number;
  minimum_qty: number;
  description?: string;
}

interface CommonData {
  id: number;
  name: string;
  slug: string;
  image: string;
  status: number;
  breadcrumb: Breadcrumb[];
  products: Product[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    showing: string;
  };
}

const props = defineProps<{
  apiEndpoint: string;
  isBrandPage: boolean;
}>();

const route = useRoute();
const sanctumFetch = useSanctumClient();

const commonData = ref<CommonData | null>(null);
const breadcrumbs = ref<Breadcrumb[]>([]);
const sortOrder = ref<string | null>(null);
const currentPage = ref<number>(1);
const isLoading = ref<boolean>(true);
const searchQuery = ref<string>('');

const fetchCommonProducts = async (slugOrQuery: string, sort: string | null = null, page: number = 1) => {
  isLoading.value = true;
  try {
    let url = `${props.apiEndpoint}`;
    if (props.isBrandPage || route.name === 'category-slug') {
      url += `/${slugOrQuery}?page=${page}${sort ? `&sort_price=${sort}` : ''}`;
    } else {
      url += `?query=${slugOrQuery}&page=${page}${sort ? `&sort_price=${sort}` : ''}`;
      searchQuery.value = slugOrQuery;
    }
    const response = await sanctumFetch(url, {
      method: 'GET',
    });
    commonData.value = response.data;
    breadcrumbs.value = response.data.breadcrumb;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  isLoading.value = true;
  const slugOrQuery = route.params.slug as string || route.query.query as string;
  const page = parseInt(route.query.page as string) || 1;
  if (slugOrQuery) {
    fetchCommonProducts(slugOrQuery, route.query.sort_price as string | null, page);
  }
});

watch(() => route.query.sort_price, (newSort) => {
  const slugOrQuery = route.params.slug as string || route.query.query as string;
  if (slugOrQuery) {
    fetchCommonProducts(slugOrQuery, newSort as string | null, 1);
  }
});

watch(() => route.query.page, (newPage) => {
  const slugOrQuery = route.params.slug as string || route.query.query as string;
  const page = parseInt(newPage as string) || 1;
  if (slugOrQuery) {
    fetchCommonProducts(slugOrQuery, route.query.sort_price as string | null, page);
  }
});

watch(() => route.query.query, (newQuery) => {
  if (newQuery) {
    const queryString = Array.isArray(newQuery) ? newQuery[0] : newQuery;
    fetchCommonProducts(queryString, route.query.sort_price as string | null, parseInt(route.query.page as string) || 1);
  }
});

useHead({
  title: computed(() => commonData.value ? `${commonData.value.name} ${props.isBrandPage ? 'Brand' : `Search Results "${searchQuery.value}"`}` : 'Search Results'),
  meta: [
    { name: 'description', content: computed(() => commonData.value ? `Browse ${props.isBrandPage ? 'brand' : 'search results'} for ${commonData.value.name}.` : 'Browse search results.') },
    { name: 'keywords', content: computed(() => commonData.value ? `${commonData.value.name}, ${props.isBrandPage ? 'brand' : 'search results'}, products` : 'search results, products') },
    {
      name: 'robots',
      content: computed(() => {
        if (!props.isBrandPage && route.name !== 'category-slug') {
          return 'noindex';
        }
        return 'index';
      })
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": props.isBrandPage ? "Brand" : "SearchResultsPage",
        "name": commonData.value ? commonData.value.name : 'Search Results',
        "description": commonData.value ? `Browse ${props.isBrandPage ? 'brand' : 'search results'} for ${commonData.value.name}.` : 'Browse search results.',
        "url": `${frontendBaseUrl}${route.fullPath}`,
        "mainEntity": commonData.value ? commonData.value.products.map(product => ({
          "@type": "Product",
          "name": product.name,
          "image": product.image,
          "description": product.description,
          "sku": product.sku,
          "brand": {
            "@type": "Brand",
            "name": product.brand_name || 'Unknown'
          },
          "offers": {
            "@type": "Offer",
            "url": `${frontendBaseUrl}/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": product.sale_price,
            "itemCondition": product.status === 1 ? "https://schema.org/NewCondition" : "https://schema.org/Refurbished",
            "availability": product.status === 1 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        })) : []
      })),
    },
  ],
});

</script>
