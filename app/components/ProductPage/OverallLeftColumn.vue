<template>
  <div class="space-y-3">
    <!-- Section 1 -->
    <section class="rounded-sm shadow-md overflow-y-auto w-full bg-white">
      <!-- Breadcrumbs and Share button -->
      <ProductPageProductBreadcrumbsAndShare :breadcrumbs="product.breadcrumb" />

      <!-- Products Details -->
      <div class="flex gap-4 p-5">
        <!-- Left Side Column (Image) -->
        <ProductPageProductImageGallery :image="product.image" :altText="product.name ?? 'Product Image'"
          :gallery="product.gallery" class="w-2/5" />

        <!-- Product Details -->
        <ProductDetails :product="product" />
      </div>
    </section>

    <!-- Specification and Description -->
    <section class="rounded-sm shadow-md overflow-y-auto w-full bg-white">
      <!-- Tabs -->
      <div class="flex border-b border-gray-300">
        <button @click="activeTab = 'specification'"
          :class="['w-1/2 py-2 text-center cursor-pointer font-semibold', activeTab === 'specification' ? 'bg-nxtkartsecondaryBlue text-white border-b' : '']">
          Specification
        </button>
        <button @click="activeTab = 'description'"
          :class="['w-1/2 py-2 text-center cursor-pointer font-semibold', activeTab === 'description' ? 'bg-nxtkartsecondaryBlue text-white border-b' : '']">
          Description
        </button>
        <button @click="activeTab = 'q&a'"
          :class="['w-1/2 py-2 text-center cursor-pointer font-semibold', activeTab === 'q&a' ? 'bg-nxtkartsecondaryBlue text-white border-b' : '']">
          Q & A
        </button>
      </div>

      <!-- Tab Content with Transition -->
      <div class="p-4">
        <transition name="slide" mode="out-in">
          <ProductSpecification v-if="activeTab === 'specification'" :specifications="product.specifications"
            :attachments="product.attachments" key="specification" />
          <ProductDescription v-else-if="activeTab === 'description'" :description="product.description"
            key="description" />
          <div v-else-if="activeTab === 'q&a'" key="q&a">
            <!-- Q & A Content -->
            <p>Q & A details go here...</p>
          </div>
        </transition>
      </div>
    </section>

    <!-- Related Products -->
    <ProductRelated v-if="product.related_products && product.related_products.length" :relatedProducts="product.related_products" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Product } from '@/types/types';
import ProductDetails from './ProductDetails.vue'; // Adjust the path as necessary
import ProductSpecification from './ProductSpecification.vue'; // Adjust the path as necessary
import ProductDescription from './ProductDescription.vue'; // Adjust the path as necessary
import ProductRelated from './ProductRelated.vue';

const activeTab = ref('specification'); // Default active tab

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

/* Transition styles */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

::-webkit-scrollbar {
  display: none;
}
</style>
