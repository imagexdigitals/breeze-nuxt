<template>
  <ProductList apiEndpoint="/api/category" :isBrandPage="false" />
</template>

<script lang="ts" setup>
import ProductList from '@/components/ProductList.vue';
</script>
