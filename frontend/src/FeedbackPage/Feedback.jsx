import React, { useState } from "react";
import "../FeedbackPage/Feedback.css";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]); // To store feedbacks
  const [studentName, setStudentName] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentName && tutorName && message) {
      const newFeedback = {
        id: Date.now(),
        studentName,
        tutorName,
        message,
      };
      setFeedbacks([newFeedback, ...feedbacks]); // Add feedback to the list
      setStudentName("");
      setTutorName("");
      setMessage("");
      alert("Feedback submitted successfully!");
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <div className="feedback-page">
      {/* Header Section */}
      <header className="feedback-header">
        <h1>We Value Your Feedback</h1>
        <p className="tagline">"Your words inspire us to improve every step of the way!"</p>
      </header>

      {/* Feedback Form */}
      <div className="feedback-form-container">
        <h2>Give Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID :</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="input-field"
              placeholder="Enter your Student ID"
            />
          </div>
          <div className="form-group">
            <label>Tutor Name :</label>
            <input
              type="text"
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
              className="input-field"
              placeholder="Enter tutor's name"
            />
          </div>
          <div className="form-group">
            <label>Feedback :</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea-field"
              placeholder="Write your feedback here"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Feedback List */}
      <div className="feedback-list-container">
        <h2>Received Feedback</h2>
        {feedbacks.length === 0 ? (
          <p>No feedback available yet.</p>
        ) : (
          <ul className="feedback-items">
            {feedbacks.map((feedback) => (
              <li key={feedback.id} className="feedback-item">
                <strong>From:</strong> {feedback.studentName} <br />
                <strong>To:</strong> {feedback.tutorName} <br />
                <strong>Message:</strong> {feedback.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
