<template>
  <div class="bg-gray-100 md:py-8">
    <div class="mx-auto md:w-3/5 py-5">
      <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
        <h2 class="text-xl font-bold mb-4 col-span-full">{{ formTitle }}</h2>
        <!-- <p class="text-sm text-gray-500 mb-4 col-span-full">User ID: {{ userId }}</p> -->

        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name <span class="text-red-500">*</span></label>
          <input type="text" id="name" v-model="formData.name"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue"
            :class="{ 'border-red-500': errors.name }">
          <span class="text-red-500 text-sm" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email <span class="text-red-500">*</span></label>
          <input type="email" id="email" v-model="formData.email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue"
            :class="{ 'border-red-500': errors.email }">
          <span class="text-red-500 text-sm" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <!-- Mobile No. -->
        <div class="mb-4">
          <label for="mobile" class="block text-gray-700">Mobile No. <span class="text-red-500">*</span></label>
          <input type="text" id="mobile" v-model="formData.mobile" maxlength="10"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue"
            :class="{ 'border-red-500': errors.mobile }">
          <span class="text-red-500 text-sm" v-if="errors.mobile">{{ errors.mobile }}</span>
        </div>

        <!-- Business Name -->
        <div class="mb-4">
          <label for="business_name" class="block text-gray-700">Business Name</label>
          <input type="text" id="business_name" v-model="formData.business_name"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue">
        </div>

        <!-- GST -->
        <div class="mb-4">
          <label for="gst" class="block text-gray-700">GST</label>
          <input type="text" id="gst" v-model="formData.gst"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue">
        </div>

        <!-- Alternative Mobile -->
        <div class="mb-4">
          <label for="alternative_mobile" class="block text-gray-700">Alternative Mobile</label>
          <input type="text" id="alternative_mobile" v-model="formData.alternative_mobile" maxlength="10"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue"
            :class="{ 'border-red-500': errors.alternative_mobile }">
          <span class="text-red-500 text-sm" v-if="errors.alternative_mobile">{{ errors.alternative_mobile }}</span>
        </div>

        <!-- Flat or House or Building -->
        <div class="mb-4">
          <label for="address1" class="block text-gray-700">Flat, House no., Building, Company, Apartment <span
              class="text-red-500">*</span></label>
          <input type="text" id="address1" v-model="formData.address1"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue"
            :class="{ 'border-red-500': errors.address1 }">
          <span class="text-red-500 text-sm" v-if="errors.address1">{{ errors.address1 }}</span>
        </div>

        <!-- Area or Street -->
        <div class="mb-4">
          <label for="address2" class="block text-gray-700">Area, Street, Sector, Village <span
              class="text-red-500">*</span></label>
          <input type="text" id="address2" v-model="formData.address2"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue"
            :class="{ 'border-red-500': errors.address2 }">
          <span class="text-red-500 text-sm" v-if="errors.address2">{{ errors.address2 }}</span>
        </div>

        <!-- Pincode -->
        <div class="mb-4">
          <label for="pincode" class="block text-gray-700">Pincode <span class="text-red-500">*</span></label>
          <input type="text" id="pincode" v-model="formData.pincode" maxlength="6"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue"
            :class="{ 'border-red-500': errors.pincode }" @input="handlePincodeInput">
          <span class="text-red-500 text-sm" v-if="errors.pincode">{{ errors.pincode }}</span>
        </div>

        <!-- Landmark -->
        <div class="mb-4">
          <label for="landmark" class="block text-gray-700">Landmark</label>
          <input type="text" id="landmark" v-model="formData.landmark"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue">
        </div>

        <!-- City -->
        <div class="mb-4">
          <label for="city" class="block text-gray-700">City <span class="text-red-500">*</span></label>
          <input type="text" id="city" v-model="formData.city"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue" disabled
            :placeholder="isLoadingCityState ? 'Loading...' : ''" :class="{ 'border-red-500': errors.city }">
          <span class="text-red-500 text-sm" v-if="errors.city">{{ errors.city }}</span>
        </div>

        <!-- State -->
        <div class="mb-4">
          <label for="state" class="block text-gray-700">State <span class="text-red-500">*</span></label>
          <input type="text" id="state" v-model="formData.state"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:border-nxtkartsecondaryBlue" disabled
            :placeholder="isLoadingCityState ? 'Loading...' : ''" :class="{ 'border-red-500': errors.state }">
          <span class="text-red-500 text-sm" v-if="errors.state">{{ errors.state }}</span>
        </div>

        <div class="mb-4 flex items-center">
          <!-- Make Primary Address -->
          <div class="flex items-center mr-6">
            <input type="checkbox" id="is_primary" v-model="formData.is_primary" class="mr-2">
            <label for="is_primary" class="text-gray-700">Make Primary Address</label>
          </div>

          <!-- Make Shipping Address -->
          <div class="flex items-center"
            v-if="route.query.address_store_type !== 'shipping_new' && route.query.address_store_type !== 'billing_new'">
            <input type="checkbox" id="is_shipping" v-model="formData.is_shipping" class="mr-2">
            <label for="is_shipping" class="text-gray-700">Make Shipping Address</label>
          </div>
        </div>

        <!-- Type -->
        <div class="mb-4 col-span-full">
          <label class="block text-gray-700 mb-2"> Type</label>
          <div class="flex space-x-4">
            <button type="button" @click="setType('1')" class="px-4 py-2 border rounded focus:outline-none"
              :class="{ 'bg-nxtkartsecondaryBlue text-white': formData.type === '1' }">Home</button>
            <button type="button" @click="setType('2')" class="px-4 py-2 border rounded focus:outline-none"
              :class="{ 'bg-nxtkartsecondaryBlue text-white': formData.type === '2' }">Office</button>
            <button type="button" @click="setType('3')" class="px-4 py-2 border rounded focus:outline-none"
              :class="{ 'bg-nxtkartsecondaryBlue text-white': formData.type === '3' }">Other</button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6 col-span-full flex justify-center">
          <button type="submit"
            class="w-[30%] bg-nxtkartsecondaryBlue font-semibold text-white py-2 rounded hover:bg-nxtkartBlue focus:outline-none">
            Save Address
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';


