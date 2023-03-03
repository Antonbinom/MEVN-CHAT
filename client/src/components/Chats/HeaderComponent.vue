<template lang="pug">
q-header.elevated.bg-white
  q-toolbar(justify="between")
    q-btn.close-drawer(@click="usersStore.setDrawer(!usersStore.drawer)" icon="search" label="search" text-color="black")
    q-toolbar-title.text-black.text-center MEVN CHAT
    div.q-gutter-md.q-ml-none
      q-btn.q-ml-md(dense color="purple" round icon="email")
          q-badge(floating color="red" rounded) 4
      q-btn(round)
        q-avatar(size="40px")
          img(src="https://cdn.quasar.dev/img/avatar4.jpg")
        q-menu
          div.q-pa-md.column
            q-btn.q-mb-sm(
              @click="usersStore.setUserSettings(true)"
              label="My Profile",
              v-close-popup)
            q-btn(@click="logoutHandler" label="Logout", v-close-popup)
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "src/stores/usersStore";

const router = useRouter();

// --- Stores ---
const usersStore = useUsersStore();

const logoutHandler = () => {
  localStorage.removeItem("userInfo");
  router.push("/");
};
</script>
