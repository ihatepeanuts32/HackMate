import React, { useState } from 'react';
import './Chat.css'; // Add custom styles for the chat page

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'You' }]);
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            message.sender === 'You' ? 'chat-message-sender' : 'chat-message-receiver'
                        }`}
                    >
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="chat-send-button" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;