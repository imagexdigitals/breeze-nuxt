<template>
  <div class="w-[70%] rounded-md flex gap-4">

    <!-- Shipping Address Section -->
    <AddressSection title="Shipping Address" :addresses="shippingAddresses"
      :selectedAddressId="selectedShippingAddressId" @select-address="selectShippingAddress" />

      
    <!-- Billing Address Section -->
    <AddressSection title="Billing Address" :addresses="billingAddresses" :selectedAddressId="selectedBillingAddressId"
      @select-address="selectBillingAddress" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';

const sanctumFetch = useSanctumClient();
const { user } = useSanctumAuth();

// Define the type for the user object
interface User {
  id: number;
  // Add other properties if needed
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

const billingAddresses = ref<Address[]>([]);
const shippingAddresses = ref<Address[]>([]);
const isLoading = ref(false);
const selectedBillingAddressId = ref<number | null>(null);
const selectedShippingAddressId = ref<number | null>(null);

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

const fetchAddresses = async () => {
  if (!user.value || !(user.value as User).id) {
    console.error('User ID is not available');
    return;
  }

  isLoading.value = true;
  try {
    const userId = (user.value as User).id;
    const response = await sanctumFetch(`/api/user/${userId}/addresses`, {
      method: 'GET',
    });

    if (response) {
      billingAddresses.value = response.billing_addresses;
      shippingAddresses.value = response.shipping_addresses;
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
  if (!user.value || !(user.value as User).id) {
    console.error('User ID is not available');
    return;
  }

  selectedBillingAddressId.value = id;
  await storeAddressIds();
};

const selectShippingAddress = async (id: number) => {
  if (!user.value || !(user.value as User).id) {
    console.error('User ID is not available');
    return;
  }

  selectedShippingAddressId.value = id;
  await storeAddressIds();
};

const storeAddressIds = async () => {
  if (!user.value || !(user.value as User).id) {
    console.error('User ID is not available');
    return;
  }

  try {
    const userId = (user.value as User).id;
    const payload = {
      billing_address_id: selectedBillingAddressId.value,
      shipping_address_id: selectedShippingAddressId.value,
    };

    const response = await sanctumFetch(`/api/store-address-ids`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 'success') {
      toast.success('Address IDs stored successfully');
    } else {
      toast.error('Failed to store address IDs');
    }
  } catch (error) {
    console.error('Error storing address IDs:', error);
    toast.error('An error occurred while storing address IDs');
  }
};

onMounted(() => {
  fetchAddresses();
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
