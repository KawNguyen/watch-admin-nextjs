import { brandAPI } from "@/services/brand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBrandData = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: async () => brandAPI.getBrand(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useBrandDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => brandAPI.deleteBrand(id),
    onSuccess: () => {
      toast.success("Brand deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};
