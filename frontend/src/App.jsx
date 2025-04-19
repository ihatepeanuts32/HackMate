import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
import ContactUs from './pages/ContactUs';
import ProfileView from './pages/ProfileView';
import Groups from './pages/Groups';
import ExploreGroup from './pages/ExploreGroup';
import CreateGroup from './pages/CreateGroup';
import BlockedUsers from './pages/BlockedUsers';

function App() {
  return (
    <Router>
      <Routes>
        {/* Add a root route that redirects to registration */}
        <Route path="/" element={<Navigate to="/register" />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/bugReport" element={<BugReport />} />
          <Route path="/groupViewExample/:id" element={<GroupView />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profileView" element={<ProfileView />} />
          <Route path="/exploreGroup" element={<ExploreGroup />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/blockedUsers" element={<BlockedUsers />} />
          <Route path="/profile/:id" element={<ProfileView />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App