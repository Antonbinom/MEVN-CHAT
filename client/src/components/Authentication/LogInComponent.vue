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
      template(v-if="input.name === 'Password'" v-slot:append)
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
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
// import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/userStore";
import { useAuth } from "src/stores/services/auth";

const userStore = useUserStore();
const authStore = useAuth();

const router = useRouter();

// --- Refs ---
const isLoading = ref(false);
const inputs = reactive([
  { name: "Email Address", value: "", placeholder: "Enter Your Email Address" },
  { name: "Password", value: "", placeholder: "Enter Your Password", isPwd: true },
]);

const authUser = async ({ email, password }) => {
  await authStore.authenticate({
    strategy: "local",
    email: email,
    password: password,
  });
};

const submitForm = async () => {
  const [email, password] = inputs;
  const userData = {
    email: email.value,
    password: password.value,
  };
  try {
    isLoading.value = true;
    authUser(userData);

    router.push("/chats");
    inputs.forEach((input) => (input.value = ""));
  } catch (err) {
    throw new Error(err);
  } finally {
    isLoading.value = false;
  }
};
// onBeforeMount(async () => {
//   if (localStorage.getItem("feathers-jwt")) {
//     await authStore.authenticate({
//       strategy: "jwt",
//       accessToken: localStorage.getItem("feathers-jwt"),
//     });
//   }
// });
</script>
