import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  coutry: z.string().min(1, "Country is required"),
  logo: z.string().min(1, "Logo is required"),
});
