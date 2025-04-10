<template>
  <div class="bg-white border-y md:border border-gray-300 p-4 md:rounded-md md:mt-4">
    <h3 class="mb-3 font-medium">Return & Warranty Policy</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Warranty -->
      <div v-if="warranty" class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="mingcute:service-fill" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs font-semibold text-gray-700">{{ warranty }}</span>
      </div>

      <!-- Missing Product -->
      <div class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="ph:seal-question-fill" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs font-semibold text-gray-700">Missing Product</span>
      </div>

      <!-- Wrong Product -->
      <div class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="mdi:box-remove" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs font-semibold text-gray-700">Wrong Product</span>
      </div>

      <!-- Damaged Product -->
      <div class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="icon-park-solid:damage-map" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs font-semibold text-gray-700">Damaged Product</span>
      </div>

      <!-- Defective Product -->
      <div class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="tabler:replace-filled" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs font-semibold text-gray-700">Defective Product</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  warranty: string;
}>();
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
