import mongoose, { Schema } from "mongoose";

//Naomi - Shcema for messages
const MessageSchema = new mongoose.Schema({
    roomId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: {
            type: String
        }
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("Messages", MessageSchema);