import Joi from "joi";
import { Item, LogOutUserBodyParams, SignUpUserBodyParams } from "../types";
export const signUpUserSchema = Joi.object<SignUpUserBodyParams>({
  email: Joi.string().email().max(255).required(),
  password: Joi.string()
    .min(8)
    .max(12)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!*]).+$"))
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 12 characters long",
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, !, *)",
      "any.required": "Password is required",
    }),
});

export const logOutUserSchema = Joi.object<LogOutUserBodyParams>({
  email: Joi.string().email().max(255).required(),
});

export const createUserItemSchema = Joi.object<Item>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  dueDate: Joi.string().isoDate().required(), // or Joi.date().required() if sending a valid date
  owner: Joi.string().required(),
});
