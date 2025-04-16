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
    const payload = {
      source: 'nuxt_nxtkart', // Add the source parameter here
    };

    const response = await sanctumFetch('/api/homepage-categories', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    categories.value = response;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});

useSeoMeta({
  title: 'NxtKart - Your Electronics & Maker Supplies Store',
  description: 'Shop 3D Printers, DIY Kits, Electronic Components, IoT Devices, and more. Find all your project needs in India.',
  robots: 'index, follow', // Ensure the robots meta tag is set to index, follow
  titleTemplate: '%s', // Ensure the title is used as-is
});

</script>
