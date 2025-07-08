import { useQuery } from '@tanstack/react-query';
import { watchApi } from '@/services/watch';

export const useWatches = () => {
  return useQuery({
    queryKey: ['watches'],
    queryFn: () => watchApi.getAll().then((res) => res.data.items),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
