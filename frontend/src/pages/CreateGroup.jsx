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
        <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        }}>
            <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '2rem',
                color: 'var(--text-primary)'
            }}>Create a Group</h2>
            
            {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: 'center' }}>Group created successfully!</p>}
            
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <label style={{
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        color: 'var(--text-primary)'
                    }}>Group Name</label>
                    <input 
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        style={{
                            padding: '0.75rem',
                            fontSize: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: '#1C0049',
                            color: 'white'
                        }}
                        placeholder="Enter group name"
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <label style={{
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        color: 'var(--text-primary)'
                    }}>Description</label>
                    <textarea 
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            padding: '0.75rem',
                            fontSize: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: '#1C0049',
                            color: 'white',
                            resize: 'vertical'
                        }}
                        placeholder="Enter group description"
                    />
                </div>

                <button 
                    type="submit"
                    style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '1.1rem',
                        backgroundColor: '#1C0049',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        alignSelf: 'center',
                        marginTop: '1rem',
                        width: '200px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2A0066'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1C0049'}
                >
                    Create Group
                </button>
            </form>
        </div>
    )
}

export default CreateGroup;