<template>
  <ProductList apiEndpoint="/api/brand" :isBrandPage="true" />
</template>

<script lang="ts" setup>
import ProductList from '@/components/ProductList.vue';
</script>
