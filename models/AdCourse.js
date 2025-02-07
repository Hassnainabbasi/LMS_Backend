import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    courseImage : {
      type: String,
      required: true
    },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },  
    teachers: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers', required: true },
  },
  { timestamps: true }
);



const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;