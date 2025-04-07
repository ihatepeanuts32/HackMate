import { useState } from 'react'
//import hackmateLogo from "../assets/hackmateLogo.png";
//import '../styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/LogIn';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import BugReport from './pages/BugReport';
import GroupView from './pages/GroupView';


function App() {

  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/bugReport" element={<BugReport/>}/>
          <Route path="/groupViewExample" element={<GroupView/>}/>
        </Routes>
    </Router>
  )
}

export default App
