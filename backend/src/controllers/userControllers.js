import {
  signupSchema,
  bookSchema,
  loginSchema,
} from "../validations/validate.js";
import debug from "debug";
import bcrypt from "bcrypt";
import { signupQuery, loginQuery } from "../config/db.js";
const controlDebug = debug("app:controller");
export const signUp = async (req, res) => {
  try {
    const result = signupSchema.parse(req.body);
    console.log(result);
    if (!result) {
      return res
        .status(401)
        .json({ message: "Password does not match the requirements" });
    }
    const name = result.name;
    const email = result.email;
    const password = result.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const msg = await signupQuery(req, res, name, email, hashedPassword);
    if (msg)
      return res.status(401).json({ message: "You signed up successfully " });
    res.status(201).json({ message: "You already have an account.Log in" });
  } catch (error) {
    controlDebug("Error in controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logIn = async (req, res) => {
  try {
    const result = loginSchema.parse(req.body);
    if (!result) {
      return res
        .status(401)
        .json({ message: "Password does not match the requirements" });
    }
    const email = result.value.email;
    const password = result.value.password;
    const log_user_in = await loginQuery(email, password);
    if (!log_user_in) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      res.status(200).json({ message: "Login successful" });
    }
  } catch (error) {
    controlDebug("Error in controllers", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
