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
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET);
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

/**
 * Rajit - Description: Allows a user to join a hackathon group
 * Access: Private (requires authentication)
 */
router.post('/:id/join', async (req, res) => {
    try {
        // Step 1: Verify the user's token
        // Step 2: Find the group by ID
        // Step 3: Check if user is already a member
        // Step 4: Add user to group members
        // Step 5: Save group and return success response
    } catch (error) {
        res.status(500).json({ message: "Error joining group", error: error.message });
    }
});

/**
 * Rajit - Description: Search for groups
 * Access: Public
 */
router.get('/search', async (req, res) => {
    try {
        // Step 1: Extract query, skills, and groupType from request query params
        // Step 2: Build MongoDB search filter
        // Step 3: Query groups with filters, populate relevant fields
        // Step 4: Return results or handle error
    } catch (error) {
        res.status(500).json({ message: "Error searching groups", error: error.message });
    }
});

/**
 * Rajit - Description: Get group details
 * Access: Public
 */
router.get('/:id', async (req, res) => {
    try {
        // Step 1: Find group by ID and populate owner and members
        // Step 2: Return group details or error if not found
    } catch (error) {
        res.status(500).json({ message: "Error fetching group details", error: error.message });
    }
});

/**
 * Rajit - Description: Request to join a group
 * Access: Private (requires authentication)
 */
router.post('/:id/request-join', async (req, res) => {
    try {
        // Step 1: Verify the user's token
        // Step 2: Find the group by ID
        // Step 3: Check if user is already a member or has a pending request
        // Step 4: If group is open, add user directly (if capacity allows)
        // Step 5: If invite-only, add a join request
        // Step 6: Save group and return response
    } catch (error) {
        res.status(500).json({ message: "Error processing join request", error: error.message });
    }
});

/**
 * Rajit - Description: Handle join request (approve/reject)
 * Access: Private (requires group owner authentication)
 */
router.post('/:id/join-requests/:requestId', async (req, res) => {
    try {
        // Step 1: Verify the user's token
        // Step 2: Extract action from request body
        // Step 3: Validate group and request existence
        // Step 4: Check group owner authorization
        // Step 5: Handle approval (check capacity, add member) or rejection
        // Step 6: Update request status and save group
        // Step 7: Return success response
    } catch (error) {
        res.status(500).json({ message: "Error handling join request", error: error.message });
    }
});

// Export the router for use in other files
export default router; 





