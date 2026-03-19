import Joi from "joi";
export const signupSchema = Joi.object({
  name: Joi.string().trim().min(4).max(99).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});
export const bookSchema = Joi.object({
  name: Joi.string().min(4).max(99).required(),
  author: Joi.string(),
});
