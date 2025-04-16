<template>
  <div class="bg-gray-100 md:py-8">
    <div v-if="!isCartEmpty" class="mx-auto w-full py-5 md:px-4 md:w-4/5">
      <CartPageCartStepper />
      <div class="flex flex-col md:flex-row justify-between items-center mb-3">
        <h1 class="text-xl font-semibold">My Cart</h1>
      </div>
      <p class="font-medium text-gray-700 mb-3 px-5 md:px-0">Total Items: {{ cartData.TotalItem }}</p>
      <div class="md:flex gap-4 flex-col md:flex-row">
        <!-- Cart Left Column -->
        <CartLeftColumn :cartData="cartData" @showRemoveModal="showRemoveModal" @incrementQuantity="incrementQuantity"
          @decrementQuantity="decrementQuantity" @validateQuantity="validateQuantity"
          class="w-full md:w-[70%] mb-4 md:mb-0" />

        <!-- Cart Right Column -->
        <CartRightColumn :cartData="cartData" :hasStatus2="hasStatus2" :isLoading="isLoading"
          :hasBillingAddresses="hasBillingAddresses" :hasShippingAddresses="hasShippingAddresses"
          class="w-full md:w-[30%]" />
      </div>

    </div>
    <div v-else>
      <EmptyCart />
    </div>

    <!-- Remove Confirmation Modal -->
    <div v-if="showModal && !showStatusModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-md w-11/12 md:w-[480px] flex flex-col items-center text-center">
        <NuxtImg src="/images/remove-cart.svg" width="150" height="150" />
        <h2 class="text-lg font-semibold my-2">Remove From Cart?</h2>
        <p>Are you sure you want to remove this item from your cart?</p>
        <div class="flex justify-center gap-4 mt-4 w-full">
          <button @click="cancelRemove"
            class="px-4 py-2 bg-white border-gray-700 border text-gray-700 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button @click="confirmRemove" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Status Message Modal -->
    <div v-if="showStatusModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-md w-11/12 md:w-[480px] flex flex-col items-center text-center">
        <NuxtImg src="/images/out_of_stoct_alert.webp" width="200" height="200" />
        <h2 class="text-lg font-semibold my-2">Item Status</h2>
        <p class="font-medium">One or more items in your cart have a status of out of stock. Please review your cart.
        </p>
        <div class="flex justify-center gap-4 mt-4 w-full">
          <button @click="closeStatusModal" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import EmptyCart from '~/components/CartPage/EmptyCart.vue';
import CartLeftColumn from '~/components/CartPage/CartLeftColumn.vue';
import CartRightColumn from '~/components/CartPage/CartRightColumn.vue';
import { useCart } from '~/plugins/cartPlugin'; // Import the useCart function

// Define the User type
interface User {
  id: number;
  // Add other properties if needed
}

// Define the CartItem type
interface CartItem {
  product_id: number;
  name: string;
  sale_price: string;
  mrp_price: string;
  minimum_qty: number | null;
  status: number;
  image: string;
  quantity: number;
  slug?: string; // Optional slug for the product URL
}

// Define the CartData type
interface CartData {
  cart_details: CartItem[];
  totalSellingPrice: number;
  gstAmount: number;
  shippingCharges: string;
  totalSaving: number;
  amountPayable: number;
  totalPartialCod: number;
  BalancePartialCod: number;
  totalWithSipping: number;
  instantDiscountTotal: number;
  instantDiscount: number;
  instantDiscountStatus: boolean;
  EstimateDeliveryDate: string;
  TotalItem: number;
  ShippingAddressId: number;
  BillingAddressId: number;
}

const { isAuthenticated, user } = useSanctumAuth();
const sanctumFetch = useSanctumClient();
const isLoading = ref(false);
const cartStore = useCartStore();
const showModal = ref(false);
const showStatusModal = ref(false);
const itemToRemove = ref<number | null>(null);
const cartData = ref<CartData>({
  cart_details: [],
  totalSellingPrice: 0,
  gstAmount: 0,
  shippingCharges: 'Calculate at Checkout',
  totalSaving: 0,
  amountPayable: 0,
  totalPartialCod: 0,
  BalancePartialCod: 0,
  totalWithSipping: 0,
  instantDiscountTotal: 0,
  instantDiscount: 0,
  instantDiscountStatus: false,
  EstimateDeliveryDate: 'Select or Add Shipping Address',
  TotalItem: 0,
  ShippingAddressId: 0,
  BillingAddressId: 0,
});
const isCartEmpty = ref(false);
const hasStatus2 = ref(false);
const hasBillingAddresses = ref(false); // Add this line
const hasShippingAddresses = ref(false); // Add this line

const { updateCartCount } = useCart(); // Destructure updateCartCount from useCart

const showRemoveModal = (productId: number) => {
  itemToRemove.value = productId;
  showModal.value = true;
};

const cancelRemove = () => {
  itemToRemove.value = null;
  showModal.value = false;
};

