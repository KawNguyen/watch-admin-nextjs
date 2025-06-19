import { instanceAxios } from "@/lib/instantceAxios";

export const bandmaterialApi = {
  getAllBandMaterials: async () => {
    const res = await instanceAxios.get("/band-material");
    return res.data;
  },

  getBandMaterialById: async (bandMaterialId: string) => {
    const res = await instanceAxios.get(`/band-material/${bandMaterialId}`);
    return res.data;
  },

  createBandMaterial: async (bandMaterial: { name: string }) => {
    const res = await instanceAxios.post("/band-material/create", bandMaterial);
    return res.data;
  },

  updateBandMaterial: async (
    bandMaterialId: string | undefined,
    bandMaterial: { name: string }
  ) => {
    const res = await instanceAxios.patch(
      `/band-material/update/${bandMaterialId}`,
      bandMaterial
    );
    return res.data;
  },

  deleteBandMaterial: async (bandMaterialId: string) => {
    const res = await instanceAxios.delete(
      `/band-material/delete/${bandMaterialId}`
    );
    return res.data;
  },
};
