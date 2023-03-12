<template lang="pug">
div(v-if="!selectedChat" style="width:65%").bg-white.q-pa-lg.rounded.column.text-center.justify-center
  h4 Click on a chat to start chatting

div.bg-white.q-pa-lg.rounded.column.no-wrap(v-if="chatsStore.chats.length && selectedChat" style="width:65%")
  div.row.justify-between
    span.text-h5 {{getChatName(selectedChat)}}
    q-btn(@click="openChatSettings()" :icon="selectedChat.isGroupChat ? 'settings' : 'person'" color="primary")

  q-scroll-area.q-mt-md(style="height: 100%")
    q-list
      q-item(v-for="(message, index) in selectedChat?.messages" :key="index")
        q-item-section
          q-item-label {{ message.text }}
        q-item-section(side)
          q-item-label(caption) {{ message.timestamp }}

  q-input.q-mt-md.outlined(v-model="newMessage" @keyup.enter="sendMessage" label="New message" dense)
</template>

<script setup>
import { ref, computed } from "vue";
import { useChatsStore } from "src/stores/chatsStore";
import { getChatName } from "src/hooks/getChatName";

const chatsStore = useChatsStore();

// const selectedChatIndex = ref(null);
// const newMessage = ref("");

// --- Computeds ---
const selectedChat = computed(() => {
  return chatsStore.chats?.find(({ _id }) => _id === chatsStore.selectedChat);
});

// --- Methods ---
const openChatSettings = () => {
  chatsStore.setIsChatSettingsOpen(true);
};

// const backToList = () => {
//   selectedChatIndex.value = null;
//   newMessage.value = "";
// };

// const sendMessage = () => {
//   if (selectedChat.value) {
//     selectedChat.value.messages.push({
//       text: newMessage.value,
//       timestamp: new Date().toISOString(),
//     });
//     newMessage.value = "";
//   }
// };
</script>
