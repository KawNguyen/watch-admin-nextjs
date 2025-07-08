import { z } from 'zod';

export const caseMaterialSchema = z.object({
  name: z.string().min(1, 'Case material name is required'),
});
