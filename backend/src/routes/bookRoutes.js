import express from "express";
import multer from "multer";
import { getBooks, registerBook } from "../controllers/bookController.js";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: 10 * 1024 * 1024 });

const createBooksRoutes = () => {
  const router = express.Router();
  router.get("/books", getBooks);
  router.post("/register-book", upload.single("uploaded_book"), registerBook);
  return router;
};

export default createBooksRoutes();
