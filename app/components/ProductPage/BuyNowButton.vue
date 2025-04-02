<template>
  <button class="w-full py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm flex items-center justify-center"
    @click="addToCart">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag w-5 h-5 mr-2">
      <path
        d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
      </path>
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </svg>
    BUY NOW
  </button>
</template>

<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { useCart } from '~/plugins/cartPlugin';
import { useRouter } from 'vue-router';

interface Props {
  productId: number;
  quantity: number;
}

const props = defineProps<Props>();
const { isAuthenticated, user } = useSanctumAuth();
const sanctumFetch = useSanctumClient();
const { updateCartCount } = useCart();
const router = useRouter(); // Initialize Vue Router

const addToCart = async () => {
  try {
    console.log('Add to Cart button clicked');
    const productIdAsNumber = Number(props.productId);
    console.log('Product ID:', productIdAsNumber);
    console.log('Quantity:', props.quantity);
    console.log('Is Authenticated:', isAuthenticated.value);
    console.log('User:', user.value);

    const payload = {
      product_id: productIdAsNumber,
      quantity: props.quantity,
      user_id: isAuthenticated.value ? (user.value as any).id : null,
      session_id: isAuthenticated.value ? null : generateSessionId(),
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
      // toast.success('Added to Cart');
      console.log('Cart:', response.cart);
      updateCartCount(); // Update the cart count
      router.push('/cart'); // Redirect to the cart page
    } else {
      console.error('Failed to add to cart:', response.message);
      toast.error('Failed to add product to cart.');
    }

  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('An error occurred while adding to cart.');
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
