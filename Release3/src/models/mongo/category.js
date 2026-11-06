import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Category = mongoose.model("Category", categorySchema);
