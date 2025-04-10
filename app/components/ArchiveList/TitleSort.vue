<!-- TitleSort.vue -->
<template>
  <div class="bg-white shadow-sm rounded-sm p-4">
    <div>
      <nav aria-label="breadcrumb">
        <ol class="flex">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center text-sm">
            <NuxtLink :to="crumb.url" class="text-gray-700 font-medium hover:text-secondaryBlue">{{ crumb.name }}</NuxtLink>
            <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
          </li>
        </ol>
      </nav>
    </div>
    <div class="flex items-center space-x-4 mt-4">
      <h1 class="text-xl font-bold text-gray-800">
        {{ title }}
        <span v-if="isBrandPage">Product Online</span>
        <span v-else>"{{ searchQuery }}"</span>
      </h1>
      <p class="text-sm text-gray-600 mt-1">{{ showingText }}</p>
    </div>
    <div class="flex items-center space-x-2 mt-4">
      <p class="font-semibold text-gray-600">Sort by:</p>
      <button @click="sortProducts('low')"
        :class="['border', 'px-4', 'py-1', 'rounded-3xl', 'font-medium', 'text-sm', sortOrder === 'low' ? 'border-blue-500 text-blue-500' : 'border-gray-300']">
        Low to High
      </button>
      <button @click="sortProducts('high')"
        :class="['border', 'px-4', 'py-1', 'rounded-3xl', 'font-medium', 'text-sm', sortOrder === 'high' ? 'border-blue-500 text-blue-500' : 'border-gray-300']">
        High to Low
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  breadcrumbs: { name: string; url: string }[];
  title: string;
  isBrandPage: boolean;
  searchQuery: string;
  showingText: string;
  sortOrder: string | null;
}>();

const router = useRouter();

const sortProducts = (order: 'low' | 'high') => {
  router.push({ query: { ...router.currentRoute.value.query, sort_price: order, page: 1 } });
};
</script>
