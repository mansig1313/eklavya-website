import React  from 'react';
import './tutor.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PaymentIcon from '@mui/icons-material/Payment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import logo from '../components/landingpg/register/logo_white_nobg.png';
import { useNavigate } from 'react-router-dom';





// Main App Component
function DashboardApp() {
    const navigate = useNavigate();

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
        <ChecklistRtlIcon className="StudentOverview-icon" />
        <span>My Schedule</span>
        </div>
        <div className="sidebar-item">
        <MessageIcon className="TutorFeedback" />
        <span>Message</span>
        </div>
        <div className="sidebar-item">
        <FeedbackIcon className="Reports" />
        <span>Feedback</span>
        </div>
        <div className="sidebar-item">
        <PaymentIcon className="FinancialOverview" />
        <span>Payment History</span>
        </div>
        <div className="sidebar-item">
        <EventNoteIcon  className="SessionHistory" />
        <span>Help</span>
        </div>
        <div className="sidebar-item">
        <SettingsIcon className="Settings" />
        <span>Settings</span>
       </div>  
        </ul>
      </div>
      
      <div className="main-container">
        <div className="header">
          <div className="welcome">WELCOME</div>
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
        <div className="box course-completion" onClick={() => navigate('/resource')}>
          <h3>Upload Resource</h3>
        </div>
        <div className="box weekly-tests">
          <h3>Create Tests</h3>
        </div>
        <div className="box my-tutors">
          <h3>Financial Overview</h3>
        </div>
        <div className="box upcoming-sessions">
          <h3>Schedule Management</h3>
        </div>

       
      </div>
      <div className="progress-report">
      <h3>Calendar</h3>


      
      </div>
      
      
        

        
        
        
        </div>
        </div>
        </div>
  );
}

export default DashboardApp;
