
import { categoryAPI } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export const useCategoryData = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => categoryAPI.getCategory(),
    staleTime: 1000 * 60 * 5,
  });
};


