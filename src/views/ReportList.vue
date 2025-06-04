/** 一覧画面用 */
<script setup lang="ts">
import { useReportStore } from "@/stores/useReportStore";
import ReportList from "@/components/ReportListComponent.vue";

const reportStore = useReportStore();

reportStore.loadFromLocalStorage();
</script>

<template>
  <ReportList />
</template>
