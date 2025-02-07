import mongoose from "mongoose";

const teachersSchema = new mongoose.Schema(
  {
    teachersName: {
      type: String,
      required: true,
    },
    teachersEmail: {
      type: String,
      required: true,
      unique: true, // Ensure unique email addresses
    },
    teachersPhone: {
      type: String,
      required: true,
    },
    teachersPassword: {
      type: String,
      required: true,
    },
    teachersBio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TeachersModel = mongoose.model("teachers", teachersSchema);

export default TeachersModel;
