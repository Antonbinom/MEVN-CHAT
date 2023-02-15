<template lang="pug">
q-form(@submit="submitForm(inputs)")
  div(v-for="(input, index) in inputs")
    q-badge.text-weight-bold.q-mb-sm(color="transparent" text-color="black") {{ `${input.name} *` }}
    q-input(
      autocomplete="on"
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
  q-btn.row.q-mt-md(
    :loading="isLoading"
    :disable="isLoading"
    type="submit"
    style="width: 100%"
    color="primary"
    label="Login"
  )
  q-btn.row.q-mt-md(
    :loading="isLoading"
    :disable="isLoading"
    type="submit"
    style="width: 100%"
    color="red"
    label="Get Guest User Credential"
  )
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../boot/axios';

// --- Refs ---
const inputs = ref([
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
]);

const isLoading = ref(false);

// --- Methods ---
// const handlerClick = () => {

// }
const submitForm = async (inputs) => {
  // debugger
  isLoading.value = true;
  try{
    const url = '/api/user/login';
    const [email, password] = inputs;
    const userData = {
      email: email.value,
      password: password.value,
    };
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const {data} = await api.post(url, userData, config)

    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push({ path: '/chats' });
    isLoading.value = false;

    inputs.forEach((input) => input.value = '');

  }catch (err) {
    isLoading.value = false;
    throw new Error(err)
  }
};
</script>
