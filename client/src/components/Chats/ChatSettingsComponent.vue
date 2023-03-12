<template lang="pug">
q-dialog(v-model="chatsStore.isChatSettingsOpen")
  q-card.q-pa-md(style="width: 500px")
    q-card-section
      q-icon.cursor-pointer.absolute-right(
        @click="closeChatsSettings"
        name="close"
        size="md")
      PrivateChatSettingsComponent(v-if="!selectedChat?.isGroupChat" :chat="selectedChat")
      GroupChatSettingsComponent(v-if="selectedChat?.isGroupChat")
      div.row.justify-end
        q-btn(
          @click="closeChatsSettings"
          color="primary"
          label='close'
          align="right")
</template>

<script setup>
import { computed } from "vue";
import { useChatsStore } from "src/stores/chatsStore";
import { getChatName } from "src/hooks/getChatName";
import PrivateChatSettingsComponent from "src/components/Chats/PrivateChatSettingsComponent.vue";
import GroupChatSettingsComponent from "src/components/Chats/GroupChatSettingsComponent.vue";
// --- Stores ---
const chatsStore = useChatsStore();

// --- Computeds ---
const selectedChat = computed(() => {
  return chatsStore.chats?.find(({ _id }) => _id === chatsStore.selectedChat);
});

const closeChatsSettings = () => {
  chatsStore.setIsChatSettingsOpen(false);
};
</script>
