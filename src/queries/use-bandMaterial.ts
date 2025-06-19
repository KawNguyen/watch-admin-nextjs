import { bandmaterialApi } from "@/services/band-material";
import { useQuery } from "@tanstack/react-query";

export const useBandMaterials = () => {
  return useQuery({
    queryKey: ["bandMaterials"],
    queryFn: bandmaterialApi.getAllBandMaterials,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
