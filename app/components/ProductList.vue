<template>
  <div class="bg-gray-100 relative min-h-screen">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent">
      </div>
    </div>

    <template v-if="commonData && commonDataProducts.length">
      <div class="mx-auto py-3 md:py-5 flex gap-8 items-start justify-center">
        <div class="flex w-full md:w-[90%] gap-x-3 flex-col md:flex-row">
          <!-- Left Column (20% width on desktop, hidden on mobile) -->
          <div v-if="!isMobile" class="w-1/5 md:block hidden">
            <div class="bg-white py-8 flex items-center justify-center">
              <span class="text-center font-semibold">No Filters Available</span>
            </div>
          </div>


          <!-- Right Side Column (100% width on mobile, 80% width on desktop) -->
          <div class="w-full md:w-4/5">
            <!-- Display category icons -->
            <div v-if="commonData.child_categories && commonData.child_categories.length"
              class="grid grid-cols-3 md:grid-cols-8 gap-4 overflow-x-auto mb-4 bg-white border-y md:border-none md:shadow-sm rounded-sm px-2 py-3 md:p-4">

              <NuxtLink v-for="category in commonData.child_categories" :key="category.id"
                :to="`/category/${category.slug}`" class="flex flex-col items-center">

                <div class="w-24 h-24 rounded-full flex items-center justify-center"
                  :style="`background: linear-gradient(135deg, #43C6AC, #F8FFAE);`">
                  <img :src="category.image || 'https://placehold.co/100x100'" :alt="category.name"
                    class="w-20 h-20 object-cover rounded-full border-2 border-white p-1" />
                </div>

                <span class="text-sm text-center mt-1">{{ category.name }}</span>
              </NuxtLink>
            </div>


            <!-- Title and Sort -->
            <div class="bg-white border-y md:border-none md:shadow-sm rounded-sm p-4">
              <div>
                <!-- Scrollable Breadcrumb -->
                <nav aria-label="breadcrumb" class="breadcrumb-container">
                  <ol class="flex overflow-x-auto">
                    <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center text-sm shrink-0">
                      <NuxtLink :to="crumb.url" class="text-gray-700 font-medium hover:text-secondaryBlue">{{ crumb.name
                      }}</NuxtLink>
                      <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
                    </li>
                  </ol>
                </nav>
              </div>

              <div class="block md:flex items-center space-x-0 md:space-x-4 md:mt-4">
                <h1 class="text-xl font-bold text-gray-800">
                  {{ commonData.name }}
                  <span v-if="isBrandPage">Product Online</span>
                  <span v-else-if="searchQuery">"{{ searchQuery }}"</span>
                </h1>

                <p class="text-sm text-gray-600 mt-1">{{ commonData.pagination.showing }}</p>
              </div>

              <div class="flex items-center space-x-2 mt-4">
                <p class="font-semibold text-gray-600">Sort by:</p>
                <button @click="sortProducts('low')"
                  :class="['border', 'px-4', 'py-1', 'rounded-3xl', 'font-medium', 'text-sm', sortOrder === 'low' ? 'border-nxtkartsecondaryBlue text-nxtkartsecondaryBlue' : 'border-gray-300']">
                  Low to High
                </button>
                <button @click="sortProducts('high')"
                  :class="['border', 'px-4', 'py-1', 'rounded-3xl', 'font-medium', 'text-sm', sortOrder === 'high' ? 'border-nxtkartsecondaryBlue text-nxtkartsecondaryBlue' : 'border-gray-300']">
                  High to Low
                </button>
              </div>
            </div>

            <!-- ProductArchive -->
            <div class="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-5 mt-4">
              <ProductArchive v-for="product in commonDataProducts" :key="product.id" :id="product.id"
                :image="product.image" :name="product.name" :salePrice="product.sale_price"
                :mrpPrice="product.mrp_price" :discountPercentage="product.discount_percentage"
                :brand="product.brand_name" :slug="product.slug" :status="product.status"
                :brandSlug="product.brand_slug" :minimum_qty="product.minimum_qty" />
            </div>

            <!-- Archive Pagination -->
            <div class="flex justify-center mt-4 space-x-2">
              <button v-for="page in pages" :key="page" @click="goToPage(page)" :class="[
                'border',
                'rounded-full',
                'w-10',
                'h-10',
                'flex',
                'items-center',
                'justify-center',
                currentPage === page ? 'bg-nxtkartsecondaryBlue text-white' : 'bg-white text-nxtkartsecondaryBlue'
              ]">
                {{ page }}
              </button>
              <span v-if="commonData.pagination.last_page > 5" class="mx-2">...</span>
              <button v-if="commonData.pagination.last_page > 5" @click="goToPage(commonData.pagination.last_page)"
                :class="[
                  'border',
                  'rounded-full',
                  'w-10',
                  'h-10',
                  'flex',
                  'items-center',
                  'justify-center',
                  currentPage === commonData.pagination.last_page ? 'bg-nxtkartsecondaryBlue text-white' : 'bg-white text-nxtkartsecondaryBlue'
                ]">
                {{ commonData.pagination.last_page }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="!isLoading">
      <ProductNotFound />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';
import ProductArchive from '@/components/ProductArchive.vue';
import ProductNotFound from '@/components/ProductPage/ProductNotFound.vue';
import { useMobileDetection } from '~/composables/useMobileDetection';

// Use the composable to get the isMobile state
const { isMobile } = useMobileDetection();

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
  child_categories: ChildCategory[];
  products: { [key: string]: Product };
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

interface ChildCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const props = defineProps<{
  apiEndpoint: string;
  isBrandPage: boolean;
}>();

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const sanctumFetch = useSanctumClient();

const commonData = ref<CommonData | null>(null);
const commonDataProducts = ref<Product[]>([]);
const breadcrumbs = ref<Breadcrumb[]>([]);
const sortOrder = ref<string | null>(null);
const currentPage = ref<number>(1);
const isLoading = ref<boolean>(true);
const searchQuery = ref<string>('');

const fetchCommonProducts = async (slugOrQuery: string, sort: string | null = null, page: number = 1) => {
  isLoading.value = true;
  try {
    const payload = {
      slugOrQuery: slugOrQuery,
      sort: sort,
      page: page,
      source: 'nuxt_nxtkart', // Add the source parameter here
      query: slugOrQuery
    };

    let url = `${props.apiEndpoint}`;
    if (props.isBrandPage || route.name === 'category-slug') {
      url += `/${slugOrQuery}`;
    }

    const response = await sanctumFetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    commonData.value = response.data;
    commonDataProducts.value = Object.values(response.data.products);
    breadcrumbs.value = response.data.breadcrumb;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

const sortProducts = (order: 'low' | 'high') => {
  sortOrder.value = order;
  router.push({ query: { ...route.query, sort_price: order, page: 1 } });
};

const goToPage = (page: number) => {
  router.push({ query: { ...route.query, page } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const pages = computed(() => {
  const totalPages = commonData.value?.pagination.last_page || 0;
  const current = currentPage.value;
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (current >= totalPages - 2) {
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(current - 2, current - 1, current, current + 1, current + 2);
    }
  }

  return pages;
});

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

// Watch for changes in the route query to update the search query
watch(() => route.query.query, (newQuery) => {
  if (newQuery) {
    const queryString = Array.isArray(newQuery) ? newQuery[0] : newQuery;
    fetchCommonProducts(queryString, route.query.sort_price as string | null, parseInt(route.query.page as string) || 1);
  }
});

// SEO Meta Tags
useHead({
  title: computed(() => commonData.value ? `${commonData.value.name} ${props.isBrandPage ? 'Brand' : `Search Results "${searchQuery.value}"`}` : 'Search Results'),
  meta: [
    { name: 'description', content: computed(() => commonData.value ? `Browse ${props.isBrandPage ? 'brand' : 'search results'} for ${commonData.value.name}.` : 'Browse search results.') },
    { name: 'keywords', content: computed(() => commonData.value ? `${commonData.value.name}, ${props.isBrandPage ? 'brand' : 'search results'}, products` : 'search results, products') },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": props.isBrandPage ? "Brand" : "SearchResultsPage",
        "name": commonData.value ? commonData.value.name : 'Search Results',
        "description": commonData.value ? `Browse ${props.isBrandPage ? 'brand' : 'search results'} for ${commonData.value.name}.` : 'Browse search results.',
        "url": `${config.public.baseURL}${route.fullPath}`,
        "mainEntity": commonDataProducts.value.map(product => ({
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
            "url": `${config.public.baseURL}/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": product.sale_price,
            "itemCondition": product.status === 1 ? "https://schema.org/NewCondition" : "https://schema.org/Refurbished",
            "availability": product.status === 1 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        })),
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.value.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": config.public.baseURL + crumb.url
          }))
        }
      })),
    },
  ],
});



</script>


<style scoped>
/* Add any additional custom styles here if needed */
.bg-gray-200 {
  background-color: #F1F1F1;
}

::-webkit-scrollbar {
  display: none;
}

/* Responsive styles */
@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }

  .w-full {
    width: 100%;
  }

  .overflow-x-auto {
    overflow-x: auto;
  }
}
</style>
