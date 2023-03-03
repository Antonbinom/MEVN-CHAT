import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // --- States ---
  const user = ref({});

  // --- Actions ---
  const setUser = (state: object): void => {
    user.value = state;
  };

  return {
    user,
    setUser,
  };
});
