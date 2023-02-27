<template lang="pug">
q-layout
  HeaderComponent
  DrawerComponent
  q-page-container.q-pt-lg
    q-page.q-pa-md
      div.row.justify-between(style="height: 92vh")
        ChatsListComponent
        ChatWindowComponent
  UserSettingsComponent
</template>

<script setup>
import { ref } from "vue";

import HeaderComponent from "src/components/Chats/HeaderComponent.vue";
import DrawerComponent from "src/components/Chats/DrawerComponent.vue";
import ChatsListComponent from "src/components/Chats/ChatsListComponent.vue";
import ChatWindowComponent from "src/components/Chats/ChatWindowComponent.vue";
import UserSettingsComponent from "src/components/Chats/UserSettingsComponent.vue";

import { useChatsStore } from "src/stores/chatsStore";

// --- Stores ---
const chatsStore = useChatsStore();
</script>
