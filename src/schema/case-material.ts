import { z } from "zod";

export const caseMaterialSchema = z.object({
  name: z.string().min(1, "Tên chất liệu vỏ không được bỏ trống"),
});
