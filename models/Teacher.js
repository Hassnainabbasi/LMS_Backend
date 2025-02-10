import mongoose from "mongoose";

const teachersSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    teacherEmail: {
      type: String,
      required: true,
      // unique: true, 
    },
    teacherPhone: {
      type: String,
      required: true,
    },
    teacherPassword: {
      type: String,
      required: true,
    },
    teacherBio: {
      type: String,
      required: true,
    },
    teacherImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TeachersModel = mongoose.model("teachers", teachersSchema);

export default TeachersModel;
