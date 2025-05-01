import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./api/authRoutes.js";
import groupRoutes from "./api/groupRoutes.js";
import userRoutes from "./api/userRoutes.js";
import hackathonRoutes from "./api/hackathonRoutes.js";
import eventBrite from "./api/eventBrite.js";
import reportRoutes from "./api/reportRoutes.js"
import blockRoutes from "./api/blockRoutes.js";
import { createServer } from 'http';
import setupSocket from './socket.js';
import chatRoutes from "./api/chatRoutes.js"

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);


app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api", eventBrite);
app.use("/api/chat", chatRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/block", blockRoutes);


setupSocket(server); 

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
