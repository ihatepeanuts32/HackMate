import hackmateLogo from "../assets/hackmateLogo.png"

const Dashboard = () => {
    return (
        <div>
            <div>
                <img src={hackmateLogo} className="logo" alt="hackmate logo" />
            </div>
            <h1>HackMate</h1>
        </div>
    )
}

export default Dashboard;