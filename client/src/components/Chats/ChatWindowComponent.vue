<template lang="pug">
div.bg-white.q-pa-lg.rounded(style="width:65%")
  div.row.justify-between
    span.text-h5 Chat Name
    q-btn(@click="addChat" icon="add" color="primary")

  q-scroll-area.q-mt-md
    q-list
      q-item(v-for="(message, index) in chats[0].messages" :key="index")
        q-item-section
          q-item-label {{ message.text }}
        q-item-section(side)
          q-item-label(caption) {{ message.timestamp }}

  q-input.q-mt-md.outlined(v-model="newMessage" @keyup.enter="sendMessage" label="New message" dense)
</template>

<script setup>
import { ref, computed } from "vue";

const chats = ref([
  {
    title: "Chat 1",
    messages: [
      { text: "Hello", timestamp: "2022-01-01 10:00:00" },
      { text: "How are you?", timestamp: "2022-01-01 10:01:00" },
    ],
  },
  {
    title: "Chat 2",
    messages: [
      { text: "Hi", timestamp: "2022-01-01 10:05:00" },
      { text: "I'm fine, thanks. And you?", timestamp: "2022-01-01 10:06:00" },
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

const backToList = () => {
  selectedChatIndex.value = null;
  newMessage.value = "";
};

const sendMessage = () => {
  if (selectedChat.value) {
    selectedChat.value.messages.push({
      text: newMessage.value,
      timestamp: new Date().toISOString(),
    });
    newMessage.value = "";
  }
};
</script>
