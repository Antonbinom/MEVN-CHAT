<template lang="pug">
q-header.elevated.bg-white
  q-toolbar(justify="between")
    q-btn(@click="chatsStore.setDrawer" icon="search" label="search" text-color="black")
    q-toolbar-title.text-black.text-center {{chatsStore.drawer}}
    div.q-gutter-md.q-ml-none
      q-btn.q-ml-md(dense color="purple" round icon="email")
          q-badge(floating color="red" rounded) 4
      q-btn(round)
        q-avatar(size="40px")
          img(src="https://cdn.quasar.dev/img/avatar4.jpg")
        q-menu
          div.q-pa-md.column
            q-btn.q-mb-sm(
              @click="chatsStore.setUserSettings(true)"
              label="My Profile",
              v-close-popup)
            q-btn(label="Logout", v-close-popup)
</template>

<script setup>
import { useChatsStore } from "src/stores/chatsStore";

// --- Stores ---
const chatsStore = useChatsStore();
</script>
