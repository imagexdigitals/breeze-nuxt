<template>
  <div class="mt-8 p-6 md:rounded-lg border-y md:border flex flex-col items-center md:w-[80%] mx-auto"
       :class="statusClass">
    <div class="flex items-center justify-center mb-3">
      <Icon :name="statusIcon" class="w-7 h-7 mr-2" :class="iconColor" />
      <h2 class="text-2xl font-semibold" :class="textColor">{{ statusTitle }}</h2>
    </div>
    <p :class="textColor">{{ statusMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
});

const status = computed(() => {
  const path = route.path.split('/').pop();
  return path === 'success' ? 'success' : 
         path === 'pending' ? 'pending' : 
         'failed';
});

const statusClass = computed(() => {
  return {
    'bg-[#ECF9E8]': status.value === 'success',
    'bg-[#FFF8E6]': status.value === 'pending',
    'bg-[#FFEBEE]': status.value === 'failed'
  };
});

const statusIcon = computed(() => {
  return {
    'success': 'teenyicons:tick-circle-solid',
    'pending': 'mdi:clock-time-three-outline',
    'failed': 'mdi:close-circle'
  }[status.value];
});

const iconColor = computed(() => {
  return {
    'success': 'text-green-600',
    'pending': 'text-amber-500',
    'failed': 'text-red-600'
  }[status.value];
});

const textColor = computed(() => {
  return {
    'success': 'text-gray-800',
    'pending': 'text-gray-800',
    'failed': 'text-gray-800'
  }[status.value];
});

const statusTitle = computed(() => {
  return {
    'success': 'Order Has Been Placed',
    'pending': 'Order Is Being Processed',
    'failed': 'Order Failed'
  }[status.value];
});

const statusMessage = computed(() => {
  return {
    'success': 'You will receive a confirmation email soon.',
    'pending': 'Your payment is being processed. We will notify you once confirmed.',
    'failed': 'There was an issue processing your order. Please try again or contact support.'
  }[status.value];
});
</script>