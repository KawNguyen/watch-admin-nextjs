import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được bỏ trống"),
  content: z.string().min(1, "Nội dung không được bỏ trống"),
  userId: z.string().min(1, "Người nhập không được bỏ trống"),
  isPublished: z.boolean(),
  thumbnail: z.string().url("Ảnh thumbnail phải là một đường dẫn").optional(),
});
