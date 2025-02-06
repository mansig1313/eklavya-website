import React, { useState, useEffect } from 'react';
import './student.css';
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

// Main App Component
function DashboardApp() {
  const [progressData, setProgressData] = useState([20, 40, 60, 80]); // Initial values
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Define the navigate function

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

 

  // Navigation functions
  const handleMyCourseClick = () => {
    navigate('/mycourse'); // Navigate to the 'My Course' page
  };

  const handleMessageClick = () => {
    navigate('/messages'); // Navigate to the messages page
  };

  const handlePaymentClick = () => {
    navigate('/payments'); // Navigate to the payment page
  };

  const handleFeedbackClick = () => {
    navigate('/feedback'); // Navigate to the feedback page
  };

  const handleMyTutorsClick = () => {
    navigate('/mytutors');
  };

  const handleWeeklyTestsClick = () => {
    navigate('/WeeklyTests');
  };

  const handleMyResourceClick = () => {
    navigate('/sturesource');
  }

   const handleCourseCompletionClick = () => {
    navigate('/StuCourseCompletion');
  }

   const handleUpcomingSessionsClick = () => {
    navigate('/UpcomingSessions');
  }



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
          <div className="sidebar-item" onClick={handleMyCourseClick}>
            <Mycourse className="mycourse" />
            <span>My Course</span>
          </div>
          <div className="sidebar-item" onClick={handleMessageClick}>
            <MessageIcon className="messages" />
            <span>Messages</span>
          </div>
          <div className="sidebar-item" onClick={handleMyResourceClick}>
            <FolderIcon className="Resourse" />
            <span>Resourse</span>
          </div>
          <div className="sidebar-item" onClick={handleFeedbackClick}>
            <GradingIcon className="Resourse" />
            <span>Feedback</span>
          </div>
          <div className="sidebar-item" onClick={handlePaymentClick}>
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
            <PersonIcon className="PersonIcon"
             onClick={() => navigate('/profile')} // Navigate to the profile page
             style={{ cursor: 'pointer' }}  />
          </div>
        </div>
        <div className="main-content">
          <div className="content-grid">
            <div className="box course-completion" onClick={handleCourseCompletionClick}>
              <h3>Course Completion</h3>
            </div>
            <div className="box weekly-tests" onClick={handleWeeklyTestsClick}>
              <h3>Weekly Tests</h3>
            </div>
           <div className="box my-tutors" onClick={handleMyTutorsClick}>
              <h3>My Tutors</h3>
            </div>
            <div className="box upcoming-sessions" onClick={handleUpcomingSessionsClick}> 
              <h3>Upcoming Sessions</h3>
            </div>
          </div>

          <div className="progress-report">
            <h3>Progress Report</h3>
            <div className="progress-bar">
              {progressData.map((value, index) => (
                <div key={index} className="bar" style={{ height: `${value}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardApp;
