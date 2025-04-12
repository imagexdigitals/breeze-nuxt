<template>
  <header class="border-b sticky top-0 z-50 bg-white">
    <div class="flex items-center justify-between p-2 text-gray-800 mx-auto w-full gap-4">
      <div class="flex items-center space-x-4">
        <!-- Hamburger Menu -->
        <button class="text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <!-- Logo -->
        <NuxtLink to="/">
          <NuxtImg src="/images/NxtKart_Logo.svg" alt="NxtKart Logo" width="150" height="97" />
        </NuxtLink>
      </div>

      <!-- Right Side Components -->
      <div class="flex items-center space-x-2">
        <!-- My Account Icon -->
        <!-- My Account -->
        <NuxtLink to="/login"
          class="font-medium text-gray-700 flex space-x-2 items-center cursor-pointer hover:bg-zinc-100 p-1.5 border-white border hover:border-dashed hover:border-nxtkartsecondaryBlue hover:border hover:rounded-md hover:text-nxtkartsecondaryBlue">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="mr-1">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </g>
          </svg>
        </NuxtLink>
        <!-- Cart Icon -->
        <HeaderCart />
      </div>
    </div>

    <!-- Bottom Search Bar -->
    <div class="pb-2 w-full">
      <!-- Search Bar -->
      <HeaderSearchBar />
    </div>
  </header>
</template>

<script lang="ts" setup>
// Your script here
</script>

<style scoped>
/* Add any additional styles here */
</style>
