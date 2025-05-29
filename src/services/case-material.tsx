import { instanceAxios } from "@/lib/instantceAxios";

export const CaseMaterialAPI = {
  getCaseMaterial: async () => {
    const response = await instanceAxios.get("casematerial");
    return response.data;
  },
  createCaseMaterial: async (data: { name: string }) => {
    const response = await instanceAxios.post("casematerial", data);
    return response.data;
  },
  deleteCaseMaterial: async (id: string) => {
    const response = await instanceAxios.delete(`casematerial/${id}`);
    return response.data;
  },
  updateCaseMaterial: async (id: string, data: { name: string }) => {
    const response = await instanceAxios.put(`casematerial/${id}`, data);
    return response.data;
  },
};
