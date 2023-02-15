<template lang="pug">
q-card.q-pa-md
  q-tabs.text-grey(v-model="tab" dense active-color="primary" align="justify")
    q-tab(
      v-for="(item, index) in tabs"
      :key="index"
      :name="item.name"
      :label="item.label"
    )
  q-tab-panels(v-model="tab")
    q-tab-panel(v-for="(item, index) in tabs" :key="index" :name="item.name")
      SignUpComponent(v-if="tab === 'signUp'")
      LoginComponent(v-if="tab === 'login'")
</template>

<script setup>
import { ref } from 'vue';
import SignUpComponent from 'src/components/SignUpComponent.vue';
import LoginComponent from 'src/components/LogInComponent.vue';

const tab = ref('login');
const tabs = ref([
  {
    name: 'login',
    label: 'Login',
    isActive: true,
  },
  {
    name: 'signUp',
    label: 'Sign Up',
    isActive: false,
  },
]);
</script>
