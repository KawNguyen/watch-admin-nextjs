import { instanceAxios } from "@/lib/instantceAxios";

export const watchApi = {
  async getAll() {
    const res = await instanceAxios.get("/watch");
    return res.data;
  },
  async create(data: any) {
    const res = await instanceAxios.post("/watch/create", data);
    return res.data;
  },
};
