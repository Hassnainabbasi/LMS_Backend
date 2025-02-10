import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema(
  {
    name: String,
    rollno: String,
    email: String,
    phoneno: String,
    status: String,
    created: String,
    lastLogin: String,
  },
  { timestamps: true }
);

const StudentsModel = mongoose.model("students", studentsSchema);

export default StudentsModel;
