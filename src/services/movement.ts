import { instanceAxios } from "@/lib/instantceAxios";

export const MovementAPI = {
  getMovement: async () => {
    const response = await instanceAxios.get("movement");
    return response.data;
  },
  createMovement: async (data: { name: string }) => {
    const response = await instanceAxios.post("movement", data);
    return response.data;
  },
  deleteMovement: async (id: string) => {
    const response = await instanceAxios.delete(`movement/${id}`);
    return response.data;
  },
  updateMovement: async (id: string, data: { name: string }) => {
    const response = await instanceAxios.put(`movement/${id}`, data);
    return response.data;
  },
};
