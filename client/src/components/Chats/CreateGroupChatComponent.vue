<template lang="pug">
q-dialog(v-model="chatsStore.isAddChatOpen")
  q-card.q-pa-md(style="width: 500px")
    q-card-section
      h4.text-center.q-ma-none Create Group Chat
      q-icon.cursor-pointer.absolute-right(
        @click="chatsStore.setIsAddChatOpen(false)"
        name="close"
        size="md")
      .text-center.q-pa-none.q-mt-lg
        q-input.q-mb-md(v-model="chatName"
        outlined
        placeholder="Chat Name" dense)
        q-input(v-model="search"
        outlined
        placeholder="Add Users eg: Anton, Katy, Ivan" dense)
          template(v-slot:append)
            q-icon(name="search"
              class="cursor-pointer"
              @click="findUsers")
      .q-my-sm.q-gutter-xs.row
        q-chip(
          v-for="participant in chatsStore.chatParticipants"
          :key="participant._id"
          clickable
          @click="removeParticipant(participant)"
          color="primary"
          text-color="white"
          :label="participant.name"
          :title="participant.name")
      q-scroll-area( :style="{ maxHeight: '190px', height: `${users.length * 65}px`}" v-if="users?.length")
        q-list()
          q-item.q-mb-sm.bg-grey-3.rounded(
            v-for="user in users"
            :key="user._id"
            clickable
            v-ripple
            @click="addParticipant(user)"
            )
            q-item-section(avatar)
              q-avatar(v-if="user.avatar")
                img( :src="user.avatar")
              q-avatar( v-if="!user.avatar" color="primary" text-color="white") {{ user.name[0] }}
            q-item-section
              q-item-label {{ user.name }}
              q-item-label(caption lines="1") {{ user.email }}
      .row.justify-center(v-if="isLoading")
        q-spinner(color="primary"
          size="3em")
      .row.justify-end.q-mt-lg
        q-btn(
          @click="addChat"
          color="primary"
          label='Add Chat'
          align="right")
</template>

<script setup>
import { ref, computed } from "vue";
import { useChatsStore } from "src/stores/chatsStore";
import { useUsersStore } from "src/stores/usersStore";
import { useUserStore } from "src/stores/userStore";

// --- Stores ---
const chatsStore = useChatsStore();
const usersStore = useUsersStore();
const userStore = useUserStore();

const chatName = ref("");

// --- Computeds ---
const search = computed({
  get: () => usersStore.searchValue,
  set: (value) => usersStore.setSearchValue(value),
});

const users = computed(() => {
  return usersStore.usersList.filter(
    ({ _id }) => !chatsStore.chatParticipants.some(({ _id: _id2 }) => _id === _id2)
  );
});

const isLoading = computed(() => {
  return usersStore.isLoading;
});

// --- Methods ---
const findUsers = () => {
  usersStore.setUsersList();
};

const addParticipant = (user) => {
  chatsStore.addChatParticipants(user);
};
const removeParticipant = (user) => {
  chatsStore.removeChatParticipants(user);
};

const addChat = () => {
  chatsStore.addNewChat(chatName.value);
};
</script>
