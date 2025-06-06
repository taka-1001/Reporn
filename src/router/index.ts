import { createRouter, createWebHistory } from "vue-router";
import ReportList from "@/views/ReportList.vue";
import ReportEdit from "@/views/ReportEdit.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/useAuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: LoginView },
    {
      path: "/report/list",
      name: "List",
      component: ReportList,
    },
    {
      path: "/report/new",
      name: "NewReport",
      component: ReportEdit,
    },
    {
      path: "/report/:id",
      name: "ReportDetail",
      component: ReportEdit,
      props: true,
    },
  ],
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();
  auth.restore(); // localStorage から復元
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
