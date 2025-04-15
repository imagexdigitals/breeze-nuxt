<template>
  <div class="flex md:justify-center">
    <div class="md:w-[90%] w-full bg-white md:p-4 md:rounded-md mt-4 p-3">
      <h2 class="text-lg mb-3 font-bold">Popular Categories on Nxtkart</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="category in categories" :key="category.name" class="border p-4 hover:bg-gray-100">
          <NuxtLink :to="`/category/${category.slug}`" class="font-semibold hover:text-nxtkartsecondaryBlue">
            {{ category.name }}
          </NuxtLink>
          <p class="text-sm">
            <template v-for="(child, index) in category.children" :key="child.name">
              <NuxtLink class="hover:text-nxtkartsecondaryBlue" :to="`/category/${child.slug}`">
                {{ child.name }}
              </NuxtLink>
              <span v-if="index < category.children.length - 1"> | </span>
            </template>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCategories } from '@/composables/useCategories'; // Adjust the import path as needed

const { categories } = useCategories();
</script>
