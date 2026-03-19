import { signupSchema, bookSchema } from "../validations/validate.js";
import bcrypt from "bcrypt";
const controller = async (req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    console.log("Request made");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        if (!body) {
          return res.end({ message: "Error parsing body" });
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
          res.end(JSON.stringify(message));
        }
      } catch (error) {
        console.error(error);
        res.end("Internal server error");
      }
    });
  }
};
export default controller;
