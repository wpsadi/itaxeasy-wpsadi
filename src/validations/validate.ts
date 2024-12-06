import { z } from "zod";

import { httpError } from "@/utils/httpError";

export const validate = <T extends z.AnyZodObject>(
  data: unknown,
  schema: T
) => {
  if (!data) {
    throw httpError.BadRequest("No body provided");
  }
  const validation = schema.safeParse(data);
  if (!validation.success) {
    throw httpError.NotAcceptable(validation.error.errors[0].message);
  }
  return validation.data as z.infer<T>;
};
