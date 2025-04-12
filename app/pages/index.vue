<template>
  <div class="bg-gray-100">
    <!-- Category and Main Banner -->
    <CategoryAndBanner />

    <!-- Category Section -->
    <CategorySection v-for="category in categories" :key="category.id" :category="category" />

    <!-- About NxtKart -->
    <HomePageAboutNxtKart />

    <!-- Shop by category -->
    <div class="flex md:justify-center">
      <div class="md:w-[90%] w-full bg-white md:p-4 md:rounded-md mt-4 p-3">
        <h2 class="text-lg mb-3 font-bold">Popular Categories on Nxtkart</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="category in categoriesData" :key="category.name" class="border p-4 hover:bg-gray-100">
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CategoryAndBanner from '@/components/HomePage/CategoryAndBanner.vue';
import CategorySection from '@/components/HomePage/CategorySection.vue';

const sanctumFetch = useSanctumClient();

const categories = ref([]);
const categoriesData = ref([]);

onMounted(async () => {
  try {
    const response = await sanctumFetch(`/api/homepage-categories`, {
      method: 'GET',
    });
    categories.value = response;

    const categoriesResponse = await sanctumFetch(`/api/categories`, {
      method: 'GET',
    });
    categoriesData.value = categoriesResponse;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});
</script>
