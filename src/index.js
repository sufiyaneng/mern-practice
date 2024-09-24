import mongoose from "mongoose";
import { DB_NAME } from "./constants/index.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB();


/*
(async () => {
  try {
    const connectToDb = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
    );
    console.log("Connected to MongoDB", connectToDb.connection.host);
  } catch (error) {
    console.log("Error ===> connection failed", error);
    process.exit(1);
  }
})();
*/