const removeFromCart = async (productId: number) => {
  isLoading.value = true;
  try {
    const payload = {
      product_id: productId,
      source: 'nuxt_nxtkart', // Add the source parameter here
    };

    await sanctumFetch('/api/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Refetch cart data after removing the item
    fetchCartData();
    updateCartCount(); // Update the cart count
    isLoading.value = false;
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

const confirmRemove = () => {
  if (itemToRemove.value !== null) {
    removeFromCart(itemToRemove.value);
    itemToRemove.value = null;
    showModal.value = false;
  }
};

const fetchCartData = async () => {
  try {
    const sessionId = generateSessionId(); // Ensure sessionId is generated or retrieved

    const payload = {
      user_id: isAuthenticated.value ? (user.value as User).id : null,
      session_id: sessionId, // Always include the sessionId
      source: 'nuxt_nxtkart', // Add the source parameter here
    };

    isLoading.value = true;
    const response = await sanctumFetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 'empty') {
      isCartEmpty.value = true;
    } else {
      isCartEmpty.value = false;
      // Update cartData with the fetched values
      cartData.value = {
        cart_details: response.cart_details,
        totalSellingPrice: response.payment_summary.total_selling_price_including_gst,
        gstAmount: response.payment_summary.gst,
        shippingCharges: response.payment_summary.shipping_charge || null, // Assuming this is static
        totalSaving: response.payment_summary.total_saving, // Assuming total_saving is the savings
        totalWithSipping: response.payment_summary.total_with_shipping,
        totalPartialCod: response.payment_summary.total_partial_cod,
        BalancePartialCod: response.payment_summary.balance_partial_cod,
        amountPayable: response.payment_summary.total,
        instantDiscountTotal: response.payment_summary.instant_discount_total,
        instantDiscount: response.payment_summary.instant_discount,
        instantDiscountStatus: response.payment_summary.instant_discount_status,
        EstimateDeliveryDate: response.payment_summary.est_delivery_date,
        TotalItem: response.payment_summary.total_items,
        ShippingAddressId: response.shipping_address_id,
        BillingAddressId: response.billing_address_id,
      };
      isLoading.value = false;
      // Check if any item has a status of 2
      hasStatus2.value = cartData.value.cart_details.some(item => item.status === 2);

      // Show the status modal if any item has a status of 2
      if (hasStatus2.value) {
        showStatusModal.value = true;
        console.log('Status modal should be shown');
      }

      // Log the price to the console
      console.log('Total Selling Price:', cartData.value.totalSellingPrice);
      console.log('GST Amount:', cartData.value.gstAmount);
      console.log('Total Saving:', cartData.value.totalSaving);

      // Log the sessionId next to Amount Payable
      console.log('Amount Payable:', cartData.value.amountPayable);
      console.log('Session ID:', sessionId);
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

const closeStatusModal = () => {
  showStatusModal.value = false;
};

const updateQuantity = async (productId: number, quantity: number) => {
  isLoading.value = true;
  try {
    const payload = {
      product_id: productId,
      quantity: quantity,
      user_id: isAuthenticated.value ? (user.value as User).id : null,
      session_id: generateSessionId(), // Always include the sessionId
      source: 'nuxt_nxtkart', // Add the source parameter here
    };

    await sanctumFetch('/api/cart/update-quantity', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Refetch cart data after updating quantity
    fetchCartData();
    isLoading.value = false;
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

const incrementQuantity = (productId: number) => {
  const item = cartData.value.cart_details.find(item => item.product_id === productId);
  if (item) {
    item.quantity += 1;
    updateQuantity(productId, item.quantity);
  }
};

const decrementQuantity = (productId: number) => {
  const item = cartData.value.cart_details.find(item => item.product_id === productId);
  if (item && item.quantity > (item.minimum_qty || 1)) {
    item.quantity -= 1;
    updateQuantity(productId, item.quantity);
  }
};

const validateQuantity = (productId: number) => {
  const item = cartData.value.cart_details.find(item => item.product_id === productId);
  if (item) {
    item.quantity = Math.max(item.minimum_qty || 1, Number(item.quantity));
    updateQuantity(productId, item.quantity);
  }
};

const generateSessionId = () => {
  // Check if a session ID already exists in localStorage
  let sessionId = localStorage.getItem('sessionId');
  const expirationDate = localStorage.getItem('sessionExpiration');

  const now = new Date();

  // If no session ID exists or it has expired, generate a new one
  if (!sessionId || !expirationDate || now >= new Date(expirationDate)) {
    sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
    const newExpirationDate = new Date();
    newExpirationDate.setDate(now.getDate() + 30); // Set expiration to 30 days from now

    localStorage.setItem('sessionId', sessionId);
    localStorage.setItem('sessionExpiration', newExpirationDate.toISOString());
  }

  return sessionId;
};

onMounted(() => {
  cartStore.loadFromLocalStorage();
  fetchCartData();
});

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});
</script>


<style scoped>
/* Add any additional custom styles here if needed */
</style>
