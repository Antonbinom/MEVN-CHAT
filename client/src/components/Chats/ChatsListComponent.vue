<template lang="pug">
div.bg-white.q-pa-lg.rounded(style="width:34%")
  div.row.justify-between
    span.text-h5 Chat List
    q-btn(@click="addChat" label="New Group Chat" icon-right="add" color="primary")

  q-list(v-if="chats.length").q-mt-lg.q-pa-md.bg-grey-1.rounded
    q-item(v-for="(chat, index) in chats" :key="index" clickable @click="selectChat(chat._id)" :class=" isSelectedChat(chat) ? 'bg-teal-5 text-white' : 'bg-grey-3'"
    ).q-mb-md.q-py-md.rounded
      q-item-section
        q-item-label.text-h6 {{ getChatName(chat) }}
        q-item-label(v-if="lastMessage(chat.messages)")
          span.text-bold {{`${lastMessage(chat.messages).sender}: `}}
          span {{lastMessage(chat.messages).text}}
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useChatsStore } from "src/stores/chatsStore";
import { getChatName } from "src/hooks/getChatName";

const chatsStore = useChatsStore();

// --- Computed ---
const chats = computed(() => {
  return chatsStore.chats;
});

// --- Methods ---
const addChat = () => {
  chatsStore.setIsAddChatOpen(true);
};

const selectChat = (id) => {
  chatsStore.setSelectedChat(id);
};

const isSelectedChat = ({ _id }) => {
  return chatsStore.selectedChat === _id;
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

onBeforeMount(() => {
  chatsStore.getChats();
});
</script>

<style lang="sass" scoped>
.q-item
  &:last-child
    margin-bottom: 0
</style>
