import React, { useState, useEffect } from 'react';
import '../MyResourcePage/MyResource.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Mycourse from '@mui/icons-material/LibraryBooks';
import MessageIcon from '@mui/icons-material/Message';
import PaymentIcon from '@mui/icons-material/Payment';
import GradingIcon from '@mui/icons-material/Grading';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../components/landingpg/register/logo_white_nobg.png';
import { useNavigate } from 'react-router-dom';

function MyResources() {

  const resources = [
    { subject: "Physics", link: "#" },
    { subject: "Chemistry", link: "#" },
    { subject: "Mathematics", link: "#" },
    { subject: "Biology", link: "#" }
  ];
  const [progressData, setProgressData] = useState([20, 40, 60, 80]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

 useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  
    const interval = setInterval(() => {
      setProgressData((prevData) =>
        prevData.map((value) => Math.min(value + Math.floor(Math.random() * 10), 100))
      );
    }, 1000);
  
    // Add event listener for profile updates
    const handleProfileUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        setUser(updatedUser);
      }
    };
  
    window.addEventListener('userProfileUpdate', handleProfileUpdate);
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      clearInterval(interval);
      window.removeEventListener('userProfileUpdate', handleProfileUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle localStorage changes
  const handleStorageChange = () => {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    if (updatedUser) {
        setUser(updatedUser); // Update user state with new data
    }
};

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul>
          <div className="sidebar-item">
            <DashboardIcon className="dashboard-icon" />
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/mycourse')}>
            <Mycourse className="mycourse" />
            <span>My Course</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/messages')}>
            <MessageIcon className="messages" />
            <span>Messages</span>
          </div>
          <div className="sidebar-item">
            <FolderIcon className="Resourse" />
            <span>My Resources</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/feedback')}>
            <GradingIcon className="Resourse" />
            <span>Feedback</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/payments')}>
            <PaymentIcon className="Reports" />
            <span>Payment</span>
          </div>
          <div className="sidebar-item">
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
            <PersonIcon className="PersonIcon" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />
          </div>
        </div>


       
     
      <div className="main-content">
        
      <div className="my-resources-container">
      <h2 className="resources-heading">My Resources</h2>
      <p className="resources-description">
        Here, students can access resources uploaded by tutors.
      </p>
      <div className="resource-list">
        {resources.map((resource, index) => (
          <a key={index} href={resource.link} className="resource-item">
            {resource.subject}
          </a>
        ))}
      </div>
    </div>
      </div>
    </div>
      </div>
   
  );
}

export default MyResources;
