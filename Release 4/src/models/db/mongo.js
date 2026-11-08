import mongoose from "mongoose";

export async function connectMongo() {
  const dbUrl = process.env.MONGO_URL || "mongodb://localhost/coffee-placemarks";

  console.log("Connecting to MongoDB:", dbUrl);

  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;   // important: this makes the error visible
  }
}


