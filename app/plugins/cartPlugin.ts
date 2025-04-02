// plugins/cartPlugin.ts
import { ref } from 'vue';

const cartCount = ref(0);

export const useCart = () => {
  const fetchCartCount = async (sanctumFetch: any, isAuthenticated: any, user: any) => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const userId = isAuthenticated.value ? (user.value as any).id : null;

      const queryParams = userId
        ? `user_id=${userId}`
        : `session_id=${sessionId}`;

      const response = await sanctumFetch(`/api/cart-count?${queryParams}`);

      if (response.status === 'success') {
        cartCount.value = response.cart_count;
      } else {
        console.error('Failed to fetch cart count:', response.message);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const updateCartCount = () => {
    // This function can be called to refresh the cart count
    fetchCartCount(useSanctumClient(), useSanctumAuth().isAuthenticated, useSanctumAuth().user);
  };

  return {
    cartCount,
    fetchCartCount,
    updateCartCount,
  };
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      cart: useCart(),
    },
  };
});
