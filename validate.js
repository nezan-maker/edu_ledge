import Joi from "joi";
export const signupSchema = Joi.object({
  name: Joi.string().min(4).max(99).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(30),
});
export const bookSchema = Joi.object({
  name: Joi.string().min(4).max(99).required(),
  author: Joi.string(),
});
