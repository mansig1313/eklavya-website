import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Student.css"; // Updated CSS file
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import FolderIcon from "@mui/icons-material/Folder";
import Mycourse from "@mui/icons-material/LibraryBooks";
import MessageIcon from "@mui/icons-material/Message";
import PaymentIcon from "@mui/icons-material/Payment";
import GradingIcon from "@mui/icons-material/Grading";
import logo from "../components/landingpg/register/logo_white_nobg.png";
import { useNavigate } from "react-router-dom";
import Progress from "./Progress.jsx";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      fetchEnrolledCourses(loggedInUser.email);
    }

    const handleProfileUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("userProfileUpdate", handleProfileUpdate);
    return () => window.removeEventListener("userProfileUpdate", handleProfileUpdate);
  }, []);

  const fetchEnrolledCourses = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/courses?studentEmail=${email}`);
      setCourses(response.data);
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
    }
  };

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
  };

  const handleNavigation = (path) => navigate(path);

  return (
    <div className="student-app">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul>
          <div className="sidebar-item" onClick={() => handleNavigation("/")}>
            <DashboardIcon className="dashboard-icon" />
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/my-courses")}>
            <Mycourse className="mycourse" />
            <span>My Course</span>
          </div>
          <div className="sidebar-item" onClick={() => handleNavigation("/messages")}>
            <MessageIcon className="messages" />
            <span>Messages</span>
          </div>
          {/*<div className="sidebar-item" onClick={() => handleNavigation("/sturesource")}>
            <FolderIcon className="Resourse" />
            <span>Resource</span>
          </div>*/}
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
            <div className="user-name">{user ? user.name : "Guest"}</div>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-icons">
            <NotificationsIcon className="NotificationIcon" />
            <EmailIcon className="EmailIcon" />
            <PersonIcon className="PersonIcon" onClick={() => handleNavigation("/profile")} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="main-content">
          <div className="content-grid">
            <motion.div className="box course-completion" onClick={() => handleNavigation("/StuCourseCompletion")} whileHover={{ scale: 1.05 }}>
              <h3>Course Completion</h3>
            </motion.div>
            <motion.div className="box my-courses" whileHover={{ scale: 1.05 }}>
              <h3>My Courses</h3>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <motion.div
                    key={course._id}
                    className="course-item"
                    onClick={() => handleCourseClick(course)}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>{course.subject} ({course.standard})</span>
                  </motion.div>
                ))
              ) : (
                <p>No courses enrolled yet.</p>
              )}
            </motion.div>
            <motion.div className="box my-tutors" onClick={() => handleNavigation("/mytutors")} whileHover={{ scale: 1.05 }}>
              <h3>My Tutors</h3>
            </motion.div>
            <motion.div className="box upcoming-sessions" onClick={() => handleNavigation("/UpcomingSessions")} whileHover={{ scale: 1.05 }}>
              <h3>Upcoming Sessions</h3>
            </motion.div>
          </div>

          {selectedCourse && (
            <motion.div className="course-details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2>{selectedCourse.subject} ({selectedCourse.standard})</h2>
              <div className="details-grid">
                <div className="tests-section">
                  <h3>Tests</h3>
                  {selectedCourse.tests.length > 0 ? (
                    selectedCourse.tests.map((test) => (
                      <motion.div
                        key={test._id}
                        className="test-item"
                        onClick={() => navigate(`/courses/${selectedCourse._id}/tests/${test._id}`)}
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
                      >
                        <span>{test.name}</span>
                        <span>{test.duration}</span>
                      </motion.div>
                    ))
                  ) : (
                    <p>No tests available.</p>
                  )}
                </div>
                <div className="resources-section">
                  <h3>Resources</h3>
                  {selectedCourse.resources.length > 0 ? (
                    selectedCourse.resources.map((res, i) => (
                      <motion.a
                        key={i}
                        href={res}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-item"
                        whileHover={{ scale: 1.05, color: "#1976d2" }}
                      >
                        {res.split("/").pop()}
                      </motion.a>
                    ))
                  ) : (
                    <p>No resources available.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <div className="progress-report">
            <h3>Progress Report</h3>
            <Progress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;