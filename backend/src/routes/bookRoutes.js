import express from "express";
import { getBooks, registerBook } from "../controllers/bookController.js";

const createBooksRoutes = () => {
  const router = express.Router();
  router.get("/books", getBooks);
  router.post("/register-book", registerBook);
  return router;
};

export default createBooksRoutes();
