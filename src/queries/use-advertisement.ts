import { useQuery } from '@tanstack/react-query';
import { advertisementApi } from '@/services/ads';

export const useAdvertisement = () => {
  return useQuery({
    queryKey: ['advertisements'],
    queryFn: advertisementApi.getAllAds,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
