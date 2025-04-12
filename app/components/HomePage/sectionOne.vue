<template>
  <div class="w-full flex">
    <!-- Left Column: 20% width -->
    <SideCategory class="side-category" />

    <!-- Right Column: 80% width -->
    <MainBanner class="main-banner" />
  </div>
</template>

<script lang="ts" setup>
import MainBanner from '@/components/HomePage/MainBanner.vue';
import SideCategory from '~/components/CategoryDesktop/SideCategory.vue';
</script>

<style scoped>
.side-category {
  width: 20%;
}

.main-banner {
  width: 80%;
}

@media (max-width: 767px) {
  .side-category {
    display: none;
  }

  .main-banner {
    width: 100%;
  }
}
</style>
