<!-- ProductBenefits.vue -->
<template>
  <div class="bg-white border-y md:border border-gray-300 p-4 md:rounded-md">
    <div class="flex justify-between items-center space-x-2">
      <!-- GST Invoice -->
      <div v-if="showGstInvoice" class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="tdesign:bill" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs md:text-sm font-semibold text-gray-700">GST Invoice Available</span>
      </div>

      <!-- Secure Payments -->
      <div class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="tdesign:secured" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs md:text-sm font-semibold text-gray-700">Secure Payments</span>
      </div>

      <!-- 365 Days Help Desk -->
      <div class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon name="ic:outline-support-agent" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs md:text-sm font-semibold text-gray-700">365 Days Help Desk</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  showGstInvoice: boolean;
}>();
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
