import { z } from 'zod';

export const userSchema = z.object({
  phone: z.string().min(10, 'Phone number is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});
