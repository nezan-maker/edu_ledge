import { signup, login } from "./userControllers.js";
import { getBooks } from "./bookController.js";
const controller = async (req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    signup(req, res);
  } else if (req.url === "/login" && req.method === "POST") {
    login(req, res);
  } else if (req.url === "/books/:name" && req.method === "GET") {
    getBooks(req, res);
  }
};
export default controller;
