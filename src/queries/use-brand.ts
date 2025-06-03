import { brandAPI } from "@/services/brand";
import { useQuery } from "@tanstack/react-query";

export const useBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => brandAPI.getAllBrands(),
    staleTime: 1000 * 60 * 60,
  });
};
