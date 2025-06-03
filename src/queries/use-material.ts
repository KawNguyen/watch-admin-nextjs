import { materialAPI } from "@/services/material";
import { useQuery } from "@tanstack/react-query";

export const useMaterial = () => {
  return useQuery({
    queryKey: ["material"],
    queryFn: async () => await materialAPI.getAllMaterials(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
