import http from "http";
import { connectDB, signupQuery } from "../db.js";
import bcrypt from "bcrypt";
import { bookSchema, signupSchema } from "../validations/validate.js";
import Joi from "joi";
import controller from "../controllers/userControllers.js";
const server = http.createServer((req, res) => {
  controller(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port on ${PORT}`);
});
