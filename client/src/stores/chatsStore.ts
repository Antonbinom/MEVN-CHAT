import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatsStore = defineStore("chats", () => {
  // --- States ---
  const drawer = ref(false);
  const userSettings = ref(false);

  const chatsList = ref([
    {
      name: "anton",
      email: "anton@mail.ru",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Style_-_Wouldn%27t_It_Be_Nice.png",
    },
    {
      name: "katy",
      email: "anton@mail.ru",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Style_-_Wouldn%27t_It_Be_Nice.png",
    },
    {
      name: "Ivan",
      email: "anton@mail.ru",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Style_-_Wouldn%27t_It_Be_Nice.png",
    },
    {
      name: "Marina",
      email: "anton@mail.ru",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Style_-_Wouldn%27t_It_Be_Nice.png",
    },
    {
      name: "Ilia",
      email: "anton@mail.ru",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Style_-_Wouldn%27t_It_Be_Nice.png",
    },
    {
      name: "Help",
      email: "anton@mail.ru",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Style_-_Wouldn%27t_It_Be_Nice.png",
    },
  ]);

  // --- Actions ---
  const setDrawer = () => {
    drawer.value = !drawer.value;
  };

  const setUserSettings = (state: boolean) => {
    userSettings.value = state;
  };

  const filterChats = (value: string): any => {
    return chatsList.value.filter(({ name, email }) =>
      [name, email].some((str) => str.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return {
    drawer,
    userSettings,
    chatsList,
    setDrawer,
    filterChats,
    setUserSettings,
  };
});
