<!-- StockStatus.vue -->
<template>
  <div class="flex items-center space-x-2">
    <div :class="stockStatusIconClass" class="p-1.5 rounded-full flex items-center justify-center">
      <Icon :name="stockStatusIconName" class="w-4 h-4" :class="stockStatusIconColor" />
    </div>
    <span class="text-sm font-semibold text-gray-800">{{ stockStatusText }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  status: number;
}

const props = defineProps<Props>();

const stockStatusText = computed(() => {
  return props.status === 1 ? 'In Stock' : 'Out of Stock';
});

const stockStatusIconClass = computed(() => {
  return props.status === 1 ? 'bg-green-100' : 'bg-red-100';
});

const stockStatusIconName = computed(() => {
  return props.status === 1 ? 'mdi:marker-tick' : 'mdi:close-circle';
});

const stockStatusIconColor = computed(() => {
  return props.status === 1 ? 'text-green-600' : 'text-red-600';
});
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
