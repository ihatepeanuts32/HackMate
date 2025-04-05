import mongoose from "mongoose";

//Earl - this following is the schema for creating a report for the system
const ReportSchema = new mongoose.Schema({
    ReportType: {
        type: String,
        required: true
    },
    ReportOption: {
        type: String,
        required: true
    },
    TargetUser: {
        type: String,
        required: false,
        unique: true
    },
    ReporterUsername: {
        type: String,
        required: true,
        unique: true
    },
    ReporterMessage: {
        type: String,
        required: false,
        unique: true
    }
}, { timestamps: true })

export default mongoose.model("Report", ReportSchema)