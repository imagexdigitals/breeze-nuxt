<template>
  <div class="flex items-center space-x-3">
    <!-- Request Quote -->
    <HeaderQuote />
    <!-- Track Order -->
    <NuxtLink to="/track"
      class="font-medium text-gray-700 flex space-x-2 items-center cursor-pointer hover:bg-zinc-100 p-2 border-white border hover:border-dashed hover:border-nxtkartsecondaryBlue hover:border hover:rounded-md hover:text-nxtkartsecondaryBlue">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="mr-1">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
          <path
            d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1zm3-12a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2M18 22v-3" />
          <circle cx="10" cy="10" r="3" />
        </g>
      </svg>
      Track Order
    </NuxtLink>
    <!-- My Account -->
    <NuxtLink :to="accountLink"
      class="font-medium text-gray-700 flex space-x-2 items-center cursor-pointer hover:bg-zinc-100 p-1.5 border-white border hover:border-dashed hover:border-nxtkartsecondaryBlue hover:border hover:rounded-md hover:text-nxtkartsecondaryBlue">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="mr-1">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </g>
      </svg>
      <div class="flex flex-col leading-tight">
        <span class="text-xs -mb-1 text-gray-500">{{ accountWelcomeText }}</span>
        <span class="text-base">My Account</span>
      </div>
    </NuxtLink>

    <!-- Cart Icon -->
    <HeaderCart />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';


const { isAuthenticated } = useSanctumAuth();

const accountLink = computed(() => {
  return isAuthenticated.value ? '/my-account' : '/login';
});

const accountWelcomeText = computed(() => {
  return isAuthenticated.value ? 'Welcome Back' : 'Welcome';
});
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
