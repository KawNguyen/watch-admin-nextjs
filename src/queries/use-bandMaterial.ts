import { bandMaterialAPI } from "@/services/band-material";
import { useQuery } from "@tanstack/react-query";

export const useBandMaterial = () => {
  return useQuery({
    queryKey: ["bandMaterial"],
    queryFn: async () => await bandMaterialAPI.getAllBandMaterials(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
