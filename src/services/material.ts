import { instanceAxios } from "@/lib/instantceAxios";

export const materialAPI = {
  getAllMaterials: async () => {
    const res = await instanceAxios.get("/material");
    return res.data;
  },

  getMaterialById: async (materialId: string) => {
    const res = await instanceAxios.get(`/material/${materialId}`);
    return res.data;
  },

  createMaterial: async (material: { name: string }) => {
    const res = await instanceAxios.post("/material/create", material);
    return res.data;
  },

  updateMaterial: async (
    materialId: string | undefined,
    material: { name: string }
  ) => {
    const res = await instanceAxios.patch(
      `/material/update/${materialId}`,
      material
    );
    return res.data;
  },

  deleteMaterial: async (materialId: string) => {
    const res = await instanceAxios.delete(`/material/delete/${materialId}`);
    return res.data;
  },
};
