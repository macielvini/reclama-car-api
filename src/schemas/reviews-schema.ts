import { z } from "zod";

export const reviewSchema = z.object({
  title: z.string().max(50),
  text: z.string().max(1000),
  maintenance: z.optional(z.number().max(5).min(1)),
  drivability: z.optional(z.number().max(5).min(1)),
  comfort: z.optional(z.number().max(5).min(1)),
  consumption: z.optional(z.number().max(5).min(1)),
  general: z.optional(z.number().max(5).min(1)),
  tags: z.optional(z.array(z.string().uuid()).max(3)),
  carId: z.string().uuid(),
});
