import { instanceAxios } from "@/lib/instantceAxios";

export const orderApi = {
  getAllOrder: async () => {
    const res = await instanceAxios.get("/order");
    return res.data;
  },
  getOrderById: async (id: string) => {
    const res = await instanceAxios.get(`/order/${id}`);
    return res.data;
  },
  createOrder: async (data: any) => {
    const res = await instanceAxios.post("/order/admin/create-walkin", data);
    return res.data;
  },
  updateStatus: async (id: string, data: any) => {
    const res = await instanceAxios.patch(`/order/update-status/${id}`, data);
    return res.data;
  },
};
