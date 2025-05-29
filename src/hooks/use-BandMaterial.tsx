import { BandMaterialAPI } from "@/services/band-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBandMaterialData = () => {
  return useQuery({
    queryKey: ["bandmaterial"],
    queryFn: async () => BandMaterialAPI.getBandMaterial(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useBandMaterialDelete = () => {
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(id:string) => BandMaterialAPI.deleteBandMaterial(id),
        onSuccess: () => {
            toast.success("Band material deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["bandmaterial"] });
          },
    })
};
