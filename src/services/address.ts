import { Address } from "@/types/address";
import axios from "axios";
const API_THANHPHO = "https://provinces.open-api.vn/api";

export const addressAPI = {
  getProvince: async () => {
    const response = await axios.get(`${API_THANHPHO}/p/`);
    return response.data;
  },
  getDistrict: async (provinceId: string) => {
    const response = await axios.get(API_THANHPHO + `/p/${provinceId}?depth=2`);
    return response.data;
  },
  getWard: async (districtId: string) => {
    const response = await axios.get(API_THANHPHO + `/d/${districtId}?depth=2`);
    return response.data;
  },
  create: async (userId: string, data: Address) => {
    const response = await axios.post(`/api/address/users/${userId}/add`, data);
    return response.data;
  },
  delete: async (userId: string, id: string) => {
    const response = await axios.delete(
      `/api/address/users/${userId}/delete/${id}`
    );
    return response.data;
  },
  update: async (userId: string, id: string, data: Partial<Address>) => {
    const response = await axios.patch(
      `/api/address/users/${userId}/update/${id}`,
      data
    );
    return response.data;
  },
};
