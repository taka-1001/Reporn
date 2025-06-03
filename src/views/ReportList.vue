/** 一覧画面用 */
<script setup lang="ts">
import { useReportStore } from "@/stores/useReportStore";
import { useRouter } from "vue-router";

const reportStore = useReportStore();
const router = useRouter();

reportStore.loadFromLocalStorage();

const goToNew = () => router.push("/report/new");
const goToEdit = (id: string) => router.push(`/report/${id}`);

const deleteReport = (id: string) => {
  if (confirm("本当に削除しますか？")) {
    reportStore.reports = reportStore.reports.filter((r) => r.id !== id);
    reportStore.saveToLocalStorage();
  }
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">日報一覧</h1>

    <button
      @click="goToNew"
      class="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      ＋ 日報を追加
    </button>

    <ul>
      <li
        v-for="report in reportStore.reports"
        :key="report.id"
        class="mb-2 flex justify-between items-center"
      >
        <div>
          <p>
            <strong>{{ report.date }}</strong
            >：{{ report.title || "(タイトルなし)" }}
          </p>
        </div>
        <div class="space-x-2">
          <button
            @click="goToEdit(report.id)"
            class="px-2 py-1 bg-yellow-400 text-white rounded"
          >
            編集
          </button>
          <button
            @click="deleteReport(report.id)"
            class="px-2 py-1 bg-red-500 text-white rounded"
          >
            削除
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
