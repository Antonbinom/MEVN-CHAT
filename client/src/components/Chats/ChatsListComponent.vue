<template lang="pug">
div.bg-white.q-pa-lg.rounded(style="width:34%")
  div.row.justify-between
    span.text-h5 Chat List
    q-btn(@click="addChat" label="New Group Chat" icon-right="add" color="primary")

  q-list.q-mt-lg.q-pa-md.bg-grey-1.rounded
    q-item(v-for="(chat, index) in chats" :key="index" clickable @click="selectChat(index)").bg-grey-3.q-mb-md.q-py-md.rounded
      q-item-section
        q-item-label.text-h6 {{ chatName(chat) }}
        q-item-label(v-if="lastMessage(chat.messages)")
          span.text-bold {{`${lastMessage(chat.messages).sender}: `}}
          span {{lastMessage(chat.messages).text}}
</template>

<script setup>
import { ref, computed, onUpdated, onBeforeMount } from "vue";
import { useChatsStore } from "src/stores/chatsStore";
import { useUserStore } from "src/stores/userStore";

const chatsStore = useChatsStore();
const userStore = useUserStore();

const selectedChatIndex = ref(null);
const newMessage = ref("");

// --- Computed ---
const chats = computed(() => {
  return chatsStore.chats;
});

const selectedChat = computed(() => {
  return selectedChatIndex.value !== null ? chats.value[selectedChatIndex.value] : null;
});

const addChat = () => {
  // TODO: implement adding new chat
};

const selectChat = (index) => {
  selectedChatIndex.value = index;
};

const editChat = (index) => {
  // TODO: implement editing chat
};

const deleteChat = (index) => {
  // TODO: implement deleting chat
};
const lastMessage = (messages) => {
  return messages?.length ? messages[messages.length - 1] : "";
};

const chatName = (chat) => {
  const { isGroutChat, chatName, users } = chat;
  if (isGroutChat) return chatName;
  return users[1].name;
};

onBeforeMount(() => {
  chatsStore.getChats(userStore.user.token);
});
</script>
