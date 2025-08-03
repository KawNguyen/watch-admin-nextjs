import { z } from "zod";

export const movementSchema = z.object({
  name: z.string().min(1, "Tên chuyển động không được bỏ trống"),
});
