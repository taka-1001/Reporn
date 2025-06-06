// stores/useAuthStore.ts
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as string | null,
  }),
  actions: {
    login(username: string, password: string) {
      // 仮の認証処理（実際はAPIなどで）
      if (username === "admin" && password === "password") {
        this.isAuthenticated = true;
        this.user = username;
        localStorage.setItem("auth", JSON.stringify({ user: username }));
        return true;
      }
      return false;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      localStorage.removeItem("auth");
    },
    restore() {
      const data = localStorage.getItem("auth");
      if (data) {
        const { user } = JSON.parse(data);
        this.isAuthenticated = true;
        this.user = user;
      }
    },
  },
});
