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
        if(userID = verifyToken(token)) //send token for verification, errors if failed to verify
        {
            const existingUser = await User.findOne({ id });

            if (!existingUser) {
                return res.status(400).json({ message: "User doesnt exist"});
            }
            if(!isBlocked(userID, id))
                insertUser(userID, id);
        }
        else    
            return res.status(500).json({ message: "userID didnt match token" });
    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
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
        if(userID = verifyToken(token)) //send token for verification, errors if failed to verify
        {
            const existingUser = await User.findOne({ id });

            if (!existingUser) {
                return res.status(400).json({ message: "User doesnt exist"});
            }
            if(isBlocked(userID, id))
                unblockUser(userID, id);
        }
        else    
            return res.status(500).json({ message: "userID didnt match token" });

    }
    catch(error)
    {
        return res.status(500).json({ message: "error.message" });
    }
}); 

/**
 * 
 *  Earl - Description: Returns if user is blocked. Used for graphics and will be called in every function for adding friend/group/chat
 * Access: Private (requires authentication of user before initiating)
 * 
 */

async function isBlocked(currentUserId, blockedUserId) {
    try{
        const user = await User.findById(currentUserId);
        if (user.blocked.includes(blockedUserId)) {
            return true; // The user is already blocked
        }
        return false; // The user is not blocked
    }
    catch(error)
    {
        return res.status(500).json({ message: "error.message" });
    }
}

async function insertUser(currentUserId, blockedUserId) {
    try {
        const result = await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { blocked: blockedUserId }
        });
        return result;
    } catch (error) {
        console.error('Error unblocking user:', error);
        throw error; 
    }
}

async function unblockUser(currentUserId, blockedUserId) {
    try {
        const result = await User.findByIdAndUpdate(currentUserId, {
            $pull: { blocked: blockedUserId }
        });
        return result;
    } catch (error) {
        console.error('Error unblocking user:', error);
        throw error; 
    }
}