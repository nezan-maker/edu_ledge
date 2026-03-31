import { v2 as cloudinary } from "cloudinary";
import { bookQuery } from "../config/db.js";
import crypto from "crypto";
export const getBooks = async (req, res) => {
  const books = await bookQuery();
  console.log(books);
  res.status(200).json(JSON.stringify(books));
};
export const registerBook = async (req, res) => {
  try {
    const { name, author, genre, description } = req.body;
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_API_NAME,
    });
    const uniqueN = crypto.randomInt(100000);
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: "File" + uniqueN,
        folder: "library-books",
      },
      (error, result) => {
        if (error) {
          console.log(error);
          return res.json({ message: "No file uploaded" });
        }
        res.json({ url: result.secure_url });
        
      },
    );
    stream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
