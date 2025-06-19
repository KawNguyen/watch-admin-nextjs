import { instanceAxios } from "@/lib/instantceAxios";

export const brandApi = {
  getAllBrands: async () => {
    const res = await instanceAxios.get('/brand');
    return res.data;
  },

  getBrandById: async (brandId: string) => {
    const res = await instanceAxios.get(`/brand/${brandId}`);
    return res.data;
  },

  createBrand: async (brand: { name: string; country: string }, logo: File) => {
    const formData = new FormData();
    formData.append('name', brand.name);
    formData.append('country', brand.country);
    formData.append('file', logo);

    const res = await instanceAxios.post('/brand/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  updateBrand: async (
    brandId: string | undefined,
    brand: { name: string; country: string },
    logo?: File,
  ) => {
    const formData = new FormData();
    formData.append('name', brand.name);
    formData.append('country', brand.country);
    if (logo) {
      formData.append('file', logo);
    }

    const res = await instanceAxios.patch(`/brand/update/${brandId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  deleteBrand: async (brandId: string) => {
    const res = await instanceAxios.delete(`/brand/delete/${brandId}`);
    return res.data;
  },
};