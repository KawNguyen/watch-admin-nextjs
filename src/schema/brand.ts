import { z } from 'zod';

export const brandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  country: z.string().min(1, 'Country is required'),
  image: z
    .array(z.custom<File>())
    .max(1, 'Please select at least one file')
    .refine((image) => image.every((image) => image.size <= 5 * 1024 * 1024), {
      message: 'File size must be less than 5MB',
      path: ['image'],
    }),
});
