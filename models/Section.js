import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    sectionTiming: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    teachers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teachers",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "ongoing", "merged", "finished"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const SectionModel = mongoose.model("Section", sectionSchema);

export default SectionModel;
