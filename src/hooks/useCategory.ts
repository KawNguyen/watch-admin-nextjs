
import { categoryAPI } from "@/services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategoryData = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => categoryAPI.getCategory(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useCategoryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await categoryAPI.deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};


