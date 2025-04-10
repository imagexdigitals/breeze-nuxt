<!-- ProductDetails.vue -->
<template>
  <div class="w-3/5">
    <h1 class="text-lg font-semibold">{{ product.name || 'Product Name Not Available' }}</h1>
    <div class="text-sm py-2 font-medium text-gray-800">
      Visit the
      <NuxtLink :to="product.brand_slug" class="text-nxtkartsecondaryBlue">{{ product.brand }}</NuxtLink>
      Store | SKU: {{ product.sku }}
    </div>


    <div v-if="!isMobile">

      <div>
        <!-- Stock Status -->
        <ProductPageStockStatus :status="product.status" />
      </div>

      <ProductPageOffer />

      <!-- NxtKart Benefits -->
      <ProductBenefits :showGstInvoice="product.condition === 1" />

      <!-- Return & Warranty Policy -->
      <ReturnWarrantyPolicy :warranty="product.warranty" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Product } from '@/types/types';
import ProductBenefits from './ProductBenefits.vue'; // Adjust the path as necessary
import ReturnWarrantyPolicy from './ReturnWarrantyPolicy.vue'; // Adjust the path as necessary
import { useMobileDetection } from '~/composables/useMobileDetection';
// Use the composable to get the isMobile state
const { isMobile } = useMobileDetection();

const props = defineProps<{
  product: Product;
}>();
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
