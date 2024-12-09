import * as z from "zod"

export const upiVerificationSchema = z.object({
  upiAddress: z
    .string()
    .min(1, "UPI address is required")
    .regex(
      /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
      "Invalid UPI address format. It should be in the format username@upi"
    ),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
})

export type UPIVerificationFormData = z.infer<typeof upiVerificationSchema>