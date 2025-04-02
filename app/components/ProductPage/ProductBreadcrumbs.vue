<template>
  <nav aria-label="breadcrumb">
    <ol class="flex">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center text-sm">
        <NuxtLink :to="crumb.url" class="text-gray-700 font-medium hover:text-secondaryBlue">{{ crumb.name }}</NuxtLink>
        <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useHead } from 'nuxt/app'; // or '@nuxtjs/composition-api' for Nuxt 2

interface Breadcrumb {
  name: string;
  url: string;
}

const props = defineProps<{
  breadcrumbs: Breadcrumb[];
}>();

// Determine the base URL
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

// Generate the breadcrumb schema dynamically with full URLs
const breadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: props.breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: `${baseUrl}${crumb.url}`
  }))
};

// Use the useHead composable to add the schema to the head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbList)
    }
  ]
});
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
