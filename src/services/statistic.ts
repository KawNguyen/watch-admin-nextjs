import { instanceAxios } from "@/lib/instantceAxios";

export const statisticApi = {
  async getStatistics() {
    const response = await instanceAxios.get("/dashboard/statistics");
    return response.data;
  },

  async getTodayStatistic() {
    const response = await instanceAxios.get("/dashboard/statistics/today");
    return response.data;
  },
};
