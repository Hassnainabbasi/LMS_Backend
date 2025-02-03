import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    trainerName: {
      type: String,
      required: true,
    },
    trainerEmail: {
      type: String,
      required: true,
      unique: true, // Ensure unique email addresses
    },
    trainerPhone: {
      type: String,
    },
    trainerBio: {
      type: String,
    },
  },
  { timestamps: true }
);

const TrainerModel = mongoose.model("Trainer", trainerSchema);

export default TrainerModel;
