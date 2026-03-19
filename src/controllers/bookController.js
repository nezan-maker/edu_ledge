import fs from "fs";
import path from "path";
import url from "url";
import { bookQuery } from "../config/db.js";
import { start } from "repl";
export const getBooks = (req, res) => {
  let name;
  const parsedUrl = url.parse(req.url, true);
  const pathParts = parsedUrl.pathname.split("/");
  if (pathParts[1] == "books" && pathParts[2]) {
    name = pathParts[2];
  }
  const result = bookQuery(name);
  if (!result) {
    let message = { message: "Internal server error" };
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(message));
  }
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "inline",
  });
  const stream = fs.createReadStream(result);
  stream.pipe(res);
};
