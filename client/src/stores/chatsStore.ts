import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useChatsStore = defineStore("chats", () => {
  // --- States ---
  const currentChat = ref({});
  const chats = ref([]);

  // --- Actions ---
  const setChats = async (token: string, _id: string): Promise<void> => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.post(`/api/chat`, { userId: _id }, config);
      currentChat.value = data;
    } catch (err) {
      throw new Error(err);
    }
    getChats(token)
  };

  // --- Getters ---
  const getChats = async (token: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.get("/api/chat", config);
      chats.value = data;
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    currentChat,
    chats,
    setChats,
    getChats,
  };
});
