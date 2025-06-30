export interface CreateBrandTypes {
  name: string;
  country: string;
  image: BrandImage;
}

export interface BrandImage {
  absolute_url: string;
  public_id: string;
}

export interface Brand {
  id: string;
  name: string;
  code: string;
  slug: string;
  image: BrandImage
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
