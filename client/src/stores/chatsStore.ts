import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "src/boot/axios";
import { useUsersStore } from "./usersStore";
import { useUserStore } from "./userStore";

export const useChatsStore = defineStore("chats", () => {
  const usersStore = useUsersStore();
  const userStore = useUserStore();

  const user = computed(() => userStore.user);

  // --- States ---
  const chats = ref([]);
  const chatParticipants = ref([]);
  const selectedChat = ref("");
  const isChatSettingsOpen = ref(false);
  const isAddChatOpen = ref(false);

  // --- Actions ---
  const setChats = async (_id: string): Promise<void> => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.value.token}`,
        },
      };
      const { data } = await api.post(`/api/chat`, { userId: _id }, config);
      selectedChat.value = data._id;
    } catch (err) {
      throw new Error(err);
    }
    getChats();
  };

  // --- Actions ---
  const addChatParticipants = (user: object) => {
    if (chatParticipants.value.includes(user)) return;
    chatParticipants.value.push(user);
    console.log(chatParticipants.value);
  };

  const removeChatParticipants = (user: object) => {
    chatParticipants.value = chatParticipants.value.filter(({ _id }) => _id !== user._id);
  };

  const addGroupChatParticipant = async (userId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      };

      await api.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat.value,
          userId: userId,
        },
        config
      );
      getChats();
    } catch (err) {
      throw new Error(err);
    }
  };

  const removeGroupChatParticipant = async (userId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      };

      await api.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat.value,
          userId: userId,
        },
        config
      );
      // selectedChat.value = data._id;
      getChats();
    } catch (err) {
      throw new Error(err);
    }
  };

  const addNewChat = async (chatName: string) => {
    if (!chatName || !chatParticipants.value.length) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      };
      const users = chatParticipants.value.map(({ _id }) => _id);
      const { data } = await api.post(
        "/api/chat/group",
        {
          name: chatName,
          users: JSON.stringify(users),
        },
        config
      );
      chats.value = [data, ...chats.value];
      selectedChat.value = data._id;
      isAddChatOpen.value = false;
    } catch (err) {
      throw new Error(err);
    }
  };

  const setSelectedChat = (id: string) => {
    selectedChat.value = id;
  };

  // --- Getters ---
  const getChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      };
      const { data } = await api.get("/api/chat", config);
      chats.value = data;
    } catch (err) {
      throw new Error(err);
    }
  };

  const setNewChatName = async (chatName: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      };

      await api.put(
        "/api/chat/rename",
        {
          chatId: selectedChat.value,
          chatName: chatName,
        },
        config
      );
      // selectedChat.value = data._id;
      getChats();
    } catch (err) {
      throw new Error(err);
    }
  };
  const setIsAddChatOpen = (value: boolean) => {
    usersStore.setSearchValue("");
    usersStore.setUsersList();
    isAddChatOpen.value = value;
    chatParticipants.value = [];
  };

  const setIsChatSettingsOpen = (state: boolean): void => {
    isChatSettingsOpen.value = state;
    usersStore.setSearchValue("");
    usersStore.setUsersList();
    chatParticipants.value = [];
  };
  return {
    chats,
    selectedChat,
    isAddChatOpen,
    chatParticipants,
    isChatSettingsOpen,
    setChats,
    getChats,
    addNewChat,
    setNewChatName,
    setSelectedChat,
    setIsAddChatOpen,
    addChatParticipants,
    setIsChatSettingsOpen,
    removeChatParticipants,
    addGroupChatParticipant,
    removeGroupChatParticipant,
  };
});
