import { userAPI } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => userAPI.getUser(),
    staleTime: 1000 * 60 * 5,
  });
};
