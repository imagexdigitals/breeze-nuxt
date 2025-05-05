<template>
  <div class="bg-gray-100">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
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
          <SpecificationDescriptionDetails :specifications="product.specifications" :attachments="product.attachments" :description="product.description" />
        </section>

        <!-- Related Products -->
        <ProductRelated v-if="product.related_products && product.related_products.length" :relatedProducts="product.related_products" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useMobileDetection } from '~/composables/useMobileDetection';
import RightSideColumn from '@/components/ProductPage/RightSideColumn.vue';
import ProductPageOverallLeftColumn from '@/components/ProductPage/OverallLeftColumn.vue';
import ProductBenefits from '@/components/ProductPage/ProductBenefits.vue';
import ReturnWarrantyPolicy from '@/components/ProductPage/ReturnWarrantyPolicy.vue';
import SpecificationDescriptionDetails from '@/components/ProductPage/SpecificationDescriptionDetails.vue';
import ProductRelated from '@/components/ProductPage/ProductRelated.vue';

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
  image: string;
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

// Local state for cart, quote, and pincode
const cartItems = ref([]);
const quoteItems = ref([]);
const pincodeData = ref({
  delivery_available: null,
  location: null,
  etd: null,
  day: null,
  postcode: null,
});

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
  loadCartFromLocalStorage();
  loadQuoteFromLocalStorage();
  loadPincodeFromLocalStorage();
});

const stripHtmlTags = (html) => {
  if (typeof window !== 'undefined' && window.DOMParser) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
  // Fallback for SSR: return the HTML as is or use a regex to strip tags
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const metaTitle = computed(() => product.value?.name);
const metaDescription = computed(() => stripHtmlTags(product.value?.description || ''));

// Use the useHead composable to set the meta tags
useHead(() => ({
  title: metaTitle.value,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: metaDescription.value,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: metaTitle.value,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: metaDescription.value,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: product.value?.image || '',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `${config.public.baseURL}/products/${product.value?.slug}`,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: metaTitle.value,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: metaDescription.value,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: product.value?.image || '',
    },
  ],
}));

watch(product, (newVal) => {
  if (newVal) {
    // Remove any existing JSON-LD script to avoid duplication
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": newVal.name || '',
      "image": newVal.image || '',
      "description": stripHtmlTags(newVal.description),
      "sku": newVal.sku || '',
      "brand": {
        "@type": "Brand",
        "name": newVal.brand || 'Unknown'
      },
      "offers": {
        "@type": "Offer",
        "url": `${backendUrl}/product/${newVal.slug}`,
        "priceCurrency": "INR",
        "price": newVal.sale_price || '',
        "itemCondition": newVal.condition === 1 ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
        "availability": newVal.status === 1 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      },
    });
    document.head.appendChild(script);
  }
});

// Local storage functions for cart
const loadCartFromLocalStorage = () => {
  if (process.client) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        cartItems.value = JSON.parse(storedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }
};

const saveCartToLocalStorage = () => {
  if (process.client) {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

// Local storage functions for quote
const loadQuoteFromLocalStorage = () => {
  if (process.client) {
    const storedQuote = localStorage.getItem('quoteItems');
    if (storedQuote) {
      try {
        quoteItems.value = JSON.parse(storedQuote);
      } catch (error) {
        console.error('Error parsing quote items from localStorage:', error);
      }
    }
  }
};

const saveQuoteToLocalStorage = () => {
  if (process.client) {
    localStorage.setItem('quoteItems', JSON.stringify(quoteItems.value));
  }
};

// Local storage functions for pincode
const loadPincodeFromLocalStorage = () => {
  if (process.client) {
    const storedPincode = localStorage.getItem('pincodeData');
    if (storedPincode) {
      try {
        pincodeData.value = JSON.parse(storedPincode);
      } catch (error) {
        console.error('Error parsing pincode data from localStorage:', error);
      }
    }
  }
};

const savePincodeToLocalStorage = () => {
  if (process.client) {
    localStorage.setItem('pincodeData', JSON.stringify(pincodeData.value));
  }
};
</script>

<style scoped>
.flex-left-column {
  flex: 0 0 75%;
  max-width: 75%;
}

.flex-right-column {
  flex: 0 0 25%;
  max-width: 25%;
  position: sticky;
  top: 0;
  align-self: flex-start;
}
</style>
