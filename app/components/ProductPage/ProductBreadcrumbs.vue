<template>
  <nav aria-label="breadcrumb" class="breadcrumb-container">
    <ol class="flex overflow-x-auto">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center text-sm shrink-0">
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
/* Enable horizontal scrolling on mobile */
.breadcrumb-container {
  width: 100%;
  overflow-x: auto;
  padding: 0 1rem;
  /* Optional: Add padding for better spacing */
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  /* For smooth scrolling on iOS */
}

ol {
  display: flex;
  white-space: nowrap;
}

li {
  display: inline-flex;
}


ol.flex.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.breadcrumb-container {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}
</style>
