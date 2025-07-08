import { useQuery } from '@tanstack/react-query';
import { brandApi } from '@/services/brand';

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: brandApi.getAllBrands,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
