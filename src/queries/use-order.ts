import { orderApi } from "@/services/create-order";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderApi.getAllOrder().then((res) => res.data.items),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderApi.getOrderById(orderId).then((res) => res.data.item),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
