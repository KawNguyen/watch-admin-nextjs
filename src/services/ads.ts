import { instanceAxios } from "@/lib/instantceAxios";

export const adsAPI = {
  getAds: async () => {
    const response = await instanceAxios.get("ads");
    return response.data;
  },
  createAds: async (data: { image: string; status: string }) => {
    const response = await instanceAxios.post("ads", data);
    return response.data;
  },
  deleteAds: async (id: string) => {
    const response = await instanceAxios.delete(`ads/${id}`);
    return response.data;
  },
  updateAds: async (id: string, data: { image: string; status: string }) => {
    const response = await instanceAxios.put(`ads/${id}`, data);
    return response.data;
  },
};
