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

        const {name, description, skills, isPublic} = req.body; 

        // Step 3: Validate required fields 

        if(!name || !description)
        {
            return res.status(400).json({message: "REQUIRED: Name and Description"}); 
        }

        // Step 4: Create new group with the authenticated user as owner 

        const newGroup = new Group({
            name, 
            description, 
            owner: decoded.userID, // Set from decoded token
            members: [decoded.userID], // Owner is a member 
            skills: skills || [], // Default is empty array 
            isPublic: isPublic !== undefined ? isPublic:true // Default is Public
        })

        // Step 5: Save the group to the database 

        await newGroup.save(); 

        // Step 6: Return success response with the created group 

    }catch(error){

        // Handle any errors that occur during group creation 
        return res.status(500).json({
            message: "Unable to create group", 
            error: error.message
        }); 
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

        const {name, description, skills, isPublic} = req.body;        

        // Step 3: Find the group by ID. Else return the message(Group not found) if group not found

        const group = await Group.findById(req.params.id); 
        if(!group)
        {
            return res.status(404).json({message: "Group not found"}); 
        }

        // Step 4: Check if the authticated user is the owner 

        if(group.owner.toString() !== decoded.userID)
        {
            return res.status(403).json({message: "Only group owner can update group details."}); 
        }

        // Step 5: Update fields if provided(name, description, skills, visibility) and then save the updates 

        if(name !== undefined) group.name = name; 
        if(description !== undefined) group.description = description; 
        if(skills !== undefined) group.skills = skills; 
        if(typeof isPublic == "boolean") group.isPublic = isPublic; 

        await group.save() // Saves the updated group

        // Step 6: Return with success response 

    }catch{
        // Handle any errors that occur during updating 
        return res.status(500).json({
            message: "Failed to update group", 
            error: error.message
        }); 
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
 * Dhakshin - Added Filter implementations to Search
 * Access: Public
 */
router.get('/search', async (req, res) => {
    try {
        const {
            query,       // Search by group name
            skills,      // Comma-separated list of required skills
            groupType,   // e.g., "public", "private"
            visibility,  // e.g., "visible", "hidden"
            minMembers,  // Minimum number of members
            maxMembers,  // Maximum number of members
            owner        // Filter by owner ID
        } = req.query;

        // Step 1: Build MongoDB query filter
        const filter = {};

        if (query) {
            filter.name = { $regex: query, $options: 'i' }; // case-insensitive search
        }

        if (skills) {
            const skillArray = skills.split(',').map(s => s.trim());
            filter.skills = { $all: skillArray }; // group must have *all* these skills
        }

        if (groupType) {
            filter.groupType = groupType;
        }

        if (visibility) {
            filter.visibility = visibility;
        }

        if (owner) {
            filter.owner = owner;
        }

        // Populate member count filters
        if (minMembers || maxMembers) {
            filter.$expr = {
                $and: []
            };

            if (minMembers) {
                filter.$expr.$and.push({ $gte: [{ $size: "$members" }, parseInt(minMembers)] });
            }

            if (maxMembers) {
                filter.$expr.$and.push({ $lte: [{ $size: "$members" }, parseInt(maxMembers)] });
            }
        }

        // Step 2: Query groups with the built filter
        const groups = await Group.find(filter)
            .populate('owner', 'name email') // populate owner details
            .populate('members', 'name email'); // populate member details

        // Step 3: Return results
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Error searching groups", error: error.message });
    }
});

/** Archive for Grouping
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
*/

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





