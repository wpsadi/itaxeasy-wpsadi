import * as z from "zod";

export const IFSCSchema = z.object({
  IFSC: z
    .string()
    .length(15, "IFSC must be exactly 15 characters")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, {
      message: "Please enter a valid IFSC format",
    }),
});

export type IFSCFormValues = z.infer<typeof IFSCSchema>;
