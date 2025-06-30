export interface CreateBrandTypes {
  name: string;
  country: string;
}

export interface Brand {
  id: string;
  name: string;
  code: string;
  slug: string;
  image: {
    absolute_url: string;
    public_id: string;
  };
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
