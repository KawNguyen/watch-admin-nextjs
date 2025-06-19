import { Gender } from "@/types";
import { z } from "zod";

export const watchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Please select a valid gneder" }),
  }),
  diameter: z.coerce
    .number()
    .min(1, "Diameter must be greater than 0")
    .optional(),
  waterResistance: z.coerce
    .number()
    .min(0, "Water resistance must be 0 or greater")
    .optional(),
  warranty: z.coerce
    .number()
    .min(0, "Warranty must be 0 or greater")
    .optional(),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  brandId: z.string().min(1, "Brand is required"),
  materialId: z.string().min(1, "Material is required"),
  bandMaterialId: z.string().min(1, "Band material is required"),
  movementId: z.string().min(1, "Movement is required"),
});
