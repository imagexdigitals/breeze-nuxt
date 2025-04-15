<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: ['sanctum:guest'],
});

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to manage orders, update addresses, and access customer support for a seamless shopping experience.',
  robots: 'noindex, nofollow', // Ensure the robots meta tag is set to noindex, nofollow
});

const route = useRoute();
const resetToken = route.query.reset as string | undefined;
</script>

<template>
  <AuthLoginForm :token="resetToken" />
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
