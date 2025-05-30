import { instanceAxios } from "@/lib/instantceAxios";

export const StockAPI = {
  getStocks: async () => {
    const response = await instanceAxios.get("stock");
    return response.data;
  },
  getStockById: async (id: string) => {
    const response = await instanceAxios.get(`stock/${id}`);
    return response.data;
  },
  createStock: async (data: {
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>
  })=> {
    const response = await instanceAxios.post("stock", data);
    return response.data;
  },
};
