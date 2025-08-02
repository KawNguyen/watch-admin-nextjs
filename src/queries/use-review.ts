import { reviewApi } from "@/services/review";
import { useQuery } from "@tanstack/react-query";

export const useReview = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: reviewApi.getAllReview,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
