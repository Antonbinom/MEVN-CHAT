<template lang="pug">
q-dialog(v-model="userStore.userSettings")
  q-card.q-pa-md(style="width: 500px")
    q-card-section
      q-icon.cursor-pointer.absolute-right(
        @click="userStore.setUserSettings(false)"
        name="close"
        size="md")
      q-card-section.text-center
        span.text-h4 {{authUser.name}}
      q-card-section.text-center
        q-avatar(size="150px")
          img(:src="authUser.pic")
        div.text-subtitle1.q-mt-lg {{authUser.email}}
      div.row.justify-end
        q-btn(
          @click="userStore.setUserSettings(false)"
          color="primary"
          label='close'
          align="right")
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "src/stores/userStore";
import { useAuth } from "src/stores/services/auth";

// --- Stores ---
const userStore = useUserStore();
const authStore = useAuth();

// --- Computeds ---
const authUser = computed(() => authStore.getUser);
</script>
