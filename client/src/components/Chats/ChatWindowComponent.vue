<template lang="pug">
div(v-if="!selectedChat" style="width:65%").bg-white.q-pa-lg.rounded.column.text-center.justify-center
  h4 Click on a chat to start chatting

div.bg-white.q-pa-lg.rounded.column.no-wrap(v-if="chatsStore.chats.length && selectedChat" style="width:65%")
  div.row.justify-between
    span.text-h5 {{getChatName(selectedChat)}}
    q-btn(@click="openChatSettings()" :icon="selectedChat.isGroupChat ? 'settings' : 'person'" color="primary")
  q-scroll-area.q-mt-md(ref="scrollAreaRef" style="height: 100%")
    q-list
      q-item.row(style="width: 100%" v-for="(message, index) in chatMessages" :key="message._id")
        q-chat-message(
          :style="user._id === message.sender._id ? 'margin-left: auto' : 'margin-right: auto'"
          :name="message.sender.name"
          :avatar="message.sender.pic"
          :text="[message.content]"
          :stamp="new Date().toISOString(message.createdAt)"
          :sent="user._id === message.sender._id"
          :bg-color="user._id === message.sender._id ? 'amber-7' : 'primary'"
      )
      div.q-ml-lg(style="height: 36px")
        q-spinner-dots(v-if="isTyping" size="2rem")
  q-input.q-mt-md.outlined(
    v-model="newMessage"
    @keyup.enter="sendMessage"
    label="New message" dense)
</template>

<script setup>
import { debounce } from "quasar";
import { ref, computed, watch, onMounted } from "vue";
import { useChatsStore } from "src/stores/chatsStore";
import { useUserStore } from "src/stores/userStore";
import { getChatName } from "src/hooks/getChatName";
// import { socket } from "src/boot/socket";
const chatsStore = useChatsStore();
const userStore = useUserStore();

// const selectedChatIndex = ref(null);
const newMessage = ref("");
const scrollAreaRef = ref(null);

// --- Computeds ---
const selectedChat = computed(() => {
  return chatsStore.chats?.find(({ _id }) => _id === chatsStore.selectedChat);
});

const user = computed(() => {
  return userStore.user;
});

const chatMessages = computed(() => {
  return chatsStore.chatMessages;
});

const isTyping = computed(() => {
  return chatsStore.isTyping;
});

watch(
  () => chatsStore.chatMessages.length,
  () => {
    animateScroll();
  }
);

watch(newMessage, () => {
  chatsStore.setIsTyping(true);
});

watch(
  newMessage,
  debounce(() => {
    chatsStore.setIsTyping(false);
  }, 500)
);

// --- Methods ---
const openChatSettings = () => {
  chatsStore.setIsChatSettingsOpen(true);
};

// const backToList = () => {
//   selectedChatIndex.value = null;
//   newMessage.value = "";
// };

const sendMessage = () => {
  if (!selectedChat.value || !newMessage.value) return;
  chatsStore.addNewMessage(newMessage.value);
  newMessage.value = "";
};

// const typingHandler = () => {
//   debugger;
//   chatsStore.setIsTyping(true);
//   setTimeout(() => {
//     chatsStore.setIsTyping(false);
//   }, 3000);
// };

const animateScroll = () => {
  const { verticalSize } = scrollAreaRef.value?.getScroll();
  scrollAreaRef.value.setScrollPosition("vertical", verticalSize, 300);
};

onMounted(() => {
  if (scrollAreaRef.value) {
    animateScroll();
  }
});
</script>
