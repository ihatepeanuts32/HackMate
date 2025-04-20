import { useLocation, useParams } from 'react-router-dom';
import '../styles/GroupView.css';
import exampleBanner from '../assets/examplebanner.jpg';
import planeIcon from '../assets/planeIcon.png';
import blockIcon from '../assets/blockIcon.png';
import blankProfile from '../assets/profile.png';
import BlockButton from '../components/Block';

const ProfileView = () => {
    //use location state to pass a user's details so that their page view can be uniquely constructed
    const location = useLocation();
    const { id } = useParams(); 
    const user = location.state?.user;

    //debugging steps
    console.log(location.state);
    console.log(user); 


    //error handling
    if (!user || user.id.toString() !== id) {
        return <div>Error! Check Console</div>;
      }

    return (
        <div className="group-view">
            {/* left side */}
            <div className="hero-section">
                <div className="banner-overlay"></div>
                <img src={exampleBanner} alt="group banner" className="banner-image" />

                <div className="group-header">
                    <div className="group-info">
                        <img src={user.profilePicture || blankProfile} alt="profile" className="group-logo" />
                        <h1>{user.name}</h1>
                    </div>
                    <div className='split-row'>
                        <button className="btn-chat">
                            <img src={planeIcon} alt="message" />
                            Chat
                        </button>
                        <BlockButton className='btn-chat' user={user}>
                            <img src={blockIcon} alt="block"/>
                        </BlockButton>
                    </div>
                    
                </div>
            </div>

            {/* right side */}
            <div className="content-section">
                <div className="description-section">
                    <h2>Bio</h2>
                    <p>{user.bio || "This user hasn't written a bio yet."}</p>

                    <div className="skills-container">
                        {user.skills && user.skills.length > 0 ? (
                            user.skills.map((skill, idx) => (
                                <span key={idx} className="skill-tag">{skill}</span>
                            ))
                        ) : (
                            <span>No skills listed</span>
                        )}
                    </div>
                </div>

                <div className="members-section">
                    <div className="description-section">
                        <ul className="profile-info">
                            <li>Year: {user.year}</li>
                            <li>College: {user.college}</li>
                            <li>Developer Type: {user.type}</li>
                            <li>Hackathons Attended: {user.numHackathons}</li>
                            <li>Desired Teammate Qualities: {user.desiredQualities}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
