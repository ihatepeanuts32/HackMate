import express from "express"; 
import Group from "../models/Group.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"; 


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
