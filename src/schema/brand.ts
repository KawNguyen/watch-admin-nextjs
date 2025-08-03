import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "Tên thương hiệu không được bỏ trống"),
  country: z.string().min(1, "Xuất sứ không được bỏ trống"),
  image: z
    .array(z.custom<File>())
    .max(1, "Vui lòng chọn 1 file ảnh")
    .refine((image) => image.every((image) => image.size <= 5 * 1024 * 1024), {
      message: "Kích cỡ file phải dưới 5MB",
      path: ["image"],
    }),
});
