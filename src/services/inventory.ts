import { instanceAxios } from "@/lib/instantceAxios";

export const InventoryApi = {
  getAllInventory: async () => {
    const res = await instanceAxios.get("/inventory");
    return res.data;
  },
  async getAllPages(limit = 12) {
    let page = 1;
    let allItems: any[] = [];
    let hasMore = true;

    while (hasMore) {
      const res = await instanceAxios.get(
        `/inventory?page=${page}&limit=${limit}`
      );
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
