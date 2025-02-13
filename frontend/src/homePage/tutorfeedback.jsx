import React, { useState } from "react";
import "./Tutorfeedback.css";

const feedbackData = {
  Physics: {
    student: "Mansi Gawde",
    grade: "Grade 11 | Physics",
    tutor: "Ms. Smith",
    stars: 5,
    strengths: "Excellent problem-solving skills, active participation in class discussions.",
    improvement: "Needs to work on time management and completing homework on time.",
    comments: "Mansi has shown great improvement in her understanding of concepts. More practice with problem-solving will help her perform even better."
  },
  Biology: {
    student: "Amit Sharma",
    grade: "Grade 10 | Biology",
    tutor: "Dr. Mehta",
    stars: 4,
    strengths: "Strong analytical skills and keen observation in lab experiments.",
    improvement: "Needs to improve on writing structured answers.",
    comments: "Amit is a quick learner but should focus on improving written explanations."
  },
  Maths: {
    student: "Riya Patel",
    grade: "Grade 12 | Maths",
    tutor: "Mr. Rao",
    stars: 5,
    strengths: "Excellent logical thinking and problem-solving abilities.",
    improvement: "Needs to focus on accuracy in calculations.",
    comments: "Riya is doing great but should work on double-checking answers for accuracy."
  },
  Chemistry: {
    student: "Soham Kulkarni",
    grade: "Grade 11 | Chemistry",
    tutor: "Ms. Kapoor",
    stars: 4,
    strengths: "Good conceptual understanding and lab skills.",
    improvement: "Needs to enhance memorization of chemical formulas.",
    comments: "Soham is progressing well but should work on formula retention."
  }
};

const TutorFeedback = () => {
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const feedback = feedbackData[selectedSubject];

  return (
    <div className="tutorfeedback-container">
      <header className="tutorfeedback-header">Student Feedback</header>
      <div className="tutorfeedback-content">
        <aside className="tutorfeedback-sidebar">
          <h2>Subjects</h2>
          {Object.keys(feedbackData).map((subject) => (
            <button
              key={subject}
              className={`tutorfeedback-subject-btn ${selectedSubject === subject ? "active" : ""}`}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </aside>
        <main className="tutorfeedback-card">
          <h2 className="tutorfeedback-student-name">{feedback.student}</h2>
          <p className="tutorfeedback-grade">{feedback.grade}</p>
          <p className="tutorfeedback-tutor">Tutor: <strong>{feedback.tutor}</strong></p>
          <div className="tutorfeedback-stars">{'⭐'.repeat(feedback.stars)}</div>
          <div className="tutorfeedback-section">
            <h3>STRENGTHS</h3>
            <p>{feedback.strengths}</p>
          </div>
          <div className="tutorfeedback-section">
            <h3>AREAS FOR IMPROVEMENT</h3>
            <p>{feedback.improvement}</p>
          </div>
          <div className="tutorfeedback-section">
            <h3>TUTOR'S COMMENTS</h3>
            <p>{feedback.comments}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorFeedback;
