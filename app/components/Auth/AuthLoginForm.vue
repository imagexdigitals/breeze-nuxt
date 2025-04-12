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

        <!-- Right Column: Login Form -->
        <div class="w-full md:w-1/2 p-4 order-1 md:order-2">
          <h2 class="text-xl font-bold mb-2 text-gray-800 text-center md:text-left">Login into your NXTKART account!</h2>
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <input type="email" v-model="email" required placeholder="Email"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-nxtkartsecondaryBlue"
                :class="{ 'border-red-500': errors.email }" />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email[0] }}
              </p>
            </div>
            <div class="mb-4">
              <input type="password" v-model="password" required placeholder="Password"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-nxtkartsecondaryBlue"
                :class="{ 'border-red-500': errors.password }" />
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password[0] }}
              </p>
            </div>
            <div class="mb-6 flex items-center justify-between flex-wrap">
              <div class="flex items-center mb-2 md:mb-0">
                <input type="checkbox" v-model="rememberMe"
                  class="mr-2 text-nxtkartsecondaryBlue focus:ring-nxtkartsecondaryBlue" />
                <span class="text-gray-700 text-sm md:text-base">Remember Me</span>
              </div>
              <NuxtLink to="/forgot-password" class="text-nxtkartsecondaryBlue text-sm md:text-base">
                Forgot Password?
              </NuxtLink>
            </div>
            <button type="submit"
              class="w-full bg-nxtkartsecondaryBlue text-white py-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-nxtkartsecondaryBlue focus:ring-opacity-50"
              :disabled="isLoading">
              <span v-if="!isLoading">Login</span>
              <span v-else>Logging in...</span>
            </button>

            <!-- General API error message -->
            <div v-if="apiError && !errors.email" class="mt-4 text-center text-red-600 text-sm">
              {{ apiError }}
            </div>
          </form>

          <!-- Separator -->
          <div class="flex items-center my-4">
            <hr class="flex-grow border-t border-gray-300" />
            <span class="mx-4 text-gray-500 text-sm md:text-base">OR</span>
            <hr class="flex-grow border-t border-gray-300" />
          </div>

          <p class="text-center text-gray-700 font-medium mb-4 text-sm md:text-base">Don't have an account yet?</p>
          <!-- Register Button -->
          <button @click="navigateToRegister"
            class="w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FormError } from '#ui/types';

const { login } = useSanctumAuth();

const email = ref('');
const password = ref('');
const rememberMe = ref(true);
const isLoading = ref(false);
const apiError = ref('');

interface FormErrors {
  [key: string]: string[];
}

const errors = ref<FormErrors>({});

// Define the items for the left column
const ecommerceInfo = [
  {
    icon: '/images/bulk-order.svg',
    alt: 'Bulk Order Icon',
    text: 'Placed bulk orders and avail exclusive pricing'
  },
  {
    icon: '/images/delivery-pincode.svg',
    alt: 'Delivery Pincode Icon',
    text: 'Nationwide delivery over 25,000+ pincodes'
  },
  {
    icon: '/images/helpdesk.svg',
    alt: 'Help Desk Icon',
    text: '365 Days help desk support'
  },
  {
    icon: '/images/secure-payment-login.svg',
    alt: 'Secure & Encrypted Payments Icon',
    text: 'Secure & Encrypted Payments'
  },
];

const handleLogin = async () => {
  isLoading.value = true;
  apiError.value = '';
  errors.value = {};

  try {
    await login({
      email: email.value,
      password: password.value,
      remember: rememberMe.value,
    });

    await navigateTo('/dashboard');
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
      apiError.value = error.response?.data?.message || 'Login failed. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};

const navigateToRegister = () => {
  navigateTo('/register');
};
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
