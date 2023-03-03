import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useUsersStore = defineStore("users", () => {
  // --- States ---
  const drawer = ref(false);
  const userSettings = ref(false);
  const searchValue = ref("");
  const usersList = ref([]);

  // --- Actions ---
  const setDrawer = (value: boolean): void => {
    drawer.value = value;
  };

  const setUserSettings = (state: boolean): void => {
    userSettings.value = state;
  };

  const setSearchValue = (value: string): void => {
    searchValue.value = value;
  };

  const setUsersList = async (user: any): Promise<void> => {
    const { token } = user.value;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.get(`/api/user?search=${searchValue.value}`, config);

      usersList.value = data.filter(({ name, email }: { name: string; email: string }) =>
        [name, email].some((str) =>
          str.toLowerCase().includes(searchValue.value.toLowerCase())
        )
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    drawer,
    userSettings,
    usersList,
    searchValue,
    setDrawer,
    setUsersList,
    setUserSettings,
    setSearchValue,
  };
});