// Define the type for form data
interface FormData {
  name: string;
  email: string;
  mobile: string;
  business_name: string;
  gst: string;
  alternative_mobile: string;
  address1: string;
  address2: string;
  pincode: string;
  landmark: string;
  city: string;
  state: string;
  is_primary: boolean;
  is_shipping: boolean;
  type: string;
}

// Define the type for errors
interface Errors {
  name?: string;
  email?: string;
  mobile?: string;
  alternative_mobile?: string;
  address1?: string;
  address2?: string;
  pincode?: string;
  city?: string;
  state?: string;
}

// Define the type for the payload
interface AddressPayload {
  billing_address?: AddressDetails;
  shipping_address?: AddressDetails;
}

interface AddressDetails {
  name: string;
  email: string;
  mobile: string;
  business_name: string;
  gst: string;
  alternative_mobile: string;
  address1: string;
  address2: string;
  pincode: string;
  landmark: string;
  city: string;
  state: string;
  is_primary: boolean;
  type: string; // Use 'type' directly
  user_id: number;
  store_type: number;
  store_address_type: string;
  address_id: number | null;
}

const sanctumFetch = useSanctumClient();
const route = useRoute();
const router = useRouter();

// Initialize userId
const userId = ref<number | null>(null);

// Get the authenticated user
const { isAuthenticated, user } = useSanctumAuth();
if (isAuthenticated.value && user.value) {
  userId.value = (user.value as any).id; // Adjust according to your user object structure
}

const formData = ref<FormData>({
  name: '',
  email: '',
  mobile: '',
  business_name: '',
  gst: '',
  alternative_mobile: '',
  address1: '',
  address2: '',
  pincode: '',
  landmark: '',
  city: '',
  state: '',
  is_primary: true,
  is_shipping: true,
  type: '1', // Default type
});

const errors = ref<Errors>({});
const isLoadingCityState = ref(false);

const formTitle = computed(() => {
  const addressStoreType = route.query.address_store_type;
  if (addressStoreType === 'billing_new') {
    return 'Add Billing Address';
  } else if (addressStoreType === 'shipping_new') {
    return 'Add Shipping Address';
  } else {
    return 'Add Address';
  }
});

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  mobile: yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .max(10, 'Mobile number cannot exceed 10 digits')
    .required('Mobile number is required'),
  alternative_mobile: yup.string()
    .test('is-ten-digits', 'Alternative mobile number must be 10 digits', function (value) {
      if (!value) return true; // Skip validation if value is not provided
      return /^[0-9]{10}$/.test(value);
    })
    .notRequired(),
  address1: yup.string().required('Flat, House no., Building, Company, Apartment is required'),
  address2: yup.string().required('Area, Street, Sector, Village is required'),
  pincode: yup.string().length(6, 'Pincode must be 6 digits').required('Pincode is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
});

