<template lang="pug">
div.bg-white.q-pa-lg.rounded(style="width:34%")
  div.row.justify-between
    span.text-h5 Chat List
    q-btn(@click="addChat" label="New Group Chat" icon-right="add" color="primary")

  q-list.q-mt-lg.q-pa-md.bg-grey-1.rounded
    q-item(v-for="(chat, index) in chats" :key="index" clickable @click="selectChat(index)").bg-grey-3.q-mb-md.q-py-md.rounded
      q-item-section
        q-item-label.text-h6 {{ chat.title }}
        q-item-label(v-if="lastMessage(chat.messages)")
          span.text-bold {{`${lastMessage(chat.messages).sender}: `}}
          span {{lastMessage(chat.messages).text}}
</template>

<script setup>
import { ref, computed } from "vue";

const chats = ref([
  {
    title: "Chat 1",
    messages: [
      { sender: "Anton", text: "Hello", timestamp: "2022-01-01 10:00:00" },
      { sender: "Katy", text: "How are you?", timestamp: "2022-01-01 10:01:00" },
    ],
  },
  {
    title: "Chat 2",
    messages: [
      { sender: "Ivan", text: "Hi", timestamp: "2022-01-01 10:05:00" },
      {
        sender: "Anton",
        text: "I'm fine, thanks. And you?",
        timestamp: "2022-01-01 10:06:00",
      },
    ],
  },
  {
    title: "Chat 3",
    messages: [],
  },
]);

const selectedChatIndex = ref(null);
const newMessage = ref("");

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
</script>
