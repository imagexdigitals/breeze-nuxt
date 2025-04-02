<template>
  <div class="w-[70%] rounded-md flex gap-4">
    <div class="bg-white p-4 rounded-md w-full">
      <p class="font-semibold border-b pb-2 border-dashed border-gray-300">
        Payment Mode
      </p>


      <div class="mt-4 text-red-600 font-semibold flex items-center justify-center gap-2">
        <Icon name="icon-park-outline:caution" />
        <span>Remove out of stock from cart to checkout</span>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAddressStore } from '@/stores/addressStore';
const sanctumFetch = useSanctumClient();
const { user } = useSanctumAuth();

// Define the type for the user object
interface User {
  id: number;
  // Add other properties if needed
}

const isLoading = ref(false);
const addressStore = useAddressStore();


</script>

<style scoped>
/* Add any additional styles here */
</style>
