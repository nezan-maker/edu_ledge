import http from "http";
import { connectDB } from "./config/db.js";
import controller from "./controllers/userControllers.js";
const server = http.createServer((req, res) => {
  connectDB();
  controller(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port on ${PORT}`);
});
