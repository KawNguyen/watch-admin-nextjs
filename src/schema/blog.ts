import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  userId: z.string().min(1, "User is required"),
  isPublished: z.boolean(),
  thumbnail: z
    .array(z.custom<File>())
    .max(1, "Please select at least one file")
    .refine((image) => image.every((image) => image.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["image"],
    }),
});
