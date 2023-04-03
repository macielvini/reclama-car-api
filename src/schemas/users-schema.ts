import { z } from "zod";

export const userSchema = z.object({
  password: z.string().min(6).max(50),
  email: z.string().email(),
  image: z.string().url(),
});
