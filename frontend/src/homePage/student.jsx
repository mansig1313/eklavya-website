import React, { useState, useEffect } from 'react';
import './Student.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import Mycourse from '@mui/icons-material/LibraryBooks';
import MessageIcon from '@mui/icons-material/Message';
import PaymentIcon from '@mui/icons-material/Payment';
import GradingIcon from '@mui/icons-material/Grading';
import logo from '../components/landingpg/register/logo_white_nobg.png';
import { useNavigate } from 'react-router-dom';
import Progress from './Progress.jsx';
import axios from "axios";

function DashboardApp() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    // Enrollment functionality
    

    // Handle user profile updates
    const handleProfileUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        setUser(updatedUser);
      }
    };

    window.addEventListener('userProfileUpdate', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('userProfileUpdate', handleProfileUpdate);
    };
  }, []); // Runs only once when component mounts

  // Navigation functions
  const handleNavigation = (path) => navigate(path);

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul>
          <div className="sidebar-item" onClick={() => handleNavigation("/")}>
            <DashboardIcon className="dashboard-icon" />
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/mycourse")}>
            <Mycourse className="mycourse" />
            <span>My Course</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/messages")}>
            <MessageIcon className="messages" />
            <span>Messages</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/sturesource")}>
            <FolderIcon className="Resourse" />
            <span>Resource</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/feedback")}>
            <GradingIcon className="Resourse" />
            <span>Feedback</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/payments")}>
            <PaymentIcon className="Reports" />
            <span>Payment</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/settings")}>
            <SettingsIcon className="Settings" />
            <span>Settings</span>
          </div>
        </ul>
      </div>

      <div className="main-container">
        <div className="header">
          <div className="welcome-tag">
            <div className="welcome">WELCOME, </div>
            <div className="user-name">{user ? user.name : 'Guest'}</div>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-icons">
            <NotificationsIcon className="NotificationIcon" />
            <EmailIcon className="EmailIcon" />
            <PersonIcon 
              className="PersonIcon"
              onClick={() => handleNavigation('/profile')}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
        <div className="main-content">
          <div className="content-grid">
            <div className="box course-completion" onClick={() => handleNavigation("/StuCourseCompletion")}>
              <h3>Course Completion</h3>
            </div>
            <div className="box weekly-tests" onClick={() => handleNavigation("/WeeklyTests")}>
              <h3>Weekly Tests</h3>
            </div>
            <div className="box my-tutors" onClick={() => handleNavigation("/mytutors")}>
              <h3>My Tutors</h3>
            </div>
            <div className="box upcoming-sessions" onClick={() => handleNavigation("/UpcomingSessions")}>
              <h3>Upcoming Sessions</h3>
            </div>
          </div>

          <div className="progress-report">
            <h3>Progress Report</h3>
            <Progress />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardApp;
