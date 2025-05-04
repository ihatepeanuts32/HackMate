import mongoose from "mongoose";

const OnboardingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  preferredRole: {
    type: String,
  },
  hackathonsAttended: {
    type: Number,
    default: 0,
    min: 0
  },
  college: {
    type: String,
  },
  technicalSkills: {
    type: [String],
  },
  desiredTeammateQualities: {
    type: [String],
  },
  profilePhoto: {
    type: String, 
    default: '/default-profile.png'
  },
  isPublic:{
    type:Boolean,
    default: false
  },
  year: {
    type: String,
    // enum: ['freshman', 'sophomore', 'junior', 'senior', 'other'],
    // default: 'other'
  }
},  { timestamps: true })

export default mongoose.model("Onboarding", OnboardingSchema);