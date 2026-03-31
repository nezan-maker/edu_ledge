import {
  signupSchema,
  bookSchema,
  loginSchema,
} from "../middleware/schemas/schema.js";
import debug from "debug";
import bcrypt from "bcrypt";
import { signupQuery, loginQuery, logoutQuery } from "../config/db.js";
import z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const controlDebug = debug("app:controller");
const zDebug = debug("app:zod");
dotenv.config();
export const signUp = async (req, res) => {
  try {
    const result = signupSchema.parse(req.body);
    const name = result.name;
    const email = result.email;
    const password = result.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const msg = await signupQuery(req, res, name, email, hashedPassword);
    const accessToken = jwt.sign(msg, process.env.ACCESS_JWT_SECRET, {
      algorithm: "HS256",
    });
    res.cookie("ACCESS-TOKEN", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    });
    const refresh_token = jwt.sign(msg, process.env.REFRESH_JWT_SECRET, {
      algorithm: "HS256",
    });

    if (msg)
      return res.status(201).json({ message: "You signed up successfully " });
    res.status(401).json({ message: "You already have an account.Log in" });
  } catch (error) {
    controlDebug("Error in controller", error);
    if (error instanceof z.ZodError) {
      zDebug("Input requirements not fulfilled");
      return res
        .status(401)
        .json({ message: "Password does not meet the requirements" });
    }
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
    // controlDebug(result);
    const email = result.email;
    const password = result.password;

    const accessToken = jwt.sign(result, process.env.ACCESS_JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15min",
    });
    const refresh_token = jwt.sign(result, process.env.ACCESS_JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    res.cookie("ACCESS-TOKEN", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    });
    const log_user_in = await loginQuery(email, password, accessToken);
    if (log_user_in) {
      res.status(200).json({ message: "Login Successful" });
    } else {
      res.status(401).json({ message: "Invalid credetials" });
    }
  } catch (error) {
    controlDebug("Error in controllers", error);
    if (error instanceof z.ZodError) {
      zDebug("Input requirements not fulfilled");
      return res
        .status(401)
        .json({ message: "Password does not meet the requirements" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logOut = async (req, res) => {
  console.log("Server is responding");
  const token = req.cookies.accessToken;
  const user_details = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
  let log_user_out = logoutQuery(user_details.payload.user_id);
  res.clearCookie("accesToken");
  if (log_user_out) res.status(200).json({ message: "Log out successful" });
};
export const set_password_change = async (req, res) => {};
export const verify_code = async (req, res) => {};
export const change_password = async (req, res) => {};
