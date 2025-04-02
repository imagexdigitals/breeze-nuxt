<template>
  <div>
    <p>Your order is pending</p>
    <p>Your Order ID: {{ orderId }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = route.query.order_id as string;
</script>

<style scoped>
</style>
