<template>
  <div class="bg-gray-100">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent">
      </div>
    </div>

    <!-- PC Version -->
    <div v-else-if="!isMobile" class="mx-auto py-5 flex gap-8 items-start justify-center">
      <div v-if="product" class="flex w-[90%] gap-x-3">
        <!-- Left Column -->
        <ProductPageOverallLeftColumn :product="product" class="flex-left-column" />

        <!-- Right Side Column (Sticky) -->
        <RightSideColumn :product="product" class="flex-right-column" />
      </div>
    </div>

    <!-- Mobile Version -->
    <div v-else class="mx-auto py-2 md:py-5">
      <div v-if="product" class="flex flex-col gap-y-4">
        <!-- Product Details -->
        <ProductPageOverallLeftColumn :product="product" class="w-full" />

        <!-- Right Side Column (Non-Sticky) -->
        <RightSideColumn :product="product" class="w-full" />

        <ProductPageOffer />

        <!-- NxtKart Benefits -->
        <ProductBenefits :showGstInvoice="product.condition === 1" />

        <!-- Return & Warranty Policy -->
        <ReturnWarrantyPolicy :warranty="product.warranty" />

        <!-- Specification and Description -->
        <section class="rounded-sm border-y md:shadow-md overflow-y-auto w-full bg-white">
          <SpecificationDescriptionDetails :specifications="product.specifications" :attachments="product.attachments"
            :description="product.description" />
        </section>

        <!-- Related Products -->
        <ProductRelated v-if="product.related_products && product.related_products.length"
          :relatedProducts="product.related_products" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useCartStore } from '@/stores/cart';
import { useQuoteStore } from '@/stores/quote';
import { usePincodeStore } from '@/stores/pincode';
import RightSideColumn from '@/components/ProductPage/RightSideColumn.vue';
import ProductPageOverallLeftColumn from '@/components/ProductPage/OverallLeftColumn.vue';
import ProductBenefits from '@/components/ProductPage/ProductBenefits.vue';
import ReturnWarrantyPolicy from '@/components/ProductPage/ReturnWarrantyPolicy.vue';
import SpecificationDescriptionDetails from '@/components/ProductPage/SpecificationDescriptionDetails.vue';
import ProductRelated from '@/components/ProductPage/ProductRelated.vue';
import { useMobileDetection } from '~/composables/useMobileDetection';

// Use the composable to get the isMobile state
const { isMobile } = useMobileDetection();
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
  image: string; // Use this field for the OG image
  gallery: string[];
  breadcrumb: Array<{ name: string; url: string }>;
  specifications: Array<{ label: string; value: string }>;
  description: string;
  related_products: Array<{
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
  }>;
}

const route = useRoute();
const config = useRuntimeConfig();
const backendUrl = config.public.BACKEND_URL;

const product = ref<Product | null>(null);
const isLoading = ref(true);
const cartStore = useCartStore();
const quoteStore = useQuoteStore();
const pincodeStore = usePincodeStore();

const fetchProductDetails = async (slug: string) => {
  try {
    const payload = {
      slug: slug,
      source: 'nuxt_nxtkart', // Add the source parameter here
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

// Fetch product details on the server side
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
  cartStore.loadFromLocalStorage();
  quoteStore.loadFromLocalStorage();
  pincodeStore.loadFromLocalStorage();
});

const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Computed properties for meta tags
const metaTitle = computed(() => product.value?.name || 'Default Title');
const metaDescription = computed(() => stripHtmlTags(product.value?.description || 'Default Description'));

// Watch for changes in the product and update meta tags using useHead
watch(product, (newVal) => {
  if (newVal) {
    useHead({
      title: metaTitle.value,
      meta: [
        { name: 'description', content: metaDescription.value },
        { property: 'og:title', content: metaTitle.value },
        { property: 'og:description', content: metaDescription.value },
        { property: 'og:image', content: newVal.image },
        { property: 'og:url', content: `${config.public.baseURL}/products/${newVal.slug}` },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: metaTitle.value },
        { name: 'twitter:description', content: metaDescription.value },
        { name: 'twitter:image', content: newVal.image },
        { name: 'twitter:site', content: '@nxtkart' }, // Replace with your Twitter handle
      ],
    });
  }
});
</script>





<style scoped>
.flex-left-column {
  flex: 0 0 75%;
  /* Flex-grow, flex-shrink, flex-basis */
  max-width: 75%;
}

.flex-right-column {
  flex: 0 0 25%;
  /* Flex-grow, flex-shrink, flex-basis */
  max-width: 25%;
  position: sticky;
  top: 0;
  align-self: flex-start;
}
</style>
