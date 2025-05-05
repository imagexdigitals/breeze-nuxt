import { defineStore } from 'pinia';

export const useAddressStore = defineStore('addressStore', {
  state: () => ({
    selectedBillingAddressId: null as number | null,
    selectedShippingAddressId: null as number | null,
  }),
  actions: {
    setSelectedBillingAddressId(id: number | null) {
      this.selectedBillingAddressId = id;
      if (process.client) {
        if (id === null) {
          localStorage.removeItem('selectedBillingAddressId');
        } else {
          localStorage.setItem('selectedBillingAddressId', id.toString());
        }
      }
    },
    setSelectedShippingAddressId(id: number | null) {
      this.selectedShippingAddressId = id;
      if (process.client) {
        if (id === null) {
          localStorage.removeItem('selectedShippingAddressId');
        } else {
          localStorage.setItem('selectedShippingAddressId', id.toString());
        }
      }
    },
    loadFromLocalStorage() {
      if (process.client) {
        this.selectedBillingAddressId = localStorage.getItem('selectedBillingAddressId')
          ? Number(localStorage.getItem('selectedBillingAddressId'))
          : null;
        this.selectedShippingAddressId = localStorage.getItem('selectedShippingAddressId')
          ? Number(localStorage.getItem('selectedShippingAddressId'))
          : null;
      }
    }
  },
  hydrate(state, initialState) {
    state.selectedBillingAddressId = initialState.selectedBillingAddressId || null;
    state.selectedShippingAddressId = initialState.selectedShippingAddressId || null;
  }
});