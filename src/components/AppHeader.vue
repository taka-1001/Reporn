<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";
const auth = useAuthStore();
</script>

<template>
  <header class="app-header">
    <h1 class="title">📝 Reporn - 日報アプリ</h1>
    <span v-if="auth.isAuthenticated">{{ auth.user }} さん</span>
    <button @click="auth.logout()">ログアウト</button>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background-color: #40a5e9;
  color: #fff;
  padding: 1rem;
  text-align: center;

  .title {
    margin: 0;
    font-size: 1.5rem;
  }
}
</style>
