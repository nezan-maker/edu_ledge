import http from "http";
import { connectDB, signupQuery } from "../src/config/db.js";
import controller from "../src/controllers/userControllers.js";
const server = http.createServer((req, res) => {
  controller(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port on ${PORT}`);
});
