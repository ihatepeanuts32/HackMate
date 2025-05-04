import express from "express";
import Group from "../models/Group.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Report from "../models/Report.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * 
 *  Earl - Description: Allows a user to report either a bug or person
 * Access: Private (requires authentication of user before initiating)
 * 
 */
router.post("/:username/report", async(req,res) =>
{
    try{
        verifyToken(token); //send token for verification, errors if failed to verify
        //Step 2: Present choice for bug or report - Requires Integration with Front End
        const { option } = req.body;
        const newReport = new Report();
        //Step 3: Run the respective async function below
        if(option == "Bug")
        {
            newReport = await reportBug();
        }
        else
        {
            newReport = await reportUser();
        }

        //Step 4: Update database with returned report instance
        await newReport.save();
    }
    catch(error)
    {
        return res.status(500).json({ message: "error.message" });
    }
});

const reportBug = async(req,res) =>
{
    try{
        //awaits user response then returns it
        const { ReportOption, ReportUsername, ReporterMessage } = req.body;

        const newReport = new User({
            ReportType : "Bug",
            ReportOption,
            TargetUser : null, 
            ReportUsername,
            ReporterMessage
        });

        return newReport;
    }
    catch(error)
    {
        return res.status(500).json({ message: "error.message" });
    }
}
const reportUser = async(req,res) =>
{
    try{
        //awaits user response then returns it
        const { ReportOption, TargetUser, ReportUsername, ReporterMessage } = req.body;

        const newReport = new User({
            ReportType : "User",
            ReportOption,
            TargetUser, 
            ReportUsername,
            ReporterMessage
        });

        return newReport;
    }
    catch(error)
    {
        return res.status(500).json({ message: "error.message" });
    }
}

/**
 * Route: GET /api/reports/test
 * Description: Get all submitted reports (test route)
 * Access: Public
 */
router.get("/test", async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ 
            message: "Error fetching reports",
            error: error.message 
        });
    }
});

/**
 * Route: POST /api/reports/bug
 * Description: Submit a bug report
 * Access: Public
 */
router.post("/bug", async (req, res) => {
    try {
        const { fullName, email, subject, description } = req.body;

        // Validate input
        if (!fullName || !email || !subject || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new report
        const newReport = new Report({
            fullName,
            email,
            subject,
            description
        });

        // Save report
        await newReport.save();

        res.status(201).json({ 
            message: "Bug report submitted successfully",
            report: newReport
        });
    } catch (error) {
        console.error('Error submitting bug report:', error);
        res.status(500).json({ 
            message: "Error submitting bug report",
            error: error.message 
        });
    }
});

/**
 * Route: GET /api/reports
 * Description: Get all reports (admin only)
 * Access: Private/Admin
 */
router.get("/", auth, async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ 
            message: "Error fetching reports",
            error: error.message 
        });
    }
});

/**
 * Route: GET /api/reports/bug 
 * Description: Get all bug reports (or all reports, to match /test)
 * Access: Public
 * THIS LINK WILL BE SHOWN IN THE INSPECT PAGE AND MIGHT BE USED DURING DEMO
 */
router.get("/bug", async (req, res) => {
    try {

        // If you want to match /test and show ALL reports:
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error('Error fetching bug reports:', error);
        res.status(500).json({ 
            message: "Error fetching bug reports",
            error: error.message 
        });
    }
});

export default router;
