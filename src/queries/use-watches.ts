import { watchApi } from "@/services/watch";
import { useQuery } from "@tanstack/react-query";

export const useWatches = () => {
  return useQuery({
    queryKey: ["watches"],
    queryFn: watchApi.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
