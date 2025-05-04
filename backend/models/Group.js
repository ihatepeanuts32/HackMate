import mongoose from "mongoose";

// Saivishaal - Schema for making hackathon groups 

const GroupSchema = new mongoose.Schema({
    // Group name - required field
    name: {
        type: String,
        required: true
    },
    // Group description - required field
    description: {
        type: String,
        required: true
    },
    // Group owner - references a User document
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Group members - array of User references
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Skills required/desired for the group
    skills: [{
        type: String
    }],
    // Visibility setting - determines if the group appears in public searches
    isPublic: {
        type: Boolean,
        default: false
    },
    // Group type - 'open' or 'invite-only'
    groupType: {
        type: String,
        enum: ['open', 'invite-only'],
        default: 'open'
    },
    // Maximum number of members allowed
    maxCapacity: {
        type: Number,
        default: 4
    },
    // Join requests for invite-only groups
    joinRequests: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        message: String,
        requestedAt: {
            type: Date,
            default: Date.now
        }
    }],
    messages:[{
        type:String
    }],
    hackathon:[{
        type:String,
        required: true
    }],
    // Creation timestamp - automatically set when document is created
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }) // Adds createdAt and updatedAt timestamps automatically

// Export the model for use in other files
export default mongoose.model("Group", GroupSchema)