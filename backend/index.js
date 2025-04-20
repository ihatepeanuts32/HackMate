import express from "express"
import connectDB from "./db.js"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./api/authRoutes.js"
import messagesRoutes from "./api/messagesRoutes.js"
import groupRoutes from "./api/groupRoutes.js"
import userRoutes from "./api/userRoutes.js"
import hackathonRoutes from "./api/hackathonRoutes.js"
import eventBrite from "./api/eventBrite.js"
import reportRoutes from "./api/reportRoutes.js"
import { Server } from "socket.io"
import connectSoket from "./socket.js"
import { createServer } from 'http'


dotenv.config();
connectDB();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}))

connectSoket(server);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/groups", groupRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api", eventBrite);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))