import mongoose from "mongoose";

//Naomi - this following is the schema for obtaining user info during their registration
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
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
    // Profile information
    bio: {
        type: String,
        default: ''
    },
    skills: [{
        type: String
    }],
    github: {
        type: String,
        default: ''
    },
    linkedin: {
        type: String,
        default: ''
    },
    portfolio: {
        type: String,
        default: ''
    },
    // Profile visibility settings
    isPublic: {
        type: Boolean,
        default: true
    },
    // Groups the user is a member of
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    // Profile picture URL
    profilePicture: {
        type: String,
        default: ''
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)