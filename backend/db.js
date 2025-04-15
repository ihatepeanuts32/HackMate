import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//Naomi - the connectDB arrow function establishes a connection with the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    
        console.log("MongoDB Connected");
      } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
      }
}

export default connectDB;