import profileImage from "../assets/profile.png"
import React, { useState } from "react";


const EditProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState(profileImage);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <h3>Edit Profile</h3>
            {/* <img src="../assets/profile.png" id="profile-photo"></img>
            <label for="input-file">Update Profile Photo</label>
            <input type="file" accept="image/jpg, image/jpeg, image/png" id="input-file" className="photo-selector"></input> */}
            <div>            
                <img src={profilePhoto} id="profile-photo"/>
            </div>
            <label htmlFor="input-file">Update Profile Photo</label>
            <input type="file" accept="image/jpg, image/jpeg, image/png" id="input-file" className="photo-selector" onChange={handleFileChange} />
        <div>
            <form>
        <div className="split-row">
        <div>
          <input type="text" name="firstName" placeholder = "First Name"/>
        </div>
        <div>
          <input type="text" name="lastName" placeholder = "Last Name"/>
        </div>
        </div>
        <div className="split-row">
        <div>
          <input type="text" name="preferredRole" placeholder = "Preferred Role"/>
        </div>
        <div>
          <input type="text" name="hackathonsAttended" placeholder = "# Of Hackathons"/>
        </div>
        <div>
          <input type="text" name="college" placeholder = "College"/>
        </div>
        </div>
        <div className="split-row">
        <div>
          <textarea name="technicalSkills" placeholder = "Technical Skills" rows = {5} className="profile-textarea"/>
        </div>
        <div>
          <textarea name="desiredTeammateQualities" placeholder = "Desired Teammate Qualities" rows = {5}  className="profile-textarea"/>
        </div>
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
        </div>
        </div>
    )
}
{/* <script>
    let profilePhoto = document.getElementbyId("profile-photo");
    let inputFile = document.getElementbyId("input-file");

    inputFile.onchange= function()
    {
        profilePhoto.src = URL.createObjectURL(inputFile.files[0]);
    }
</script> */}

export default EditProfile;