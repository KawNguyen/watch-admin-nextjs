import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/services/user';

export const useUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAllUsers,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
