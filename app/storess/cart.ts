import { defineStore } from 'pinia';

interface CartItem {
  productId: number;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalProducts: (state) => state.items.length,
  },
  actions: {
    addToCart(productId: number, quantity: number) {
      const existingItem = this.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ productId, quantity });
      }
      if (process.client) {
        this.saveToLocalStorage();
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.productId !== productId);
      if (process.client) {
        this.saveToLocalStorage();
      }
    },
    loadFromLocalStorage() {
      if (process.client) {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          try {
            this.items = JSON.parse(storedCart);
          } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
          }
        }
      }
    },
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    },
  },
  // Add this to all stores
  hydrate(state, initialState) {
    // Use Object.assign to ensure proper hydration
    Object.assign(state, initialState || {});
  }
  
});