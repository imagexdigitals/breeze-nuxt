import { defineStore } from 'pinia';

interface PincodeState {
  delivery_available: number | null;
  location: string | null;
  etd: string | null;
  day: string | null;
  postcode: string | null;
}

export const usePincodeStore = defineStore('pincode', {
  state: (): PincodeState => ({
    delivery_available: null,
    location: null,
    etd: null,
    day: null,
    postcode: null,
  }),
  actions: {
    setPincodeData(data: PincodeState) {
      Object.assign(this, data);
      if (process.client) {
        this.saveToLocalStorage();
      }
    },
    clearPincodeData() {
      this.$reset();
      if (process.client) {
        localStorage.removeItem('pincodeData');
      }
    },
    loadFromLocalStorage() {
      if (process.client) {
        const pincodeData = localStorage.getItem('pincodeData');
        if (pincodeData) {
          try {
            this.setPincodeData(JSON.parse(pincodeData));
          } catch (error) {
            console.error('Error parsing pincode data from localStorage:', error);
          }
        }
      }
    },
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('pincodeData', JSON.stringify({
          delivery_available: this.delivery_available,
          location: this.location,
          etd: this.etd,
          day: this.day,
          postcode: this.postcode
        }));
      }
    },
  },
  hydrate(state, initialState) {
    Object.assign(state, initialState);
  }
});