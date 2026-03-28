import express from "express";
import debug from "debug";
import createUserRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
const serverDebug = debug("app:server");
const app = express();
app.use(express.json());
app.use("/auth/", createUserRoutes);
const startServer = async () => {
  try {
    const connection = await connectDB();
    if (connection) {
      app.listen(5000, () => {
        serverDebug("Server connected on port 5000");
      });
    }
  } catch (error) {
    serverDebug(error);
  }
};
startServer();
