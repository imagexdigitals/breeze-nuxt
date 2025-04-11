<template>
  <div class="w-1/5 py-4 mr-4 relative">
    <!-- Parent Block -->
    <div class="space-y-3 bg-white p-4">
      <div
        v-for="category in categories"
        :key="category.name"
        class="relative"
      >
        <NuxtLink :to="`/category/${category.slug}`" class="flex items-center">
          <img
            :src="category.image || 'https://placehold.co/75'"
            alt="Category Icon"
            class="w-8 h-8 mr-2"
          />
          <p>{{ category.name }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const sanctumFetch = useSanctumClient();

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await sanctumFetch(`/api/categories`, {
      method: 'GET',
    });
    categories.value = response;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
