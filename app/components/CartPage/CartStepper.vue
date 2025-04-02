<template>
  <!-- Cart Step -->
  <div class="flex flex-nowrap items-center justify-center md:gap-[10px] gap-[5px] mb-8">
    <div class="flex flex-nowrap gap-[10px] items-center text-[14px]" :class="isCartActive ? 'text-green-600 font-semibold' : 'text-[#000000]'">
      <Icon name="teenyicons:tick-circle-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Cart
    </div>

    <hr class="h-px my-[10px] border-0 w-[10px] md:w-[50px]" :class="isCartActive ? 'bg-green-600' : 'bg-[#BCBCBC]'">

    <div class="flex flex-nowrap gap-[10px] items-center text-[14px]" :class="isAddressActive ? 'text-green-600 font-semibold' : 'text-[#BCBCBC]'">
      <Icon name="teenyicons:tick-circle-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Address
    </div>

    <hr class="h-px my-[10px] bg-[#BCBCBC] border-0 w-[10px] md:w-[50px]">

    <div class="flex flex-nowrap gap-[10px] items-center text-[14px] text-[#BCBCBC]">
      <Icon name="teenyicons:tick-circle-outline" class="w-5 h-5 md:w-[20px] md:h-[20px]" />
      Payment
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isCartActive = computed(() => {
  return ['/order/address', '/order/payment'].includes(route.path);
});

const isAddressActive = computed(() => {
  return route.path === '/order/payment';
});
</script>
