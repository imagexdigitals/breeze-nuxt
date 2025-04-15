<template>
  <div class="flex flex-col items-center justify-center h-screen text-center text-2xl font-bold text-gray-700 space-y-2">
    <p>My Account</p>
    <small class="text-base font-normal text-gray-500">Under Maintenance. Please visit back. Thank You</small>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['sanctum:auth', 'sanctum-verified'],
});

useSeoMeta({
  title: 'My Account',
  robots: 'noindex, nofollow', // Ensure the robots meta tag is set to noindex, nofollow
});
</script>


<style>
/* Tailwind-only — no extra CSS needed */
</style>
