import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp_key: z
    .union([z.string(), z.number()])
    .refine((val) => !isNaN(Number(val)), {
      message: "OTP key must be a valid number.",
    }),
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
