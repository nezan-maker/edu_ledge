import express from "express"
import { signUp, logIn } from "../controllers/userControllers.js";
const createUserRoutes = () => {
const router = express.Router();
router.post("/register", signUp);
router.post("/login", logIn);
return router;
};
export default createUserRoutes();
