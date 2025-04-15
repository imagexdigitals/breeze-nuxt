<template>
  <div class="bg-gray-100 md:py-8">
    <div class="mx-auto md:w-3/5 py-5">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';
import type { User } from '~~/models/user';

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

// Assuming user is a reactive object containing user data
const user = ref({ id: 1 }); // Example user object with an ID
userId.value = (user.value as User).id;

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
  type: '1', // Default type
});

const errors = ref<Errors>({});
const isLoadingCityState = ref(false);

const formTitle = computed(() => {
  const addressStoreType = route.query.address_store_type;
  if (addressStoreType === 'shipping_edit') {
    return 'Edit Shipping Address';
  } else if (addressStoreType === 'billing_edit') {
    return 'Edit Billing Address';
  } else {
    return 'Edit Address';
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
    .test('is-ten-digits', 'Alternative mobile number must be 10 digits', function(value) {
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

const prefillForm = async () => {
  const addressId = route.query.address_id;
  const addressStoreType = route.query.address_store_type;

  if (addressId && userId.value && addressStoreType) {
    try {
      const response = await sanctumFetch('/api/fetch-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address_id: addressId,
          user_id: userId.value,
          address_store_type: addressStoreType,
        }),
      });

      if (response.error) {
        toast.error(response.error);
        router.push('/');
        return;
      }

      // Prefill the form with the fetched data
      formData.value = {
        name: response.name,
        email: response.email,
        mobile: response.mobile,
        business_name: response.business_name,
        gst: response.gst,
        alternative_mobile: response.alternative_mobile,
        address1: response.address1,
        address2: response.address2,
        pincode: response.pincode,
        landmark: response.landmark,
        city: response.city,
        state: response.state,
        is_primary: response.is_primary,
        type: response.type, // Ensure this is correctly set
      };
    } catch (error) {
      console.error('Error fetching address data:', error);
      toast.error('Failed to fetch address data');
      router.push('/');
    }
  }
};

const submitForm = async () => {
  const isValid = await validateForm();
  if (isValid) {
    const addressStoreType = route.query.address_store_type;
    const addressId = route.query.address_id;

    try {
      // Send the payload to the API
      const payload = {
        ...formData.value,
        user_id: userId.value!,
        address_store_type: addressStoreType,
        address_id: addressId ? parseInt(addressId as string, 10) : null,
      };

      const response = await sanctumFetch('/api/edit-address', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.error) {
        toast.error(response.error);
        router.push('/');
        return;
      }

      toast.success('Address saved successfully');

      if (route.query.order_address_add === 'true') {
        router.push('/order/address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address');
      router.push('/');
    }
  }
};

onMounted(() => {
  prefillForm();
});

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
