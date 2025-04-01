import hackmateLogo from "../assets/hackmateLogo.png"

const Dashboard = () => {
    return (
        <div>
            <div>
                <img src={hackmateLogo} className="logo" alt="hackmate logo" />
            </div>
            <h1>HackMate</h1>
            { <p className="subtitle">
                Find Your Perfect Hackathon Team
            </p> }
        </div>
    )
}

export default Dashboard;