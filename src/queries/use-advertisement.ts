import { advertisementApi } from "@/services/ads";
import { useQuery } from "@tanstack/react-query";

export const useAdvertisement = () => {
  return useQuery({
    queryKey: ["advertisements"],
    queryFn: advertisementApi.getAllAds,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
