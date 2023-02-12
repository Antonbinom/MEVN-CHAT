<template lang="pug">
q-page.row.justify-evenly.q-py-md
  div(style="width: 500px")
    .bg-white.text-center.q-pa-sm.q-mb-md
      h5.q-ma-none {{ 'MEVN CHAT' }}
    FormComponent
</template>

<script setup>
import { ref } from 'vue';
import FormComponent from 'src/components/FormComponent.vue';
</script>
