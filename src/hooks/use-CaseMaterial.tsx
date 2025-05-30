import { CaseMaterialAPI } from "@/services/case-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCaseMaterialData = () => {
  return useQuery({
    queryKey: ["casematerial"],
    queryFn: async () => CaseMaterialAPI.getCaseMaterial(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useCaseMaterialDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => CaseMaterialAPI.deleteCaseMaterial(id),
    onSuccess: () => {
      toast.success("Case material deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["casematerial"] });
    },
  });
};
