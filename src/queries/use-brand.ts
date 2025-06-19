import { brandApi } from "@/services/brand";
import { useQuery } from "@tanstack/react-query";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: brandApi.getAllBrands,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
