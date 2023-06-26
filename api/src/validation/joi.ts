import { ObjectSchema } from "@hapi/joi";
import { BadRequestError } from "../errors";

export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (err : any) {
    throw new BadRequestError(err);
  }
}