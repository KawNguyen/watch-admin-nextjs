import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(1, "Mã giảm giá không được bỏ trống"),
  description: z.string().min(1, "Mô tả không được bỏ trống"),
  discountType: z.string().min(1, "Loại giảm giá không được bỏ trống"),
  discountValue: z.number().min(1, "Giá trị giảm phải là con số"),
  minOrderValue: z.number().min(0, "Giá trị tối thiểu phải là con số"),
  count: z.number().min(1, "Số lượng ít nhất là 1"),
  isActive: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
});
