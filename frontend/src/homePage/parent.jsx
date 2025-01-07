import React, { useState, useEffect } from 'react';
import './parent.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import PageviewIcon from '@mui/icons-material/Pageview';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PaymentIcon from '@mui/icons-material/Payment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import logo from '../components/landingpg/register/logo_white_nobg.png';



// Main App Component
function DashboardApp() {
    const [progressData, setProgressData] = useState([20, 40, 60, 80]); // Initial values
    const[user, setUser] = useState(null);
  useEffect(() => {

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser){
      setUser(loggedInUser);
    }
  
    const interval = setInterval(() => {
      setProgressData((prevData) =>
        prevData.map((value) => Math.min(value + Math.floor(Math.random() * 10), 100))
      );
    }, 1000); // Update every second for demonstration

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  

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
        <div className="sidebar-item">
        <PageviewIcon className="StudentOverview-icon" />
        <span>Student Overview</span>
        </div>
        <div className="sidebar-item">
        <FeedbackIcon className="TutorFeedback" />
        <span>Tutor Feedback</span>
        </div>
        <div className="sidebar-item">
        <ReportIcon className="Reports" />
        <span>Reports</span>
        </div>
        <div className="sidebar-item">
        <PaymentIcon className="FinancialOverview" />
        <span>Financial Overview</span>
        </div>
        <div className="sidebar-item">
        <EventNoteIcon  className="SessionHistory" />
        <span>Session History</span>
        </div>
        <div className="sidebar-item">
        <SettingsIcon className="Settings" />
        <span>Settings</span>
       </div>  
        </ul>
      </div>
      
      <div className="main-container">
        <div className="header">
          <div className='welcome-tag'>
          <div className="welcome">WELCOME</div>
          <div className='user-name'>{user ? user.name : 'Guest'}</div>
          </div>
          <div className="header-search">
          <input type="text" placeholder="Search..." />
          </div>
          <div className="header-icons"> 
          <NotificationsIcon className="NotificationIcon" />
          <EmailIcon className="EmailIcon" />
          <PersonIcon className="PersonIcon"/>
        </div>
        
        </div>
        <div div className="main-content">
        
    
      <div className="content-grid">
        <div className="box course-completion">
          <h3>Course Completion</h3>
          
        </div>
        <div className="box weekly-tests">
          <h3>Weekly Tests</h3>
        </div>
        <div className="box my-tutors">
          <h3>My Tutors</h3>
        </div>
        <div className="box upcoming-sessions">
          <h3>Upcoming Sessions</h3>
        </div>

       
      </div>
      
      <div className="progress-report">
      <h3>Progress Report</h3>
      <div className="progress-bar">
        {progressData.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${value}%` }}
          ></div>
        ))}
      </div>
    </div>
      </div>
      
        

          
        
        </div>

       
      </div>
    
  );
}

export default DashboardApp;
