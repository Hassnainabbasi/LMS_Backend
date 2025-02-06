import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchNo: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now, 
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "end"],
      default: "pending",
    },

  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
  },
  { timestamps: true }
);

batchSchema.pre("save", function(next) {
  if (this.status === "end" && !this.endDate) {
    this.endDate = new Date();
  }
  next();
});

const BatchModel = mongoose.model("Batch", batchSchema);

export default BatchModel;
