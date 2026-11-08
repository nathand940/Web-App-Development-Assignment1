import mongoose from "mongoose";

const placemarkSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  // Firebase image URLs
  images: [String],
});

export const Placemark = mongoose.model("Placemark", placemarkSchema);

