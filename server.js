import http from "http";
import { connectDB } from "./db.js";
import bcrypt from "bcrypt";
import { bookSchema, signupSchema } from "./validate.js";
const server = http.createServer((req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += body.toString();
    });
    req.on("end", async () => {
      const request = JSON.parse(body);
      const { value, error } = await signupSchema.validateAsync(body);
      if (value) {
        let user_name = value.name;
        let user_email = value.email;
        const hashedPassword = await bcrypt.hash(value.password, 10);
        let password = hashedPassword;
        
      }
    });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port on ${PORT}`);
});
