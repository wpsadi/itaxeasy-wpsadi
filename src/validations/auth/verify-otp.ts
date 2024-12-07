import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp_key: z.string(),
  otp: z
    .string()
    .length(6, {
      message: "OTP must be exactly 6 digits.",
    })
    .regex(/^\d+$/, {
      message: "OTP must contain only numbers.",
    }),
  type: z.string().default("newpassword").optional(),
});
