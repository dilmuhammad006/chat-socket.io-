import { config } from "dotenv";
import mongoose from "mongoose";

config();
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅");
  } catch (error) {
    console.log("❌");
    console.log(error.message);
  }
};
