<template>
  <div class="border border-[#abe292] rounded-lg bg-[#F6FFF5] p-3 my-4">
    <h3 class="font-semibold pb-1 text-gray-800">Offers and Discounts</h3>

    <div class="text-[#0A7205] flex space-x-3 border-b border-dashed py-3 border-b-gray-300">
      <Icon name="bxs:offer" class="w-7 h-7" />
      <div>
        <p class="font-semibold text-sm">Save Instantly Extra ₹50 with Online Payment.</p>
        <p class="text-gray-800 text-[12px] font-medium">via UPI, EMI, Credit/Debit Card, Net Banking,
          Wallets on min. cart value of ₹3000</p>
      </div>
    </div>

    <div class="text-[#0A7205] flex space-x-3 border-b border-dashed py-3 border-b-gray-300">
      <Icon name="material-symbols:upi-pay" class="w-7 h-7" />
      <div>
        <p class="font-semibold text-sm">Get a 2% Instant Discount on Payments via UPI or Bank Transfer!</p>
        <p class="text-gray-800 text-[12px] font-medium">Enjoy a 2% instant discount when you pay using UPI
          or bank transfer.</p>
      </div>
    </div>

    <div class="text-[#0A7205] flex space-x-3 border-b border-dashed py-3 border-b-gray-300">
      <Icon name="mdi:cash-on-delivery" class="w-7 h-7" />
      <div>
        <p class="font-semibold text-sm">Partial COD Available! Pay 25% in Advance and Settle the Rest on
          Delivery.</p>
        <p class="text-gray-800 text-[12px] font-medium">Pay 25% upfront and the rest on delivery for a
          hassle-free shopping experience!</p>
      </div>
    </div>

    <div class="text-[#0A7205] flex space-x-3 py-3">
      <Icon name="bxs:calendar" class="w-5 h-5" />
      <div class="flex">
        <p class="font-semibold text-sm">EMIs available on purchases of ₹3000 or more across all banks!</p>
      </div>
    </div>

    <div class="text-[#0A7205] flex space-x-3 py-1">
      <Icon name="iconamoon:invoice-fill" class="w-5 h-5" />
      <div class="flex w-full justify-between items-center">
        <p class="font-semibold text-sm">Get a GST invoice and save up to 18% on your business purchases!
        </p>
        <button @click="openModal" class="text-nxtkartsecondaryBlue text-[11px] font-bold ml-auto">VIEW DETAILS</button>
      </div>
    </div>

    <!-- Modal Structure -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-zinc-900 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-3xl w-full relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-red-600 hover:text-red-700">
          <Icon name="fontisto:close" class="w-5 h-5" />
        </button>
        <h4 class="font-semibold text-lg mb-2">GST Details</h4>
        <div class="bg-gray-100 p-2 rounded-md text-center">
          <div class="flex justify-center mb-2">
            <NuxtImg src="/images/NxtKart_Logo.svg" alt="image" width="180" height="175" preload />
          </div>
          <p>Get a GST invoice and save up to 18% on business purchases. Registered users can buy products
            for business use and receive a business (GST) invoice with their company name and GST number.</p>
        </div>


        <h5 class="font-semibold mt-4 mb-2">How It Works:</h5>
        <ul class="list-disc list-inside mb-4">
          <li>Create a free NxtKart user account.</li>
          <li>Add products to your cart and proceed to checkout.</li>
          <li>Select 'Use GSTIN for Business Purchase' at checkout.</li>
          <li>Enter your shipping and billing details.</li>
          <li>Complete your order and receive a business (GST) invoice with your delivery.</li>
        </ul>
        <p class="text-gray-600 text-sm">Your billing details will be saved for faster checkout next time, and you can
          update them anytime.</p>
        <h5 class="font-semibold mt-4 mb-2">Note:</h5>
        <ul class="list-disc list-inside mb-4">
          <li>A valid GST number is mandatory for business invoices.</li>
          <li>Ensure correct billing details at checkout.</li>
          <li>NxtKart is not responsible for incorrect details that may affect input tax credit claims.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
li {
  margin-left: 15px;
}
</style>
