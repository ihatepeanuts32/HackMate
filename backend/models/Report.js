import mongoose from "mongoose";

//Earl - this following is the schema for creating a report for the system
const ReportSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Report", ReportSchema)