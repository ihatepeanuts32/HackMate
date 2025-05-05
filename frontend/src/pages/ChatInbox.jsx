import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ChatInbox.css';
import ChatBubble from '../components/ChatBubble';
import axios from 'axios';
import { io } from 'socket.io-client';
import DeleteChat from './Delete'; 
import { useBlockedUsers } from '../context/BlockedUsersContext';

const ChatInbox = () => {
    const location = useLocation();
    const initialSelectedUser = location.state?.selectedUser || null;
    
    const [chatUsers, setChatUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(initialSelectedUser);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [blockError, setBlockError] = useState('');
    
    const socketRef = useRef();
    const messagesEndRef = useRef(null);
    const { isUserBlocked } = useBlockedUsers();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        socketRef.current = io('http://localhost:3000', {
            auth: {
                token: token
            }
        }); 

        const userId = JSON.parse(atob(token.split('.')[1])).userId;
        socketRef.current.emit('user-connected', userId);

        fetchChatUsers(token);

        if (initialSelectedUser) {
            fetchMessages(initialSelectedUser.id);
        }

        const handleReceiveMessage = (message) => {
            if (selectedUser && message.sender === selectedUser.id) {
                setMessages(prev => [...prev, {
                    _id: message._id,
                    text: message.content,
                    fromSelf: false
                }]);
            } else {
                fetchChatUsers(token);
            }
        };
        
        const handleMessageSent = (response) => {
            if (response.success) {
                const message = response.message;
                setMessages(prev => [...prev, {
                    _id: message._id,
                    text: message.content,
                    fromSelf: true
                }]);
            }
        };
        
        const handleMessageBlocked = (response) => {
            setBlockError(response.message || "Your message could not be delivered.");
            setTimeout(() => setBlockError(''), 5000);
        };

        socketRef.current.on('receive-message', handleReceiveMessage);
        socketRef.current.on('message-sent', handleMessageSent);
        socketRef.current.on('message-blocked', handleMessageBlocked);

        return () => {
            socketRef.current.off('receive-message', handleReceiveMessage);
            socketRef.current.off('message-sent', handleMessageSent);
            socketRef.current.off('message-blocked', handleMessageBlocked);
            socketRef.current.disconnect();
        };
    }, [initialSelectedUser, selectedUser]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const fetchChatUsers = async (token) => {
        try {
            setLoading(true);
            const response = await axios.get('/api/chat/chats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setChatUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching chat users:', error);
            setLoading(false);
        }
    };
    
    const fetchMessages = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/chat/messages/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setMessages(response.data.map(msg => ({
                _id: msg._id,
                text: msg.content,
                fromSelf: msg.sender === JSON.parse(atob(token.split('.')[1])).userId
            })));
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };
    
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedUser) return;
        if (isUserBlocked(selectedUser.id)) {
            setBlockError('You have blocked this user. You cannot send messages to blocked users.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const userId = JSON.parse(atob(token.split('.')[1])).userId;
            
            const messageToSend = newMessage;
            setNewMessage(''); 
            
            socketRef.current.emit('private-message', {
                sender: userId,
                recipient: selectedUser.id,
                content: messageToSend
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    return (
        <div className="chat-inbox">
            <aside className="sidebar">
                <h2 className="chat-title">Chats</h2>
                <div className="chat-user-list">
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : chatUsers.length > 0 ? (
                        chatUsers.map(user => (
                            <div
                                key={user._id}
                                className={`chat-user ${selectedUser?.id === user._id ? 'active' : ''}`}
                            >
                                <span
                                    onClick={() => {
                                        const chatUser = { id: user._id, name: user.username };
                                        setSelectedUser(chatUser);
                                        fetchMessages(user._id);
                                        setBlockError('');
                                    }}
                                    style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        <span className="user-icon">👤</span>
                                        <span className="user-name">{user.username}</span>
                                    </span>
                                <DeleteChat
                                    onDelete={async () => {
                                        const token = localStorage.getItem('token');
                                        await axios.delete(`/api/chat/chat/${user._id}`, {
                                            headers: { Authorization: `Bearer ${token}` }
                                        });
                                        setChatUsers(prev => prev.filter(u => u._id !== user._id));
                                        if (selectedUser?.id === user._id) {
                                            setSelectedUser(null);
                                            setMessages([]);
                                        }
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="no-chats">No chats yet</div>
                    )}
                </div>
            </aside>

            <main className="chat-window">
                {selectedUser ? (
                    <div className="chat-container">
                        <div className="chat-header">
                            <h3>{selectedUser.name}</h3>
                        </div>
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <ChatBubble key={msg._id || index} message={msg.text} isSender={msg.fromSelf} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        {blockError && (
                            <div className="block-error-message">
                                {blockError}
                            </div>
                        )}
                        {isUserBlocked(selectedUser.id) && (
                            <div className="block-error-message" style={{ color: 'red', textAlign: 'center', margin: '1rem 0' }}>
                                You have blocked this user. You cannot send messages to blocked users.
                            </div>
                        )}
                        <div className="message-input-container">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="message-input-field"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSendMessage();
                                }}
                                disabled={isUserBlocked(selectedUser.id)}
                            />
                            <button className="send-button" onClick={handleSendMessage} disabled={isUserBlocked(selectedUser.id)}>Send</button>
                        </div>
                    </div>
                ) : (
                    <div className="chat-placeholder">Select a user to start chatting</div>
                )}
            </main>
        </div>
    );
};

export default ChatInbox;