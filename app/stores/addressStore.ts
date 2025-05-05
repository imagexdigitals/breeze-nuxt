// ~/stores/addressStore.ts
export const useAddressStore = defineStore('addressStore', {
  state: () => ({
    selectedBillingAddressId: null as number | null,
    selectedShippingAddressId: null as number | null,
  }),
  // Add this to all stores
  hydrate(state, initialState) {
    // Use Object.assign to ensure proper hydration
    Object.assign(state, initialState || {});
  }
});