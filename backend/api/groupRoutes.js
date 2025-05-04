import express from "express"; 
import Group from "../models/Group.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"; 
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router(); 

/** 
 * Utility function to verify JWT token from request header
 * @param {Object} req - Expresses request object
 * @returns {Object | null} - Decoded token or null if invalid 
 */ 

/**
 * Earl - Description: Test - Get Groups to see all of them (debug) 
 * Access: Private (requires authetication)
 */

router.get('/test_get_groups', async(req,res) =>{
    try{
        const groups = await Group.find({});
        res.status(200).json(groups);
    }
    catch(error){
        console.error('Error fetching products:', error); 
        res.status(500).json({ message: 'Server error' });    
    }
})

/**
 * Saivishaal, Earl - Description: Creates a new hackathon group 
 * Access: Private (requires authetication)
 */

router.post('/create', async(req, res) => {
    try{
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        
        const {groupName, description, hackathon} = req.body; 

        if(!groupName || !description || !hackathon)
        {
            return res.status(403).json({message: "REQUIRED: Name, Description, Hackathon"}); 
        }

        const newGroup = new Group({
            name: groupName, 
            description: description, 
            owner: decoded.userId, // Set from decoded token
            members: [decoded.userId], // Owner is a member 
            skills: [], // Default is empty array 
            isPublic: false, // Default is not public
            hackathon: hackathon
        })

        // Step 5: Save the group to the database 

        await newGroup.save(); 

        return res.status(200).json({
            message: "Group created successfully",
            group: newGroup
          });


        // Step 6: Return success response with the created group 

    }catch(error){
        console.error("Error creating group:", error); 
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }

        return res.status(500).json({
            message: "Unable to create group", 
            error: error.message
        }); 
    }
}); 

/**
 * Earl - Description: Updates group details 
 * Access: Private(requires authentication and ownership)
 */

router.put('/:groupId/update/', async (req, res) =>{
    try {
        // Step 1: Verify the user's token 
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        
        // Step 2: Extract update fields from request body 
        const {name, description, skills, isPublic, groupType, maxCapacity, hackathon} = req.body;        

        // Step 3: Find the group by ID. Else return the message(Group not found) if group not found

        const group = await Group.findById(req.params.groupId); 
        if(!group)
        {
            return res.status(404).json({message: "Group not found"}); 
        }

        // Step 4: Check if the authticated user is the owner 
        if(group.owner.toString() !== decoded.userId)
            return res.status(403).json({message: "Only group owner can update group details."}); 


        // Step 5: Update fields if provided(name, description, skills, visibility) and then save the updates 
        if(name !== undefined) group.name = name; 
        if(description !== undefined) group.description = description; 
        if(skills !== undefined) group.skills = skills; 
        if(typeof isPublic == "boolean") group.isPublic = isPublic; 
        if(groupType !== undefined) group.groupType = groupType;
        if(hackathon !== undefined) group.hackathon = hackathon;
        if(maxCapacity !== undefined)
        {
            if(maxCapacity < group.members.length)
            {
                throw new Error("Max Capacity must be greater than or equal to current number of members in the group")
            }
            else
                group.maxCapacity = maxCapacity;
        }

        await group.save() // Saves the updated group

        // Step 6: Return with success response 
        return res.status(200).json({
            message: "Group updated successfully",
          });

    }catch(error){
        // Handle any errors that occur during updating 
        return res.status(500).json({
            message: "Failed to update group", 
            error: error.message
        }); 
    }
}); 

router.post('/:groupId/message/', async (req, res) =>{
    try {
        // Step 1: Verify the user's token 
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        
        // Step 2: Extract update fields from request body 
        const {message} = req.body;        

        // Step 3: Find the group by ID. Else return the message(Group not found) if group not found
        const group = await Group.findById(req.params.groupId); 
        if(!group)
        {
            return res.status(404).json({message: "Group not found"}); 
        }

        // Step 4: Add message to the list
        group.messages.push(message);

        await group.save() // Saves the updated group

        // Step 5: Return with success response 
        return res.status(200).json({
            message: "Message sent successfully",
          });

    }catch(error){
        return res.status(500).json({
            message: "Failed to message group", 
            error: error.message
        }); 
    }
}); 

router.get('/:groupId/messages', async (req, res) => {
    const { groupId } = req.params;
    try {
        // Step 1: Verify the user's token 
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
                
        const group = await Group.findById(groupId).populate('messages');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group.messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:groupId/clear_messages/', async (req, res) =>{
    try {
        // Step 1: Verify the user's token 
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        
        // Step 2: Extract update fields from request body 
        const {message} = req.body;        

        // Step 3: Find the group by ID. Else return the message(Group not found) if group not found
        const group = await Group.findById(req.params.groupId); 
        if(!group)
        {
            return res.status(404).json({message: "Group not found"}); 
        }

        // Step 4: Check if the authticated user is the owner 
        if(group.owner.toString() !== decoded.userId)
            return res.status(403).json({message: "Only group owner can clear messages."}); 


        // Step 5: Add message to the list
        group.messages = [];
        await group.save() // Saves the updated group

        // Step 6: Return with success response 
        return res.status(200).json({
            message: "Messages cleared successfully",
          });

    }catch(error){
        return res.status(500).json({
            message: "Failed to update group", 
            error: error.message
        }); 
    }
}); 

/**
 * Helper Functions for all delete related items
 */
const removeMember = async (groupId, targetId, userId) => {
    const group = await Group.findById(groupId); 
    if(!group) throw new Error("Group Not Found");

    const c_user = await User.findById(userId); 
    if(!c_user) throw new Error("Current user not found");

    const exists = await User.findById(targetId);
    if(!exists) throw new Error("Target user not found");
    
    //Check if target member part of group
    const member = group.members.find(m => m.toString() === targetId);
    if(!member) throw new Error("Target user not in Group");
    

    //If user removing someone is either the current group owner, or if user is the target (ie removing themselves)
    if((c_user._id.toString() === group.owner.toString() || userId === targetId))
    {
        if(member.toString() === group.owner.toString())
        {
            throw new Error("Transfer Leadership First");
        }
        else
        {
            group.members = group.members.filter(m => m.toString() !== targetId)
            await group.save();

            return({message: "Successfully removed member"});
        }
    }
    else
        throw new Error("User lacks permissions to remove target user");
    throw new Error("Unknown Error");
}
const deleteGroup = async (groupId, userId) =>
{
    const c_user = await User.findById(userId); 
    if(!c_user) throw new Error("Current user not found");

    const group = await Group.findById(groupId);
    if(!group) throw new Error("Group not found");
    
    if(group.owner.toString() !== userId)
        throw new Error("Current user is not Group Owner");

    await Group.findByIdAndDelete(groupId);

    return { message: 'Group deleted' };
}

/**
 * Earl: Pull all join requests, whether pending or not
 */
router.get('/:groupId/requests', async (req, res) => {
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized - Invalid or missing token' });
        }

        const group = await Group.findById(req.params.groupId)
            .populate('joinRequests.user', 'username');

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== decoded.userId) {
            return res.status(403).json({ message: 'Only the group owner can view join requests' });
        }

        return res.status(200).json(group.joinRequests);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch join requests',
            error: error.message
        });
    }
});


/**
 * Earl - Description: Removes a member from the group 
 * Access: Private(requires authetication and either ownership or self-removal)
 */
router.delete('/:groupId/remove_member', async (req, res) => {
    try{
        // Step 1: Verify the user's token 
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        const {memberId} = req.body;

        await removeMember(req.params.groupId, memberId, decoded.userId);
                
        return res.status(200).json({
            message: "Member removed successfully",
          });

    }catch(error){

        return res.status(500).json({
            message: "Unable to remove member", 
            error: error.message
        }); 
    }
}); 
/**
 * Earl - Description: Delete groups
 * Access: Private(requires authetication and either ownership or self-removal)
 */
router.delete('/:groupId/delete_group', async (req, res) => {
    try{
        // Step 1: Verify the user's token 
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }

        await deleteGroup(req.params.groupId, decoded.userId);
            
        return res.status(200).json({
            message: "Group deleted successfully"
            });

        }catch(error){
            return res.status(500).json({
                message: "Unable to delete group", 
                error: error.message
            }); 
        }
}); 

/**
 * 
 * Earl - Clear all group members: For testing
 */
router.delete('/clear', async (req, res) => {
    try{

        const result = await Group.deleteMany({});
        return res.status(200).json({
            message: '${result.deletedCount} groups deleted successfully.'
        });

    }catch{
        return res.status(500).json({
            message: "Groups could not be cleared successfully", 
            error: error.message
        }); 
    }
}); 



/**
 * Earl - Description: Transfers group ownership to another member
 * Access: Private (requires authentication and ownership)
 */
