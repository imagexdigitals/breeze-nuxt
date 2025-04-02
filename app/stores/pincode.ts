// stores/pincode.ts
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
      this.delivery_available = data.delivery_available;
      this.location = data.location;
      this.etd = data.etd;
      this.day = data.day;
      this.postcode = data.postcode;
    },
    clearPincodeData() {
      this.delivery_available = null;
      this.location = null;
      this.etd = null;
      this.day = null;
      this.postcode = null;
    },
    loadFromLocalStorage() {
      const pincodeData = localStorage.getItem('pincodeData');
      if (pincodeData) {
        this.setPincodeData(JSON.parse(pincodeData));
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('pincodeData', JSON.stringify(this.$state));
    },
  },
});
