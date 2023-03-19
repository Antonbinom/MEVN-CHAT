<template lang="pug">
q-layout(@click="closeDrawer")
  HeaderComponent
  DrawerComponent
  q-page-container
    q-page.q-pa-md
      div.row.justify-between(style="height: 92vh")
        ChatsListComponent
        ChatWindowComponent
  UserSettingsComponent
  ChatSettingsComponent
  CreateGroupChatComponent
  //- GroupChatSettingsComponent
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { socket } from "src/boot/socket";

import HeaderComponent from "src/components/Chats/HeaderComponent.vue";
import DrawerComponent from "src/components/Chats/DrawerComponent.vue";
import ChatsListComponent from "src/components/Chats/ChatsListComponent.vue";
import ChatWindowComponent from "src/components/Chats/ChatWindowComponent.vue";
import UserSettingsComponent from "src/components/Chats/UserSettingsComponent.vue";
import ChatSettingsComponent from "src/components/Chats/ChatSettingsComponent.vue";
import CreateGroupChatComponent from "src/components/Chats/CreateGroupChatComponent.vue";
// import GroupChatSettingsComponent from "src/components/Chats/GroupChatSettingsComponent.vue";

import { useUserStore } from "src/stores/userStore";
import { useUsersStore } from "src/stores/usersStore";
import { useChatsStore } from "src/stores/chatsStore";
// --- Stores ---
const userStore = useUserStore();
const usersStore = useUsersStore();
const chatsStore = useChatsStore();

const router = useRouter();

const closeDrawer = (event) => {
  if (
    usersStore.drawer &&
    !event.target.closest(".q-drawer") &&
    !event.target.closest(".close-drawer")
  ) {
    usersStore.setDrawer(false);
  }
};

onBeforeMount(() => {
  if (!localStorage.getItem("userInfo")) router.push("/");
  userStore.setUser(JSON.parse(localStorage.getItem("userInfo")));
  if (localStorage.getItem("lastChatId")) {
    chatsStore.setSelectedChat(localStorage.getItem("lastChatId"));
  }
  document.addEventListener("click", closeDrawer);
});

onMounted(() => {
  socket.emit("setup", userStore.user);
  socket.on("connected", () => {
    console.log("SocketConnected");
  });
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeDrawer);
});
</script>
