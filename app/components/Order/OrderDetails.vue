<template>
  <div class="bg-white rounded-lg border w-[80%] mt-5 p-5 mx-auto">
    <!-- Order Number -->
    <div class="flex justify-between items-center border-b-2 pb-3">
      <span class="text-xl font-semibold">
        Order Number:
        <span class="text-nxtkartsecondaryBlue">{{ orderDetails.order.order_no }}</span>
      </span>
      <span class="text-xl font-semibold">
        Total: ₹{{ orderDetails.order_details.instant_discount_total ? orderDetails.order_details.instant_discount_total : orderDetails.order_details.total }}
      </span>
    </div>

    <!-- Three Columns -->
    <div class="flex flex-col md:flex-row gap-4 mt-4">
      <!-- Shipping Address -->
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2">Shipping Address</h3>
        <p class="text-gray-700">
          {{ orderDetails.order_details.order_address.name }},<br>
          {{ orderDetails.order_details.order_address.address1 }},<br>
          {{ orderDetails.order_details.order_address.city }},<br>
          {{ orderDetails.order_details.order_address.state }}, {{ orderDetails.order_details.order_address.pincode }}.
        </p>
      </div>
      <!-- Payment Information -->
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2">Payment Information</h3>
        <p class="text-gray-700">Method: {{ paymentType }}</p>
        <p class="text-gray-700">Reference No.: {{ orderDetails.order_details.bank_reference }}</p>
        <p class="text-gray-700">Date: {{ orderDetails.order_details.payment_time }}</p>
        <p v-if="orderDetails.order_details.balance_partial_cod" class="text-red-600">
          Balance COD: ₹{{ orderDetails.order_details.balance_partial_cod }}
        </p>
        <div class="flex items-center mt-2">
          <Icon name="teenyicons:tick-circle-solid" class="text-green-600 w-5 h-5 mr-2" />
          <span class="text-green-600 font-semibold">Payment: Success</span>
        </div>
      </div>
      <!-- Order Summary -->
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2">Order Summary</h3>
        <div class="space-y-2 text-gray-700">
          <div class="flex justify-between">
            <span>Items ({{ orderDetails.order_details.total_items }})</span>
            <span>₹{{ orderDetails.order_details.total }}</span>
          </div>
          <div class="flex justify-between">
            <span>Coupon</span>
            <span>₹0.00</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping Charges</span>
            <span>{{ orderDetails.order_details.shipping_charge ? `₹${orderDetails.order_details.shipping_charge}` : 'Free Shipping' }}</span>
          </div>
          <div v-if="orderDetails.order_details.instant_discount" class="flex justify-between">
            <span>Instant Discount</span>
            <span>₹{{ orderDetails.order_details.instant_discount }}</span>
          </div>
          <div class="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{{ orderDetails.order_details.instant_discount_total ? orderDetails.order_details.instant_discount_total : orderDetails.order_details.total }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product List -->
    <div class="mt-6">
      <h3 class="text-lg font-semibold mb-3">Items ({{ orderDetails.order_details.total_items }})</h3>
      <div class="space-y-4">
        <div
          v-for="(item, index) in orderDetails.order_details.order_products"
          :key="item.product_details.name"
          class="flex items-center pb-3"
          :class="{ 'border-b': index < orderDetails.order_details.order_products.length - 1 }"
        >
          <img :src="item.product_details.image" :alt="item.product_details.name" class="w-12 h-12 mr-4">
          <div class="flex-1">
            <p class="font-semibold">{{ item.product_details.name }}</p>
            <p class="text-gray-600">Qty: {{ item.quantity }} | SKU: {{ item.product_details.sku }}</p>
          </div>
          <p class="text-gray-800 font-semibold">₹{{ item.total }}</p>
        </div>
      </div>
    </div>

    <!-- Thank You Message -->
    <div class="mt-6 text-center border-t pt-4">
      <h3 class="text-lg font-semibold text-gray-800">Thank You for Shopping!</h3>
      <p class="text-gray-600">We appreciate your business.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  orderDetails: {
    type: Object,
    required: true
  }
});

const paymentType = computed(() => {
  if (!props.orderDetails) return '';
  switch (props.orderDetails.order_details.payment_method_code) {
    case 1:
      return 'Online';
    case 2:
      return 'Partially Paid';
    default:
      return 'Unknown';
  }
});
</script>
