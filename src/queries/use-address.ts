import { useQuery } from '@tanstack/react-query';
import { addressAPI } from '@/services/address';

export const useProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: addressAPI.getProvince,
  });
};
export const useDistricts = (provinceId: string) => {
  return useQuery({
    queryKey: ['districts', provinceId],
    queryFn: () => addressAPI.getDistrict(provinceId),
    enabled: !!provinceId,
  });
};
export const useWards = (districtId: string) => {
  return useQuery({
    queryKey: ['wards', districtId],
    queryFn: () => addressAPI.getWard(districtId),
    enabled: !!districtId,
  });
};
