import { z } from "zod";
import { Gender } from "@/types";
import { WatchStatus } from "@/types/watch";

export const watchSchema = z.object({
  name: z.string().min(1, "Tên đồng hồ không được bỏ trống"),
  description: z.string().optional(),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Vui lòng chọn 1 giới tính" }),
  }),
  diameter: z.coerce.number().min(0, "Chu vi phải lớn hơn 1").optional(),
  waterResistance: z.coerce
    .number()
    .min(0, "Khả năng chống nước không được bỏ trống")
    .optional(),
  warranty: z.coerce.number().min(0, "Bảo hành 24 tháng").optional(),
  price: z.coerce.number().min(1, "Giá tiền phải lớn hơn 0"),
  status: z.nativeEnum(WatchStatus),
  brandId: z.string().min(1, "Thương hiệu không được bỏ trống"),
  materialId: z.string().min(1, "Chất liệu vỏ không được bỏ trống"),
  bandMaterialId: z.string().min(1, "Chất liệu dây không được bỏ trống"),
  movementId: z.string().min(1, "Chuyển động không được bỏ trống"),
  videoUrl: z
    .string()
    .min(1, "Đường dẫn video về sản phẩm không được bỏ trống"),
  files: z
    .array(z.custom<File>())
    .min(1, "Vui lòng chọn 1 file")
    .max(8, "Có thể chọn tới 8 file")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "Kích cỡ file phải bé hơn 5MB",
      path: ["files"],
    }),
});
