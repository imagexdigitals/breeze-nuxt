<template>
  <div class="w-full md:w-[70%] rounded-md relative" :class="{ 'loading-overlay': loading }">
    <div v-if="loading" class="loading-spinner">
      <!-- You can use any loading spinner component or icon here -->
      <div class="spinner"></div>
    </div>
    <div>
      <div v-for="item in cartData.cart_details" :key="item.product_id"
        class="border-y md:border-none md:rounded-md py-5 bg-white px-3 md:px-2 mb-3 md:flex md:flex-row md:items-center md:space-x-3">

        <!-- Mobile Layout -->
        <div class="flex flex-col space-y-3 md:hidden">
          <!-- Top Row: Image and Product Details -->
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-[80px]">
              <img :src="item.image" :alt="item.name || 'Product Image'" class="w-24 h-24 object-cover rounded">
            </div>
            <div class="flex-1">
              <NuxtLink :to="`/p/${item.slug}`" class="font-semibold hover:text-secondaryBlue">
                <h2>{{ item.name || 'Product Name Not Available' }}</h2>
              </NuxtLink>
              <div class="flex flex-col space-y-1 mt-1">
                <p v-if="item.status === 2" class="text-red-600 font-medium text-sm">Out of Stock</p>
                <p class="text-green-600 font-medium text-sm">Sale Price: {{
                  formatPrice(parseFloat(item.sale_price.replace(/,/g, ''))) }}</p>
                <p class="text-gray-600 font-medium text-sm">MRP Price: <span class="line-through text-red-500">{{
                  formatPrice(parseFloat(item.mrp_price.replace(/,/g, ''))) }}</span></p>
              </div>
            </div>
          </div>

          <!-- Bottom Row: Quantity and Total Price -->
          <div class="flex items-center justify-between">

            <div class="qty md:w-auto justify-center md:justify-start flex items-center">
              <div class="items-center mr-2">
                Qty:
              </div>
              <div class="bg-[#F4F6F8] p-[4px] border-solid flex flex-nowrap justify-center items-center border-[1px]"
                style="border-color: #fcfcfc !important;">
                <button @click="decrementQuantity(item.product_id)"
                  class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] hover:bg-[#162F4D] group flex items-center cursor-pointer">
                  <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto">
                    <line y1="0.954492" x2="12" y2="0.954492" stroke-width="1"></line>
                  </svg>
                </button>
                <input type="text" v-model="item.quantity" autocomplete="off"
                  class="border-0 p-[5px] w-[40px] text-center bg-transparent focus:outline-none h-[22px]"
                  @input="validateQuantity(item.product_id)" />
                <button @click="incrementQuantity(item.product_id)"
                  class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] group flex items-center cursor-pointer hover:bg-[#162F4D]">
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="m-auto">
                    <line y1="5.95449" x2="12" y2="5.95449" stroke-width="1"
                      class="stroke-[#162F4D] group-hover:stroke-[#ffffff]"></line>
                    <line x1="5.6" y1="12.1133" x2="5.6" y2="0.597152" stroke-width="1"
                      class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex flex-col items-end">
              <p class="text-gray-800 font-semibold text-lg">
                {{ formatPrice(parseFloat(item.sale_price.replace(/,/g, '')) * item.quantity) }}
              </p>
              <button @click="emit('showRemoveModal', item.product_id)"
                class="text-red-500 hover:text-red-700 flex items-center gap-1 mt-2">
                <Icon name="material-symbols:delete" class="w-4 h-4" />
                <span class="text-sm">Remove</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden md:flex flex-row items-center space-x-3 w-full">
          <!-- Column 1: Image -->
          <div class="flex items-center w-[120px] justify-start">
            <img :src="item.image" :alt="item.name || 'Product Image'" class="w-24 h-24 object-cover rounded">
          </div>
          <!-- Column 2: Product Name and Price -->
          <div class="flex-1 pr-4">
            <NuxtLink :to="`/p/${item.slug}`" class="font-semibold hover:text-secondaryBlue">
              <h2>{{ item.name || 'Product Name Not Available' }}</h2>
            </NuxtLink>
            <div class="flex flex-col space-y-1 mt-1">
              <p v-if="item.status === 2" class="text-red-600 font-medium text-sm">Out of Stock</p>
              <p class="text-green-600 font-medium text-sm">Sale Price: {{
                formatPrice(parseFloat(item.sale_price.replace(/,/g, ''))) }}</p>
              <p class="text-gray-600 font-medium text-sm">MRP Price: <span class="line-through text-red-500">{{
                formatPrice(parseFloat(item.mrp_price.replace(/,/g, ''))) }}</span></p>
            </div>
          </div>
          <!-- Column 3: Custom Quantity Increment/Decrement -->
          <div class="qty md:w-auto justify-center md:justify-start flex items-center">
              <div class="items-center mr-2">
                Qty:
              </div>
              <div class="bg-[#F4F6F8] p-[4px] border-solid flex flex-nowrap justify-center items-center border-[1px]"
                style="border-color: #fcfcfc !important;">
                <button @click="decrementQuantity(item.product_id)"
                  class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] hover:bg-[#162F4D] group flex items-center cursor-pointer">
                  <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto">
                    <line y1="0.954492" x2="12" y2="0.954492" stroke-width="1"></line>
                  </svg>
                </button>
                <input type="text" v-model="item.quantity" autocomplete="off"
                  class="border-0 p-[5px] w-[40px] text-center bg-transparent focus:outline-none h-[22px]"
                  @input="validateQuantity(item.product_id)" />
                <button @click="incrementQuantity(item.product_id)"
                  class="md:w-[22px] md:h-[22px] w-[20px] h-[20px] rounded-sm bg-[#fff] group flex items-center cursor-pointer hover:bg-[#162F4D]">
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="m-auto">
                    <line y1="5.95449" x2="12" y2="5.95449" stroke-width="1"
                      class="stroke-[#162F4D] group-hover:stroke-[#ffffff]"></line>
                    <line x1="5.6" y1="12.1133" x2="5.6" y2="0.597152" stroke-width="1"
                      class="stroke-[#162F4D] group-hover:stroke-[#ffffff] m-auto"></line>
                  </svg>
                </button>
              </div>
            </div>
          <!-- Column 4: Total Price and Remove Button -->
          <div class="flex flex-col items-end px-2">
            <p class="text-gray-800 font-semibold text-lg">
              {{ formatPrice(parseFloat(item.sale_price.replace(/,/g, '')) * item.quantity) }}
            </p>
            <small class="text-gray-700 text-xs">Price Details</small>
            <button @click="emit('showRemoveModal', item.product_id)"
              class="text-red-500 hover:text-red-700 flex items-center gap-1 mt-2">
              <Icon name="material-symbols:delete" class="w-4 h-4" />
              <span class="text-sm">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { debounce } from 'vue-debounce';

// Define the CartItem type
interface CartItem {
  product_id: number;
  name: string;
  sale_price: string;
  mrp_price: string;
  minimum_qty: number | null;
  image: string;
  quantity: number;
  status: number;
  slug?: string; // Optional slug for the product URL
}

// Define the props
const props = defineProps({
  cartData: {
    type: Object as () => { cart_details: CartItem[] },
    required: true,
  },
});

// Define the emit function
const emit = defineEmits(['showRemoveModal', 'incrementQuantity', 'decrementQuantity', 'validateQuantity']);

const loading = ref(false); // Loading state

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Debounced function for updating quantity
const debouncedUpdateQuantity = debounce((productId: number, quantity: number) => {
  emit('validateQuantity', productId);
}, 500);

const incrementQuantity = (productId: number) => {
  const item = props.cartData.cart_details.find(item => item.product_id === productId);
  if (item) {
    item.quantity += 1;
    debouncedUpdateQuantity(productId, item.quantity);
  }
};

const decrementQuantity = (productId: number) => {
  const item = props.cartData.cart_details.find(item => item.product_id === productId);
  if (item && item.quantity > (item.minimum_qty || 1)) {
    item.quantity -= 1;
    debouncedUpdateQuantity(productId, item.quantity);
  }
};

const validateQuantity = (productId: number) => {
  const item = props.cartData.cart_details.find(item => item.product_id === productId);
  if (item) {
    item.quantity = Math.max(item.minimum_qty || 1, Number(item.quantity));
    debouncedUpdateQuantity(productId, item.quantity);
  }
};

// Simulate loading state
const simulateLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000); // Simulate a 2-second loading time
};

// Call simulateLoading when needed, e.g., on component mount or data fetch
simulateLoading();
</script>

<style scoped>
.loading-overlay {
  position: relative;
  pointer-events: none;
  opacity: 0.6;
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
