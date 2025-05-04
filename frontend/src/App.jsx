// Set default theme to dark if not set
if (!localStorage.getItem('theme')) {
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
import UpdateProfile from './pages/UpdateProfile';
import AccountDetails from './pages/AccountDetails';
import PrivacySettings from './pages/PrivacySettings';
import ChatInbox from './pages/ChatInbox';
import ManageGroup from './pages/ManageGroup';
import LogOut from './pages/LogOut';
import { BlockedUsersProvider } from './context/BlockedUsersContext';

function App() {
  // document.documentElement.setAttribute('data-theme', 'dark'); // Removed: now handled above
  return (
    <Router>
      <BlockedUsersProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/bugReport" element={<BugReport />} />
            <Route path="/group/:id" element={<GroupView />} />
            <Route path="/manage_group/:id" element={<ManageGroup />} />
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
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/privacy" element={<PrivacySettings />} />
            <Route path="/chatInbox" element={<ChatInbox />} />
            <Route path="/logout" element={<LogOut />} />
          </Route>
        </Routes>
      </BlockedUsersProvider>
    </Router>
  )
}

export default App