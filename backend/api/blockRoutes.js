import express from "express"; 
import User from "../models/User.js";
import BlockedUsers from "../models/BlockedUsers.js";
import jwt from "jsonwebtoken"; 
import Onboarding from "../models/Onboarding.js";

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};

/**
 * Block a user
 */
router.put("/:userId/block/:id", async(req, res) => {
    try {
        console.log('Block request received:', { userId: req.params.userId, targetId: req.params.id });
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded);
        
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { userId, id } = req.params;

        // Check if users exist
        const [blocker, blocked] = await Promise.all([
            User.findById(decoded),
            User.findById(id)
        ]);

        console.log('Found users:', { blocker: !!blocker, blocked: !!blocked });

        if (!blocker || !blocked) {
            return res.status(404).json({ message: "One or both users not found" });
        }

        // Check if already blocked
        const existingBlock = await BlockedUsers.findOne({ 
            blockerId: decoded, 
            blockedId: id 
        });

        console.log('Existing block:', existingBlock);

        if (existingBlock) {
            return res.status(400).json({ message: "User is already blocked" });
        }

        // Create new block relationship
        const block = new BlockedUsers({
            blockerId: decoded,
            blockedId: id
        });
        
        await block.save();
        console.log('Block saved successfully');

        return res.status(200).json({ message: "User blocked successfully" });
    } catch (error) {
        console.error('Error in block route:', error);
        return res.status(500).json({ 
            message: "Failed to block user",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

/**
 * Unblock a user
 */
router.put("/:userId/unblock/:id", async(req, res) => {
    try {
        console.log('Unblock request received:', { userId: req.params.userId, targetId: req.params.id });
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded);
        
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { id } = req.params;

        // Remove block relationship
        const result = await BlockedUsers.findOneAndDelete({ 
            blockerId: decoded, 
            blockedId: id 
        });
        
        console.log('Unblock result:', result);

        if (!result) {
            return res.status(404).json({ message: "Block relationship not found" });
        }

        return res.status(200).json({ message: "User unblocked successfully" });
    } catch (error) {
        console.error('Error in unblock route:', error);
        return res.status(500).json({ 
            message: "Failed to unblock user",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

/**
 * Check if a user is blocked
 */
router.get("/:userId/is-blocked/:id", async(req, res) => {
    try {
        console.log('Check block status request:', { userId: req.params.userId, targetId: req.params.id });
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded);
        
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { id } = req.params;
        const isBlocked = await BlockedUsers.exists({ 
            blockerId: decoded, 
            blockedId: id 
        });
        
        console.log('Block status:', isBlocked);

        return res.status(200).json({ isBlocked: !!isBlocked });
    } catch (error) {
        console.error('Error checking block status:', error);
        return res.status(500).json({ 
            message: "Failed to check block status",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

/**
 * Get all users blocked by a specific user
 */
router.get("/:userId/blocked-users", async(req, res) => {
    try {
        console.log('Get blocked users request:', { userId: req.params.userId });
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded);
        
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const blockedUsers = await BlockedUsers.find({ blockerId: decoded })
            .populate('blockedId', 'username email');
        
        // Fetch onboarding data for each blocked user
        const blockedUsersWithNames = await Promise.all(
            blockedUsers.map(async (block) => {
                const onboardingData = await Onboarding.findOne({ userId: block.blockedId._id });
                const blockObj = block.toObject();
                
                return {
                    ...blockObj,
                    blockedId: {
                        ...blockObj.blockedId,
                        firstName: onboardingData?.firstName || '',
                        lastName: onboardingData?.lastName || '',
                        fullName: onboardingData ? 
                            `${onboardingData.firstName} ${onboardingData.lastName}`.trim() : 
                            blockObj.blockedId.username
                    }
                };
            })
        );
        
        console.log('Found blocked users with names:', blockedUsersWithNames);
        return res.status(200).json(blockedUsersWithNames);
    } catch (error) {
        console.error('Error fetching blocked users:', error);
        return res.status(500).json({ 
            message: "Failed to fetch blocked users",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

/**
 * Check if a user is blocked by another user
 */
router.get("/:userId/is-blocked-by/:id", async(req, res) => {
    try {
        console.log('Check if blocked by user request:', { userId: req.params.userId, targetId: req.params.id });
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded);
        
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { id } = req.params;
        
        const isBlocked = await BlockedUsers.exists({ 
            blockerId: id,  
            blockedId: decoded  
        });
        
        console.log('Block status:', isBlocked);

        return res.status(200).json({ isBlocked: !!isBlocked });
    } catch (error) {
        console.error('Error checking block status:', error);
        return res.status(500).json({ 
            message: "Failed to check block status",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

export default router;