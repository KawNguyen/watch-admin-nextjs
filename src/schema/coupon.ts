import { z } from 'zod';

export const couponSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  description: z.string().min(1, 'Description is required'),
  discountType: z.string().min(1, 'Discount type is required'),
  discountValue: z.number().min(1, 'Discount value must be a positive number'),
  minOrderValue: z
    .number()
    .min(0, 'Minimum order value must be a non-negative number'),
  count: z.number().min(1, 'Count must be at least 1'),
  isActive: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
});
