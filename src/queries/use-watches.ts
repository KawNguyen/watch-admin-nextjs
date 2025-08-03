import { useQuery } from "@tanstack/react-query";
import { watchApi } from "@/services/watch";

export const useWatches = () => {
  return useQuery({
    queryKey: ["watches"],
    queryFn: () => watchApi.getAllPages(12),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
