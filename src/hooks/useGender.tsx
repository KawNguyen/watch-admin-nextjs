import { genderAPI } from "@/services/gender";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGenderData = () => {
  return useQuery({
    queryKey: ["gender"],
    queryFn: async () => genderAPI.getGender(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useCategoryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await genderAPI.deleteGender(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gender"] });
    },
  });
};
