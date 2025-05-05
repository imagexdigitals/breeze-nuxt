import { defineStore } from 'pinia';

interface Product {
  id: number;
  // ... (keep your existing Product interface)
}

interface QuoteItem {
  product: Product;
  quantity: number;
}

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    items: [] as QuoteItem[],
  }),
  actions: {
    addToQuote(product: Product, quantity: number) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      if (process.client) {
        this.saveToLocalStorage();
      }
    },
    removeFromQuote(productId: number) {
      this.items = this.items.filter(item => item.product.id !== productId);
      if (process.client) {
        this.saveToLocalStorage();
      }
    },
    clearQuote() {
      this.items = [];
      if (process.client) {
        localStorage.removeItem('quoteItems');
      }
    },
    loadFromLocalStorage() {
      if (process.client) {
        const quoteItems = localStorage.getItem('quoteItems');
        if (quoteItems) {
          try {
            this.items = JSON.parse(quoteItems);
          } catch (error) {
            console.error('Error parsing quote items from localStorage:', error);
          }
        }
      }
    },
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('quoteItems', JSON.stringify(this.items));
      }
    },
  },
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalProducts: (state) => {
      const uniqueProducts = new Set(state.items.map(item => item.product.id));
      return uniqueProducts.size;
    },
  },
  // Add this to all stores
  hydrate(state, initialState) {
    // Use Object.assign to ensure proper hydration
    Object.assign(state, initialState || {});
  }
});