<template>
  <div class="md:sticky top-20 h-fit">
    <div class="bg-white p-3 md:p-5 rounded-sm shadow-none border-y md:border-none md:shadow-md mb-4">
      <div class="flex space-x-2 mb-2">
        <img src="/images/discount-96.svg" alt="image" width="25" height="25" preload />
        <h3 class="text-secondaryBlue font-semibold">Lowest Price</h3>
      </div>
      <small>Sale Price</small>
      <div class="text-2xl font-semibold text-green-600">
        ₹{{ product.sale_price }}
        <span class="text-xs text-gray-700 font-semibold">(Incl. of all taxes)</span>
      </div>
      <div class="text-sm text-gray-600 line-through mb-2 font-medium mt-1">
        MRP: ₹{{ product.mrp_price }}
      </div>

      <span class="relative inline-block me-2 px-2.5 py-0.5">
        <span class="absolute inset-0 bg-red-600 border border-dashed border-white rounded-sm skew-x-[-10deg]"></span>
        <span class="relative text-white text-sm font-semibold">Save: {{ product.save_price }}</span>
      </span>

      <div class="flex justify-between items-center text-sm text-gray-800 my-2">
        <span class="text-gray-800 font-medium">Minimum Order Quantity: {{ props.product.minimum_qty }}</span>
      </div>

      <div>
        <!-- Stock Status -->
        <ProductPageStockStatus :status="product.status" />
      </div>

      <!-- Original Quantity and Add to Cart Section -->
      <div class="hidden md:flex mt-2 space-x-3 items-center" v-if="props.product.status !== 2">
        <!-- Quantity Section -->
        <div class="bg-[#F4F6F8] p-[4px] border-solid flex flex-nowrap justify-center items-center border-[1px]"
          style="border-color: #fcfcfc !important;">
          <button @click="handleQuantityChange(-1)"
            class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] hover:bg-green-600 group flex items-center cursor-pointer"
            :disabled="quantity <= props.product.minimum_qty">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto">
              <line y1="0.954492" x2="12" y2="0.954492" stroke-width="2"></line>
            </svg>
          </button>
          <input type="text" v-model.number="quantity" autocomplete="off"
            class="border-0 p-[5px] w-[40px] text-center bg-transparent focus:outline-none h-[22px]"
            @input="validateQuantity" @keydown.backspace="allowBackspace" />
          <button @click="handleQuantityChange(1)"
            class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] group flex items-center cursor-pointer hover:bg-green-600">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="m-auto">
              <line y1="5.95449" x2="12" y2="5.95449" stroke-width="1"
                class="stroke-[#162F4D] group-hover:stroke-[#ffffff]"></line>
              <line x1="5.6" y1="12.1133" x2="5.6" y2="0.597152" stroke-width="2"
                class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto"></line>
            </svg>
          </button>
        </div>
        <div class="w-full">
          <!-- Use the AddToCart component here -->
          <AddToCart :productId="props.product.id" :quantity="quantity" />
        </div>
      </div>

      <div class="mt-3 hidden md:block" v-if="props.product.status !== 2">
        <BuyNowButton :productId="props.product.id" :quantity="quantity" />
      </div>

      <div class="grid gap-3 text-sm mt-3">
        <button @click="addToQuote"
          class="relative w-full font-medium flex items-center justify-center bg-white px-6 py-2 rounded-md hover:border-[#f06c00] transition-colors border-2 border-gray-300">
          ADD TO QUOTE
          <span
            class="ml-2 relative flex items-center justify-center px-1.5 py-0 text-white text-[10px] font-bold italic uppercase rounded-sm bg-[linear-gradient(270deg,#F06C00_0%,#BD4B00_100%)] before:absolute before:-left-1 before:border-t-[4px] before:border-b-[4px] before:border-r-[4px] before:border-transparent before:border-r-[#BD4B00]">NEW
          </span>
        </button>
      </div>
    </div>

    <!-- Pincode Checker Component -->
    <PincodeChecker />

    <!-- Mobile Sticky Container -->
    <div class="mobile-sticky-container md:hidden">
      <div class="flex mt-2 space-x-3 items-center" v-if="props.product.status !== 2">
        <!-- Quantity Section -->
        <div class="bg-[#F4F6F8] p-[4px] border-solid flex flex-nowrap justify-center items-center border-[1px]"
          style="border-color: #fcfcfc !important;">
          <button @click="handleQuantityChange(-1)"
            class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] hover:bg-green-600 group flex items-center cursor-pointer"
            :disabled="quantity <= props.product.minimum_qty">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto">
              <line y1="0.954492" x2="12" y2="0.954492" stroke-width="2"></line>
            </svg>
          </button>
          <input type="text" v-model.number="quantity" autocomplete="off"
            class="border-0 p-[5px] w-[40px] text-center bg-transparent focus:outline-none h-[22px]"
            @input="validateQuantity" @keydown.backspace="allowBackspace" />
          <button @click="handleQuantityChange(1)"
            class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] group flex items-center cursor-pointer hover:bg-green-600">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="m-auto">
              <line y1="5.95449" x2="12" y2="5.95449" stroke-width="1"
                class="stroke-[#162F4D] group-hover:stroke-[#ffffff]"></line>
              <line x1="5.6" y1="12.1133" x2="5.6" y2="0.597152" stroke-width="2"
                class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto"></line>
            </svg>
          </button>
        </div>
        <div class="w-full">
          <!-- Use the AddToCart component here -->
          <AddToCart :productId="props.product.id" :quantity="quantity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuoteStore } from '@/stores/quote';
import PincodeChecker from '~/components/ProductPage/PincodeChecker.vue';

import type { Product } from '@/types/types';
import AddToCart from './AddToCart.vue';
import BuyNowButton from './BuyNowButton.vue';

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const quantity = ref<number>(props.product.minimum_qty);
const quoteStore = useQuoteStore();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const handleQuantityChange = (change: number) => {
  const newQuantity = Number(quantity.value) + change;
  quantity.value = Math.max(newQuantity, props.product.minimum_qty);
};

const validateQuantity = () => {
  quantity.value = Math.max(Number(quantity.value), props.product.minimum_qty);
};

const allowBackspace = (event: KeyboardEvent) => {
  if (event.key === 'Backspace') {
    event.stopPropagation();
  }
};

const addToQuote = () => {
  try {
    // Pass the entire product object and the quantity
    quoteStore.addToQuote(props.product, Number(quantity.value));
    console.log(`Added to quote: ${props.product.name} (Quantity: ${quantity.value})`);
  } catch (error) {
    console.error('Error adding to quote:', error);
  }
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */

/* Mobile Sticky Styles */
@media (max-width: 768px) {
  .mobile-sticky-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 10;
    padding: 1rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
