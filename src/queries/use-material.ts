import { materialApi } from "@/services/material";
import { useQuery } from "@tanstack/react-query";

export const useMaterials = () => {
  return useQuery({
    queryKey: ["materials"],
    queryFn: materialApi.getAllMaterials,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
