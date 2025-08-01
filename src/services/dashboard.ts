import { instanceAxios } from "@/lib/instantceAxios";

export const dashboardApi = {
  getDashboard: async () => {
    const res = await instanceAxios.get("/dashboard/statistics");
    return res.data;
  },
};
