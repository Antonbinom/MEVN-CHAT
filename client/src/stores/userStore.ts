import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // --- States ---
  const user = ref({});
  const userSettings = ref(false);

  // --- Actions ---
  const setUser = (state: object): void => {
    user.value = state;
  };

  const setUserSettings = (state: boolean): void => {
    userSettings.value = state;
  };

  return {
    user,
    userSettings,
    setUser,
    setUserSettings,
  };
});
