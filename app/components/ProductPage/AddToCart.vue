<template>
  <div class="relative">
    <button
      class="w-full py-1.5 bg-nxtkartsecondaryBlue text-white rounded-md hover:bg-nxtkartBlue font-medium text-sm"
      @click="addToCart"
      :disabled="isLoading"
    >
      <span v-if="!isLoading">ADD TO CART</span>
      <div v-else class="flex items-center justify-center">
        <div class="w-5 h-5 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useCart } from '~/plugins/cartPlugin';

interface Props {
  productId: number;
  quantity: number;
}

const props = defineProps<Props>();
const { isAuthenticated, user } = useSanctumAuth();
const sanctumFetch = useSanctumClient();
const { updateCartCount } = useCart();
const isLoading = ref(false); // Add a loading state

const addToCart = async () => {
  isLoading.value = true; // Set loading to true when the operation starts
  try {
    console.log('Add to Cart button clicked');
    const productIdAsNumber = Number(props.productId);
    console.log('Product ID:', productIdAsNumber);
    console.log('Quantity:', props.quantity);
    console.log('Is Authenticated:', isAuthenticated.value);
    console.log('User:', user.value);

    const sessionId = generateSessionId(); // Always generate or retrieve the session ID

    const payload = {
      product_id: productIdAsNumber,
      quantity: props.quantity,
      user_id: isAuthenticated.value ? (user.value as any).id : null,
      session_id: sessionId, // Always include the session ID
      source: 'nuxt_nxtkart', // Add the source parameter here
    };

    console.log('Payload:', payload);

    const response = await sanctumFetch('/api/cart-store', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response object:', response);

    if (response.status === 'success') {
      console.log('Success:', response.message);
      toast.success('Added to Cart');
      console.log('Cart:', response.cart);
      updateCartCount(); // Update the cart count
    } else {
      console.error('Failed to add to cart:', response.message);
      toast.error('Failed to add product to cart.');
    }

  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('An error occurred while adding to cart.');
  } finally {
    isLoading.value = false; // Set loading to false when the operation ends
  }
};

const generateSessionId = () => {
  // Check if a session ID already exists in localStorage
  let sessionId = localStorage.getItem('sessionId');
  const expirationDate = localStorage.getItem('sessionExpiration');

  const now = new Date();

  // If no session ID exists or it has expired, generate a new one
  if (!sessionId || !expirationDate || now >= new Date(expirationDate)) {
    sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
    const newExpirationDate = new Date();
    newExpirationDate.setDate(now.getDate() + 30); // Set expiration to 30 days from now

    localStorage.setItem('sessionId', sessionId);
    localStorage.setItem('sessionExpiration', newExpirationDate.toISOString());
  }

  return sessionId;
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
