import express from "express"; 
import Group from "../models/Group.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"; 


/**
 * 
 *  Earl - Description: Blocks a user (initiated by clicking the unblock button on their profile)
 * Access: Private (requires authentication of user before initiating)
 * 
 */
router.put("/:userID/unblock/:id", async(req,res) =>
{
    try{
    //Step 1: Verify user token : UserID 
    //Step 2: Validate target user ID (from the URL) in the database : id
    //Step 3: Update database to remove target user from blocked list
    }
    catch(error)
    {
        //Catch any errors that may come up
    }
});

/**
 * 
 *  Earl - Description: Blocks a user (initiated by clicking the block button on their profile)
 * Access: Private (requires authentication of user before initiating)
 * 
 */

router.put("/:userID/block/:id", async(req, res) => {
    try{
        //Step 1: Verify user token : UserID 
        //Step 2: Validate target user ID (from the URL) in the database : id
        //Step 3a: Check if user has existing blocked table, if not, create one
        //Step 3b: Update database to add target user into blocked list
    }
    catch(error)
    {
        //Catch any errors that may come up
    }
}); 

/**
 * 
 *  Earl - Description: Returns if user is blocked. Used for graphics and will be called in every function for adding friend/group/chat
 * Access: Private (requires authentication of user before initiating)
 * 
 */

const getBlockStatus = async(req,res) =>
{
    try{
        //Step 1: Verify user token : UserID 
        //Step 2: Validate target user ID (from the URL) in the database : id
        //Step 3a: Check if user has existing blocked table, if not, return false
        //Step 3b: If so, check if target user ID is in the list
            //return true if true, return false if false
    }
    catch(error)
    {
        //Catch any errors that may come up
        //return false; 
    }
}
