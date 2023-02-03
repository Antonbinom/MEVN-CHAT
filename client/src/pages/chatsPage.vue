<template lang="pug">
div
  div(v-for="chat in chatsData" key='chat._id') {{ chat.chatName }}
</template>

<script setup lang="ts">
import {  onMounted, ref  } from 'vue';
import { api } from 'src/boot/axios';

const chatsData = ref([])

const getChatsData = async ():Promise<void> => {
  const {data} = await api.get('/api/chat');

  chatsData.value = data;
};

onMounted(() => {
  getChatsData()
})


</script>
