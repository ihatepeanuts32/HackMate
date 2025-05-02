import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateGroup.css';
//Hrishikesh Srirangam

const CreateGroup = () => {
    const [groupName, setGroupName] = useState(""); // State for group name
    const [members, setMembers] = useState(""); // State for members
    const [description, setDescription] = useState(""); // State for description
    const [error, setError] = useState(""); // State to hold any error messages
    const [success, setSuccess] = useState(false); // State for success message
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const token = localStorage.getItem('token');
        if(!token){
            setError("Authorization Error: Please log in again");
            return;
        } 

        // Create the data object to send to the backend
        const groupData = {
            groupName,
            description
        };

        try {
        // Make the POST request to your backend API (change URL accordingly)
        const response = await axios.post("/api/groups/create", groupData, {headers:{Authorization: `Bearer ${token}`}});
        // Handle success
        if (response.status === 200) {
            setSuccess(true);
            setError(""); // Clear any previous error messages
        }
        } catch (error) {
        // Handle errors (e.g., network issues, validation errors from backend)
        setError("There was an error creating the group. Please try again.");
        setSuccess(false);
        }
    };

    return(
        <div className="create-group-container">
            <h1 className="create-group-header">Create a Group</h1>
            
            {error && <p className="create-group-error">{error}</p>}
            {success && <p className="create-group-success">Group created successfully!</p>}
            
            <form onSubmit={handleSubmit} className="create-group-form">
                <div className="create-group-field">
                    <label className="create-group-label">Group Name</label>
                    <input 
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="create-group-input"
                        placeholder="Enter group name"
                    />
                </div>

                <div className="create-group-field">
                    <label className="create-group-label">Description</label>
                    <textarea 
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="create-group-textarea"
                        placeholder="Enter group description"
                    />
                </div>

                <button 
                    type="submit"
                    className="submit-button"
                >
                    Create Group
                </button>
            </form>
        </div>
    )
}

export default CreateGroup;