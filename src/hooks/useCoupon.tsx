import { couponAPI } from "@/services/coupon"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCouponData = () => {
    return useQuery({
        queryKey: ['coupon'],
        queryFn: async () => couponAPI.getCoupon(),
        staleTime: 1000 * 60 * 5,
    });
};
export const useCouponDelete=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async(id:string)=>couponAPI.deleteCoupon(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['coupon']});
        }
    })
}