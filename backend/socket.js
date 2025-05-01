import { Server } from 'socket.io';
import Message from './models/Message.js';
import jwt from 'jsonwebtoken';
import BlockedUsers from './models/BlockedUsers.js';

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST']
    }
  });

  const onlineUsers = new Map();

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        next();
      } catch (err) {
        next(new Error('Authentication error'));
      }
    } else {
      next(); 
    }
  });

  io.on('connection', socket => {
    console.log('User connected:', socket.id);
    
    socket.on('user-connected', userId => {
      console.log('User registered:', userId);
      onlineUsers.set(userId, socket.id);
    });

    socket.on('private-message', async ({ sender, recipient, content }) => {
      try {
        const isBlocked = await BlockedUsers.findOne({
          blockerId: recipient,  
          blockedId: sender      
        });

        if (isBlocked) {
          console.log('Message blocked - sender is blocked by recipient:', { sender, recipient });
          socket.emit('message-blocked', {
            success: false,
            message: "Your message could not be delivered as you have been blocked by this user."
          });
          return;
        }

        const newMessage = new Message({ 
          sender, 
          recipient, 
          content,
          read: false
        });
        
        await newMessage.save();

        const recipientSocketId = onlineUsers.get(recipient);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('receive-message', newMessage);
        }
        
        socket.emit('message-sent', { 
          success: true, 
          message: newMessage 
        });
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('message-sent', { 
          success: false, 
          error: error.message 
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
}