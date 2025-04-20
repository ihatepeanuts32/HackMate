import React, { useState } from 'react';
import axios from 'axios';
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
    <div>
        <h1 style={{color:"white"}}>Create a Group</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Group created successfully!</p>}
        <form onSubmit={handleSubmit}>
            <div className="split-row">
                <h3 style={{width:500, color:"white"}}>Group Name</h3>
                <input width={50} style={{fontSize: 18}}
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>
            <div className="split-row">
                <h3 style={{width:500, color:"white"}}>Description</h3>
                <textarea rows={6} cols={50} style={{fontSize: 18, borderRadius: 15, borderColor:'#1C0049', backgroundColor:'#1C0049'}}
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                />
            </div>
            <button type="submit" style={{fontSize: 24, borderColor:'#1C0049', backgroundColor:'#1C0049'}}>Submit</button>
        </form>
    </div>
    )
}

export default CreateGroup;