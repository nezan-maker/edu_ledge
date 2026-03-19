import { signup, login } from "./userControllers.js";
const controller = async (req, res) => {
  if (req.url === "/signup" && req.method === "POST") {
    signup(req, res);
  } else if (req.url === "/login" && req.method === "POST") {
    login(req, res);
  }
};
export default controller;
