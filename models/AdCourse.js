// models/Course.js

const { default: mongoose } = require("mongoose");


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
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer", 
      required: true,
    },
    courseSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section", // Assuming you have a Section model
      required: true,
    },
    courseBatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch", // Assuming you have a Batch model
      required: true,
    },
    courseImage: {
      type: String, // This will be the URL to the image
    },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;