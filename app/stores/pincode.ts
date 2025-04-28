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
      this.saveToLocalStorage();
    },
    clearPincodeData() {
      this.delivery_available = null;
      this.location = null;
      this.etd = null;
      this.day = null;
      this.postcode = null;
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const pincodeData = localStorage.getItem('pincodeData');
      if (pincodeData) {
        try {
          this.setPincodeData(JSON.parse(pincodeData));
        } catch (error) {
          console.error('Error parsing pincode data from localStorage:', error);
        }
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('pincodeData', JSON.stringify(this.$state));
    },
  },
});
