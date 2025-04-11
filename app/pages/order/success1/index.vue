<template>
  <div class="bg-gray-100">
    <div class="mx-auto md:w-4/5 py-5">
      <CartPageCartStepper v-if="!isLoading && orderId"/>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
      </div>

      <!-- Order Status Message -->
      <div v-if="!isLoading && orderId" class="mt-8 p-6 bg-[#ECF9E8] rounded-lg border flex flex-col items-center w-[80%] mx-auto">
        <div class="flex items-center justify-center mb-3">
          <Icon name="teenyicons:tick-circle-solid" class="text-green-600 w-7 h-7 mr-2" />
          <h2 class="text-2xl font-semibold text-gray-800">Order Has Been Placed</h2>
        </div>
        <p class="text-gray-600">You will receive a confirmation email soon.</p>
      </div>

      <!-- Order Details -->
      <div v-if="!isLoading && orderDetails" class="bg-white rounded-lg border w-[80%] mt-5 p-5 mx-auto">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const sanctumFetch = useSanctumClient();

const route = useRoute();
const router = useRouter();
const orderId = route.query.order_id as string;
const orderDetails = ref(null);
const isLoading = ref(true); // Initialize loading state to true

const paymentType = computed(() => {
  if (!orderDetails.value) return '';
  switch (orderDetails.value.order_details.payment_method_code) {
    case 1:
      return 'Online';
    case 2:
      return 'Partially Paid';
    default:
      return 'Unknown';
  }
});

onMounted(async () => {
  try {
    const response = await sanctumFetch(`/api/order/details?order_id=${orderId}`, {
      method: 'GET',
    });

    if (response.error) {
      // Redirect to home page if order is not found
      router.push('/');
      return;
    }

    orderDetails.value = response;
    console.log('API Response:', response);
  } catch (error) {
    console.error('Error fetching order details:', error);
    // Optionally, redirect to home page on error
    router.push('/');
  } finally {
    isLoading.value = false; // Set loading state to false after data is fetched
  }
});
</script>

<style scoped>
</style>
