import { supportApi } from "@/services/support";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSupport = () => {
  return useQuery({
    queryKey: ["supports"],
    queryFn: supportApi.getAllSupport,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
export const useSupportResponse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, response }: { id: string; response: string }) =>
      supportApi.responseSupport(id, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supports"] });
    },
  });
};
