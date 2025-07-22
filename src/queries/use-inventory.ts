import { InventoryApi } from "@/services/inventory";
import { useQuery } from "@tanstack/react-query";

export const useInventory = () => {
  return useQuery({
    queryKey: ["inventories"],
    queryFn: InventoryApi.getAllInventory,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
