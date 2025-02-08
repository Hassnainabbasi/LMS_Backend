import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure unique email addresses
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TrainersModel = mongoose.model("Trainer", trainerSchema);

export default TrainersModel;
