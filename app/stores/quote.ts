// stores/quote.ts
import { defineStore } from 'pinia';

interface Product {
  id: number;
  name: string | null;
  slug: string;
  sku: string | null;
  type: string | null;
  status: number | null;
  index_status: string | null;
  category: string;
  brand: string;
  brand_slug: string;
  condition: number | null;
  minimum_qty: number;
  sale_price: string;
  save_price: string;
  mrp_price: string;
  tax: string | null;
  weight: string;
  weight_unit_code: string;
  width: string;
  width_unit_code: string;
  depth: string;
  depth_unit_code: string;
  shipping_dimensions: string | null;
  country_of_origin: string;
  attachments: Array<{ label: string; url: string }>;
  warranty: string;
  image: string;
  gallery: string[];
  breadcrumb: Array<{ name: string; url: string }>;
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
      this.saveToLocalStorage();
    },
    removeFromQuote(productId: number) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.saveToLocalStorage();
    },
    clearQuote() {
      this.items = [];
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const quoteItems = localStorage.getItem('quoteItems');
      if (quoteItems) {
        this.items = JSON.parse(quoteItems);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('quoteItems', JSON.stringify(this.items));
    },
  },
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalProducts: (state) => {
      const uniqueProducts = new Set(state.items.map(item => item.product.id));
      return uniqueProducts.size;
    },
  },
});
