<template>
  <div class="w-[30%]">
    <div class="bg-white p-4 rounded-md mb-4">
      <p class="font-semibold border-b pb-2 border-dashed border-gray-300">
        Apply Coupons
      </p>

      <div class="flex mt-3 space-x-2">
        <input type="text" v-model="couponCode" placeholder="Enter Coupon Code"
          class="border border-gray-300 p-2 text-sm flex-grow rounded-md font-semibold focus:border-gray-300 focus:ring-0" />
        <button @click="applyCoupon" class="bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600">
          Apply
        </button>
      </div>
      <p v-if="couponError" class="text-red-500 text-sm mt-2">{{ couponError }}</p>
    </div>

    <div v-if="['/order/address', '/order/payment'].includes(route.path)" class="bg-white p-4 rounded-md mb-4"
      :class="{ 'loading-overlay': isLoading }">
      <div>
        <div v-if="isLoading" class="loading-spinner">
          <!-- You can use any loading spinner component or icon here -->
          <div class="spinner"></div>
        </div>
        <p class="font-semibold border-b pb-2 border-dashed border-gray-300">
          Estimated Delivery Date <small class="font-thin text-xs">(May vary slightly)</small>
        </p>

        <div class="flex items-center text-sm mt-4">
          <NuxtImg src="/images/delivery-truck-ck.svg" alt="Delivery Truck" width="45" height="45" class="mr-2" />
          <div class="ml-1">
            <span class="block font-semibold text-secondaryBlue" v-if="cartData.EstimateDeliveryDate !== null">
              {{ cartData.EstimateDeliveryDate }}
            </span>
            <span class="block font-semibold text-secondaryBlue" v-if="cartData.EstimateDeliveryDate === null">
              Select or Add Shipping Address
            </span>
            <small class="block capitalize"></small>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-md" :class="{ 'loading-overlay': isLoading }">
      <div v-if="isLoading" class="loading-spinner">
        <!-- You can use any loading spinner component or icon here -->
        <div class="spinner"></div>
      </div>
      <div>
        <p class="font-semibold border-b pb-2 border-dashed border-gray-300">
          Payment Summary ({{ cartData.TotalItem }} Item)
        </p>

        <div class="mt-2 space-y-2">
          <div class="flex justify-between">
            <span>Total Selling Price</span>
            <span class="font-semibold">₹ {{ cartData.totalSellingPrice }}</span>
          </div>

          <div class="flex justify-between">
            <div class="flex flex-col">
              <span>GST Amount</span>
              <small class="text-xs">(*Included already, not extra added)</small>
            </div>
            <span class="font-semibold">+ ₹ {{ cartData.gstAmount }}</span>
          </div>

          <div class="flex justify-between">
            <span>Shipping Charges</span>
            <span :class="{ 'text-green-600 font-medium': cartData.shippingCharges === null }">
              {{ cartData.shippingCharges === null ? 'Free Shipping' : cartData.shippingCharges }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="flex">
              <NuxtImg src="/images/discount-96.svg" width="22" height="22" class="mr-1" />
              Total Saving
            </span>
            <span class="font-semibold text-green-600">₹ {{ cartData.totalSaving }}</span>
          </div>

          <div class="flex justify-between border-t border-dashed pt-2 font-semibold mt-2">
            <span>Total</span>
            <span>₹ {{ cartData.amountPayable }}</span>
          </div>
          <div v-if="route.path === '/order/payment' && cartData.totalPartialCod !== null">
            <div class="flex justify-between">
              <span>Partial Cash On Delivery - 25%</span>
              <span class="font-semibold">₹ {{ cartData.totalPartialCod }}</span>
            </div>
            <div class="flex justify-between text-secondaryBlue">
              <span>Balance Payable as Cash on Delivery</span>
              <span class="font-semibold">₹ {{ cartData.BalancePartialCod }}</span>
            </div>
            <div class="flex justify-between border-t border-dashed pt-2 font-semibold mt-2">
              <span>Amount Payable Now</span>
              <span>₹ {{ cartData.totalPartialCod }}</span>
            </div>
          </div>

          <div v-if="cartData.instantDiscount > 0">
            <div class="flex justify-between text-green-600">
              <span>INSTANT EXTRA DISCOUNT</span>
              <span class="font-semibold">- ₹ {{ cartData.instantDiscount }}</span>
            </div>
            <div class="flex justify-between border-t border-dashed pt-2 font-semibold mt-2">
              <span>Amount Payable</span>
              <span>₹ {{ cartData.instantDiscountTotal }}</span>
            </div>
          </div>
        </div>

        <div v-if="hasStatus2" class="mt-4 text-red-600 font-semibold flex items-center justify-center gap-2">
          <Icon name="icon-park-outline:caution" />
          <span>Remove out of stock from cart to checkout</span>
        </div>
      </div>
    </div>

    <!-- Checkout Component -->
    <div class="bg-white mt-4 text-red-600 p-4">
      <strong>Response</strong>
      <p>{{ responseMessage }}</p> <!-- Display the response here -->
    </div>

    <div class="w-full mt-4">
      <button v-if="route.path === '/order/payment'" @click="proceedToPay" :class="{
        'cursor-not-allowed bg-gray-400 hover:bg-gray-400': isLoading,
        'bg-green-600 hover:bg-green-700': !isLoading
      }" class="block w-full px-4 py-2 text-center font-medium text-white rounded-md focus:outline-none focus:ring-0"
        :disabled="isLoading">
        Proceed to Pay
      </button>
    </div>


    <div class="w-full mt-4">
      <!-- Allow Checkout -->
      <NuxtLink
        v-if="isAuthenticated && !hasStatus2 && (route.path !== '/order/address' && route.path !== '/order/payment' || (cartData.ShippingAddressId && cartData.BillingAddressId)) && route.path !== '/order/payment'"
        :to="nextRoute" :class="{
          'cursor-not-allowed bg-gray-400 hover:bg-gray-400': isLoading,
          'bg-green-600 hover:bg-green-700': !isLoading
        }" class="block w-full px-4 py-2 text-center font-medium text-white rounded-md focus:outline-none focus:ring-0">
        Continue to Checkout
      </NuxtLink>


      <!-- Not Allow Checkout -->
      <button v-if="isAuthenticated && hasStatus2" :disabled="isLoading"
        class="block w-full px-4 py-2 text-center font-medium text-white bg-gray-400 rounded-md cursor-not-allowed">
        Continue to Checkout
      </button>

      <!-- Address Pending Not Allow Checkout -->
      <button
        v-if="['/order/address', '/order/payment'].includes(route.path) && (!cartData.ShippingAddressId || !cartData.BillingAddressId) && route.path !== '/order/payment'"
        :disabled="isLoading"
        class="block w-full px-4 py-2 text-center font-medium text-white bg-gray-400 rounded-md cursor-not-allowed">
        Add or select Shipping and Billing Address
      </button>

      <!-- Login / Signup if not authenticated -->
      <NuxtLink v-if="!isAuthenticated" to="/login" :class="{ 'cursor-not-allowed': isLoading }"
        class="block w-full px-4 py-2 text-center font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-0">
        Login / Signup to Continue
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { load } from '@cashfreepayments/cashfree-js';
import { useCart } from '@/plugins/cartPlugin'; // Import the useCart composable

