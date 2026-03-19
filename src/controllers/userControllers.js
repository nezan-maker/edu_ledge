import {
  signupSchema,
  bookSchema,
  loginSchema,
} from "../validations/validate.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { signupQuery, loginQuery } from "../config/db.js";
const controller = async (req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        if (!body) {
          let message = { message: "Error parsing body" };
          return res.end(JSON.stringify(message));
        }
        const request = JSON.parse(body);
        const result = signupSchema.validate(request);
        const value = result.value;

        if (value) {
          let user_name = value.name;
          let user_email = value.email;
          const hashedPassword = await bcrypt.hash(value.password, 10);
          let password = hashedPassword;
          await signupQuery(user_name, user_email, password);
          let message = { message: "You signed up successfully" };
          res.setHeader("Content-Type", "application/json");
          res.statusCode == 201;
          res.end(JSON.stringify(message));
        }
      } catch (error) {
        console.error(error);
        res.end();
      }
    });
  }
  if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      let response_message;
      try {
        if (!body) {
          let message = { message: "Error parsing body" };
          return res.end(JSON.stringify(message));
        }
        const request = JSON.parse(body);
        const result = loginSchema.validate(request);
        const value = result.value;

        if (value) {
          let user_email = value.email;
          const password = value.password;
          const log_user_in = await loginQuery(user_email, password);
          if (log_user_in) {
            response_message = { message: "Login successfull" };
          } else {
            response_message = { message: "Invalid credentials" };
          }
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(response_message));
        }
      } catch (error) {
        console.error(error);
        res.end("Internal server error");
      }
    });
  }
};
export default controller;
