import { instanceAxios } from '@/lib/instantceAxios';

export const StockAPI = {
  getAllStockEntries: async () => {
    const res = await instanceAxios.get('/stock-entry');
    return res.data;
  },
  getStockEntryById: async (id: string) => {
    const res = await instanceAxios.get(`/stock-entry/${id}`);
    return res.data;
  },
  createStockEntry: async (data: any) => {
    const res = await instanceAxios.post('/stock-entry/add-stock', data);
    return res.data;
  },
};
