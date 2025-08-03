import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z.string().min(1, "Tên không được bỏ trống"),
  lastName: z.string().min(1, "Họ không được bỏ trống"),
  email: z.string().min(1, "Email không được bỏ trống"),
  phone: z.string().min(1, "Số điện thoại không được bỏ trống"),
  street: z.string().min(1, "Số nhà không được bỏ trống"),
  province: z.string().min(1, "Tỉnh / Thành phố không được bỏ trống"),
  district: z.string().min(1, "Quận / Huyện không được bỏ trống"),
  ward: z.string().min(1, "Phường / Xã không được bỏ trống"),
});
