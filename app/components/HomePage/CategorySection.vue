<template>
  <div class="flex md:justify-center">
    <div class="md:w-[90%] w-full bg-white md:p-4 rounded-md mt-4">
      <div class="">
        <div class="flex justify-between items-center p-3 md:p-0">
          <h2 class="text-xl font-bold">
            {{ category.name }}
          </h2>
          <NuxtLink :to="'/category/' + category.slug"
            class="text-red-600 text-sm bg-red-100 p-2 font-semibold rounded-md hover:bg-red-200 flex-shrink-0 ml-4">
            View All
          </NuxtLink>
        </div>

        <div class="relative md:mt-4 bg-gray-200 py-4 pl-3 md:p-4 md:rounded-md overflow-hidden">
          <div :class="['product-grid', isMobile ? 'mobile-scroll' : '']">
            <ProductArchive v-for="product in category.products.slice(0, 7)" :key="product.id" :id="product.id"
              :image="product.image" :name="product.name" :salePrice="product.sale_price"
              :mrpPrice="product.mrp_price" :discountPercentage="product.discount_percentage"
              :brand="product.brand_name" :slug="product.slug" :status="product.status"
              :brandSlug="product.brand_slug" :minimum_qty="product.minimum_qty" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import ProductArchive from '@/components/ProductArchive.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
});

const isMobile = computed(() => {
  return window.innerWidth <= 768; // Adjust the breakpoint as needed
});
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.mobile-scroll {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.mobile-scroll::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

.mobile-scroll > * {
  flex: 0 0 calc(50% - 0.5rem); /* Two columns with gap */
}
</style>
