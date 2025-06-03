import { authAPI } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => authAPI.checkAuth(),
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 1000,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authAPI.getMe(),
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 1000,
  });
}