import { userApi } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAllUsers,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
