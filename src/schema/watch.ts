import { z } from "zod";
import { Gender } from "@/types";
import { WatchStatus } from "@/types/watch";

export const watchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Please select a valid gneder" }),
  }),
  diameter: z.coerce
    .number()
    .min(0, "Diameter must be greater than 0")
    .optional(),
  waterResistance: z.coerce
    .number()
    .min(0, "Water resistance must be 0 or greater")
    .optional(),
  warranty: z.coerce
    .number()
    .min(0, "Warranty must be 0 or greater")
    .optional(),
  price: z.coerce.number().min(1, "Price must be 1 or greater"),
  status: z.nativeEnum(WatchStatus),
  brandId: z.string().min(1, "Brand is required"),
  materialId: z.string().min(1, "Material is required"),
  bandMaterialId: z.string().min(1, "Band material is required"),
  movementId: z.string().min(1, "Movement is required"),
  videoUrl: z.string().min(1, "Video url is required"),
  files: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(8, "Please select up to 8 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});
