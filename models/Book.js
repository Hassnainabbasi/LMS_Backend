import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      required: true,
      ref: "Section",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const BooksModel = mongoose.model("Books", bookSchema);

export default BooksModel;
