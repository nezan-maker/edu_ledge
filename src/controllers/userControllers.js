import {
  signupSchema,
  bookSchema,
  loginSchema,
} from "../validations/validate.js";
import bcrypt from "bcrypt";
import { signupQuery, loginQuery } from "../config/db.js";
export const signup = async (req, res) => {
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
      let response_message = { message: "Internal server error" };
      res.statusCode = 500; 
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response_message));
    }
  });
};
export const login = async (req, res) => {
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
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(response_message));
        } else {
          response_message = { message: "Invalid credentials" };
          res.statusCode = 401;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(response_message));
        }
      }
    } catch (error) {
      console.error(error);
      res.end("Internal server error");
    }
  });
};
