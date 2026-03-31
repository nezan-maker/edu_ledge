import express from "express";
import { signUp, logIn, logOut } from "../controllers/userControllers.js";
const createUserRoutes = () => {
  const router = express.Router();
  router.post("/register", signUp);
  router.post("/login", logIn);
  router.post("/logout", logOut);
  return router;
};
export default createUserRoutes();
