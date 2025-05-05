<template>
  <div class="bg-gray-100">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
    </div>

    <div v-else class="mx-auto py-5 flex flex-col items-center">
      <div v-if="product" class="text-center">
        <!-- Product Image -->
        <img :src="product.image" :alt="product.name" class="w-48 h-48 object-cover mb-4" />

        <!-- Product Name -->
        <h1 class="text-2xl font-bold">{{ product.name }}</h1>

        <!-- Sale Price -->
        <p class="text-xl text-green-600">{{ product.sale_price }}</p>

        <!-- Product Description -->
        <p class="mt-4 text-gray-700">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useMobileDetection } from '@/composables/useMobileDetection';
import { useSeoMeta } from '@unhead/vue';

const { isMobile } = useMobileDetection();
const sanctumFetch = useSanctumClient();

interface Product {
  id: number;
  name: string | null;
  image: string;
  sale_price: string;
  description: string;
}

const route = useRoute();
const config = useRuntimeConfig();
const backendUrl = config.public.BACKEND_URL;

const product = ref<Product | null>(null);
const isLoading = ref(true);

const fetchProductDetails = async (slug: string) => {
  try {
    const payload = {
      slug: slug,
      source: 'nuxt_nxtkart',
    };

    const response = await sanctumFetch(`/api/product/${slug}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    product.value = response;
  } catch (error) {
    console.error('Error fetching product details:', error);
  } finally {
    isLoading.value = false;
  }
};

if (process.server) {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  if (slug) {
    await fetchProductDetails(slug);
  }
}

onMounted(() => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  if (slug) {
    fetchProductDetails(slug);
  }
});

// Watch for changes in the product and update the SEO meta
watch(product, (newProduct) => {
  if (newProduct) {
    useSeoMeta({
      title: newProduct.name,
      ogTitle: newProduct.name,
      description: newProduct.description,
      ogDescription: newProduct.description,
      ogImage: newProduct.image,
      twitterCard: 'summary_large_image',
    });
  }
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
