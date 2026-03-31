import express from "express";
import multer from "multer";
import { getBooks, registerBook } from "../controllers/bookController.js";
import {authMiddleWare}
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: 10 * 1024 * 1024 });

const createBooksRoutes = () => {
  const router = express.Router();
  router.get("/books", getBooks);
  router.post(
    "/books/register-book",
    upload.single("uploaded_book"),
    registerBook,
  );
  router.post("/books/borrow-book", borrowBook);
  router.post("/books/return-book", returnBook);
  router.get("/books/history", getHistory);
  router.post("/books/save", saveBook);
  router.get("/books/saved", getSavedBooks);
  return router;
};

export default createBooksRoutes();
