import { useState } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password
      });

      setToken(res.data.token);
      setMessage('Sign up successful.')

      localStorage.setItem('token', res.data.token);
      window.location.href = "/editProfile";

    } catch (error) {
      setMessage('Failed to register user.');
      console.error(error)
    }
  }

  return (
    <div>
      <h3>Register with HackMate</h3>
      <form onSubmit={handleSubmit}>
        <div className="split-row">
        </div>
        <div>
          <input 
            type="text" 
            value={username} 
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div>
          <input 
            type="email" 
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input 
            type="password" 
            value={password} 
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
            <button type="submit" className="login-button">Sign Up</button>
            <Link to="/logIn" className="login-link">Log In</Link>
      </form>
      {message && <p className={message.includes("successful") ? "success-message" : "error-message"}>{message}</p>}
    </div>
  )
}

export default Register;