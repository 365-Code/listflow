import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    status: {
      default: "pending",
      type: String,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.models.Todos || mongoose.model("Todos", todoSchema);

export default todoModel;
