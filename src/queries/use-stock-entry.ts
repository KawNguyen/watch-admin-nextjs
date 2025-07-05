import { StockAPI } from "@/services/stock-entry";
import { useQuery } from "@tanstack/react-query";

export const useStockEntry = () => {
  return useQuery({
    queryKey: ["stockEntries"],
    queryFn: StockAPI.getAllStockEntries,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
