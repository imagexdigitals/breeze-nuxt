<template>
  <div class="bg-gray-100 md:py-8">
    <div class="mx-auto md:w-3/5 py-5">
      <div class="flex h-full">
        <!-- Sidebar for tabs -->
        <div class="w-1/4 bg-white p-4 shadow rounded-lg">
          <ul class="space-y-2">
            <li>
              <button
                @click="activeTab = 'orders'"
                :class="{ 'bg-gray-200': activeTab === 'orders' }"
                class="w-full p-2 rounded flex items-center text-left"
              >
                <Icon name="fluent:box-28-regular" class="h-5 w-5 mr-2" />
                Orders
              </button>
            </li>
            <li>
              <button
                @click="activeTab = 'address'"
                :class="{ 'bg-gray-200': activeTab === 'address' }"
                class="w-full p-2 rounded flex items-center text-left"
              >
                <Icon name="heroicons:map-pin" class="h-5 w-5 mr-2" />
                Address
              </button>
            </li>
            <li>
              <button
                @click="activeTab = 'accountDetails'"
                :class="{ 'bg-gray-200': activeTab === 'accountDetails' }"
                class="w-full p-2 rounded flex items-center text-left"
              >
                <Icon name="heroicons:user-circle" class="h-5 w-5 mr-2" />
                Account Details
              </button>
            </li>
            <li>
              <button
                @click="activeTab = 'changePassword'"
                :class="{ 'bg-gray-200': activeTab === 'changePassword' }"
                class="w-full p-2 rounded flex items-center text-left"
              >
                <Icon name="heroicons:key" class="h-5 w-5 mr-2" />
                Change Password
              </button>
            </li>
            <li>
              <button
                @click="handleLogout"
                class="w-full p-2 rounded flex items-center text-left text-red-500"
              >
                <Icon name="solar:logout-outline" class="h-5 w-5 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>

        <!-- Content area -->
        <div class="w-3/4 p-4 ml-4 bg-white shadow rounded-lg">
          <div v-if="activeTab === 'orders'">
            <h2 class="text-2xl font-bold mb-4">Orders</h2>
            <p>Display order history here.</p>
          </div>
          <div v-if="activeTab === 'address'">
            <h2 class="text-2xl font-bold mb-4">Address</h2>
            <p>Manage your addresses here.</p>
          </div>
          <div v-if="activeTab === 'accountDetails'">
            <h2 class="text-2xl font-bold mb-4">Account Details</h2>
            <p>View and edit your account details here.</p>
          </div>
          <div v-if="activeTab === 'changePassword'">
            <h2 class="text-2xl font-bold mb-4">Change Password</h2>
            <p>Change your password here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: ['sanctum:auth'],
});

useSeoMeta({
  title: 'My Account',
  robots: 'noindex, nofollow',
});

const activeTab = ref('orders');
const router = useRouter();
const { logout } = useSanctumAuth();

const handleLogout = async () => {
  await logout();
  router.push('/login'); // Redirect to login page after logout
};
</script>

<style>
/* Tailwind-only — no extra CSS needed */
</style>
