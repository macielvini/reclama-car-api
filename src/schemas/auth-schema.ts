import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().max(100),
});
