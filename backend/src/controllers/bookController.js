import fs from "fs";
import path from "path";
import url from "url";
import { bookQuery } from "../config/db.js";
export const getBooks = async (req, res) => {
  const books = await bookQuery();
  console.log(books);
  res.status(200).json(JSON.stringify(books));
};
export const registerBook = () => {};
