import hackmateLogo from "../assets/hackmateLogo.png"
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    //Naomi - collecting user info to send to database and verify user info
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {

            const res = await axios.post('/api/auth/login', {
                email,
                password
            });

            setToken(res.data.token);
            // setMessage('Sign up successful.')

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href = "/home";

        } catch (error) {
            setMessage('Your username or password is incorrect.');
            console.error(error)
        }
    }
    return (
        <div className="login-page">
            <div>
                <div>
                    <img src={hackmateLogo} className="logo" alt="hackmate logo" />
                </div>
                <h2 className="hackmate-text">HackMate</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="email" 
                        value={email} 
                        placeholder = "Email"
                        style={{width: "250px"}}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            placeholder = "Password"
                            style={{width: "250px"}}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    {message && <div className="login-failed">{message}</div>}
                    <div className="forgot-password">
                        <Link to="/reset-password">Forgot Password?</Link>
                    </div>
                    <div className="split-row">
                        <button type="submit" className="login-button">Log In</button>
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default Login;