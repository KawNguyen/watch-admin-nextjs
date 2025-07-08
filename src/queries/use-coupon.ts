import { useQuery } from '@tanstack/react-query';
import { couponApi } from '@/services/coupon';

export const useCoupon = () => {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: couponApi.getCoupons,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
