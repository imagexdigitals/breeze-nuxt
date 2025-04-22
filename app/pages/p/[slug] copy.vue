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
import { ref, onMounted, computed } from 'vue';
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
const projName = ref('my project name'); // your projName Ref

const computedPageMeta = computed(() => {
  return {
    title: projName.value,
    meta: [
      { hid: 'og-title', property: 'og:title', content: projName.value },
      { hid: 'description', name: 'description', content: 'This is a static description.' }, // Static meta tag
      { hid: 'keywords', name: 'keywords', content: 'static, keywords, example' }, // Static meta tag
      { hid: 'og-image', property: 'og:image', content: 'https://cdn.nxtkart.com/images/products/main/2025/1/component-kit-for-3d-printer--beginner-57845-nxtkart.webp'},
      { hid: 'og-url', property: 'og:url', content: 'https://example.com' }, // Static meta tag
      { hid: 'og-type', property: 'og:type', content: 'website' }, // Static meta tag
      { hid: 'og-description', property: 'og:description', content: projName.value },
    ]
  };
});

useHead(computedPageMeta);

useHead({
  title: computed(() => product.value ? `${product.value.name} - Product Details` : 'Product Details'),
  meta: [
    { name: 'description', content: computed(() => product.value ? stripHtmlTags(product.value.description) : 'View details of our product.') },
    { name: 'keywords', content: computed(() => product.value ? `${product.value.name}, ${product.value.brand}, product details` : 'product details') },
    // Open Graph meta tags
    { property: 'og:title', content: computed(() => product.value ? `${product.value.name} - Product Details` : 'Product Details') },
    { property: 'og:description', content: computed(() => product.value ? stripHtmlTags(product.value.description) : 'View details of our product.') },
    { property: 'og:image', content: computed(() => product.value ? product.value.image : '') },
    { property: 'og:url', content: computed(() => product.value ? `${backendUrl}/product/${product.value.slug}` : '') },
    { property: 'og:type', content: 'product' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.value?.name || '',
        "image": product.value?.image || '',
        "description": product.value ? stripHtmlTags(product.value.description) : '',
        "sku": product.value?.sku || '',
        "brand": {
          "@type": "Brand",
          "name": product.value?.brand || 'Unknown'
        },
        "offers": {
          "@type": "Offer",
          "url": `${backendUrl}/product/${product.value?.slug}`,
          "priceCurrency": "INR",
          "price": product.value?.sale_price || '',
          "itemCondition": product.value?.condition === 1 ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
          "availability": product.value?.status === 1 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        },
      })),
    },
  ],
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
