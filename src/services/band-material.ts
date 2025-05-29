import { instanceAxios } from "@/lib/instantceAxios";

export const BandMaterialAPI = {
  getBandMaterial: async () => {
    const response = await instanceAxios.get("bandmaterial");
    return response.data;
  },
  createBandMaterial: async (data: { name: string }) => {
    const response = await instanceAxios.post("bandmaterial", data);
    return response.data;
  },
  deleteBandMaterial: async (id: string) => {
    const response = await instanceAxios.delete(`bandmaterial/${id}`);
    return response.data;
  },
  updateBandMaterial: async (id: string, data: { name: string }) => {
    const response = await instanceAxios.put(`bandmaterial/${id}`, data);
    return response.data;
  },
};
