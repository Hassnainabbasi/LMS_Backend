import express from "express";
import BooksModel from "../models/Book.js";
import verifyToken from "../middleware/verify-token.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allBooks = await BooksModel.find().populate("userId");
    res.status(200).json({ message: "All Books data", data: allBooks });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;

  if (!req?.user?._id) {
    return res
      .status(201)
      .json({ message: "You are not authorized", books: [] });
  }

  const userId = req?.user?._id;

  try {
    const newBook = new BooksModel({
      name,
      userId,
    });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/my-books", verifyToken, async (req, res) => {
  try {
    if (!req?.user?._id) {
      return res
        .status(201)
        .json({ message: "You are not authorized", books: [] });
    }
    const books = await BooksModel.find({ userId: req?.user?._id });
    res.status(201).json({ message: "your books", books: books });
  } catch (error) {
    res.status(500).json({ message: error?.message, status: error?.status });
  }
});

export default router;
