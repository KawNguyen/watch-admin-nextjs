import { watchAPI } from "@/services/watch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWatchData = () => {
  return useQuery({
    queryKey: ["watch"],
    queryFn: async () => watchAPI.getWatch(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useWatchDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await watchAPI.deleteWatch(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
  });
};
