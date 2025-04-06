import mongoose from "mongoose";

//Saivishaal - Schema for viewing hackathon events 
const HackathonSchema = new mongoose.Schema({
    //Hackathon name - required field 

    name: {
        type: String, 
        required: true
    }, 

    //Location of the hackathon 

    location:{
        type: String, 
        required: true
    }, 

    // Whether the hackathon is free to attend
    
    isFree: {
        type: Boolean,
        default: false
    },

    // Prize details

    prize: {
        type: String,
        default: "No prize information available"
    },

    // Start date of the hackathon

    startDate: {
        type: Date,
        required: true
    },

    // End date of the hackathon

    endDate: {
        type: Date,
        required: true
    },

    // Image URL for the hackathon (college/location)

    imageUrl: {
        type: String,
        default: "/default-hackathon.jpg"
    },

    // Tags/categories for the hackathon

    tags: [{
        type: String
    }],

    // Description of the hackathon

    description: {
        type: String,
        required: true
    },

    // Organizer information

    organizer: {
        type: String,
        required: true
    },

    // Maximum number of participants

    maxParticipants: {
        type: Number,
        default: 0
    },

    // Current number of registered participants

    currentParticipants: {
        type: Number,
        default: 0
    },

    // Registration deadline

    registrationDeadline: {
        type: Date
    },

    // Creation timestamp - automatically set when document is created

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }) // Adds createdAt and updatedAt timestamps automatically

// Export the model for use in other files
export default mongoose.model("Hackathon", HackathonSchema)

