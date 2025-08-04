import { instanceAxios } from "@/lib/instantceAxios";

export const returnApi = {
  getAllReturn: async () => {
    const res = await instanceAxios.get("/return-request");
    return res.data;
  },
  getReturnById: async (id: string) => {
    const res = await instanceAxios.get(`/return-request/${id}`);
    return res.data;
  },
  updateReturnStatus: async (id: string, status: string) => {
    const res = await instanceAxios.patch(
      `/return-request/update-status/${id}`,
      { status }
    );
    return res.data;
  },
};
