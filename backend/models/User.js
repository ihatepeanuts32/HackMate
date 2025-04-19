import mongoose from "mongoose";

//Naomi - this following is the schema for obtaining user info during their registration
const UserSchema = new mongoose.Schema({
    /*firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },*/
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blocked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

export default mongoose.model("User", UserSchema)