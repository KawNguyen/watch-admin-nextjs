import { reviewAPI } from "@/services/review"
import { useQuery } from "@tanstack/react-query"

export const useReview = () => {
    return useQuery({
        queryKey: ['reviews'],
        queryFn: async () => reviewAPI.getReview(),
        staleTime:1000*60*5,
    })
}
export const useReviewByProduct = (id:string) => {
    return useQuery({
        queryKey: ['reviews'],
        queryFn: async () => reviewAPI.getReviewById(id),
        staleTime:1000*60*5,
    })
}