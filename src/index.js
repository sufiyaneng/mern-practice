import {app} from './app.js';
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})


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