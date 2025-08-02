import { instanceAxios } from "@/lib/instantceAxios";

export const dashboardApi = {
  getDashboard: async (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();

    if (startDate) {
      params.append("startDate", startDate);
    }
    if (endDate) {
      params.append("endDate", endDate);
    }

    const queryString = params.toString();
    const url = `/dashboard/statistics${queryString ? `?${queryString}` : ""}`;

    const res = await instanceAxios.get(url);
    return res.data;
  },
};
