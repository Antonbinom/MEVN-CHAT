import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "src/boot/axios";
import { useUserStore } from "src/stores/userStore";

export const useUsersStore = defineStore("users", () => {
  const userStore = useUserStore();
  const user = computed(() => userStore.user);
  // --- States ---
  const drawer = ref(false);
  const searchValue = ref("");
  const usersList = ref([]);
  const isLoading = ref(false);
  // --- Actions ---
  const setDrawer = (value: boolean): void => {
    drawer.value = value;
    searchValue.value = "";
    usersList.value = [];
  };

  const setSearchValue = (value: string): void => {
    searchValue.value = value;
  };

  const setUsersList = async (): Promise<void> => {
    if (!searchValue.value || !user.value) {
      usersList.value = [];
      return;
    }
    isLoading.value = true;
    // const { token } = user.value;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      };
      const { data } = await api.get(`/api/user?search=${searchValue.value}`, config);

      usersList.value = data.filter(({ name, email }: { name: string; email: string }) =>
        [name, email.split("@")[0]].some((str) =>
          str.toLowerCase().includes(searchValue.value.toLowerCase())
        )
      );
    } catch (err) {
      throw new Error(err);
    }
    isLoading.value = false;
  };
  return {
    drawer,
    usersList,
    searchValue,
    isLoading,
    setDrawer,
    setUsersList,
    setSearchValue,
  };
});
