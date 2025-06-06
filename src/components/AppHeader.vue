<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";
const auth = useAuthStore();

const router = useRouter();

const logout = () => {
  if (auth.logout()) {
    router.push("/");
  }
};
</script>

<template>
  <header class="app-header">
    <h1 class="title">📝 Reporn - 日報アプリ</h1>
    <div class="user-section">
      <span v-if="auth.isAuthenticated">{{ auth.user }} さん</span>
      <button @click="logout">ログアウト</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: space-between; // 左右に分ける
  align-items: center;
  padding: 1rem 2rem;
  background-color: #40a5e9;
  border-bottom: 1px solid #ccc;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 1rem;

    .username {
      font-weight: 500;
    }

    .logout-button {
      padding: 0.4rem 1rem;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
