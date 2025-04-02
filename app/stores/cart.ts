// stores/cart.ts
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
    totalProducts: (state) => state.items.length, // Count of unique items
  },
  actions: {
    addToCart(productId: number, quantity: number) {
      const existingItem = this.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ productId, quantity });
      }
      this.saveToLocalStorage();
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.productId !== productId);
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.items = JSON.parse(storedCart);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
  },
});
