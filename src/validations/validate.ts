
import { AnyZodObject, ZodEffects } from "zod";



export const validate = (data: unknown, schema: AnyZodObject | ZodEffects<AnyZodObject>) => {

  const result = schema.safeParse(data);

  if (!result.success) {

    throw new Error(result.error.errors.map((err) => err.message).join(", "));

  }

  return result.data;

};
