import React, { useState } from "react";
import "./FeedbackTutor.css";

const FeedbackPage = () => {
  // Sample feedback data
  const [feedbacks] = useState([
    {
      id: 1,
      studentName: "John Doe",
      tutorName: "Ms. Smith",
      message: "The sessions were really helpful! Thank you.",
      date: "2025-02-16",
    },
    {
      id: 2,
      studentName: "Emma Johnson",
      tutorName: "Mr. Brown",
      message: "Great explanation and patience. Highly recommend!",
      date: "2025-02-15",
    },
    {
      id: 3,
      studentName: "Aarav Patel",
      tutorName: "Dr. Williams",
      message: "Very insightful lessons. Helped me a lot!",
      date: "2025-02-14",
    },
  ]);

  return (
    <div className="feedback-page">
      {/* Header Section */}
      <header className="feedback-header">
        <h1>Received Feedback</h1>
        <p className="tagline">
          "Your words inspire us to improve every step of the way!"
        </p>
      </header>

      {/* Feedback List */}
      <div className="feedback-list-container">
        {feedbacks.length > 0 ? (
          <div className="feedback-list">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="feedback-card">
                <p className="student-name">{fb.studentName}</p>
                <p className="tutor-name">To: {fb.tutorName}</p>
                <p className="feedback-message">"{fb.message}"</p>
                <p className="feedback-date">{fb.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-feedback">No feedback received yet.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
