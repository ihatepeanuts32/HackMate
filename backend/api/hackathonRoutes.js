import express from "express"; 
import Hackathon from "../models/Hackathon";
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
 * Saivishaal - Description: Get all upcoming hackathon events 
 * Access: Public (no authentication required)
 */

router.get('/upcoming', async (req, res) => {
    try{
        // Step 1: Get current date 
        // Step 2: Find all hackathons with end dates in the future, sorted by start date
        // Step 3: Return hackathons as response 

    }catch(error){
        // Handle any errors that occur when getting all the upcoming hackathon events

    }
}); 

/** 
 * Saivishaal - Description - Get hackathon events near a specific location 
 * Access: Public (no authentication required)
 */

router.get('/nearby', async (req, res) => {
    try{
        // Step 1: Get location from query parameter 
        // Step 2: Validate location is provided 
        // Step 3: Perform location-based case-insensitive search 
        // Step 4: Filter only upcoming events
        // Step 5: Sort by start date 
        // Step 6: Return matching hackathons 

    }catch(error){
        // Handle any errors that occur when finding events near location 

    }
}); 

/** 
 * Saivishaal - Description - Get a specific hackathon by ID 
 * Access: Public (no authentication required)
 */

router.get('/:id', async (req, res) => {
    try{
        // Step 1: Fetch hackathon by ID 
        // Step 2: Check if hackathon exists 
        // Step 3: Return hackathon details 
    } catch(error){
        // Handle any errors that occur when fetching hackathon event using ID
    }
}); 

/** 
 * Saivishaal - Description - Creates a new hackathon event
 * Access: Private (requires authentication and admin privileges)
 */

router.post('/create', async(req, res) => {
    try{
        // Step 1: Verify the user's token 
        // Step 2: Extracts group details from request body 
        // Step 3: Validate required fields 
        // Step 4: Create new group with the authenticated user as a owner 
        // Step 5: Save the event to the database 
        // Step 6: Return success response when event is created 
    } catch(error){
        // Handles any errors that occur when creating a new hackathon event
    }
}); 

/** 
 * Saivishaal - Description - Update a hackathon event
 * Access: Private (requires authentication and admin privileges)
 */

router.put('/:id', async (req, res) => {
    try{
        // Step 1: Verify the user's token 
        // Step 2: Fetch the hackathon by ID 
        // Step 3: Check if the hackathon exists 
        // Step 4: Using a loop, we will need to scan throught updatable fields
        // Step 5: Save the updated hackathon to database 
        // Step 6: Return success response 

    } catch(error){
        // Handles any errors that occur when updating information in a hackathon event

    }
}); 

/** 
 * Saivishaal - Description - Delete a hackathon event
 * Access: Private (requires authentication and admin privileges)
 */

router.delete('/:id', async (req, res) => {
    try{
        // Step 1: Verify the user's token 
        // Step 2: Find the hackathon by ID 
        // Step 3: Check if the hackathon exists 
        // Step 4: Delete the hackathon from database 
        // Step 5: Return success response 

    }catch(error){
        // Handles any errors that occur when deleting a hackathon event

    }
}); 

