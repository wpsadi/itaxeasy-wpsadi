import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string({
        required_error: "Please enter your email address.",

    }).email({
      message: "Please enter a valid email address.",
    }),
    type: z.string().default("newpassword").optional()
  })