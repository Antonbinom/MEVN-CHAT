<template lang="pug" v-if="usersStore">
q-drawer.bg-white(
  v-model="usersStore.drawer",
  :width="350",
  :breakpoint="500",
  overlay,
  persistent
  bordered)
  div
    h2.text-h5.q-mb-md.q-px-md Search Users
    q-separator
  div.row.justify-between.q-ma-md
    q-input(
      v-model="search"
      outlined
      placeholder="Search by name or email"
      style="width: 80%")
    q-btn(@click="findUsers") Go
  q-scroll-area.fit.q-px-md
    q-list
      template(v-for="(usersItem, index) in users", :key="index")
        q-item.bg-grey-4.rounded.q-mb-md(
          @click="accessChat(usersItem)"
          clickable,
          v-ripple
          )
          q-avatar(size="40px").q-mr-md
            img(:src="usersItem.pic" )
          q-item-section
            span.text-bold(style="font-size: 16px") {{ usersItem.name }}
            div.row
              span.text-bold.q-mr-sm Email:
              span {{usersItem.email}}

</template>

<script setup>
import { ref, computed } from "vue";
import { useUsersStore } from "src/stores/usersStore";
import { useUserStore } from "src/stores/userStore";
import { useChatsStore } from "src/stores/chatsStore";

// --- Stores ---
const chatsStore = useChatsStore();
const usersStore = useUsersStore();
const userStore = useUserStore();

// --- Computeds ---
const search = computed({
  get: () => usersStore.searchValue,
  set: (value) => usersStore.setSearchValue(value),
});

const users = computed(() => {
  return usersStore.usersList;
});

const user = computed(() => userStore.user);

// --- Methods ---
const findUsers = () => {
  return usersStore.setUsersList(user);
};

const accessChat = ({ _id }) => {
  chatsStore.setChats(user.value.token, _id);
  usersStore.setDrawer(false);
  usersStore.setSearchValue("");
};
</script>
