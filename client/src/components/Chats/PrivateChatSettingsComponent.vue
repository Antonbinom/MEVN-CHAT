<template lang="pug">
q-card-section.text-center
  span.text-h4 {{chat.users[1].name}}
q-card-section.text-center
  q-avatar(size="150px")
    img(:src="chat.users[1].pic")
  div.text-subtitle1.q-mt-lg {{chat.users[1].email}}
</template>

<script setup>
import { defineProps } from "vue";

// --- Props ---
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});
</script>
