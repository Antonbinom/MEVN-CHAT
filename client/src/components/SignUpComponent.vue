<template lang="pug">
q-form(@submit="submitForm(inputs)")
  div(v-for="(input, index) in inputs")
    q-badge.text-weight-bold.q-mb-sm(color="transparent" text-color="black") {{ `${input.name} *` }}
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
      @update:model-value="postImage"
      name="file"
      v-if="input.type === 'file'"
      filled
      :type="input.type"
      bottom-slots
      label="Choose file"
      v-model="input.file"
      max-files="1"
      counter
      accept="image/*"
      lazy-rules
      :rules="[() => input.file !== null || 'Please add your image']"
    )
      template(v-slot:prepend)
        q-icon(name="cloud_upload" @click.stop.prevent)
      template(v-slot:append)
        q-icon.cursor-pointer(
          v-if="input.file !== null"
          name="close"
          @click.stop.prevent="input.file = null"
        )
  q-btn.row.q-mt-md(
    :loading="isLoading"
    :disable="isLoading"
    type="submit"
    style="width: 100%"
    color="primary"
    label="Sign Up"
  )
</template>

<script setup  lang="ts">
// --- Imports ---
import { ref } from 'vue';
import { api } from '../boot/axios';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- Refs ---
const inputs = ref([
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
    url: '',
    type: 'file',
  },
]);
const isLoading = ref(false);

// --- Methods ---
const onRejected = (file) => {
  if (file.failedPropValidation) {
    Notify.create({
      message: 'Only images allowed',
      type: 'negative',
    });
  }
};

const makeForm = (pic) => {
  const data = new FormData();
  data.append('file', pic);
  data.append('upload_preset', 'mevn-chat');
  data.append('cloud_name', 'dufuzzjly');
  return data;
};

const postImage = async (image) => {
  const url = 'https://api.cloudinary.com/v1_1/dufuzzjly/image/upload';
  isLoading.value = true;
  try {
    const { data } = await api.post(url, makeForm(image));
    console.log(data);
    inputs.value.forEach((input) => {
      if (input.type === 'file') input.url = data.url;
    });
    isLoading.value = false;
  } catch (err) {
    console.log(err);
    isLoading.value = false;
  }
};

const submitForm = async (inputs) => {
  isLoading.value = true;
  try {
    const [name, email, password, , image] = inputs;
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
      pic: image.url,
    };
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    debugger;
    const { data } = await api.post('/api/user', userData, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push({ path: '/chats' });

    isLoading.value = false;

    inputs.value.forEach((input) => {
      input.value = '';
      input.file = null;
    });
    console.log(inputs.value);
  } catch (err) {
    console.log(err);
    isLoading.value = false;
  }
};
</script>
