import { createRouter, createWebHistory } from "vue-router";
import ReportList from "@/views/ReportList.vue";
import ReportEdit from "@/views/ReportEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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

export default router;
