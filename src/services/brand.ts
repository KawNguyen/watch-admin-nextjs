import { instanceAxios } from '@/lib/instantceAxios';

export const brandApi = {
  getAllBrands: async () => {
    const res = await instanceAxios.get('/brand');
    return res.data;
  },

  getBrandById: async (brandId: string) => {
    const res = await instanceAxios.get(`/brand/${brandId}`);
    return res.data;
  },

  createBrand: async (brandData: any) => {
    const res = await instanceAxios.post('/brand/create', brandData, {});
    return res.data;
  },

  updateBrand: async (brandId: string, brandData: any) => {
    const res = await instanceAxios.patch(
      `/brand/update/${brandId}`,
      brandData
    );
    return res.data;
  },

  deleteBrand: async (brandId: string) => {
    const res = await instanceAxios.delete(`/brand/delete/${brandId}`);
    return res.data;
  },
};
