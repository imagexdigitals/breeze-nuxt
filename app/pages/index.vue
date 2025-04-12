<template>
  <div class="bg-gray-100 pb-14">
    <!-- Category and Main Banner -->
    <CategoryAndBanner />

    <!-- Category Section -->
    <CategorySection v-for="category in categories" :key="category.id" :category="category" />

    <!-- About NxtKart -->
    <HomePageAboutNxtKart />

    <!-- Shop by category -->
    <HomePageShopByCategory />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CategoryAndBanner from '@/components/HomePage/CategoryAndBanner.vue';
import CategorySection from '@/components/HomePage/CategorySection.vue';


const sanctumFetch = useSanctumClient();
const categories = ref([]);

onMounted(async () => {
  try {
    const response = await sanctumFetch(`/api/homepage-categories`, {
      method: 'GET',
    });
    categories.value = response;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});
</script>
