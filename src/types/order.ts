export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: [
    {
      absolute_url: string;
    }
  ];
  code: string;
  originalPrice: number;
  quantity: number;
}