const setType = (type: string) => {
  formData.value.type = type;
};

const handlePincodeInput = async () => {
  if (formData.value.pincode.length === 6) {
    isLoadingCityState.value = true;
    formData.value.city = '';
    formData.value.state = '';

    try {
      const response = await sanctumFetch('/api/check-pincode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          delivery_postcode: formData.value.pincode,
        }),
      });

      if (response.delivery_available === 1) {
        const locationParts = response.location.split(',');
        formData.value.city = locationParts[0].trim();
        formData.value.state = locationParts[2].trim();
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
    } finally {
      isLoadingCityState.value = false;
    }
  }
};

const validateForm = async () => {
  try {
    await schema.validate(formData.value, { abortEarly: false });
    errors.value = {};
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach(error => {
        if (error.path) {
          errors.value[error.path] = error.message;
        }
      });
    }
    return false;
  }
};

const submitForm = async () => {
  const isValid = await validateForm();
  if (isValid) {
    const addressStoreType = route.query.address_store_type;
    const addressId = route.query.address_id;

    let payload: AddressPayload = {};

    if (addressStoreType === 'new') {
      // Always add the billing address
      payload.billing_address = {
        ...formData.value,
        user_id: userId.value!,
        store_type: 1, // Assuming store_type for new billing address is 1
        store_address_type: 'billing_new',
        address_id: null, // Assuming new billing address has no ID
      };

      // Add the shipping address if "Make Shipping Address" is ticked
      if (formData.value.is_shipping) {
        payload.shipping_address = {
          ...formData.value,
          user_id: userId.value!,
          store_type: 1, // Assuming store_type for new shipping address is 1
          store_address_type: 'shipping_new',
          address_id: null, // Assuming new shipping address has no ID
        };
      }
    } else if (addressStoreType === 'shipping_new') {
      // Only add the shipping address
      payload.shipping_address = {
        ...formData.value,
        user_id: userId.value!,
        store_type: 1, // Assuming store_type for new shipping address is 1
        store_address_type: 'shipping_new',
        address_id: null, // Assuming new shipping address has no ID
      };
    } else if (addressStoreType === 'billing_new') {
      // Only add the billing address
      payload.billing_address = {
        ...formData.value,
        user_id: userId.value!,
        store_type: 1, // Assuming store_type for new billing address is 1
        store_address_type: 'billing_new',
        address_id: null, // Assuming new billing address has no ID
      };
    } else {
      // Handle other address_store_type cases if needed
      if (addressStoreType === 'billing_edit' && addressId) {
        payload.billing_address = {
          ...formData.value,
          user_id: userId.value!,
          store_type: 2, // Assuming store_type for editing is 2
          store_address_type: 'update',
          address_id: parseInt(addressId as string, 10),
        };
      }

      if (addressStoreType === 'shipping_edit' && addressId) {
        payload.shipping_address = {
          ...formData.value,
          user_id: userId.value!,
          store_type: 2, // Assuming store_type for editing is 2
          store_address_type: 'update',
          address_id: parseInt(addressId as string, 10),
        };
      }

      // Add the shipping address if "Make Shipping Address" is ticked
      if (formData.value.is_shipping && addressStoreType !== 'shipping_new' && addressStoreType !== 'billing_new') {
        payload.shipping_address = {
          ...formData.value,
          user_id: userId.value!,
          store_type: 1, // Assuming store_type for new shipping address is 1
          store_address_type: 'shipping_new',
          address_id: null, // Assuming new shipping address has no ID
        };
      }
    }

    try {
      // Send the payload to the API
      await sanctumFetch('/api/save-address', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Address saved successfully');

      // Check for the query parameter to decide redirection
      if (route.query.order_address_add === 'true') {
        router.push('/order/address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address');
    }
  }
};

definePageMeta({
  middleware: ['sanctum:auth'],
});

useSeoMeta({
  robots: 'noindex, nofollow', // Add this line to set the robots meta tag
});
</script>


<style>
/* Add any custom styles here */
</style>
