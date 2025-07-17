import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  userId: z.string().min(1, "User is required"),
  isPublished: z.boolean(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
});
