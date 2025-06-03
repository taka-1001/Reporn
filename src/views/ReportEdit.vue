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
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEdit ? "日報を編集" : "日報を追加" }}
    </h1>

    <form @submit.prevent="save">
      <div class="mb-4">
        <label class="block">日付</label>
        <input
          v-model="form.date"
          type="date"
          class="border p-2 w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block">タイトル</label>
        <input v-model="form.title" type="text" class="border p-2 w-full" />
      </div>
      <div class="mb-4">
        <label class="block">内容</label>
        <textarea v-model="form.content" class="border p-2 w-full" required />
      </div>
      <div class="mb-4">
        <label class="block">課題</label>
        <textarea v-model="form.issues" class="border p-2 w-full" />
      </div>
      <div class="mb-4">
        <label class="block">明日の予定</label>
        <textarea v-model="form.plan" class="border p-2 w-full" />
      </div>

      <div class="flex gap-4">
        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded">
          保存
        </button>
        <button
          type="button"
          @click="router.push('/')"
          class="px-4 py-2 bg-gray-400 text-white rounded"
        >
          戻る
        </button>
      </div>
    </form>
  </div>
</template>
