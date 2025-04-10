<template>
  <div class="space-y-3">
    <!-- Section 1 -->
    <section class="rounded-sm shadow-none border-y md:border-none md:shadow-md overflow-y-auto w-full bg-white">
      <!-- Breadcrumbs and Share button -->
      <ProductPageProductBreadcrumbsAndShare :breadcrumbs="product.breadcrumb" />

      <!-- Products Details -->
      <div class="flex flex-col md:flex-row gap-4 p-3 md:p-5">
        <!-- Left Side Column (Image) -->
        <ProductPageProductImageGallery
          :image="product.image"
          :altText="product.name ?? 'Product Image'"
          :gallery="product.gallery"
          class="w-full md:w-2/5"
        />

        <!-- Product Details -->
        <ProductDetails :product="product" class="w-full md:w-3/5" />
      </div>
    </section>

    <!-- Specification and Description -->
    <section v-if="!isMobile" class="rounded-sm shadow-md overflow-y-auto w-full bg-white">
      <SpecificationDescriptionDetails
        :specifications="product.specifications"
        :attachments="product.attachments"
        :description="product.description"
      />
    </section>

    <!-- Related Products -->
    <ProductRelated
      v-if="!isMobile && product.related_products && product.related_products.length"
      :relatedProducts="product.related_products"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Product } from '@/types/types';
import ProductDetails from './ProductDetails.vue'; // Adjust the path as necessary
import SpecificationDescriptionDetails from './SpecificationDescriptionDetails.vue'; // Adjust the path as necessary
import ProductRelated from './ProductRelated.vue';
import { useMobileDetection } from '~/composables/useMobileDetection';

// Use the composable to get the isMobile state
const { isMobile } = useMobileDetection();

interface Props {
  product: Product;
}

const props = defineProps<Props>();
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
