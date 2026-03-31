import express from "express";
import multer from "multer";
import { getBooks, registerBook } from "../controllers/bookController.js";
import { authMiddleWare } from "../middleware/auth/authMiddleware.js";
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
  router.post("/books/borrow-book", authMiddleWare, borrowBook);
  router.post("/books/return-book", authMiddleWare, returnBook);
  router.get("/books/history", authMiddleWare, getHistory);
  router.post("/books/save", authMiddleWare, saveBook);
  router.get("/books/saved", authMiddleWare, getSavedBooks);
  return router;
};

export default createBooksRoutes();
