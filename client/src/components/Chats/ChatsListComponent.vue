<template lang="pug">
div.bg-white.q-pa-lg.rounded(style="width:34%")
  div.row.justify-between
    span.text-h5 Chat List
    q-btn(@click="addChatOpen" icon-right="group_add" color="primary" title="Add New Group")

  q-scroll-area.q-mt-lg(ref="scrollArea" style="height: 95%")
    q-list(v-if="chats.length").q-pa-md.bg-grey-1.rounded
      q-item(v-for="(chat, index) in chats" :key="index" clickable @click="selectChat(chat._id)" :class=" isSelectedChat(chat) ? 'bg-teal-5 text-white' : 'bg-grey-3'"
      ).q-mb-md.q-py-md.rounded
        //- pre {{chat}}
        div.row
          q-avatar.q-mr-md(color="red" text-color="white" :icon="chat.isGroupChat ? 'groups' : none")
            img(v-if="!chat.isGroupChat" :src="chat.users[0].pic")
          div
            q-item-label.text-h6 {{ getChatName(chat) }}
            q-item-label(v-if="chat.latestMessage")
              span.text-bold {{`${chat.latestMessage.sender.name}: `}}
              span {{chat.latestMessage.content}}
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import { useChatsStore } from "src/stores/chatsStore";
import { getChatName } from "src/hooks/getChatName";

const chatsStore = useChatsStore();

// --- Refs ---
const scrollArea = ref(null);
// --- Computed ---
const chats = computed(() => {
  return chatsStore.chats;
});

watch(
  () => chats.value.length,
  () => {
    scrollArea.value?.setScrollPosition("vertical", 0, 300);
  }
);

// --- Methods ---
const addChatOpen = () => {
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

// onBeforeMount(() => {
//   chatsStore.getChats();
// });
</script>

<style lang="sass" scoped>
.q-item
  &:last-child
    margin-bottom: 0
</style>
