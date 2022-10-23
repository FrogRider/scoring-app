import { defineStore } from 'pinia';

const useBaseStore = defineStore('BaseStore', {
  state: () => ({
    isLoading: false,
    showPasswordComponent: true,
    isAdmin: false,
  }),
  getters: {
  },
  actions: {
    showLoader() {
      this.isLoading = true;
    },
    hideLoader() {
      setTimeout(() => {
        this.isLoading = false;
      }, "1000")
    },
  },
});

export default useBaseStore;