// Define the User type
interface User {
  id: number;
  // Add other properties if needed
}

// Define the props
interface Props {
  cartData: {
    TotalItem: number;
    totalSellingPrice: number;
    gstAmount: number;
    shippingCharges: string | null;
    totalSaving: number;
    amountPayable: number;
    totalPartialCod: number | null;
    BalancePartialCod: number | null;
    instantDiscount: number;
    instantDiscountTotal: number;
    EstimateDeliveryDate: string | null;
    ShippingAddressId: number | null;
    BillingAddressId: number | null;
  };
  hasStatus2: boolean;
  isLoading: boolean;
  hasBillingAddresses: boolean;
  hasShippingAddresses: boolean;
}

const props = defineProps<Props>();

const { isAuthenticated, user } = useSanctumAuth();
const sanctumFetch = useSanctumClient();
const router = useRouter();
const cartStore = useCartStore();
const couponCode = ref('');
const couponError = ref('');
const route = useRoute();
const responseMessage = ref('');

// Destructure updateCartCount from useCart
const { updateCartCount } = useCart();

const nextRoute = computed(() => {
  switch (route.path) {
    case '/cart':
      return '/order/address';
    case '/order/address':
      return '/order/payment';
    case '/order/payment':
      return '#';
    default:
      return '#';
  }
});

const applyCoupon = () => {
  if (!couponCode.value) {
    couponError.value = 'Please enter a coupon code.';
  } else {
    couponError.value = 'Invalid Coupon Code';
  }
};

const generateSessionId = (): string | null => {
  // Check if a session ID already exists in localStorage
  return localStorage.getItem('sessionId');
};

const proceedToPay = async () => {
  if (!isAuthenticated.value || !(user.value as User)?.id) {
    responseMessage.value = 'User not authenticated or user ID not available.';
    return;
  }

  const sessionId = generateSessionId();

  try {
    const response = await sanctumFetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: (user.value as User).id,
        proceed_payment: 'ok',
        session_id: sessionId,
      }),
    });

    // Log the response to debug
    console.log('Response:', response);

    // Check the response status
    if (response.status === 'success') {
      responseMessage.value = response;

      // Check the payment method
      if (response.payment_method === 'cod') {
        // Redirect to the success page with the secure order number
        router.push(`/order/success?order_id=${response.secure_order_no}`);
      } else {
        // Initialize Cashfree SDK
        const cashfree = await load({
          mode: "sandbox" // Change to "production" for live environment
        });

        // Open Cashfree Checkout
        cashfree.checkout({
          paymentSessionId: response.paymentSessionId,
          redirectTarget: "_self", // Change as needed
        });
      }

      // Update the cart count after successful payment processing
      updateCartCount();
    } else {
      responseMessage.value = 'Failed to process payment.';
    }
  } catch (error) {
    responseMessage.value = 'An error occurred while processing the payment.';
    console.error('Error processing payment:', error);
  }
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
.cursor-not-allowed {
  cursor: not-allowed;
}

.loading-overlay {
  position: relative;
  pointer-events: none;
  opacity: 0.6;
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
