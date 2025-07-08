import { useQuery } from '@tanstack/react-query';
import { movementApi } from '@/services/movement';

export const useMovements = () => {
  return useQuery({
    queryKey: ['movements'],
    queryFn: movementApi.getAllMovements,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
