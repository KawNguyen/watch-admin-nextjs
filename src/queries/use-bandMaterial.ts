import { useQuery } from '@tanstack/react-query';
import { bandmaterialApi } from '@/services/band-material';

export const useBandMaterials = () => {
  return useQuery({
    queryKey: ['bandMaterials'],
    queryFn: bandmaterialApi.getAllBandMaterials,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
