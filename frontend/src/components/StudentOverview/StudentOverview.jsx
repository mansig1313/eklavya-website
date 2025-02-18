import React, { useState } from "react";
import {
  FaBook,
  FaClipboardList,
  FaTasks,
  FaChartLine,
  FaBars,
} from "react-icons/fa";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./StudentOverview.css"; // Import the CSS file

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progressType, setProgressType] = useState("Weekly");

  // Sample Data for Graphs
  const progressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Overall Progress",
        data: [80, 85, 78, 90],
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const classesData = {
    labels: ["Attended", "Missed"],
    datasets: [{ data: [30, 10], backgroundColor: ["#4CAF50", "#F44336"] }],
  };

  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance",
        data: [1, 0, 1, 1, 1],
        borderColor: "#007bff",
        fill: false,
      },
    ],
  };

  return (
    <div className="StuOver-dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div
          className="StuOver-sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars className="StuOver-menu-icon" />
        </div>
        <ul className="StuOver-sidebar-menu">
          <li>
            <FaBook className="StuOver-menu-icon" />
            {isSidebarOpen && <span>Classes</span>}
          </li>
          <li>
            <FaClipboardList className="StuOver-menu-icon" />
            {isSidebarOpen && <span>Assignments</span>}
          </li>
          <li>
            <FaTasks className="StuOver-menu-icon" />
            {isSidebarOpen && <span>Tests</span>}
          </li>
          <li>
            <FaChartLine className="StuOver-menu-icon" />
            {isSidebarOpen && <span>Attendance</span>}
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="StuOver-main-content">
        {/* Header */}
        <header className="StuOver-header">
          <div className="StuOver-student-info">
            <h2>John Doe</h2>
            <p>Course: Science</p>
          </div>
          <h2 className="StuOver-header-title">Student Overview</h2>
          <select
            className="StuOver-dropdown"
            value={progressType}
            onChange={(e) => setProgressType(e.target.value)}
          >
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </header>

        {/* Two Containers */}
        <div className="StuOver-content-container">
          {/* Progress Report (Bar Graph) */}
          <div className="StuOver-card">
            <h3>Overall Progress Report</h3>
            <Bar data={progressData} />
          </div>

          {/* Upcoming Tests & Lectures */}
          <div className="StuOver-card">
            <h3>Upcoming Tests & Lectures</h3>
            <ul>
              <li>Math Test - Monday, 10 AM</li>
              <li>Physics Lecture - Tuesday, 2 PM</li>
              <li>Chemistry Test - Friday, 11 AM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
