<template>
  <div class="bg-gray-100">
    <div class="mx-auto md:w-4/5 py-5" v-if="!isCartEmpty">
      <CartPageCartStepper />
      <div class="md:flex gap-4 mt-8">
        <!-- Order Left Column -->
        <div class="md:w-[70%] rounded-md md:flex gap-4">
          <div class="w-full">
            <OrderPaymentMethodOffer />
            <div class="bg-white p-4 md:rounded-md border-y md:border-none mb-4">
              <p class="font-semibold border-b pb-2 border-dashed border-gray-300">
                Payment Methods
              </p>
              <div class="mt-4 md:w-96">
                <label class="block w-full border rounded-md mb-2">
                  <div class="flex items-center gap-2 mb-2 px-4 pt-4">
                    <input type="radio" name="paymentMethod" value="1" class="mr-2 mt-0.5"
                      v-model="selectedPaymentMethod">
                    <span>Credit / Debit Card / UPI</span>
                  </div>
                  <div
                    class="w-full text-sm bg-green-600 text-white font-medium text-center py-0.5 px-2 rounded-b flex items-center justify-center gap-1">
                    <Icon name="bxs:offer" class="w-4 h-4" />
                    <span>SAVE ₹50</span>
                  </div>
                </label>

                <label class="block w-full border p-4 rounded-md mb-2">
                  <input type="radio" name="paymentMethod" value="3" class="mr-2" v-model="selectedPaymentMethod">
                  Partial Cash on Delivery
                </label>
                <label class="block w-full border p-4 rounded-md mb-2">
                  <input type="radio" name="paymentMethod" value="2" class="mr-2" v-model="selectedPaymentMethod">
                  Cash on Delivery
                </label>
              </div>
            </div>
            <div class="flex justify-center gap-6 flex-wrap py-2 mb-2">
              <!-- Secure Payments -->
              <div class="flex items-center space-x-2">
                <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
                  <Icon name="tdesign:secured" class="w-5 h-5 text-red-600" />
                </div>
                <span class="text-xs md:text-sm font-semibold text-gray-700">Secure Payments</span>
              </div>

              <!-- 365 Days Help Desk -->
              <div class="flex items-center space-x-2">
                <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
                  <Icon name="ic:outline-support-agent" class="w-5 h-5 text-red-600" />
                </div>
                <span class="text-xs md:text-sm font-semibold text-gray-700">Great! Help Desk</span>
              </div>
            </div>

          </div>
        </div>
        <!-- Order Right Column -->
        <CartRightColumn :cartData="cartData" :isLoading="isLoading" :hasBillingAddresses="status.has_billing_addresses"
          :hasShippingAddresses="status.has_shipping_addresses" :hasStatus2="hasStatus2" class="w-full md:w-[30%]" />
      </div>
    </div>
    <div v-else>
      <EmptyCart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import CartRightColumn from '~/components/CartPage/CartRightColumn.vue';
import EmptyCart from '~/components/CartPage/EmptyCart.vue';
import { toast } from 'vue3-toastify';

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
  image: string;
  quantity: number;
  status: number;
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
const router = useRouter();

const cartStore = useCartStore();
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
const loading = ref(true); // Add loading state
const status = ref({
  has_billing_addresses: false,
  has_shipping_addresses: false,
});
const hasStatus2 = ref(false);
const isLoading = ref(false);
const selectedBillingAddressId = ref<number | null>(null);
const selectedShippingAddressId = ref<number | null>(null);
const userId = ref<number | null>(null);
const selectedPaymentMethod = ref<number | null>(null);

const fetchCartData = async () => {
  loading.value = true; // Set loading to true before fetching data
  try {
    const sessionId = generateSessionId(); // Ensure sessionId is generated or retrieved

    // Construct the query parameters based on authentication status
    const queryParams = new URLSearchParams();
    if (isAuthenticated.value && userId.value) {
      queryParams.append('user_id', userId.value.toString());
    }

    // Append session_id only if it is available
    if (sessionId) {
      queryParams.append('session_id', sessionId);
    } else {
      queryParams.append('session_id', 'null');
    }
    isLoading.value = true;
    const response = await sanctumFetch(`/api/cart?${queryParams.toString()}`, {
      method: 'GET',
    });
    isLoading.value = false;

    if (response.status === 'empty') {
      isCartEmpty.value = true;
    } else {
      isCartEmpty.value = false;
      // Update cartData with the fetched values
      cartData.value = {
        cart_details: response.cart_details,
        totalSellingPrice: response.payment_summary.total_selling_price,
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

      // Check if any item has a status of 2
      const hasStatus2 = cartData.value.cart_details.some(item => item.status === 2);
      if (hasStatus2) {
        router.push('/cart'); // Redirect to the cart page
      }

      // Log the price to the console
      console.log('Total Selling Price:', cartData.value.totalSellingPrice);
      console.log('GST Amount:', cartData.value.gstAmount);
      console.log('Total Saving:', cartData.value.totalSaving);
      console.log('Amount Payable:', cartData.value.amountPayable);

      // Preselect shipping and billing addresses based on the provided IDs
      selectedShippingAddressId.value = response.shipping_address_id;
      selectedBillingAddressId.value = response.billing_address_id;
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
  } finally {
    loading.value = false; // Set loading to false after data is fetched or an error occurs
  }
};

const storePaymentMethod = async () => {
  if (!selectedPaymentMethod.value) return;

  const payload = {
    billing_address_id: selectedBillingAddressId.value,
    shipping_address_id: selectedShippingAddressId.value,
    session_id: generateSessionId(),
    payment_method: selectedPaymentMethod.value,
  };

  try {
    const response = await sanctumFetch('/api/store-address-ids', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 'success') {
      // toast.success('Payment method stored successfully');
      fetchCartData(); // Refetch cart data
    } else {
      toast.error('Failed to store payment method');
    }
  } catch (error) {
    console.error('Error storing payment method:', error);
    toast.error('Error storing payment method');
  }
};

const generateSessionId = () => {
  // Check if a session ID already exists in localStorage
  let sessionId = localStorage.getItem('sessionId');
  const expirationDate = localStorage.getItem('sessionExpiration');

  const now = new Date();

  return sessionId;
};

onMounted(() => {
  cartStore.loadFromLocalStorage();
  if (user.value) {
    userId.value = (user.value as User).id;
    fetchCartData(); // Use user_id
  } else {
    console.error('User is not authenticated');
  }
});

// Watch for changes in the selected payment method and store it
watch(selectedPaymentMethod, () => {
  storePaymentMethod();
});
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
