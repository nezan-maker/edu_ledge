import z from "zod";

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
