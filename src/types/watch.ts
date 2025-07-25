export interface Watch {
  id: string;
  slug: string;
  code: string;
  name: string;
  description: string;
  status: WatchStatus;
  gender: "MEN" | "WOMEN" | "UNISEX";
  brandId: string;
  materialId: string;
  bandMaterialId: string;
  movementId: string;
  diameter: number;
  waterResistance: number;
  warranty: number; // in months
  price: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  brand: any;
  material: any;
  bandMaterial: any;
  movement: any;
  banner: any[];
  poster: any[];
}

export enum WatchStatus {
  PUBLISHED = "PUBLISHED",
  DRAFTED = "DRAFTED",
  ARCHIVED = "ARCHIVED",
}
