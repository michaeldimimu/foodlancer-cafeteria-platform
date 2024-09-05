import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

async function dbConnect() {
  try {
    MONGODB_URI && mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Couldn't connect to MongoDB");
  }
}

export default dbConnect;
