import { z } from "zod";

export const InventorySchema = z.object({
  id: z.string(),
  quantity: z.number(),
  lowStockThreshold: z.number(),
  watchId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  watch: z.object({
    id: z.string(),
    name: z.string(),
    brandId: z.string(),
    materialId: z.string(),
    bandMaterialId: z.string(),
    movementId: z.string(),
    price: z.number(),
    brand: z.object({
      name: z.string(),
    }),
    material: z.object({
      name: z.string(),
    }),
    bandMaterial: z.object({
      name: z.string(),
    }),
    movement: z.object({
      name: z.string(),
    }),
  }),
});
