import { useState } from 'react'
//import hackmateLogo from "../assets/hackmateLogo.png";
//import '../styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/LogIn';
import Register from './pages/Register';


function App() {

  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
  )
}

export default App
