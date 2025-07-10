import { instanceAxios } from '@/lib/instantceAxios';

export const orderApi = {
  getAllOrder: async () => {
    const res = await instanceAxios.get('/order');
    return res.data;
  },
  createOrder: async (data: any) => {
    const res = await instanceAxios.post('/order/create', data);
    return res.data;
  },
};
