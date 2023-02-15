<template lang="pug">
q-form(@submit="submitForm(inputs)")
  div(v-for="input in inputs")
    q-badge.text-weight-bold.q-mb-sm(color="transparent" text-color="black") {{ input.name }} *
    q-input(
      autocomplete="on"
      filled
      v-model="input.value"
      :placeholder="input.placeholder"
      lazy-rules
      :rules="[(val) => val && val.length > 0 || 'Please type something']"
      :type="input.isPwd ? 'password' : 'text'"
    )
      template(v-if="input.isPwd" v-slot:append)
        q-icon.cursor-pointer(:name="input.isPwd ? 'visibility_off' : 'visibility'" @click="input.isPwd = !input.isPwd")
  q-btn(
    :loading="isLoading"
    :disable="isLoading"
    type="submit"
    style="width: 100%"
    color="primary"
    label="Login"
    class="q-mt-md"
  )
  q-btn(
    :loading="isLoading"
    :disable="isLoading"
    type="submit"
    style="width: 100%"
    color="red"
    label="Get Guest User Credential"
    class="q-mt-md"
    @click="getGuestUserCredentials"
  )
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);

const inputs = ref([
  { name: 'Email Address', value: '', placeholder: 'Enter Your Email Address' },
  { name: 'Password', value: '', placeholder: 'Enter Your Password', isPwd: true },
]);

const submitForm = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.post('/api/user/login', {
      email: inputs.value[0].value,
      password: inputs.value[1].value,
    }, {
      headers: { 'Content-type': 'application/json' },
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push('/chats');
    inputs.value.forEach(input => input.value = '');
  } catch (err) {
    throw new Error(err);
  } finally {
    isLoading.value = false;
  }
};

const getGuestUserCredentials = () => {
  // function to get guest user credentials
};
</script>
