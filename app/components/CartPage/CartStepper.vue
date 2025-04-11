<template>
  <!-- Cart Step -->
  <div class="flex flex-nowrap items-center justify-center md:gap-[10px] gap-[5px] mb-8">
    <div class="flex flex-nowrap gap-[10px] items-center text-[14px]" :class="cartStepClass">
      <Icon name="teenyicons:tick-circle-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Cart
    </div>

    <hr class="h-px my-[10px] border-0 w-[10px] md:w-[50px]" :class="cartHrClass">

    <div class="flex flex-nowrap gap-[10px] items-center text-[14px]" :class="addressStepClass">
      <Icon name="teenyicons:tick-circle-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Address
    </div>

    <hr class="h-px my-[10px] border-0 w-[10px] md:w-[50px]" :class="addressHrClass">

    <div class="flex flex-nowrap gap-[10px] items-center text-[14px]" :class="paymentStepClass">
      <Icon :name="paymentIcon" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Payment
    </div>

    <hr v-if="isSuccessActive || isFailedActive || isPendingActive" class="h-px my-[10px] border-0 w-[10px] md:w-[50px]" :class="paymentHrClass">

    <div v-if="isSuccessActive" class="flex flex-nowrap gap-[10px] items-center text-[14px] text-green-600 font-semibold">
      <Icon name="teenyicons:tick-circle-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Success
    </div>

    <div v-if="isFailedActive" class="flex flex-nowrap gap-[10px] items-center text-[14px] text-red-600 font-semibold">
      <Icon name="teenyicons:x-circle-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Failed
    </div>

    <div v-if="isPendingActive" class="flex flex-nowrap gap-[10px] items-center text-[14px] text-yellow-600 font-semibold">
      <Icon name="teenyicons:clock-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Pending
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isCartActive = computed(() => {
  return ['/order/address', '/order/payment', '/order/success', '/order/failed', '/order/pending'].includes(route.path);
});

const isAddressActive = computed(() => {
  return ['/order/payment', '/order/success', '/order/failed', '/order/pending'].includes(route.path);
});

const isPaymentActive = computed(() => {
  return ['/order/success', '/order/failed', '/order/pending'].includes(route.path);
});

const isSuccessActive = computed(() => {
  return route.path === '/order/success';
});

const isFailedActive = computed(() => {
  return route.path === '/order/failed';
});

const isPendingActive = computed(() => {
  return route.path === '/order/pending';
});

const paymentIcon = computed(() => {
  if (isFailedActive.value) return 'teenyicons:x-circle-outline';
  if (isPendingActive.value) return 'teenyicons:clock-outline';
  return 'teenyicons:tick-circle-outline';
});

const cartStepClass = computed(() => {
  return isCartActive.value ? 'text-green-600 font-semibold' : 'text-[#000000]';
});

const addressStepClass = computed(() => {
  return isAddressActive.value ? 'text-green-600 font-semibold' : 'text-[#BCBCBC]';
});

const paymentStepClass = computed(() => {
  if (isFailedActive.value) return 'text-red-600 font-semibold';
  if (isPendingActive.value) return 'text-yellow-600 font-semibold';
  return isPaymentActive.value ? 'text-green-600 font-semibold' : 'text-[#BCBCBC]';
});

const cartHrClass = computed(() => {
  return isCartActive.value ? 'bg-green-600' : 'bg-[#BCBCBC]';
});

const addressHrClass = computed(() => {
  return isAddressActive.value ? 'bg-green-600' : 'bg-[#BCBCBC]';
});

const paymentHrClass = computed(() => {
  if (isFailedActive.value) return 'bg-red-600';
  if (isPendingActive.value) return 'bg-yellow-600';
  return isPaymentActive.value ? 'bg-green-600' : 'bg-[#BCBCBC]';
});
</script>
