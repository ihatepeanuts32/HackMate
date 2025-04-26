import React from 'react';
import '../styles/ChatBubble.css';

const ChatBubble = ({ message, isSender }) => {
    return (
        <div className={`chat-bubble ${isSender ? 'sent' : 'received'}`}>
            <p>{message}</p>
        </div>
    );
};

export default ChatBubble;
