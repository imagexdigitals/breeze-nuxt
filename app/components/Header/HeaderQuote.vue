<template>
  <NuxtLink to="/quote"
    class="font-medium flex space-x-2 items-center cursor-pointer hover:bg-zinc-100 p-2 border border-dashed border-orange-600 rounded-md text-orange-600 relative">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="mr-1">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
        <path
          d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1zm3-12a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2M18 22v-3" />
        <circle cx="10" cy="10" r="3" />
      </g>
    </svg>
    Request Quote
    <span
      class="absolute -top-2 -right-2 bg-nxtkartsecondaryBlue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {{ quoteCount }}
    </span>
  </NuxtLink>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useQuoteStore } from '@/stores/quote';

const quoteStore = useQuoteStore();

// Compute the total number of unique products in the quote
const quoteCount = computed(() => {
  return quoteStore.totalProducts;
});
</script>
