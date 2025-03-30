import { Server } from "socket.io";
import Messages from "./models/Messages.js";

//Naomi - the connectSocket arrow function connects socket.io to the server in order to emit messages
const connectSoket = (server) => {

    const io = new Server(server, {
        cors: {
        origin: '*', 
        methods: ["GET", "POST"],
        },
    }); 

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("JoinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        })
    })

    io.on("sendMessage", async ({ roomId, sender, text }) => {
        try {
          const message = new Message({ roomId, sender, text });
          await message.save();
  
          io.to(roomId).emit("receiveMessage", message);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      })

    io.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    })

    return io;

}

export default connectSoket;