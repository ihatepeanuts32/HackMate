// Ifrah
// Description: User Homepage
import hackmateLogo from "../assets/hackmateLogo.png"
import CardCarousel from '../components/CardCarousel';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const Home = () => {
    const [hackathons, setHackathons] = useState([]);
    const [user, setUser] = useState('');

    //Naomi - Mounting hackathon data being fetched from backend
    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token retrieved:", token ? "Token exists" : "No token found");
                
                if (token) {
                    console.log("Making request to:", "http://localhost:3000/api/auth/userProfile");
                    const response = await axios.get("http://localhost:3000/api/auth/userProfile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
            }
        }

        const fetchHackathons = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/eventBriteHackathons");
                console.log("Response data:", response.data);
                setHackathons(response.data[0]?.hackathons || []);
              } catch (error) {
                console.error("Error fetching hackathons:", error);
              }
        }
        
        fetchUserProfile();
        fetchHackathons();
    }, []);

    return (
        <div>
            <div>
                <h3>Welcome {user.firstName || "Guest"}!</h3>
            </div>
            <div>
                <h4>Upcoming Hackathons Near You</h4>
                <div style={{ paddingBottom: '30px' }}>
                    <CardCarousel data={hackathons} />
                </div>
                <h4 style={{ padding:15}}>Ready to Find your Perfect Hackathon Group?</h4>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="split-row">
                    <Link to="/explore">
                        <button className="link-button">Find Fellow Hackers</button>
                    </Link>
                    <Link to="/exploreGroup">
                    <button className="link-button">Find Groups to Join</button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home;