<template>
  <div class="bg-gray-100">
    <div class="mx-auto py-5 flex gap-8 items-start justify-center">
      <div class="flex w-[90%] gap-x-3">
        <!-- Left Column (20% width) -->
        <div class="w-1/5">
          Filters
        </div>

        <!-- Right Side Column (80% width) -->
        <div class="w-4/5">
          <template v-if="categoryData && categoryData.products.length">
            <div class="bg-white shadow-sm rounded-sm p-4">
              <div>
                <nav aria-label="breadcrumb">
                  <ol class="flex">
                    <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center text-sm">
                      <NuxtLink :to="crumb.url" class="text-gray-700 font-medium hover:text-secondaryBlue">{{ crumb.name
                        }}</NuxtLink>
                      <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
                    </li>
                  </ol>
                </nav>
              </div>
              <h1 class="text-2xl font-bold mt-4">{{ categoryData.name }}</h1>
              <div class="flex space-x-2 mt-4">
                <button @click="sortProducts('low')"
                  :class="['border', 'px-4', 'py-2', sortOrder === 'low' ? 'bg-blue-500 text-white' : '']">
                  Low to High
                </button>
                <button @click="sortProducts('high')"
                  :class="['border', 'px-4', 'py-2', sortOrder === 'high' ? 'bg-blue-500 text-white' : '']">
                  High to Low
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-5 mt-4">
              <ProductArchive v-for="product in categoryData.products" :key="product.id" :id="product.id"
                :image="product.image" :name="product.name" :salePrice="product.sale_price"
                :mrpPrice="product.mrp_price" :discountPercentage="product.discount_percentage" :brand="product.brand"
                :slug="product.slug" :status="product.status" :brandSlug="product.brand_slug"
                :minimum_qty="product.minimum_qty" />
            </div>
            <div class="flex justify-center mt-4 space-x-2">
              <button v-for="page in pages" :key="page" @click="goToPage(page)" :class="[
                'border',
                'rounded-full',
                'w-10',
                'h-10',
                'flex',
                'items-center',
                'justify-center',
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              ]">
                {{ page }}
              </button>
              <span v-if="categoryData.pagination.last_page > 5" class="mx-2">...</span>
              <button v-if="categoryData.pagination.last_page > 5" @click="goToPage(categoryData.pagination.last_page)"
                :class="[
                  'border',
                  'rounded-full',
                  'w-10',
                  'h-10',
                  'flex',
                  'items-center',
                  'justify-center',
                  currentPage === categoryData.pagination.last_page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                ]">
                {{ categoryData.pagination.last_page }}
              </button>
            </div>
          </template>
          <div v-else>
            No products available.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';
import ProductArchive from '@/components/ProductArchive.vue';

interface Breadcrumb {
  name: string;
  url: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  sale_price: string;
  mrp_price: string;
  discount_percentage: string;
  brand: string | null;
  slug: string;
  status: number;
  brand_slug: string | null;
  minimum_qty: number;
  description?: string;
}

interface CategoryData {
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

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const sanctumFetch = useSanctumClient();

const categoryData = ref<CategoryData | null>(null);
const breadcrumbs = ref<Breadcrumb[]>([]);
const sortOrder = ref<string | null>(null);
const currentPage = ref<number>(1);

const fetchCategoryProducts = async (slug: string, sort: string | null = null, page: number = 1) => {
  try {
    const url = `/api/category/${slug}?page=${page}${sort ? `&sort_price=${sort}` : ''}`;
    const response = await sanctumFetch(url, {
      method: 'GET',
    });
    categoryData.value = response.data;
    breadcrumbs.value = response.data.breadcrumb;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const sortProducts = (order: 'low' | 'high') => {
  sortOrder.value = order;
  router.push({ query: { ...route.query, sort_price: order, page: 1 } });
};

const goToPage = (page: number) => {
  router.push({ query: { ...route.query, page } });
};

const pages = computed(() => {
  const totalPages = categoryData.value?.pagination.last_page || 0;
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
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  const page = parseInt(route.query.page as string) || 1;
  if (slug) {
    fetchCategoryProducts(slug, route.query.sort_price as string | null, page);
  }
});

watch(() => route.query.sort_price, (newSort) => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  if (slug) {
    fetchCategoryProducts(slug, newSort as string | null, 1);
  }
});

watch(() => route.query.page, (newPage) => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  const page = parseInt(newPage as string) || 1;
  if (slug) {
    fetchCategoryProducts(slug, route.query.sort_price as string | null, page);
  }
});
</script>