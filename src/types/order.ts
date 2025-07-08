export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: [
    {
      absolute_url: string;
    },
  ];
  code: string;
  originalPrice: number;
  quantity: number;
}
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  province: string;
  district: string;
  ward: string;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}
