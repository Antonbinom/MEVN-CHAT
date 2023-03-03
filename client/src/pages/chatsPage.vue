<template lang="pug">
q-layout(@click="closeDrawer")
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
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

import HeaderComponent from "src/components/Chats/HeaderComponent.vue";
import DrawerComponent from "src/components/Chats/DrawerComponent.vue";
import ChatsListComponent from "src/components/Chats/ChatsListComponent.vue";
import ChatWindowComponent from "src/components/Chats/ChatWindowComponent.vue";
import UserSettingsComponent from "src/components/Chats/UserSettingsComponent.vue";

import { useUserStore } from "src/stores/userStore";
import { useUsersStore } from "src/stores/usersStore";
// --- Stores ---
const userStore = useUserStore();
const usersStore = useUsersStore();

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

  document.addEventListener("click", closeDrawer);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDrawer);
});
</script>
