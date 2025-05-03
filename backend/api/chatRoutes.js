import express from 'express';
import Message from '../models/Message.js';
import { verifyToken } from '../utils/verifyToken.js';
import User from '../models/User.js';
import BlockedUsers from '../models/BlockedUsers.js'

const router = express.Router();

router.get('/chats', async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const messages = await Message.find({
      $or: [{ sender: decoded.userId }, { recipient: decoded.userId }]
    });

    const userIds = new Set();
    messages.forEach(msg => {
      if (msg.sender.toString() !== decoded.userId) userIds.add(msg.sender.toString());
      if (msg.recipient.toString() !== decoded.userId) userIds.add(msg.recipient.toString());
    });

    const users = await User.find({ _id: { $in: Array.from(userIds) } }).select('username _id');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat list", error: error.message });
  }
});

router.get('/messages/:userId', async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });
    
    const { userId } = req.params;
    
    const messages = await Message.find({
      $or: [
        { sender: decoded.userId, recipient: userId },
        { sender: userId, recipient: decoded.userId }
      ]
    }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });
    
    const { recipient, content } = req.body;
    
    const isBlocked = await BlockedUsers.findOne({
      blockerId: recipient, 
      blockedId: decoded.userId  
    });
    
    if (isBlocked) {
      return res.status(403).json({ 
        message: "Cannot send message. You have been blocked by this user." 
      });
    }
    
    const newMessage = new Message({
      sender: decoded.userId,
      recipient,
      content
    });
    
    await newMessage.save();
    
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
});

// Delete chat route 

router.delete('/chat/:userId', async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });
    const { userId } = req.params;
    // Delete all messages between the logged-in user and the specified user
    await Message.deleteMany({
      $or: [
        { sender: decoded.userId, recipient: userId },
        { sender: userId, recipient: decoded.userId }
      ]
    });
    res.json({ success: true, message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete chat", error: error.message });
  }
});

export default router;
