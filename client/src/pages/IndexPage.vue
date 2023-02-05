<template lang="pug">
q-page.row.justify-evenly.q-py-xl
  div(style="width: 500px")
    .bg-white.text-center.q-pa-md.q-mb-md
      h4.q-ma-none {{ 'MEVN CHAT' }}
    q-card.q-pa-md
      q-tabs.text-grey(
        v-model="tab"
        dense
        active-color="primary"
        align="justify"
      )
        q-tab(
          v-for="(item, index) in tabs"
          :key="index"
          :name="item.name"
          :label="item.label"
        )
      q-tab-panels(v-model="tab")
        q-tab-panel(
          v-for="(item, index) in tabs"
          :key="index"
          :name="item.name"
        )
          q-form
            div(v-for="(input, index) in item.inputs")
              q-badge.text-weight-bold.q-mb-sm(
                color="transparent"
                text-color="black"
              ) {{ `${input.name} *` }}
              q-input(
                autocomplete="on"
                v-if="input.type !== 'file'"
                filled
                v-model="input.value"
                :placeholder="`${input.placeholder}`"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                :type="input.isPwd ? 'password' : 'text'"
              )
                template(v-if="input.hasOwnProperty('isPwd')" v-slot:append)
                  q-icon.cursor-pointer(
                    :name="input.isPwd ? 'visibility_off' : 'visibility'"
                    @click="input.isPwd = !input.isPwd"
                  )
              q-file(
                v-if="input.type === 'file'"
                filled
                :type="input.type"
                bottom-slots
                label="Choose file"
                v-model="input.file"
                max-files="1"
                counter
              )
                template(v-slot:prepend)
                  q-icon(name="cloud_upload" @click.stop.prevent)
                template(v-slot:append)
                  q-icon.cursor-pointer(
                    name="close"
                    @click.stop.prevent="model = null"
                  )
            q-btn.row.q-mt-md(
              type="submit"
              style="width: 100%"
              v-for="(button, index) in item.buttons"
              :key="index"
              :color="button.color"
              :label="button.name"
            )
</template>

<script setup  lang="ts">
import { ref } from 'vue';

const tab = ref('login');
const tabs = ref([
  {
    name: 'login',
    label: 'Login',
    isActive: true,
    inputs: [
      {
        name: 'Email Address',
        value: '',
        placeholder: 'Enter Your Email Address',
      },
      {
        name: 'Password',
        value: '',
        placeholder: 'Enter Your Password',
        isPwd: true,
      },
    ],
    buttons: [
      { name: 'Login', color: 'primary' },
      { name: 'Get Guest User Credential', color: 'red' },
    ],
  },
  {
    name: 'signUp',
    label: 'Sign Up',
    isActive: false,
    inputs: [
      {
        name: 'Name',
        value: '',
        placeholder: 'Enter Your Name',
        type: 'text',
      },
      {
        name: 'Email Address',
        value: '',
        placeholder: 'Enter Your Email Address',
        type: 'text',
      },
      {
        name: 'Password',
        value: '',
        placeholder: 'Enter Your Password',
        isPwd: true,
        type: 'password',
      },
      {
        name: 'Confirm Password',
        value: '',
        placeholder: 'Enter Your Confirm Password',
        isPwd: true,
        type: 'password',
      },
      {
        name: 'Upload your Picture',
        file: null,
        type: 'file',
      },
    ],
    buttons: [{ name: 'Sign Up', color: 'primary' }],
  },
]);
</script>
