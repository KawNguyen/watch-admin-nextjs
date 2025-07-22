export interface Inventory  {
  id: string;
  quantity: number;
  lowStockThreshold: number;
  watchId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  watch: {
    id: string;
    name: string;
    brandId: string;
    materialId: string;
    bandMaterialId: string;
    movementId: string;
    price: number;
    brand: {
      name: string;
    };
    material: {
      name: string;
    };
    bandMaterial: {
      name: string;
    };
    movement: {
      name: string;
    };
  };
};
