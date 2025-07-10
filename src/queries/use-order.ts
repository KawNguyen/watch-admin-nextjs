import { orderApi } from '@/services/create-order';
import { useQuery } from '@tanstack/react-query';

export const useOrder = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getAllOrder,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
