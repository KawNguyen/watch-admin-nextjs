import { useQuery } from '@tanstack/react-query';
import { materialApi } from '@/services/material';

export const useMaterials = () => {
  return useQuery({
    queryKey: ['materials'],
    queryFn: materialApi.getAllMaterials,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
