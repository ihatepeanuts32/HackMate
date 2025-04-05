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
router.post("/:userID/report", async(req,res) =>
{
    try{
        //Step 1: Verify user token : UserID 
        //Step 2: Present choice for bug or report
        //Step 3: Run the respective async function below
        //Step 4: Update database with returned report instance
    }
    catch(error)
    {
        //Catch any errors that may come up
    }
});

const reportBug = async(req,res) =>
{
    try{
        // Create an instance of a report model
        // Present and select options for bug report
        // Prompt user to enter description of bug if desired
        // Return report instance
    }
    catch(error)
    {
        //Catch any errors that may come up
    }
}
const reportUser = async(req,res) =>
{
    try{
        // Create an instance of a report model
        // Present and select options for player report
        // Prompt user to enter the ID of the user. Not allowed to progress until ID is entered
        // Prompt user to enter description of player report if desired
        // Return report instance
    }
    catch(error)
    {
        //Catch any errors that may come up
    }
}
