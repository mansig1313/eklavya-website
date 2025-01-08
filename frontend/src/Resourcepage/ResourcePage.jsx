import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PaymentIcon from "@mui/icons-material/Payment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import logo from "../components/landingpg/register/logo_white_nobg.png";
import "./resourcePage.css"; // Scoped CSS for this page

const ResourcePage = () => {
  const mockSubjects = ["Physics", "Chemistry", "Mathematics", "Biology"];
  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadedResources, setUploadedResources] = useState([]);
  const [expandedSubject, setExpandedSubject] = useState(null); // For toggling dropdown

  const handleUpload = (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.file;
    const descriptionInput = e.target.elements.description;
    const subject = selectedSubject;

    if (fileInput.files.length === 0 || !subject) {
      alert("Please select a subject and upload a file.");
      return;
    }

    const resource = {
      id: new Date().getTime(),
      subject,
      fileName: fileInput.files[0].name,
      description: descriptionInput.value,
    };

    setUploadedResources((prevResources) => [...prevResources, resource]);
    fileInput.value = "";
    descriptionInput.value = "";
  };

  const handleDelete = (id) => {
    const updatedResources = uploadedResources.filter(
      (resource) => resource.id !== id
    );
    setUploadedResources(updatedResources);
  };

  const toggleSubject = (subject) => {
    setExpandedSubject((prev) => (prev === subject ? null : subject));
  };

  return (
    <div className="app">
      {/* Sidebar */}
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
            <EventNoteIcon className="SessionHistory" />
            <span>Help</span>
          </div>
          <div className="sidebar-item">
            <SettingsIcon className="Settings" />
            <span>Settings</span>
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-container">
        {/* Header */}
        <div className="header">
          <div className="welcome">WELCOME</div>
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-icons">
            <NotificationsIcon className="NotificationIcon" />
            <EmailIcon className="EmailIcon" />
            <PersonIcon className="PersonIcon" />
          </div>
        </div>

        <div className="resource-page">
          

          {/* Upload Section */}
<div className="upload-section">
  <h2>Upload Your Resources</h2>
  <form onSubmit={handleUpload} className="upload-form">
    <label>
      Select Subject:
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        required
      >
        <option value="">--Choose Subject--</option>
        {mockSubjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </label>
    <label>
      File:
      <input type="file" name="file" required />
    </label>
    <label>
      Description:
      <textarea
        name="description"
        placeholder="Add a description (optional)"
      />
    </label>
    <button type="submit">Upload</button>
  </form>
</div>


          {/* Resource Display */}
          <h3 className="subheading">Uploaded Resources</h3>
          <div className="resource-card-container">
            {mockSubjects.map((subject) => (
              <div 
              key={subject}
            className={`resource-card ${
              expandedSubject === subject ? "expanded" : ""
            }`}
            onClick={() => toggleSubject(subject)}
            >
                <h4 className="resource-card-title">{subject}</h4>
                {expandedSubject === subject && (
              <ul className="resource-list">
                {uploadedResources
                  .filter((resource) => resource.subject === subject)
                  .map((resource) => (
                    <li key={resource.id} className="resource-item">
                      <div className="resource-details">
                        <strong>{resource.fileName}</strong>
                        <p>{resource.description || "No description"}</p>
                      </div>
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(resource.id);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                {uploadedResources.filter(
                    (resource) => resource.subject === subject
                ).length === 0 && <p className="no-resource">No resources uploaded</p>}
              </ul>
            )}

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
