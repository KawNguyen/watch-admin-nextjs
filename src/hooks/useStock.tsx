import { StockAPI } from "@/services/stock";
import { useQuery } from "@tanstack/react-query";

export const useStockData = () => {
  return useQuery({
    queryKey: ["stock"],
    queryFn: async () => StockAPI.getStocks(),
    staleTime: 1000 * 60 * 5,
  });
};

