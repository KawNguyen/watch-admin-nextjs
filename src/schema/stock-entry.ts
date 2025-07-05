import { z } from "zod";

export const StockSchema = z.object({
  addedById: z.string().min(1, "Added by ID is required"),
  stockItems: z.array(
    z.object({
      watchId: z.string().min(1, "Watch ID is required"),
      quantity: z.number().int().min(1, "Quantity must be at least 1"),
      costPrice: z.number().min(0, "Price must be a non-negative number"),
    })
  ),
  notes: z.string().optional(),
});
