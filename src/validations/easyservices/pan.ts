import * as z from "zod"

export const panSchema = z.object({
  pan: z
    .string()
    .length(10, "PAN must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
      message: "Please enter a valid PAN format (e.g., AAAAA9999A)",
    })
})

export type PANFormValues = z.infer<typeof panSchema>