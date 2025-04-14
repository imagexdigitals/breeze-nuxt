<!-- HeaderDesktop.vue -->
<template>
  <header class="border-b sticky top-0 z-50 bg-white">
    <div class="flex items-center justify-between p-2 text-gray-800 mx-auto w-[90%] gap-4">
      <div class="flex items-center space-x-4">
        <!-- Logo -->
        <NuxtLink to="/">
          <NuxtImg src="/images/NxtKart_Logo.svg" alt="NxtKart Logo" width="180" height="175" />
        </NuxtLink>
        <!-- All Categories with Icon -->
        <div
          @click="toggleMenu"
          class="font-medium text-gray-700 flex space-x-2 items-center cursor-pointer hover:bg-zinc-100 p-2 border-white border hover:border-dashed hover:border-secondaryBlue hover:border hover:rounded-md hover:text-secondaryBlue">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-1">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4 12h16M4 6h16M4 18h16" />
          </svg>
          All Categories
        </div>
      </div>

      <!-- Search Bar -->
      <HeaderSearchBar />

      <!-- Right Side Components -->
      <HeaderDesktopRight />
    </div>

    <!-- Mobile Menu Component -->
    <MobileDesktopMenu ref="mobileMenu" />
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MobileDesktopMenu from '@/components/Header/MobileDesktopMenu .vue'; // Adjust the import path as needed

const mobileMenu = ref(null);

const toggleMenu = () => {
  if (mobileMenu.value) {
    mobileMenu.value.toggleMenu();
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
