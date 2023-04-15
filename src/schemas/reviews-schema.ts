import { z } from "zod";

const ratingSchema = z.object({
  maintenance: z.number().max(5).min(1),
  drivability: z.number().max(5).min(1),
  comfort: z.number().max(5).min(1),
  consumption: z.number().max(5).min(1),
  general: z.number().max(5).min(1),
});

export const reviewSchema = z.object({
  title: z.string().max(50),
  text: z.string().max(1000),
  tags: z.optional(z.array(z.string().uuid()).max(3)),
  carId: z.string().uuid(),
  x: z.optional(ratingSchema),
});
