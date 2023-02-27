<template lang="pug" v-if="chatsStore">
q-drawer.bg-white(
  v-model="chatsStore.drawer",
  :width="350",
  :breakpoint="500",
  overlay,
  bordered)
  div
    h2.text-h5.q-mb-md.q-px-md Search Users
    q-separator
  div.row.justify-between.q-ma-md
    q-input(
      v-model="search"
      debounce="500"
      outlined
      placeholder="Search"
      style="width: auto")
  q-scroll-area.fit.q-px-md
    q-list
      template(v-for="(menuItem, index) in filteredChats", :key="index")
        q-item.bg-grey-4.rounded.q-mb-md(clickable, v-ripple)
          q-avatar(size="40px").q-mr-md
            img(:src="menuItem.url" )
          q-item-section
            span.text-bold(style="font-size: 16px") {{ menuItem.name }}
            div.row
              span.text-bold.q-mr-sm Email:
              span {{menuItem.email}}

</template>

<script setup>
import { ref, computed } from "vue";
import { useChatsStore } from "src/stores/chatsStore";

// --- Stores ---
const chatsStore = useChatsStore();

// --- Refs ---
const search = ref("");

// --- Computeds ---
const filteredChats = computed(() => {
  return chatsStore.filterChats(search.value);
});
</script>
