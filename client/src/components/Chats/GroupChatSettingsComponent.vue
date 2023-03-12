<template lang="pug">
q-card-section.text-center
  span.text-h4 {{chat.chatName}}
  .q-mt-lg.q-gutter-xs.row
    q-chip(
      v-for="user in chat.users"
      :key="user._id"
      :color="isAdmin(user._id) ? 'primary' : 'secondary'"
      text-color="white"
      :label="user.name"
      title="User Info")
      q-icon.q-ml-md(
        v-if="!isAdmin(user._id)"
        @click.stop="removeParticipant(user._id)"
        clickable
        title="remove"
        name="close"
        size="xs")
  .text-center.q-pa-none.q-my-md
    q-input.q-mb-md(
    v-if="isAdmin"
    v-model="chatName"
    outlined
    placeholder="Chat Name" dense)
      template(v-slot:append)
        q-icon(
          v-if="isAdmin()"
          name="drive_file_rename_outline"
          class="cursor-pointer"
          @click="renameChat")
    q-input(v-model="search"
    outlined
    placeholder="Add Users eg: Anton, Katy, Ivan" dense)
      template(v-slot:append)
        q-icon(name="search"
          class="cursor-pointer"
          @click="findUsers")
  q-scroll-area.q-mb-md( :style="{ maxHeight: '190px', height: `${usersList.length * 65}px`}" v-if="usersList?.length")
    q-list()
      q-item.q-mb-sm.bg-grey-3.rounded(
        v-for="user in usersList"
        :key="user._id"
        clickable
        v-ripple
        @click="addParticipant(user._id)"
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
  q-btn.q-mb-lg.bg-red.text-white(v-if="!isAdmin() || isAdmin() && chat.users.length < 2" @click="leaveGroup(currentUser._id)") leave group
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

// --- Ref ---
const chatName = ref("");

// --- Computeds ---
const currentUser = computed(() => {
  return userStore.user;
});

const chat = computed(() => {
  return chatsStore.chats?.find(({ _id }) => _id === chatsStore.selectedChat);
});

const usersList = computed(() => {
  return usersStore.usersList.filter(
    ({ _id }) => !chat.value.users.some(({ _id: _id2 }) => _id === _id2)
  );
});

const search = computed({
  get: () => usersStore.searchValue,
  set: (value) => usersStore.setSearchValue(value),
});

const isLoading = computed(() => {
  return usersStore.isLoading;
});

// --- Methods ---
const isAdmin = (id) => {
  if (id) return id === chat.value.groupAdmin;
  return currentUser.value._id === chat.value.groupAdmin;
};
const findUsers = () => {
  usersStore.setUsersList();
};

const participantInfo = () => {
  alert("User");
};

const addParticipant = (id) => {
  if (chat.value.users.find(({ _id }) => _id === id)) return;
  chatsStore.addGroupChatParticipant(id);
};

const removeParticipant = (id) => {
  chatsStore.removeGroupChatParticipant(id);
};

const renameChat = () => {
  if (!chatName.value) return;
  chatsStore.setNewChatName(chatName.value);
};

const leaveGroup = (id) => {
  chatsStore.removeGroupChatParticipant(id);
  chatsStore.setIsChatSettingsOpen(false);
};
</script>
