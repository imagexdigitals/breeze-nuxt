<template>
  <div class="bg-gray-100">
    <div class="mx-auto py-5 flex gap-8 items-start justify-center">
      <div v-if="product" class="flex w-[90%] gap-x-3 ">
        <!-- Left Column -->
        <ProductPageOverallLeftColumn :product="product" class="flex-left-column" />

        <!-- Right Side Column (Sticky) -->
        <RightSideColumn :product="product" class="flex-right-column" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useCartStore } from '@/stores/cart';
import { useQuoteStore } from '@/stores/quote';
import { usePincodeStore } from '@/stores/pincode';
import RightSideColumn from '@/components/ProductPage/RightSideColumn.vue';
import ProductPageOverallLeftColumn from '@/components/ProductPage/OverallLeftColumn.vue';
const sanctumFetch = useSanctumClient();

interface Product {
  id: number;
  name: string | null;
  slug: string;
  sku: string | null;
  type: string | null;
  status: number;
  index_status: string | null;
  category: string;
  brand: string;
  brand_slug: string;
  condition: number | null;
  minimum_qty: number;
  sale_price: string;
  save_price: string;
  mrp_price: string;
  tax: string | null;
  weight: string;
  weight_unit_code: string;
  width: string;
  width_unit_code: string;
  depth: string;
  depth_unit_code: string;
  shipping_dimensions: string | null;
  country_of_origin: string;
  attachments: Array<{ label: string; url: string }>;
  warranty: string;
  image: string;
  gallery: string[];
  breadcrumb: Array<{ name: string; url: string }>;
  specifications: Array<{ label: string; value: string }>;
  description: string;
  related_products: Array<{
    id: number;
    name:string;
    image: string;
    sale_price: string;
    mrp_price: string;
    discount_percentage: string;
    brand: string | null;
    slug: string;
    status: number;
    brand_slug: string | null;
    minimum_qty: number;
  }>; // Add related_products field
}



const route = useRoute();
const config = useRuntimeConfig();
const backendUrl = config.public.BACKEND_URL;

const product = ref<Product | null>(null);
const cartStore = useCartStore();
const quoteStore = useQuoteStore();
const pincodeStore = usePincodeStore();

const fetchProductDetails = async (slug: string) => {
  try {
    const response = await sanctumFetch(`/api/product/${slug}`, {
      method: 'GET',
    });

    // Assuming the response is already in JSON format
    product.value = response;
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};


onMounted(() => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  if (slug) {
    fetchProductDetails(slug);
  }
  cartStore.loadFromLocalStorage();
  quoteStore.loadFromLocalStorage();
  pincodeStore.loadFromLocalStorage();
});
</script>

<style scoped>
.flex-left-column {
  flex: 0 0 75%; /* Flex-grow, flex-shrink, flex-basis */
  max-width: 75%;
}

.flex-right-column {
  flex: 0 0 25%; /* Flex-grow, flex-shrink, flex-basis */
  max-width: 25%;
  position: sticky;
  top: 0;
  align-self: flex-start;
}
</style>