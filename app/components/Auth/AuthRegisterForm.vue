<template>
  <div class="min-h-screen flex md:items-center md:justify-center bg-gradient-to-b from-red-100 to-white md:px-4">
    <div class="bg-white md:rounded-lg shadow-md w-full max-w-md md:max-w-4xl">
      <div class="flex flex-wrap rounded-md overflow-hidden p-6 md:p-8">
        <!-- Left Column: Ecommerce Information -->
        <div class="w-full md:w-1/2 p-4 flex flex-col order-2 md:order-1">
          <h2 class="text-xl font-bold mb-4 text-gray-800 text-center md:text-left">Your Hub for Electronic 3D Printing, IoT, Drones & More</h2>
          <div v-for="(item, index) in ecommerceInfo" :key="index" class="mb-4 flex items-center">
            <span class="mr-4 text-nxtkartsecondaryBlue">
              <!-- Icon using NuxtImg -->
              <NuxtImg :src="item.icon" :alt="item.alt" class="h-12 w-auto md:h-14" />
            </span>
            <p class="text-gray-700 text-sm md:text-base">{{ item.text }}</p>
          </div>
        </div>

        <!-- Right Column: Registration Form -->
        <div class="w-full md:w-1/2 p-4 order-1 md:order-2">
          <h2 class="text-xl font-bold mb-2 text-gray-800 text-center md:text-left">Register for a NXTKART account!</h2>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input
                v-model="state.name"
                type="text"
                id="name"
                required
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name[0] }}
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="state.email"
                type="email"
                id="email"
                required
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email[0] }}
              </p>
            </div>

            <div>
              <label for="mobile" class="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                v-model="state.mobile"
                type="text"
                id="mobile"
                required
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': errors.mobile }"
              />
              <p v-if="errors.mobile" class="mt-1 text-sm text-red-600">
                {{ errors.mobile[0] }}
              </p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                v-model="state.password"
                type="password"
                id="password"
                required
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': errors.password }"
              />
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password[0] }}
              </p>
            </div>

            <div>
              <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                v-model="state.password_confirmation"
                type="password"
                id="password_confirmation"
                required
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': errors.password_confirmation }"
              />
              <p v-if="errors.password_confirmation" class="mt-1 text-sm text-red-600">
                {{ errors.password_confirmation[0] }}
              </p>
            </div>

            <button type="submit"
              class="w-full bg-nxtkartsecondaryBlue text-white py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-nxtkartsecondaryBlue focus:ring-opacity-50"
              :disabled="isLoading">
              <span v-if="!isLoading">Register</span>
              <span v-else>Registering...</span>
            </button>
          </form>

          <!-- General API error message -->
          <div v-if="apiError && !errors.email" class="mt-4 text-center text-red-600 text-sm">
            {{ apiError }}
          </div>

          <!-- Separator -->
          <div class="flex items-center my-4">
            <hr class="flex-grow border-t border-gray-300" />
            <span class="mx-4 text-gray-500 text-sm md:text-base">OR</span>
            <hr class="flex-grow border-t border-gray-300" />
          </div>

          <p class="text-center text-gray-700 font-medium mb-4 text-sm md:text-base">Already have an account?</p>
          <!-- Login Button -->
          <button @click="navigateToLogin"
            class="w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const sanctumConfig = useSanctumConfig();
const sanctumFetch = useSanctumClient();
const { refreshIdentity } = useSanctumAuth();

const schema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    mobile: z.string().min(10), // Add mobile field validation
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine(
    data => data.password === data.password_confirmation,
    {
      message: 'Passwords do not match',
      path: ['password_confirmation'],
    },
  );

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  name: '',
  email: '',
  mobile: '', // Add mobile to state
  password: '',
  password_confirmation: '',
});

const isLoading = ref(false);
const apiError = ref('');

interface FormErrors {
  [key: string]: string[];
}

const errors = ref<FormErrors>({});

async function onSubmit() {
  isLoading.value = true;
  apiError.value = '';
  errors.value = {};

  const credentials = {
    name: state.name,
    email: state.email,
    mobile: state.mobile,
    password: state.password,
    password_confirmation: state.password_confirmation,
  };

  try {
    await sanctumFetch('/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await refreshIdentity();

    navigateTo(sanctumConfig.redirect.onGuestOnly || '/');
  } catch (error: any) {
    const sanctumError = useSanctumError(error);

    if (sanctumError.isValidationError) {
      errors.value = sanctumError.bag.reduce<FormErrors>((acc, err) => {
        if (!acc[err.path]) {
          acc[err.path] = [];
        }
        acc[err.path].push(err.message);
        return acc;
      }, {});
    } else {
      apiError.value = error.response?.data?.message || 'Registration failed. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
}

const navigateToLogin = () => {
  navigateTo('/login');
};

// Define the items for the left column
const ecommerceInfo = [
  {
    icon: '/images/bulk-order.svg',
    alt: 'Bulk Order Icon',
    text: 'Placed bulk orders and avail exclusive pricing',
  },
  {
    icon: '/images/delivery-pincode.svg',
    alt: 'Delivery Pincode Icon',
    text: 'Nationwide delivery over 25,000+ pincodes',
  },
  {
    icon: '/images/helpdesk.svg',
    alt: 'Help Desk Icon',
    text: '365 Days help desk support',
  },
  {
    icon: '/images/secure-payment-login.svg',
    alt: 'Secure & Encrypted Payments Icon',
    text: 'Secure & Encrypted Payments',
  },
];
</script>

<style scoped>
.error-message {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
