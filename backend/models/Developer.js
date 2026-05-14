import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], 
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "developer"],
      default: "developer",  
    },
  },
  { timestamps: true }
);

const Developer = mongoose.model("Developer", developerSchema);

export default Developer;