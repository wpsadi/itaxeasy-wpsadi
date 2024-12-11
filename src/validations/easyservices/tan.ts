// src/validations/easyservices/gstin.ts

import * as z from "zod";

// Zod schema for validating GSTIN and TAN
export const gstinSchema = z.object({
  gstin: z
    .string()
    .length(15, "GSTIN must be exactly 15 characters")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z0-9]{1}[A-Z]{1}$/, "Invalid GSTIN format"),
  tan: z
    .string()
    .length(10, "TAN must be exactly 10 characters")
    .regex(/^[A-Z]{4}[0-9]{5}[A-Z]$/, "Invalid TAN format"),
});

// Type for the form values
export type GSTINFormValues = z.infer<typeof gstinSchema>;
