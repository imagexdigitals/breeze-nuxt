<!-- ProductDetails.vue -->
<template>
  <div class="w-3/5 px-2">
    <h1 class="text-lg font-semibold">{{ product.name || 'Product Name Not Available' }}</h1>
    <div class="text-sm py-2 font-medium text-gray-800">
      Visit the
      <NuxtLink :to="product.brand_slug" class="text-nxtkartsecondaryBlue">{{ product.brand }}</NuxtLink>
      Store | SKU: {{ product.sku }}
    </div>

    <div>
      <!-- Stock Status -->
      <ProductPageStockStatus :status="product.status" />
    </div>

    <ProductPageOffer />

    <!-- NxtKart Benefits -->
    <div class="bg-white border border-gray-300 p-4 rounded-md">
      <div class="flex justify-between items-center">
        <!-- GST Invoice -->
        <div v-if="product.condition === 1" class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="tdesign:bill" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-sm font-semibold text-gray-700">GST Invoice Available</span>
        </div>

        <!-- Secure Payments -->
        <div class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="tdesign:secured" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-sm font-semibold text-gray-700">Secure Payments</span>
        </div>

        <!-- 365 Days Help Desk -->
        <div class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="ic:outline-support-agent" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-sm font-semibold text-gray-700">365 Days Help Desk</span>
        </div>
      </div>
    </div>

    <!-- Return & Warranty Policy -->
    <div class="bg-white border border-gray-300 p-4 rounded-md mt-4">
      <h3 class="mb-3 font-medium">Return & Warranty Policy</h3>
      <div class="flex justify-between items-center">
        <!-- Warranty -->
        <div v-if="product.warranty" class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="mingcute:service-fill" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-xs font-semibold text-gray-700">{{ product.warranty }}</span>
        </div>

        <!-- Missing Product -->
        <div class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="ph:seal-question-fill" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-xs font-semibold text-gray-700">Missing Product</span>
        </div>

        <!-- Wrong Product -->
        <div class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="mdi:box-remove" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-xs font-semibold text-gray-700">Wrong Product</span>
        </div>

        <!-- Damaged Product -->
        <div class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="icon-park-solid:damage-map" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-xs font-semibold text-gray-700">Damaged Product</span>
        </div>

        <!-- Defective Product -->
        <div class="flex items-center space-x-2">
          <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
            <Icon name="tabler:replace-filled" class="w-5 h-5 text-red-600" />
          </div>
          <span class="text-xs font-semibold text-gray-700">Defective Product</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Product } from '@/types/types';

const props = defineProps<{
  product: Product;
}>();
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
