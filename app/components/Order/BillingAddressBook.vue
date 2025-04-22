<template>
  <div class="w-full relative">
    <div class="bg-white p-4 border-y md:border-none md:rounded-md">
      <div class="flex justify-between items-center mb-4">
        <span class="font-semibold">Billing Address</span>
        <NuxtLink :to="addAddressUrl" class="text-blue-500 font-medium text-sm">
          + Add Address
        </NuxtLink>
      </div>
      <div v-if="isLoading" class="flex items-center justify-center h-52">
        <div class="w-8 h-8 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent">
        </div>
      </div>
      <div v-else-if="addresses.length === 0" class="text-center text-gray-500">No billing addresses found.</div>
      <div v-else v-for="address in addresses" :key="address.id"
        class="border p-4 rounded-md bg-[#F1FFF4] relative mb-4">
        <div class="absolute top-2 right-2 flex space-x-2">
          <NuxtLink :to="getEditAddressUrl(address.id)"
            class="text-red-600 flex items-center space-x-1 hover:text-red-700">
            <Icon name="uil:edit" class="w-4 h-4" />
            <span class="text-sm">Edit</span>
          </NuxtLink>
          <button class="text-red-600 flex items-center hover:text-red-700" @click="openDeleteModal(address)">
            <Icon name="fluent:delete-20-filled" class="w-5 h-5" />
          </button>
        </div>
        <div class="mb-4 space-y-1">
          <div class="font-semibold">{{ address.name }} ({{ addressType(address.type) }})</div>
          <div>Mobile: {{ address.mobile }}</div>
          <div>
            {{ address.address1 }}, {{ address.address2 }}, {{ address.city }}, {{ address.state }} - {{ address.pincode
            }}
          </div>
          <div v-if="address.gst">GST NO.: {{ address.gst }}</div>
        </div>

        <button class="text-white w-full py-2 rounded"
          :class="address.id === selectedAddressId ? 'bg-nxtkartsecondaryBlue' : 'bg-green-600'"
          @click="handleSelectAddress(address.id)">
          Billing at this Address
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-md w-96">
        <h2 class="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this address?</p>
        <div class="flex justify-end mt-4 space-x-2">
          <button class="text-gray-600" @click="closeDeleteModal">Cancel</button>
          <button class="text-red-600" @click="deleteAddress">Delete</button>
        </div>
      </div>
    </div>

    <!-- Overlay Loading -->
    <div v-if="isSelecting" class="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
      <div class="w-10 h-10 rounded-full animate-spin border-4 border-solid border-green-600 border-t-transparent"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
const sanctumFetch = useSanctumClient();

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
  isSelecting: boolean; // Add this prop
}>();

const emit = defineEmits<{
  (e: 'add-address'): void;
  (e: 'select-address', id: number): void;
}>();

const showDeleteModal = ref(false);
const addressToDelete = ref<Address | null>(null);


const openDeleteModal = (address: Address) => {
  addressToDelete.value = address;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  addressToDelete.value = null;
  showDeleteModal.value = false;
};


const deleteAddress = async () => {
  if (addressToDelete.value) {
    const payload = {
      address_id: addressToDelete.value.id,
      user_id: 1, // Replace with actual user ID
      type: 'billing'
    };

    try {
      await sanctumFetch('/api/delete-address', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Show success toaster
      alert('Address deleted successfully');

      // Refresh the page
      window.location.reload();

    } catch (error) {
      // Handle error
      alert('Failed to delete address');
    }
  }
};

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

const getEditAddressUrl = (addressId: number) => {
  return `/my-account/edit-address?order_address_add=true&address_store_type=billing_edit&address_id=${addressId}`;
};

const addAddressUrl = '/my-account/add-address?order_address_add=true&address_store_type=billing_new';

const handleSelectAddress = (id: number) => {
  emit('select-address', id);
};
</script>
