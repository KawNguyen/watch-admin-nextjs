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
  async update(watchId: string, data: any) {
    const res = await instanceAxios.patch(`/watch/update/${watchId}`, data);
    return res.data;
  },
  async delete(watchId: string) {
    const res = await instanceAxios.delete(`/watch/delete/${watchId}`);
    return res.data;
  },
  async updateStatus(watchId: string, status: any) {
    const res = await instanceAxios.patch(`/watch/update/${watchId}/status`, {
      status,
    });
    return res.data;
  },
  async getAllPages(limit = 12) {
    let page = 1;
    let allItems: any[] = [];
    let hasMore = true;

    while (hasMore) {
      const res = await instanceAxios.get(`/watch?page=${page}&limit=${limit}`);
      const items = res.data?.data?.items || [];

      allItems = [...allItems, ...items];

      if (items.length < limit) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allItems;
  },
};
