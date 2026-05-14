import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],  
      required: true,
    },
    estimatedBudget: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in progress", "completed"],  
      default: "open",  
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,  
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;