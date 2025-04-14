<template>
  <div class="w-1/5 py-4 mr-4 relative">
    <!-- Parent Block -->
    <div class="bg-white border shadow-lg">
      <div
        v-for="category in categories"
        :key="category.slug"
        class="relative group"
      >
        <!-- Parent Category -->
        <NuxtLink
          :to="`/category/${category.slug}`"
          class="flex items-center hover:bg-nxtkartsecondaryBlue hover:text-white px-4 py-2"
        >
          <img
            :src="category.image || 'https://placehold.co/75'"
            alt="Category Icon"
            class="w-8 h-8 mr-2 rounded-sm"
          />
          <p>{{ category.name }}</p>
        </NuxtLink>

        <!-- Subcategories Dropdown -->
        <div
          v-if="category.children && category.children.length > 0"
          class="absolute top-0 left-full w-56 bg-white border shadow-lg hidden group-hover:block"
        >
          <div
            v-for="subCategory in category.children"
            :key="subCategory.slug"
            class="border-b last:border-b-0"
          >
            <NuxtLink
              :to="`/category/${subCategory.slug}`"
              class="block px-4 py-2 hover:bg-nxtkartsecondaryBlue hover:text-white"
            >
              {{ subCategory.name }}
            </NuxtLink>
          </div>
        </div>
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

<style scoped>
/* Ensure the dropdown is aligned to the top start of the parent category */
.group:hover .group-hover\\:block {
  display: block;
}

/* Add custom styles if needed */
</style>