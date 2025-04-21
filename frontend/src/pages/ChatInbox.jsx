import React, { useState } from 'react';
import '../styles/ChatInbox.css';

const chatUsersData = [
    { id: 1, name: "Vaishali Sathiya", year: "Sophomore", major: "Software Engineering", school: "UT Dallas" },
    { id: 2, name: "Ifrah Zainab", year: "Sophomore", major: "Computer Science", school: "UT Dallas" },
    { id: 3, name: "Rajit Goel", year: "Junior", major: "Computer Science", school: "UT Dallas" },
    { id: 4, name: "Hrishikesh Srirangam", year: "Sophomore", major: "Computer Science", school: "UT Dallas" },
    { id: 5, name: "Sai Sureshkannan", year: "Sophomore", major: "Computer Science", school: "UT Dallas" },
    { id: 6, name: "Earl Velasquez", year: "Sophomore", major: "Software Engineering", school: "UT Dallas" },
    { id: 7, name: "Naomi Ntuli", year: "Junior", major: "Computer Science", school: "UT Dallas" },
    { id: 8, name: "Dhakshin Parimalakumar", year: "Sophomore", major: "Computer Science", school: "UT Dallas" },
    { id: 9, name: "John Doe", year: "Senior", major: "Computer Science", school: "UT Dallas" }
];

const ChatInbox = () => {
    const [chatUsers, setChatUsers] = useState(chatUsersData);
    const [selectedUser, setSelectedUser] = useState(null);

    const deleteChat = (id) => {
        setChatUsers(chatUsers.filter(user => user.id !== id));
        if (selectedUser?.id === id) {
            setSelectedUser(null); // Deselect the user if they are deleted
        }
    };

    return (
        <div className="chat-inbox">
            <div className="sidebar">
                <div className="chat-title">
                    <span className="chat-title">Cha<span>ts:</span></span>
                </div>
                <div className="chat-user-list">
                    {chatUsers.map(user => (
                        <div
                        key={user.id}
                        className={`chat-user ${selectedUser?.id === user.id ? 'active' : ''}`}
                    >
                        <span className="user-icon" onClick={() => setSelectedUser(user)}>👤</span>
                        <span className="user-name">{user.name}</span>
                        <div className="delete-chat-container">
                            <button
                                className="delete-chat"
                                onClick={() => deleteChat(user.id)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="chat-window">
                {selectedUser ? (
                    <div className="chat-placeholder">Chat with {selectedUser.name}</div>
                ) : (
                    <div className="chat-placeholder">no chat selected</div>
                )}
            </div>

            <div className="profile-sidebar">
                {selectedUser ? (
                    <>
                        <div className="profile-icon">👤</div>
                        <div className="profile-label">User Info:</div>
                        <div className="profile-detail"><strong>{selectedUser.name}</strong></div>
                        <div className="profile-detail">Year: {selectedUser.year}</div>
                        <div className="profile-detail">Major: {selectedUser.major}</div>
                        <div className="profile-detail">School: {selectedUser.school}</div>
                    </>
                ) : (
                    <>
                        <div className="profile-icon">👤</div>
                        <div className="profile-label">If User Selected, user info appears here:</div>
                        <div className="profile-placeholder"><strong>Name</strong></div>
                        <div className="profile-detail">Year: Sophomore</div>
                        <div className="profile-detail">Major: Software Engineering</div>
                        <div className="profile-detail">School: UT Dallas</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatInbox;