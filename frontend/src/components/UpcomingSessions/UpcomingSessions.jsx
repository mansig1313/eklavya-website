import React from 'react';
import '../UpcomingSessions/UpcomingSessions.css';  
import sessionImage from '../UpcomingSessions/Session1.png'; // Replace with actual image path
import { useNavigate } from "react-router-dom";
const sessions = [
  { id: 1, course: 'Physics', date: '2025-02-10', time: '10:00 AM', tutor: 'John Doe' },
  { id: 2, course: 'Mathematics', date: '2025-02-11', time: '02:00 PM', tutor: 'Jane Smith' },
  { id: 3, course: 'Chemistry', date: '2025-02-13', time: '11:30 AM', tutor: 'Alex Brown' },
];

const UpcomingSessions = () => {

  const navigate = useNavigate();
  
  const handleJoinSessionClick = (session) => {
    navigate(`/session/${session.id}`);
  }



  return (
    <div className="container">
      
      {/* Left Side: Sessions List */}
      <div className="sessions-container">
        <h2 className="section-title">Upcoming Sessions</h2>
        <div className="sessions-list">
          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <h3 className="session-course">{session.course}</h3>
              <p className="session-date">📅 Date: {session.date}</p>
              <p className="session-time">⏰ Time: {session.time}</p>
              <p className="session-tutor">👨‍🏫 Tutor: {session.tutor}</p>
              <button 
              className="join-button"
              onClick={() => handleJoinSessionClick(session)}
              >Join Session</button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="image-container">
        <img src={sessionImage} alt="Study Session" className="session-image" />
      </div>
       
     

    </div>
  );
};

export default UpcomingSessions;
