import { instanceAxios } from "@/lib/instantceAxios";

export const genderAPI = {
  getGender: async () => {
    const response = await instanceAxios.get("gender");
    return response.data;
  },
  createGender: async (data: { name: string; gender: string }) => {
    const response = await instanceAxios.post("gender", data);
    return response.data;
  },
  deleteGender: async (id: string) => {
    const response = await instanceAxios.delete(`gender/${id}`);
    return response.data;
  },
  updateGender: async (
    id: string,
    data: { name: string; gender: string }
  ) => {
    const response = await instanceAxios.put(`gender/${id}`, data);
    return response.data;
  },
};
