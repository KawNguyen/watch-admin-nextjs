import { z } from 'zod';

export const movementSchema = z.object({
  name: z.string().min(1, 'Movement name is required'),
});
