import Joi from "joi";
import z from "zod";
// export const signupSchema = Joi.object({
//   name: Joi.string().trim().min(4).max(99).required(),
//   email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .lowercase()
//     .required(),
//   password: Joi.string()
//     .required()
//     .pattern(
//       new RegExp(
//         "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z-0-9]).{6,30}$",
//       ),
//     ),
// });
// export const bookSchema = Joi.object({
//   name: Joi.string().min(4).max(99).required(),
//   author: Joi.string(),
// });
// export const loginSchema = Joi.object({
//   email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .lowercase()
//     .required(),
//   password: Joi.string()
//     .required()
//     .pattern(
//       new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.\d)(?=.*[^a-zA-Z\d]).{6,30}$"),
//     ),
// });

export const signupSchema = z.object({
  name: z.string().min(4).max(99),
  email: z.email(),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/),
});
export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/),
});
export const bookSchema = z.object({
  name: z.string(),
  description: z.string(),
});
