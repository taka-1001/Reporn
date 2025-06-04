/** 詳細画面用 */
<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useReportStore } from "@/stores/useReportStore";
import type { Report } from "@/model/report";
import { v4 as uuidv4 } from "uuid";

const router = useRouter();
const route = useRoute();
const reportStore = useReportStore();

reportStore.loadFromLocalStorage();

const id = route.params.id as string | undefined;
const isEdit = !!id;

const existingReport = isEdit
  ? reportStore.reports.find((r) => r.id === id)
  : null;

const form = reactive<Report>({
  id: existingReport?.id ?? uuidv4(),
  date: existingReport?.date ?? "",
  title: existingReport?.title ?? "",
  content: existingReport?.content ?? "",
  issues: existingReport?.issues ?? "",
  plan: existingReport?.plan ?? "",
});

const save = () => {
  if (isEdit) {
    const index = reportStore.reports.findIndex((r) => r.id === form.id);
    if (index !== -1) {
      reportStore.reports[index] = { ...form };
    }
  } else {
    reportStore.reports.push({ ...form });
  }

  reportStore.saveToLocalStorage();
  router.push("/");
};
</script>

<template>
  <div class="report-detail">
    <h1>{{ isEdit ? "日報を編集" : "日報を追加" }}</h1>

    <form @submit.prevent="save">
      <label>日付</label>
      <input type="date" v-model="form.date" required />

      <label>タイトル</label>
      <input type="text" v-model="form.title" />

      <label>内容</label>
      <textarea v-model="form.content" required></textarea>

      <label>課題</label>
      <textarea v-model="form.issues"></textarea>

      <label>明日の予定</label>
      <textarea v-model="form.plan"></textarea>

      <div class="buttons">
        <button type="submit" class="save">保存</button>
        <button type="button" class="cancel" @click="router.push('/')">
          戻る
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/report-detail.scss";
</style>
