import { instanceAxios } from "@/lib/instantceAxios";

export const brandAPI = {
  getBrand: async () => {
    const response = await instanceAxios.get("brand");
    return response.data;
  },
  createBrand: async (data: {
    name: string;
    image: string;
    country: string;
  }) => {
    const response = await instanceAxios.post("brand", data);
    return response.data;
  },
  deleteBrand: async (id: string) => {
    const response = await instanceAxios.delete(`brand/${id}`);
    return response.data;
  },
  updateBrand: async (
    id: string,
    data: { name: string; image: string; country: string }
  ) => {
    const response = await instanceAxios.put(`brand/${id}`, data);
    return response.data;
  },
};
