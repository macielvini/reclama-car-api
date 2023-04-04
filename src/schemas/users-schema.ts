import { z } from "zod";

export const userSchema = z.object({
  password: z.string().min(6).max(50),
  email: z.string().email(),
  name: z.string().max(60),
  image: z
    .string()
    .url()
    .endsWith("jpg" || "jpeg" || "png", {
      message: "Invalid url or image type. Use jpg, jpeg or png!",
    }),
});
