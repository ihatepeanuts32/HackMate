import express from "express"
import connectDB from "./db.js"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./api/authRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',//or http://localhost:5173
    credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5173, () => 
    console.log(`Server running on port ${process.env.PORT || 5173}`)
  );