<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <NuxtImg src="/images/empty-cart.svg" width="500" height="500" class="mb-4" />
    <p class="text-xl font-semibold mb-6">Your cart is empty.</p>
    <button @click="goToHome" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-secondaryBlue">
      Go to Home
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

// Initialize the router
const router = useRouter();

// Method to navigate to the home page
const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
