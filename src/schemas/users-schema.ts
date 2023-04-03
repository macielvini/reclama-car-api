import { z } from "zod";

export const userSchema = z.object({
  password: z.string().min(6).max(50),
  email: z.string().email(),
  name: z.string().max(50),
  image: z.string().url(),
});
