import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * Utility function to verify JWT token from request header
 */
const verifyToken = (req) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(error) {
        return null;
    }
};

/**
 * Rajit - Description: Search for users
 * Access: Public
 */
router.get('/search', async (req, res) => {
    try {
        // Step 1: Extract query and skills from request query params
        // Step 2: Build search query based on filters
        // Step 3: Perform MongoDB query with filters, limit results, and select relevant fields
        // Step 4: Return the result or handle errors
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
        // Step 2: Check if user exists, return error if not
        // Step 3: If profile is private, verify user identity via token
        // Step 4: Return user profile (excluding password)
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
        // Step 2: Extract allowed fields from request body
        // Step 3: Update user document and return updated profile
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});

export default router;
