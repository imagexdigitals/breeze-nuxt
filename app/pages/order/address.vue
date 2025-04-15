<template>
  <div class="bg-gray-100 md:py-8">
    <div class="mx-auto md:w-4/5 py-5" v-if="!isCartEmpty">
      <CartPageCartStepper />
      <div class="md:flex gap-4 mt-8">
        <!-- Order Left Column -->
        <div class="md:w-[70%] rounded-md md:flex gap-4 space-y-3 md:space-y-0 mb-3 md:mb-0">
          <!-- Billing Address Section -->
          <BillingAddressBook :addresses="billingAddresses" :isLoading="isLoading"
            :selectedAddressId="selectedBillingAddressId" :hasAddresses="status.has_billing_addresses"
            @add-address="addBillingAddress" @select-address="selectBillingAddress" />

          <!-- Shipping Address Section -->
          <ShippingAddressBook :addresses="shippingAddresses" :isLoading="isLoading"
            :selectedAddressId="selectedShippingAddressId" :hasAddresses="status.has_shipping_addresses"
            @add-address="addShippingAddress" @select-address="selectShippingAddress" />
        </div>
        <!-- Order Right Column -->
        <CartRightColumn :cartData="cartData" :isLoading="isLoading" :hasBillingAddresses="status.has_billing_addresses"
          :hasShippingAddresses="status.has_shipping_addresses" :hasStatus2="hasStatus2" class="w-full md:w-[30%]"/>

      </div>
    </div>

    <div v-else>
      <EmptyCart />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['sanctum:auth', 'sanctum-verified'],
});

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CartRightColumn from '@/components/CartPage/CartRightColumn.vue';
import EmptyCart from '@/components/CartPage/EmptyCart.vue';
import { toast } from 'vue3-toastify';
import BillingAddressBook from '@/components/Order/BillingAddressBook.vue';
import ShippingAddressBook from '@/components/Order/ShippingAddressBook.vue';

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

// Define an interface for the address structure
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

const { isAuthenticated, user } = useSanctumAuth();
const sanctumFetch = useSanctumClient();
const router = useRouter();
const hasStatus2 = ref(false);
const cartStore = useCartStore();
const showModal = ref(false);
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
const loading = ref(true); // Add loading state

const billingAddresses = ref<Address[]>([]);
const shippingAddresses = ref<Address[]>([]);
const isLoading = ref(false);
const selectedBillingAddressId = ref<number | null>(null);
const selectedShippingAddressId = ref<number | null>(null);
const userId = ref<number | null>(null);
const sessionId = ref<string | null>(null);
const status = ref({
  has_billing_addresses: false,
  has_shipping_addresses: false,
  no_address_found: false,
  redirect: false,
});

const fetchAddresses = async () => {
  if (!userId.value) {
    console.error('User ID is not available');
    return;
  }

  isLoading.value = true;
  try {
    const response = await sanctumFetch(`/api/user/${userId.value}/addresses`, {
      method: 'GET',
    });

    if (response) {
      billingAddresses.value = response.billing_addresses;
      shippingAddresses.value = response.shipping_addresses;
      status.value = response.status;
    } else {
      console.error('No data returned from the API');
    }
  } catch (error) {
    console.error('Error fetching addresses:', error);
  } finally {
    isLoading.value = false;
  }
};

const selectBillingAddress = async (id: number) => {
  selectedBillingAddressId.value = id;
  await storeAddressIds();
  await fetchCartData(); // Refetch cart data after updating the billing address
};

const selectShippingAddress = async (id: number) => {
  selectedShippingAddressId.value = id;
  await storeAddressIds();
  await fetchCartData(); // Refetch cart data after updating the shipping address
};

const addBillingAddress = () => {
  // Implement the logic to add a billing address
};

const addShippingAddress = () => {
  // Implement the logic to add a shipping address
};

const storeAddressIds = async () => {
  if (!userId.value) {
    console.error('User ID is not available');
    return;
  }

  try {
    const payload = {
      billing_address_id: selectedBillingAddressId.value,
      shipping_address_id: selectedShippingAddressId.value,
      session_id: sessionId.value, // Include session ID in the payload
    };

    const response = await sanctumFetch(`/api/store-address-ids`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 'success') {
      // toast.success('Address IDs stored successfully');
    } else {
      toast.error('Failed to select address');
    }
  } catch (error) {
    console.error('Error storing address IDs:', error);
    toast.error('An error occurred while storing address IDs');
  }
};

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

    const response = await sanctumFetch(`/api/cart?${queryParams.toString()}`, {
      method: 'GET',
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

const generateSessionId = () => {
  // Check if a session ID already exists in localStorage
  let sessionId = localStorage.getItem('sessionId');
  const expirationDate = localStorage.getItem('sessionExpiration');

  const now = new Date();

  return sessionId;
};

onMounted(async () => {
  cartStore.loadFromLocalStorage();
  if (user.value) {
    userId.value = (user.value as User).id;
    await fetchAddresses(); // Fetch addresses first

    // Check if redirect is true after fetching addresses
    if (status.value.redirect) {
      router.push('/my-account/add-address?order_address_add=true&address_store_type=new'); // Redirect to the add address page
      return; // Stop further execution
    }

    fetchCartData(); // Use user_id
  } else {
    console.error('User is not authenticated');
  }
});

definePageMeta({
  middleware: ['sanctum:auth', 'sanctum-verified'],
});

useSeoMeta({
  robots: 'noindex, nofollow', // Add this line to set the robots meta tag
});
</script>



<style scoped>
/* Add any additional custom styles here if needed */
</style>
