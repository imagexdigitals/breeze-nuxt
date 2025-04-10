<template>
  <ProductList apiEndpoint="/api/search" :isBrandPage="false" />
</template>

<script lang="ts" setup>
import ProductList from '@/components/ProductList.vue';
</script>
