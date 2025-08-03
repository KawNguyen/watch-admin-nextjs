import { z } from "zod";

export const advertisementSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được bỏ trống"),
  content: z.string().min(1, "Nội dung không được bỏ trống"),
  imageUrl: z
    .array(z.custom<File>())
    .max(1, "Vui lòng chọn ít nhất 1 file ảnh")
    .refine(
      (imageUrl) =>
        imageUrl.every((imageUrl) => imageUrl.size <= 1 * 1024 * 1024),
      {
        message: "File phải bé hơn 1MB",
        path: ["imageUrl"],
      }
    ),
  link: z.string().min(1, "Đường dẫn không được bỏ trống"),
  isActive: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
});
