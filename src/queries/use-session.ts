import { useQuery } from '@tanstack/react-query';
import { authAPI } from '@/services/auth';

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => authAPI.checkAuth(),
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 1000,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => authAPI.getMe().then((res) => res.data.item),
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 1000,
  });
};
