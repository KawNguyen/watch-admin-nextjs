import { instanceAxios } from "@/lib/instantceAxios";

export const couponAPI = {
  getCoupon: async () => {
    const response = await instanceAxios.get("coupon");
    return response.data;
  },
  createCoupon: async (data: {
    code: string;
    discount: number;
    startDate: string;
    endDate: string;
    status: string;
  }) => {
    const response = await instanceAxios.post("coupon", data);
    return response.data;
  },
  deleteCoupon: async (id: string) => {
    const response = await instanceAxios.delete(`coupon/${id}`);
    return response.data;
  },
  updateCoupon: async (
    id: string,
    data: {
      code: string;
      discount: number;
      startDate: string;
      enđDate: string;
      status: string;
    }
  ) => {
    const response = await instanceAxios.put(`coupon/${id}`, data);
    return response.data;
  },
};
