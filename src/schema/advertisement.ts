import { z } from 'zod';

export const advertisementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z
    .array(z.custom<File>())
    .max(1, 'Please select at least one file')
    .refine(
      (imageUrl) =>
        imageUrl.every((imageUrl) => imageUrl.size <= 1 * 1024 * 1024),
      {
        message: 'File size must be less than 1MB',
        path: ['imageUrl'],
      }
    ),
  link: z.string().min(1, 'Link is required'),
  isActive: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
});
