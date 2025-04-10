<template>
  <div class="w-full">
    <div class="bg-white p-4 border-y md:border-none md:rounded-md">
      <div class="flex justify-between items-center mb-4">
        <span class="font-semibold">Billing Address</span>
        <button class="text-blue-500 font-medium text-sm" @click="$emit('add-address')">+ Add Address</button>
      </div>
      <div v-if="isLoading" class="flex items-center justify-center h-52">
        <div class="w-8 h-8 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent">
        </div>
      </div>
      <div v-else-if="addresses.length === 0" class="text-center text-gray-500">No billing addresses found.</div>
      <div v-else v-for="address in addresses" :key="address.id"
        class="border p-4 rounded-md bg-[#F1FFF4] relative mb-4">
        <div class="absolute top-2 right-2 flex space-x-2">
          <button class="text-red-600 flex items-center space-x-1 hover:text-red-700">
            <Icon name="uil:edit" class="w-4 h-4" />
            <span class="text-sm">Edit</span>
          </button>
          <button class="text-red-600 flex items-center hover:text-red-700">
            <Icon name="fluent:delete-20-filled" class="w-5 h-5" />
          </button>
        </div>
        <div class="mb-4 space-y-1">
          <div class="font-semibold">{{ address.name }} ({{ addressType(address.type) }})</div>
          <div>Mobile: {{ address.mobile }}</div>
          <div>{{ address.address1 }}, {{ address.address2 }}, {{ address.city }}, {{ address.state }} - {{
            address.pincode }}</div>
          <div>GST NO.: {{ address.gst }}</div>
        </div>
        <button class="text-white w-full py-2 rounded"
          :class="address.id === selectedAddressId ? 'bg-nxtkartsecondaryBlue' : 'bg-green-600'"
          @click="$emit('select-address', address.id)">
          Billing at this Address
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';


interface Address {
  id: number;
  name: string;
  type: number;
  mobile: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  gst: string;
}

const props = defineProps<{
  addresses: Address[];
  isLoading: boolean;
  selectedAddressId: number | null;
}>();

const emit = defineEmits<{
  (e: 'add-address'): void;
  (e: 'select-address', id: number): void;
}>();

const addressType = (type: number) => {
  switch (type) {
    case 1:
      return 'Home';
    case 2:
      return 'Office';
    default:
      return 'Other';
  }
};
</script>
