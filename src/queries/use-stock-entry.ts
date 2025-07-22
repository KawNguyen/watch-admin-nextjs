import { useQuery } from "@tanstack/react-query";
import { StockAPI } from "@/services/stock-entry";

export const useStockEntry = () => {
  return useQuery({
    queryKey: ["stockEntries"],
    queryFn: StockAPI.getAllStockEntries,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useStockEntryById = (id: string) => {
  return useQuery({
    queryKey: ["stock-entry"],
    queryFn: () => StockAPI.getStockEntryById(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
