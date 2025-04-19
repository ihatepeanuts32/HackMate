// Ifrah
// Description: User Homepage
import hackmateLogo from "../assets/hackmateLogo.png"
import CardCarousel from '../components/CardCarousel';
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [hackathons, setHackathons] = useState([]);
    const [user, setUser] = useState('');

    //Naomi - Mounting hackathon data being fetched from backend
    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                // Get the token from localStorage or wherever you store it
                const token = localStorage.getItem('token');
                
                if (token) {
                    const response = await axios.get("http://localhost:3000/api/auth/userProfile", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
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
                    <button className="link-button">Find Fellow Hackers</button>
                    <button className="link-button">Find Groups to Join</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home;