import { MovementAPI } from "@/services/movement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMovementData = () => {
  return useQuery({
    queryKey: ["movement"],
    queryFn: async () => MovementAPI.getMovement(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useMovementDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => MovementAPI.deleteMovement(id),
    onSuccess: () => {
      toast.success("Movement deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["movement"] });
    },
  });
};
