import { instanceAxios } from "@/lib/instantceAxios";

export const couponApi = {
  getCoupons: async () => {
    const res = await instanceAxios.get("/coupon");
    return res.data;
  },
  createCoupon: async (couponData: any) => {
    const res = await instanceAxios.post("/coupon/create", couponData);
    return res.data;
  },
  updateCoupon: async (couponId: string, couponData: any) => {
    const res = await instanceAxios.patch(
      `/coupon/update/${couponId}`,
      couponData
    );
    return res.data;
  },
  deleteCoupon: async (couponId: string) => {
    const res = await instanceAxios.delete(`/coupon/delete/${couponId}`);
    return res.data;
  },
};
