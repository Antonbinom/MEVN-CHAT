import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "src/boot/axios";
import { useUsersStore } from "./usersStore";
import { useUserStore } from "./userStore";
import { AxiosRequestConfig } from "axios";
import { socket } from "src/boot/socket";

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
  const chatMessages = ref([]);
  const isTyping = ref(false);
  // --- Actions ---
  const setChats = async (_id: string): Promise<void> => {
    try {
      const { data } = await fetch(
        "POST",
        "/api/chat",
        { userId: _id },
        "'application/json-patch+json'"
      );
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
  };

  const removeChatParticipants = (user: object) => {
    chatParticipants.value = chatParticipants.value.filter(({ _id }) => _id !== user._id);
  };

  const addGroupChatParticipant = async (userId: string) => {
    try {
      fetch("PUT", "/api/chat/groupadd", {
        chatId: selectedChat.value,
        userId: userId,
      });
      getChats();
    } catch (err) {
      throw new Error(err);
    }
  };

  const removeGroupChatParticipant = async (userId: string) => {
    try {
      fetch("PUT", "/api/chat/groupremove", {
        chatId: selectedChat.value,
        userId: userId,
      });
      getChats();
    } catch (err) {
      throw new Error(err);
    }
  };

  const addNewChat = async (chatName: string) => {
    if (!chatName || !chatParticipants.value.length) return;
    try {
      const users = chatParticipants.value.map(({ _id }) => _id);
      const { data } = await fetch("POST", "/api/chat/group", {
        name: chatName,
        users: JSON.stringify(users),
      });
      chats.value = [data, ...chats.value];
      selectedChat.value = data._id;
      setSelectedChat(data._id);
      isAddChatOpen.value = false;
    } catch (err) {
      throw new Error(err);
    }
  };

  const setSelectedChat = (id: string) => {
    selectedChat.value = id;
    setChatMessages(selectedChat.value);
    socket.emit("join chat", id);
    localStorage.setItem("lastChatId", selectedChat.value);
  };

  // --- Getters ---
  const getChats = async () => {
    try {
      const { data } = await fetch("GET", "/api/chat");
      chats.value = data;
    } catch (err) {
      throw new Error(err);
    }
  };

  const setNewChatName = async (chatName: string) => {
    try {
      await fetch("PUT", "/api/chat/rename", {
        chatId: selectedChat.value,
        chatName: chatName,
      });
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

  const addNewMessage = async (textMessage: string) => {
    const { data } = await fetch("POST", "/api/message", {
      content: textMessage,
      chatId: selectedChat.value,
    });
    socket.emit('new message', data)
    setChatMessages(selectedChat.value);
  };

  const setChatMessages = async (chatId: string) => {
    if (!selectedChat.value) return;
    try {
      const { data } = await fetch("GET", `/api/message/${chatId}`);
      socket.on('message received', (newMessageReceived) => {
        if (!selectedChat.value || selectedChat.value !== newMessageReceived.chat._id) {
          console.log('Error');
        } else {
          setChatMessages(chatId)
        }
      })
      chatMessages.value = data;
    } catch (err) {
      throw new Error(err);
    }
  };

  const setIsTyping = (value: boolean) => {
    if (value) {
      socket.emit('typing', selectedChat.value)
      socket.on('typing', () => {
        isTyping.value = true
      })
    } else {
      socket.emit('stop typing', selectedChat.value)
      socket.on('stop typing', () => {
        isTyping.value = false
      });
    }

  }

  // --- Methods ---
  const fetch = async (
    method: string,
    url: string,
    data?: object,
    contentType?: string
  ) => {
    const config: object = {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
    };
    if (contentType) {
      config.headers["Content-type"] = contentType;
    }
    const params: AxiosRequestConfig = {
      method,
      url,
      headers: config.headers,
      data,
    };
    return await api(params);
  };

  socket.on('typing', () => {
    isTyping.value = true;
    console.log(isTyping.value);
  });

  socket.on('stop typing', () => {
    isTyping.value = false;
    console.log(isTyping.value);
  });

  return {
    chats,
    isTyping,
    selectedChat,
    chatMessages,
    isAddChatOpen,
    chatParticipants,
    isChatSettingsOpen,
    setChats,
    getChats,
    addNewChat,
    setIsTyping,
    addNewMessage,
    setNewChatName,
    setSelectedChat,
    setChatMessages,
    setIsAddChatOpen,
    addChatParticipants,
    setIsChatSettingsOpen,
    removeChatParticipants,
    addGroupChatParticipant,
    removeGroupChatParticipant,
  };
});
