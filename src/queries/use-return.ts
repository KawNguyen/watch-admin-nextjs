import { returnApi } from "@/services/return";
import { useQuery } from "@tanstack/react-query";

export const useReturn = () => {
  return useQuery({
    queryKey: ["returns"],
    queryFn: returnApi.getAllReturn,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
