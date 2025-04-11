<!-- CategoryAndBanner.vue -->
<template>
  <div class="w-full flex">
    <!-- Left Column: 20% width -->
    <SideCategory />

    <!-- Right Column: 80% width -->
    <MainBanner />

  </div>
</template>

<script lang="ts" setup>
import MainBanner from '@/components/HomePage/MainBanner.vue';
import SideCategory from '~/components/CategoryDesktop/SideCategory.vue';
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
