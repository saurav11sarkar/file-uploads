import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const port = config.port;
const server = async () => {
  try {
    await mongoose.connect(config.dbUrl as string);
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error: any) {
    console.error("Failed to connect database", error);
    process.exit(1);
  }
};

server();
