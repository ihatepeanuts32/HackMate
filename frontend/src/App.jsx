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
import Home from './pages/Home';
import Layout from './Layout';
import Settings from './pages/Settings';
import Explore from './pages/Explore';
import ResetPassword from './pages/ResetPassword';
import ProfileView from './pages/ProfileView';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/bugReport" element={<BugReport />} />
          <Route path="/groupViewExample" element={<GroupView />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profileView" element={<ProfileView />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
