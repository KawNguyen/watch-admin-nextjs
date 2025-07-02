import { couponApi } from "@/services/coupon";
import { useQuery } from "@tanstack/react-query";

export const useCoupon = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: couponApi.getCoupons,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
