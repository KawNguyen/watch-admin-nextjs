import { blogApi } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

export const useBlog = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogApi.getAllBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
