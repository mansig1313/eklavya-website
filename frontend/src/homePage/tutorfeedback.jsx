import React, { useState } from "react";
import { Star } from "lucide-react";
import "./Tutorfeedback.css";

export default function TutorFeedbackPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const toggleFeedback = (subject) => {
    setSelectedSubject(selectedSubject === subject ? null : subject);
  };

  return (
    <div className="feedback-container">
      {/* Header */}
      <header className="feedback-header">Student Feedback</header>

      {/* Content Wrapper */}
      <div className="feedback-content">
        {/* Sidebar for Subject Selection */}
        <div className="subject-menu">
          {["Physics", "Biology", "Maths", "Chemistry"].map((subject) => (
            <button
              key={subject}
              className="subject-option"
              onClick={() => toggleFeedback(subject)}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Feedback Card */}
        {selectedSubject && (
          <div className="feedback-card">
            <div className="card-body">
              {/* Student Info */}
              <div className="student-details">
                <h3 className="student-name">John Doe</h3>
                <p className="student-grade">Grade 8 | {selectedSubject}</p>
              </div>

              {/* Star Rating */}
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" fill="#facc15" stroke="none" />
                ))}
              </div>

              {/* Feedback Sections */}
              <div className="feedback-section">
                <h3 className="section-title">Strengths</h3>
                <p className="section-text">
                  Excellent problem-solving skills, good participation in class.
                </p>
              </div>

              <div className="feedback-section"> 
                <h3 className="section-title">Areas for Improvement</h3>
                <p className="section-text">
                  Needs to work on time management and completing homework on time.
                </p>
              </div>

              <div className="feedback-section">
                <h3 className="section-title">Tutor's Comments</h3>
                <p className="section-text">
                  John has shown great improvement in his understanding of concepts
                  but should practice more problems.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
