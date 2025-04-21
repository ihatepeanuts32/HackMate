import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

/**
 * Earl - Debug method for testing to list all user
 */
router.get('/getUsers', async (req,res) =>
{
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch(error){
        console.error('Error fetching products:', error); // Logs the error to the server console
        res.status(500).json({ message: 'Server error' }); // Sends a response to the client    
    }
})

/**
 * Rajit Get current user's information
 */
router.get('/me', async (req, res) => {
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(401).json({ message: "Authentication failed", error: error.message });
    }
});
/**
 * Earl - Description: Search a user by username
 */

// GET /api/users/by-username/:username
router.get('/by-username/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Rajit - Description: Search for users
 * Access: Public
 */
router.get('/search', async (req, res) => {
    try {
        // Step 1: Extract query and skills from request query params
        const { query, skills } = req.query;
        // Step 2: Build search query based on filters        
        const searchQuery = {
            isPublic: true
        };
        if (query) {
            searchQuery.$or = [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } }
            ];
        }
        
        if (skills) {
            searchQuery.skills = { $in: skills.split(',') };
        }
        // Step 3: Perform MongoDB query with filters, limit results, and select relevant fields
        const users = await User.find(searchQuery)
            .select('firstName lastName username skills profilePicture')
            .limit(20);
        
        // Step 4: Return the result or handle errors    
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error searching users", error: error.message });
    }
});

/**
 * Rajit - Description: Get user profile
 * Access: Public for public profiles, Private for private profiles
 */
router.get('/:id', async (req, res) => {
    try {
        // Step 1: Find user by ID and populate group details
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('groups', 'name description');

        // Step 2: Check if user exists, return error if not 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Step 3: If profile is private, verify user identity via token
        if (!user.isPublic) {
            const decoded = verifyToken(req);
            if (!decoded || decoded.userId !== user._id.toString()) {
                return res.status(403).json({ message: "This profile is private" });
            }
        }
        
        // Step 4: Return user profile (excluding password)   
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
});

/**
 * Rajit - Description: Update user profile
 * Access: Private (requires authentication)
 */
router.put('/profile', async (req, res) => {
    try {
        // Step 1: Verify token and get user ID
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid or missing token" });
        }
        
        // Step 2: Extract allowed fields from request body
        const allowedUpdates = [
            'bio',
            'skills',
            'github',
            'linkedin',
            'portfolio',
            'isPublic',
            'profilePicture'
        ];

        const updates = Object.keys(req.body)
            .filter(key => allowedUpdates.includes(key))
            .reduce((obj, key) => {
                obj[key] = req.body[key];
                return obj;
            }, {});
        
        // Step 3: Update user document and return updated profile
        const user = await User.findByIdAndUpdate(
            decoded.userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});

export default router;
