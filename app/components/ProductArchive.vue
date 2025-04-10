<template>
  <div class="p-4 rounded-sm shadow-sm bg-white">
    <div class="w-full h-48 flex items-center justify-center">
      <NuxtImg :src="image" :alt="name" class="max-w-full max-h-full object-cover" />
    </div>
    <NuxtLink :to="productLink" class="font-medium mt-2 line-clamp-2 block hover:text-nxtkartsecondaryBlue text-sm">
      {{ name }}
    </NuxtLink>
    <NuxtLink :to="brandLink"
      class="font-medium mt-2 text-[12px] text-nxtkartsecondaryBlue block hover:text-nxtkartsecondaryBlue">
      {{ brand }}
    </NuxtLink>
    <div class="flex items-center mt-1">
      <p class="text-lg font-semibold">₹{{ salePrice }}</p>
      <p class="text-gray-500 line-through ml-2 text-sm">₹{{ mrpPrice }}</p>
    </div>
    <div class="flex items-center mt-2">
      <p class="border border-dashed border-green-600 text-green-600 text-xs font-semibold px-2">
        {{ discountPercentage }} OFF
      </p>
      <p v-if="status === 1" class="text-green-600 text-xs font-semibold ml-2">In Stock</p>
      <p v-else-if="status === 2" class="text-red-600 text-xs font-semibold ml-2">Out of Stock</p>
    </div>

    <div v-if="status === 1" class="w-full">
      <!-- Use the AddToCart component here -->
      <AddToCart :productId="id" :quantity="minimum_qty" class="mt-2.5" />
    </div>
    <div v-else-if="status === 2">
      <button
        class="w-full mt-2.5 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium text-sm">
        Out of Stock
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddToCart from './ProductPage/AddToCart.vue';

interface Props {
  id: number; // Add the id property here
  image: string;
  name: string;
  salePrice: string;
  mrpPrice: string;
  discountPercentage: string;
  brand: string | null;
  slug: string;
  status: number;
  brandSlug: string | null;
  minimum_qty: number;
}

const props = defineProps<Props>();

const productLink = `/p/${props.slug}`;
const brandLink = props.brandSlug || '#';
</script>

<style scoped>
/* Custom CSS for line-clamp with compatibility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  /* Standard property */
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.5em; /* Adjust this value as needed */
}
</style>
