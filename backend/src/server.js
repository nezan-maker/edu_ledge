import express from "express";
import debug from "debug";
import createUserRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import { apiReference } from "@scalar/express-api-reference";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const serverDebug = debug("app:server");
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swagger_path = __dirname + "/openapi.json";
console.log(swagger_path);
app.use(express.json());
app.get("/openapi.json", (req, res) => {
  res.sendFile(path.join(__dirname, "openapi.json"));
});
app.use(
  "/docs",
  apiReference({
    url: "/openapi.json", // points to the OpenAPI spec
  }),
);
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
