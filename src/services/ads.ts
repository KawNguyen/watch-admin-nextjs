import { instanceAxios } from "@/lib/instantceAxios";

export const advertisementApi = {
  getAllAds: async () => {
    const res = await instanceAxios.get("/advertisement");
    return res.data;
  },

  getAdsById: async (adsId: string) => {
    const res = await instanceAxios.get(`/advertisement/${adsId}`);
    return res.data;
  },

  createAds: async (adsData: any) => {
    const res = await instanceAxios.post("/advertisement/create", adsData);
    return res.data;
  },

  updateAds: async (adsId: string, adsData: any) => {
    const res = await instanceAxios.patch(
      `/advertisement/update/${adsId}`,
      adsData
    );
    return res.data;
  },

  deleteAds: async (adsId: string) => {
    const res = await instanceAxios.delete(`/advertisement/delete/${adsId}`);
    return res.data;
  },
};
