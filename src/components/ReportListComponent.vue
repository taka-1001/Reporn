<script setup lang="ts">
import { useReportStore } from "@/stores/useReportStore";
import { useRouter } from "vue-router";

const store = useReportStore();
const reports = store.reports;

const router = useRouter();
const goToNew = () => router.push("/report/new");
const edit = (id: string) => router.push(`/report/${id}`);
const remove = (id: string) => store.deleteReport(id);
</script>

<template>
  <div class="report-list">
    <div class="list-header">
      <h1>日報一覧</h1>
      <button class="add-button" @click="goToNew">＋ 新規作成</button>
    </div>

    <div v-if="reports.length" class="reports">
      <div v-for="report in reports" :key="report.id" class="report-card">
        <div class="report-header">
          <h2>{{ report.title || "（タイトルなし）" }}</h2>
          <span class="report-date">{{ report.date }}</span>
        </div>
        <p class="report-content">{{ report.content }}</p>
        <div class="report-actions">
          <button @click="edit(report.id)">編集</button>
          <button @click="remove(report.id)">削除</button>
        </div>
      </div>
    </div>
    <p v-else>日報がありません。</p>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/report-list";
</style>
