import mongoose from "mongoose";

export function connectMongo() {
  const dbUrl = "mongodb://127.0.0.1:27017/coffeeplacemark";

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error:", err);
  });
}
