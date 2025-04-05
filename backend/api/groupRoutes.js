import express from "express"; 
import Group from "../models/Group.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"; 

const router = express.Router(); 

/** 
 * Utility function to verify JWT token from request header
 * @param {Object} req - Expresses request object
 * @returns {Object | null} - Decoded token or null if invalid 
 */ 

const verifyToken = (req) => {
    try {

    } catch(error){
        return null; 
    }
}; 

/**
 * Saivishaal - Description: Creates a new hackathon group 
 * Access: Private (requires authetication)
 */

router.post('/create', async(req, res) => {

    try{
        // Step 1: Verify the user's token 
        // Step 2: Extract group details from request body 
        // Step 3: Validate required fields 
        // Step 4: Create new group with the authenticated user as owner 
        // Step 5: Save the group to the database 
        // Step 6: Return success response with the created group 

    }catch(error){

        // Handle any errors that occur during group creation 

    }
}); 

/**
 * Saivishaal - Description: Updates group details 
 * Access: Private(requires authentication and ownership)
 */

router.put('/:id', async (req, res) =>{
    try {
        // Step 1: Verify the user's token 
        // Step 2: Extract update fields from request body 
        // Step 3: Find the group by ID. Else return the message(Group not found) if group not found
        // Step 4: Check if the authticated user is the owner 
        // Step 5: Update fields if provided(name, description, skills, visibility) and then save the updates 
        // Step 6: Return with success response 

    }catch{
        // Handle any errors that occur during updating 
    }
}); 

/**
 * Saivishaal - Description: Removes a member from the group 
 * Access: Private(requires authetication and either ownership or self-removal)
 */
router.delete('/:id/members/:userId', async (req, res) => {
    try{
        // Step 1: Verify the user's token 
        // Step 2: Find the group by ID. Return message if group not found
        // Step 3: Check if the authenticated user is the owner or the member being removed 
        // Step 4: Check if user is the owner and trying to remove themselves 
        // Step 5: Remove user from members array and save the update
        // Step 6: Return with success response 

    }catch{
        // Handles any errors that occur during removal 
    }
}); 

/**
 * Saivishaal - Description: Transfers group ownership to another member
 * Access: Private (requires authentication and ownership)
 */
router.post('/:id/transfer-ownership', async (req, res) => {
    try {
        // Step 1: Verify the user's token 
        // Step 2: Extract new owner ID from request body 
        // Step 3: Validate new owner ID 
        // Step 4: Find the group by ID. Return message if group cannot be found 
        // Step 5: Check if the authicated user is the current owner
        // Step 6: Check if the new owner is a member of the group 
        // Step 7: Update the owner 
        // Step 8: Save the updated group
        // Step 9: Return success response 

    }catch{
        // Handle any errors that occur during ownership transfer

    }
}); 

/**
 * Saivishaal - Description: Deletes a group 
 * Access: Private(requires authetication and ownership)
 */
router.delete('/:id', async (req, res) => {
    try{
        // Step 1: Verify the user's token 
        // Step 2: Find the group by ID. Return message if group not found
        // Step 3: Check if the authenticated user is the owner 
        // Step 4: Delete the group
        // Step 5: Return success response 
    }catch{
        // Handle any errors that occur during deletion 
    }
}); 

// Export the router for use in other files
export default router; 





