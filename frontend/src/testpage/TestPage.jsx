import React, { useState, useEffect, useCallback } from "react";
import "./TestPage.css";

const dummyQuestions = [
  {
    id: 1,
    text: "What is the capital of France?",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    options: [
      { id: "a", text: "Paris" },
      { id: "b", text: "London" },
      { id: "c", text: "Berlin" },
      { id: "d", text: "Madrid" }
    ]
  },
  {
    id: 2,
    text: "What is the largest planet in the solar system?",
    options: [
      { id: "a", text: "Earth" },
      { id: "b", text: "Jupiter" },
      { id: "c", text: "Mars" },
      { id: "d", text: "Saturn" }
    ]
  },
  {
    id: 3,
    text: "Which programming language is known as the 'language of the web'?",
    options: [
      { id: "a", text: "Python" },
      { id: "b", text: "Java" },
      { id: "c", text: "JavaScript" },
      { id: "d", text: "C++" }
    ]
  }
];

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = useCallback((questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "attempted" }));
  }, []);

  const handleMarkForReview = useCallback((questionId) => {
    setQuestionStatus((prev) => ({ ...prev, [questionId]: "review" }));
    setCurrentQuestion((prev) => (prev + 1) % dummyQuestions.length);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const currentQuestionData = dummyQuestions[currentQuestion];

  return (
    <div className={`test-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <header className="header">
        <h1>Online Test Platform</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Main Content */}
      <main className="content">
        {/* Left Panel: Question */}
        <section className="question-panel">
          <h2>
            Question {currentQuestion + 1} of {dummyQuestions.length}
          </h2>
          {currentQuestionData.image && (
            <img src={currentQuestionData.image} alt="Question" className="question-image" />
          )}
          <p>{currentQuestionData.text}</p>

          <div className="options">
            {currentQuestionData.options.map((option) => (
              <button
                key={option.id}
                className={`option ${answers[currentQuestion] === option.id ? "selected" : ""}`}
                onClick={() => handleOptionSelect(currentQuestion, option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>

          <div className="actions">
            <button className="save-next-btn" onClick={() => setCurrentQuestion((prev) => (prev + 1) % dummyQuestions.length)}>
              Save & Next
            </button>
            <button className="review-next-btn" onClick={() => handleMarkForReview(currentQuestion)}>
              Mark for Review & Next
            </button>
            <button className="clear-response-btn" onClick={() => handleOptionSelect(currentQuestion, null)}>
              Clear Response
            </button>
          </div>
        </section>

        {/* Right Panel: Navigation */}
        <aside className="navigation-panel">
          <div className="timer">
            <span className="clock-icon">⏰</span>
            <span className="time">{formatTime(timeLeft)}</span>
          </div>

          <h3>Question Navigation</h3>
          <div className="question-nav">
            {dummyQuestions.map((_, index) => (
              <button
                key={index}
                className={`nav-btn ${
                  index === currentQuestion ? "current" : questionStatus[index] || "not-attempted"
                }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="progress">
            <p>
              Progress: {Object.keys(answers).length} / {dummyQuestions.length} questions answered
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(Object.keys(answers).length / dummyQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TestPage;