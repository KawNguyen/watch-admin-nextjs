import { z } from "zod";

export const userSchema = z.object({
  phone: z.string().min(10, "Số điện thoại không được bỏ trống"),
  firstName: z.string().min(1, "Tên không được bỏ trống"),
  lastName: z.string().min(1, "Họ không được bỏ trống"),
});
