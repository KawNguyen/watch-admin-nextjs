import { instanceAxios } from "@/lib/instantceAxios";

export const InventoryApi = {
  getAllInventory: async () => {
    const res = await instanceAxios.get("/inventory");
    return res.data;
  },
};
