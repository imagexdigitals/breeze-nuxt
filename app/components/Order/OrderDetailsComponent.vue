<template>
  <div class="bg-gray-100 py-6">
    <div class="mx-auto md:w-4/5 py-5">
      <CartPageCartStepper v-if="!isLoading && orderId" />

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="flex items-center justify-center h-screen">
        <div class="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
      </div>

      <!-- Order Status Message Component -->
      <OrderStatusMessage :isLoading="isLoading" :orderId="orderId" />

      <!-- Order Details -->
      <div v-if="!isLoading && orderDetails && hasPermission" class="bg-white md:rounded-lg border-y md:border md:w-[80%] mt-5 p-5 w-full md:mx-auto">
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
            <p class="text-gray-700">Method: {{ orderDetails.order_details.payment_group }}</p>
            <p class="text-gray-700">Reference No.: {{ orderDetails.order_details.bank_reference }}</p>
            <p class="text-gray-700">Date: {{ orderDetails.order_details.payment_time }}</p>
            <p v-if="orderDetails.order_details.balance_partial_cod" class="text-red-600">
              Balance COD: ₹{{ orderDetails.order_details.balance_partial_cod }}
            </p>
            <div class="flex items-center mt-2">
              <Icon :name="paymentStatusIcon" class="w-5 h-5 mr-2" :class="paymentStatusIconClass" />
              <span :class="paymentStatusTextClass">Payment: {{ paymentStatusText }}</span>
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

        <!-- Conditional Message -->
        <div class="mt-6 text-center border-t pt-4">
          <template v-if="isSuccessRoute">
            <h3 class="text-lg font-semibold text-gray-800">Thank You for Shopping!</h3>
            <p class="text-gray-600">We appreciate your business.</p>
          </template>
          <template v-else-if="isFailedRoute">
            <h3 class="text-lg font-semibold text-gray-800">Payment Failed</h3>
            <p class="text-gray-600">Don't worry! You can try again.</p>
            <button @click="retryPayment" class="mt-4 px-4 py-2 bg-green-600 text-white rounded">Retry Payment</button>
          </template>
          <template v-else-if="isPendingRoute">
            <h3 class="text-lg font-semibold text-gray-800">Payment Pending</h3>
            <p class="text-gray-600">Your payment is being processed.</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import OrderStatusMessage from '@/components/Order/OrderStatusMessage.vue'; // Adjust the path as necessary

const route = useRoute();
const router = useRouter();
const orderId = route.query.order_id as string;
const orderDetails = ref(null);
const isLoading = ref(true);
const hasPermission = ref(false);

const sanctumFetch = useSanctumClient();

const isSuccessRoute = computed(() => route.path.includes('/order/success'));
const isFailedRoute = computed(() => route.path.includes('/order/failed'));
const isPendingRoute = computed(() => route.path.includes('/order/pending'));

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

const isSuccessActive = computed(() => {
  return isSuccessRoute.value || orderDetails.value?.order_details.payment_status === 'SUCCESS';
});

const isFailedActive = computed(() => {
  return isFailedRoute.value || orderDetails.value?.order_details.payment_status === 'FAILED';
});

const isPendingActive = computed(() => {
  return isPendingRoute.value || orderDetails.value?.order_details.payment_status === 'PENDING';
});

const paymentStatusIcon = computed(() => {
  if (isFailedActive.value) return 'teenyicons:x-circle-outline';
  if (isPendingActive.value) return 'teenyicons:clock-outline';
  return 'teenyicons:tick-circle-solid';
});

const paymentStatusIconClass = computed(() => {
  if (isFailedActive.value) return 'text-red-600';
  if (isPendingActive.value) return 'text-yellow-500';
  return 'text-green-600';
});

const paymentStatusText = computed(() => {
  if (isFailedActive.value) return 'Failed';
  if (isPendingActive.value) return 'Pending';
  return 'Success';
});

const paymentStatusTextClass = computed(() => {
  if (isFailedActive.value) return 'text-red-600 font-semibold';
  if (isPendingActive.value) return 'text-yellow-500 font-semibold';
  return 'text-green-600 font-semibold';
});

const checkPermissions = () => {
  if (isSuccessRoute.value && orderDetails.value?.order_details.payment_status !== 'SUCCESS') {
    router.push('/');
  } else if (isFailedRoute.value && orderDetails.value?.order_details.payment_status !== 'FAILED') {
    router.push('/');
  } else if (isPendingRoute.value && orderDetails.value?.order_details.payment_status !== 'PENDING') {
    router.push('/');
  } else {
    hasPermission.value = true;
  }
};

onMounted(async () => {
  try {
    const payload = {
      order_id: orderId,
      source: 'nuxt_nxtkart', // Add the source parameter here
    };

    const response = await sanctumFetch('/api/order/details', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.error) {
      router.push('/');
      return;
    }

    orderDetails.value = response;
    console.log('API Response:', response);
    checkPermissions();
  } catch (error) {
    console.error('Error fetching order details:', error);
    router.push('/');
  } finally {
    isLoading.value = false;
  }
});

watch(orderDetails, () => {
  checkPermissions();
});

const retryPayment = () => {
  router.push('/order/payment');
};

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
