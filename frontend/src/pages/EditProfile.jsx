import React, { useState, useEffect } from "react";
import profileImage from "../assets/profile.png";
import axios from "axios";

const EditProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState(profileImage);
    const [photoFile, setPhotoFile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        preferredRole: "",
        hackathonsAttended: "",
        college: "",
        year: "",
        technicalSkills: "",
        desiredTeammateQualities: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhotoFile(file);
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("You must be logged in to save profile");
                setLoading(false);
                return;
            }

            const submitData = new FormData();
            
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });
            
            if (photoFile) {
                submitData.append("profilePhoto", photoFile);
            }

            const response = await axios.post(
                '/api/auth/onboardUser',
                submitData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setMessage("Profile saved successfully!");
            window.location.href = "/home";
        } catch (error) {
            console.error("Error saving profile:", error);
            setMessage(error.response?.data?.message || "Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Edit Profile</h3>
            {message && <div className={message.includes("success") ? "success-message" : "error-message"}>{message}</div>}
            
            {/* <div className="profile-photo-container">            
                <img src={profilePhoto} id="profile-photo" alt="Profile" />
            </div>
            
            <label htmlFor="input-file" className="file-upload-label">Update Profile Photo</label>
            <input 
                type="file" 
                accept="image/jpg, image/jpeg, image/png" 
                id="input-file" 
                className="photo-selector" 
                onChange={handleFileChange} 
            /> */}
            
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="split-row">
                        <div>
                            <input 
                                type="text" 
                                name="firstName" 
                                placeholder="First Name" 
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                name="lastName" 
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="split-row">
                       
                         <div>
                            <input 
                                type="text" 
                                name="college" 
                                placeholder="College"
                                value={formData.college}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    </div>
                    <div className="split-row">
                         <div>
                          <select
                            name="preferredRole"
                            value={formData.preferredRole}
                            onChange={handleInputChange}
                            className="select-dropdown"

                          >
                            <option value="">Select Role</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Fullstack">Fullstack</option>
                          </select>
                        </div>
                        <div>
                          <select
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="select-dropdown"
                          >
                            <option value="">Select Year</option>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                          </select>
                        </div>
                        <div>
                            <select
                                name="hackathonsAttended"
                                value={formData.hackathonsAttended}
                                onChange={handleInputChange}
                                className="select-dropdown"

                            >
                                <option value="">Hackathons Attended</option>
                                {[...Array(16).keys()].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                                ))}
                            </select>
                            </div>
                    </div>
                   
                        {/* <div>
                            <input 
                                type="text" 
                                name="year" 
                                placeholder="Year"
                                value={formData.year}
                                onChange={handleInputChange}
                            />
                        </div> */}
                       
                    <div className="split-row">
                        <div>
                            <textarea 
                                name="technicalSkills" 
                                placeholder="Technical Skills" 
                                rows={5} 
                                className="profile-textarea"
                                value={formData.technicalSkills}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <textarea 
                                name="desiredTeammateQualities" 
                                placeholder="Desired Teammate Qualities" 
                                rows={5}  
                                className="profile-textarea"
                                value={formData.desiredTeammateQualities}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;