router.put('/:groupId/transfer_ownership', async (req, res) => {
    try {
        const {targetId} = req.body;
        const group = await Group.findById(req.params.groupId); 
        if(!group) throw new Error("Group Not Found");
    
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
    
        if(decoded.userId.toString() !== group.owner.toString())
            throw new Error("To transfer leadership, you must be the owner");

        if(targetId.toString() === decoded.userId.toString())
            throw new Error("Transfer targetting the same user (could be owner)")

        const exists = await User.findById(targetId);
        if(!exists) throw new Error("Target user not found");
        
        //Check if target member part of group
        const member = group.members.find(m => m.toString() === targetId);
        if(!member) throw new Error("Target user not in Group");
        
        group.owner = member._id;
        await group.save();

        return res.status(200).json({
            message: "Ownership transferred sucessfully"
            });

    }catch(error){
        
        return res.status(500).json({
            message: "Ownership couldn't be transferred", 
            error: error.message
        }); 
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
            owner,        // Filter by owner ID
            isPublic,
            hackathon
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
        if(hackathon){
            filter.hackathon = hackathon;
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

        if(isPublic)
        {
            filter.isPublic = isPublic === 'true';
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

/**
 * Rajit - Description: Get group details
 * Access: Public
 */
router.get('/:id/group_details', async (req, res) => {
    try {
        // Step 1: Find group by ID and populate owner and members
        const group = await Group.findById(req.params.id)
            .populate('owner')
            .populate('members')
            .populate('hackathon');

        // Step 2: Return group details or error if not found
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: "Error fetching group details", error: error.message });
    }
});

/**
 * Earl - Grab all groups the user is a member of
 * 
 */
router.get('/my_groups', async (req, res) => {
    try {
        const decoded = verifyToken(req); 
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }

        const groups = await Group.find({ members: decoded.userId })
            .select('name _id owner')
            .populate('owner', '_id username');

        res.status(200).json(groups);
    } catch (error) {
        console.error("Error fetching user's groups:", error);
        res.status(500).json({ message: "Failed to fetch groups", error: error.message });
    }
});

/**
 * Rajit, Earl - Description: Request to join a group
 * Access: Private (requires authentication)
 */
router.post('/:groupId/request_join/', async (req, res) => {
    try {
        // Step 1: Verify the user's token
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        // Step 2: Find the group by ID
        const group = await Group.findById(req.params.groupId);
        if (!group) 
            return res.status(404).json({ message: "Group not found" });
        
        // Step 3: Check if user is already a member or has a pending request
        const c_member = await group.members.find(m => m._id.toString() === decoded.userId.toString());
        if(c_member) throw new Error("Target user is already in group");

        const existingRequest = group.joinRequests.find(
            request => request.user.toString() === decoded.userId.toString() && request.status === 'pending'
        );
        if (existingRequest) {
            return res.status(400).json({ message: "You already have a pending request to join this group" });
        }
        // Step 4: If group is open, add user directly (if capacity allows)
        if (group.groupType === 'open') {
            if (group.members.length >= group.maxCapacity) {
                return res.status(400).json({ message: "Group is at maximum capacity" });
            }
            
            group.members.push(decoded.userId);
            await group.save();
            
            // Step 6: Save group and return response
            return res.status(200).json({ 
                message: "Successfully joined the group",
                group: group
            });
        }

        // Step 5: If invite-only, add a join request
        group.joinRequests.push({
            user: decoded.userId,
            message: req.body.message || ''
        });

        await group.save();
        // Step 6: Save group and return response
        res.status(200).json({ 
            message: "Join request submitted successfully",
            group: group
        });
    } catch (error) {
        console.error("JOIN REQUEST ERROR:", error); // this will show the real problem
        res.status(500).json({ message: "Error processing join request", error: error.message });
    }
});

/**
 * Rajit, Earl - Description: Handle join request (approve/reject)
 * Access: Private (requires group owner authentication)
 */
router.put('/:groupId/request_manage/', async (req, res) => {
    try {
        // Step 1: Verify the user's token
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        const { action, requestId } = req.body;

        if (!['approve', 'reject', 'delete'].includes(action)) {
            return res.status(400).json({ message: "Invalid action" });
        }

        // Step 3: Validate group and request existence
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        
        console.log('Decoded User ID:', decoded.userId);
        console.log('Group Owner:', group.owner.toString());

        /// Step 4: Check group owner authorization
        if (group.owner.toString() !== decoded.userId.toString()) {
            return res.status(403).json({ message: "Only the group owner can handle join requests" });
        }

        // Step 5: Handle approval (check capacity, add member) or rejection
        const request = group.joinRequests.id(requestId);
        if (!request) {
            return res.status(404).json({ message: "Join request not found" });
        }

        //Step 6: Ensure If user already in group, delete the request, avoid redudnacy
        const c_member = await group.members.find(m => m.toString() === requestId.toString());
        if(c_member) {
            group.joinRequests = group.joinRequests.filter(r => r._id.toString() !== requestId.toString());
            await group.save();
            throw new Error("Target user is already in group, deleting request");   
        }

        //Step 7: Delete takes precedence over checking if pendingh
        if(action === 'delete')
        {
            group.joinRequests = group.joinRequests.filter(r => r._id.toString() !== requestId.toString());
            await group.save();

            return res.status(200).json({message: "request successfully deleted"});
        }

        // Step 8: Ensure the request is still pending to approve or reject it
        if (request.status !== 'pending') {
            return res.status(400).json({ message: "This request has already been handled" });
        }

        if (action === 'approve') {
            if (group.members.length >= group.maxCapacity) {
                return res.status(400).json({ message: "Group is at maximum capacity" });
            }
            
            group.members.push(request.user);
        }

        request.status = action === 'approve' ? 'approved' : 'rejected';

        await group.save();

        // Step 7: Return success response
        res.status(200).json({ 
            message: `Join request ${action}d successfully`,
            group: group
        });
    } catch (error) {
        res.status(500).json({ message: "Error handling join request", error: error.message });
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


export default router; 





