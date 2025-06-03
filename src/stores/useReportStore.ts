import { defineStore } from "pinia";
import type { Report } from "@/model/report";

export const useReportStore = defineStore("report", {
  state: () => ({
    reports: [] as Report[],
  }),
  actions: {
    addReport(report: Report) {
      this.reports.push(report);
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem("reports");
      if (data) this.reports = JSON.parse(data);
    },
    saveToLocalStorage() {
      localStorage.setItem("reports", JSON.stringify(this.reports));
    },
  },
});
