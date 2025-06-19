export interface CreateBrandTypes {
  name: string;
  country: string;
}

export interface BrandTypes {
  brandId: string;
  name: string;
  country: string;
  logo: string;
}

export interface Brand {
  id: string;
  name: string;
  code: string;
  slug: string;
  logo: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
