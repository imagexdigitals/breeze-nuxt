<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: ['sanctum:guest'],
});

useSeoMeta({
  title: 'Register',
})


</script>

<template>
  <AuthRegisterForm />
</template>

<style scoped></style>
