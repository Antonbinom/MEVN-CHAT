<template lang="pug">
q-dialog(v-model="chatsStore.userSettings")
  q-card.q-pa-md(style="width: 500px")
    q-card-section
      q-icon.cursor-pointer.absolute-right(
        @click="chatsStore.setUserSettings(false)"
        name="close"
        size="md")
      q-card-section.text-center
        span.text-h4 Anton
      q-card-section.text-center
        q-avatar(size="150px")
          img(src="https://cdn.quasar.dev/img/avatar4.jpg")
        div.text-subtitle1.q-mt-lg anton@mail.ru
      div.row.justify-end
        q-btn(
          @click="chatsStore.setUserSettings(false)"
          color="primary"
          label='close'
          align="right")
</template>

<script setup>
import { ref } from "vue";
import { useChatsStore } from "src/stores/chatsStore";

// --- Stores ---
const chatsStore = useChatsStore();
</script>
