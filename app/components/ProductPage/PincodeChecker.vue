<template>
  <!-- <div class="bg-gradient-to-b from-orange-100 to-white p-3 md:p-5 rounded-sm shadow-none border-y md:border-none md:shadow-md">
    <div class="flex items-center space-x-2 mb-4">
      <NuxtImg src="/images/location-96.svg" alt="Pincode Checker" class="w-7 h-7"/>
      <h3 class="text-sm font-semibold">Check Delivery Availability</h3>
    </div>

    <div class="flex space-x-2">
      <input type="text" v-model="pincode" placeholder="Enter your pincode"
        class="border border-gray-300 p-2 text-sm flex-grow rounded-md font-semibold focus:border-gray-300 focus:ring-0"
        maxlength="6" @input="validatePincode" />
      <button @click="checkPincode" class="bg-red-600 text-white px-3 py-2 text-sm rounded-md hover:bg-red-700"
        :disabled="isLoading">
        Check
      </button>
    </div>

    <div v-if="isLoading" class="mt-4 flex items-center justify-center h-52">
      <div class="w-8 h-8 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
    </div>
    <div v-else-if="pincodeStore.postcode"
      :class="['mt-2', pincodeStore.delivery_available === 1 ? 'text-gray-800' : 'text-red-600']">
      <div v-if="pincodeStore.delivery_available === 1" class="mt-4 space-y-4">
        <div class="flex items-center text-sm">
          <NuxtImg src="/images/delivery-fast-24-ck.svg" alt="Fast Delivery" width="35" height="35" class="mr-2" />
          <div class="ml-1">
            <span class="block font-semibold">24 Hours Delivery</span>
            <small class="block text-red-600 font-medium">Not available in this pincode</small>
          </div>
        </div>

        <div class="flex items-center text-sm">
          <NuxtImg src="/images/delivery-truck-ck.svg" alt="Delivery Truck" width="35" height="35" class="mr-2" />
          <div class="ml-1">
            <span class="block font-semibold">Delivery Available at {{ pincodeStore.postcode }}</span>
            <small class="block capitalize font-medium text-green-600">{{ pincodeStore.location }}</small>
          </div>
        </div>

        <div class="flex items-center text-sm">
          <NuxtImg src="/images/delivery-box-ck.svg" alt="Delivery Box" width="35" height="35" class="mr-2" />
          <div class="ml-1">
            <span class="block font-semibold">{{ pincodeStore.etd }}</span>
            <small class="block font-medium text-green-600">Estimated Delivery Time {{ pincodeStore.day }}</small>
          </div>
        </div>

        <div class="flex items-center text-sm">
          <NuxtImg src="/images/delivery-cod-ck.svg" alt="Delivery COD" width="35" height="35" class="mr-2" />
          <div class="ml-1">
            <span class="block font-semibold">Partial COD Available</span>
            <small class="block font-medium text-green-600">Pay 25% Now, Rest 75% on Delivery</small>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center">
        <NuxtImg src="/images/delivery-not-available-ck.svg" alt="Delivery Not Available" width="35" height="35"
          class="mr-2" />
        <div class="ml-1 mt-2">
          <span class="block font-semibold text-gray-800 text-sm">Delivery unavailable at {{ pincodeStore.postcode
            }}</span>
          <small class="block text-red-600">Try Another Pin Code</small>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
// import { ref, onMounted, onUnmounted } from 'vue';
// import { useRuntimeConfig } from '#app';
// import { usePincodeStore } from '@/stores/pincode';
// const sanctumFetch = useSanctumClient();

// const pincode = ref<string>('');
// const isLoading = ref<boolean>(false);
// const pincodeStore = usePincodeStore();
// const config = useRuntimeConfig();
// const backendUrl = config.public.BACKEND_URL;
// let recheckInterval: number | undefined;

// const validatePincode = () => {
//   pincode.value = pincode.value.replace(/\D/g, "").slice(0, 6);
// };

// const checkPincode = async () => {
//   isLoading.value = true;
//   try {
//     const response = await sanctumFetch('/api/check-pincode', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         delivery_postcode: pincode.value,
//       }),
//     });

//     // Assuming the response is already in JSON format
//     const data = response;
//     // console.log('Pincode data:', data); // Debugging log

//     // Update the pincode store with the fetched data
//     pincodeStore.setPincodeData(data);
//     pincodeStore.saveToLocalStorage();
//   } catch (error) {
//     console.error('Error checking pincode:', error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// const startRecheckInterval = () => {
//   recheckInterval = window.setInterval(() => {
//     if (pincode.value) {
//       checkPincode();
//     }
//   }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds
// };

// onMounted(() => {
//   if (pincodeStore.postcode) {
//     pincode.value = pincodeStore.postcode;
//   }
//   startRecheckInterval();
// });

// onUnmounted(() => {
//   if (recheckInterval) {
//     window.clearInterval(recheckInterval);
//   }
// });
</script>
