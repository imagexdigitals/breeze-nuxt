<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- First Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Track Your Order</h2>
          <p class="font-semibold text-lg mb-4">Enter Your Details to Track Your Order</p>
          <p class="text-gray-700">
            Use your mobile number and order number to check the status of your order.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/track-order.svg" alt="Track Order Image" class="w-[250px] h-auto"></NuxtImg>
        </div>
      </div>

      <!-- Input Section -->
      <div class="bg-white p-4 md:p-6 md:rounded-md shadow-md w-full md:w-2/5 mx-auto">
        <h3 class="text-xl font-semibold mb-3">Track Order</h3>
        <div class="space-y-4">
          <input
            v-model="mobileNo"
            type="text"
            placeholder="Enter Mobile Number"
            class="w-full p-2 border border-gray-300 rounded"
          />
          <input
            v-model="orderNo"
            type="text"
            placeholder="Enter Order Number"
            class="w-full p-2 border border-gray-300 rounded"
          />
          <button @click="trackOrder" class="w-full bg-nxtkartsecondaryBlue text-white p-2 rounded">Track Order</button>
        </div>
      </div>

      <!-- Order Status Section -->
      <div v-if="showOrderStatus" class="bg-white p-4 md:p-6 md:rounded-md shadow-md w-full md:w-2/5 mx-auto">
        <h3 class="text-xl font-semibold mb-3">Order Status</h3>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse table-auto">
            <thead>
              <tr class="bg-red-600 text-white font-semibold">
                <th class="border border-gray-300 p-3">S.No</th>
                <th class="border border-gray-300 p-3">Status</th>
                <th class="border border-gray-300 p-3">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(status, index) in orderStatus" :key="index" :class="{ 'bg-gray-100': index % 2 === 0, 'hover:bg-gray-200': true }">
                <td class="border border-gray-300 p-3 text-center">{{ index + 1 }}</td>
                <td class="border border-gray-300 p-3 text-center font-medium">
                  {{ status.status }}
                  <div v-if="status.message" class="text-red-500 font-semibold mt-1 text-sm">
                    {{ status.message }}
                  </div>
                </td>
                <td class="border border-gray-300 p-3 text-center">{{ formatDateTime(status.time) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const mobileNo = ref('');
const orderNo = ref('');
const showOrderStatus = ref(false);

// Dummy order data for testing
const dummyOrders = {
  '1234567890': {
    '1001': [
      { status: 'Order Placed', time: '2023-10-01T10:00:00' },
      { status: 'Processing', time: '2023-10-01T11:00:00' },
      { status: 'Shipped', time: '2023-10-01T14:00:00' },
      { status: 'Out for Delivery', time: '2023-10-02T09:00:00' },
      { status: 'Delayed', time: '2023-10-02T11:00:00', message: 'Due to rain in Chennai, delivery is delayed.' },
      { status: 'Delivered', time: '2023-10-03T11:00:00' }
    ],
    '1002': [
      { status: 'Order Placed', time: '2023-10-05T10:00:00' },
      { status: 'Processing', time: '2023-10-05T11:00:00' },
      { status: 'Shipped', time: '2023-10-05T14:00:00' },
      { status: 'Out for Delivery', time: '2023-10-06T09:00:00' },
      { status: 'Delivered', time: '2023-10-06T11:00:00' }
    ]
  }
};

const orderStatus = ref([]);

const formatDateTime = (dateTimeString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-IN', options);
};

const trackOrder = () => {
  const orderData = dummyOrders[mobileNo.value]?.[orderNo.value];
  if (orderData) {
    orderStatus.value = orderData;
    showOrderStatus.value = true;
  } else {
    alert('No order found with the provided details.');
    showOrderStatus.value = false;
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
