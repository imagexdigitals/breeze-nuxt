import { defineStore } from 'pinia';

export const useAddressStore = defineStore('addressStore', {
  state: () => ({
    selectedBillingAddressId: localStorage.getItem('selectedBillingAddressId')
      ? Number(localStorage.getItem('selectedBillingAddressId'))
      : null,
    selectedShippingAddressId: localStorage.getItem('selectedShippingAddressId')
      ? Number(localStorage.getItem('selectedShippingAddressId'))
      : null,
  }),
  actions: {
    setSelectedBillingAddressId(id: number | null) {
      this.selectedBillingAddressId = id;
      if (id === null) {
        localStorage.removeItem('selectedBillingAddressId');
      } else {
        localStorage.setItem('selectedBillingAddressId', id.toString());
      }
    },
    setSelectedShippingAddressId(id: number | null) {
      this.selectedShippingAddressId = id;
      if (id === null) {
        localStorage.removeItem('selectedShippingAddressId');
      } else {
        localStorage.setItem('selectedShippingAddressId', id.toString());
      }
    },
  },
});
