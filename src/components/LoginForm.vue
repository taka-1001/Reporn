<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref(false);

const auth = useAuthStore();
const router = useRouter();

const handleLogin = () => {
  error.value = !auth.login(username.value, password.value);
  if (!error.value) {
    router.push("/");
  }
  router.push("/report/list");
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <label>
      ユーザー名:
      <input v-model="username" type="text" required />
    </label>
    <label>
      パスワード:
      <input v-model="password" type="password" required />
    </label>
    <button type="submit">ログイン</button>
    <p v-if="error" class="error">ログインに失敗しました</p>
  </form>
</template>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 2rem auto;
  input {
    width: 100%;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem;
    background: #007acc;
    color: white;
    border: none;
    cursor: pointer;
  }
  .error {
    color: red;
    font-size: 0.9rem;
  }
}
</style>
