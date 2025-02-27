import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TestPage.css";
import { motion } from "framer-motion";

const TestPage = () => {
  const { courseId, testId } = useParams();
  const navigate = useNavigate();
  const studentEmail = localStorage.getItem("email") || "";

  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      if (!studentEmail) {
        navigate("/login");
        return;
      }
      try {
        console.log(`Fetching test ${testId} for course ${courseId} with email ${studentEmail}`);
        const response = await axios.get(`http://localhost:5000/api/tests/${testId}?studentEmail=${studentEmail}`);
        console.log("Test response:", response.data);
        setTest(response.data);
        const [hours] = response.data.duration.match(/\d+/) || [1];
        setTimeLeft(parseInt(hours) * 3600);
      } catch (err) {
        console.error("Error fetching test:", err);
        setError(err.response?.data?.error || "Failed to load test");
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId, navigate]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = useCallback((questionIndex, optionText) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionText }));
    setQuestionStatus((prev) => ({ ...prev, [questionIndex]: "attempted" }));
  }, []);

  const handleMarkForReview = useCallback((questionIndex) => {
    setQuestionStatus((prev) => ({ ...prev, [questionIndex]: "review" }));
    setCurrentQuestion((prev) => (prev + 1) % test.questions.length);
  }, [test]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/tests/${testId}/submit`, {
        studentEmail,
        answers,
      });
      alert(`Test submitted! Score: ${response.data.score}/${response.data.total}`);
      navigate("/student-dashboard");
    } catch (err) {
      console.error("Error submitting test:", err);
      alert("Failed to submit test: " + (err.response?.data?.error || err.message));
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!test) return <div>No test data available.</div>;

  const currentQuestionData = test.questions[currentQuestion];

  return (
    <div className={`test-container ${darkMode ? "dark-mode" : ""}`}>
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{test.name} - {test.subject}</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </motion.header>

      <main className="content">
        <motion.section
          className="question-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Question {currentQuestion + 1} of {test.questions.length}</h2>
          {currentQuestionData.image && (
            <img src={currentQuestionData.image} alt="Question" className="question-image" />
          )}
          <p>{currentQuestionData.text}</p>

          <div className="options">
            {currentQuestionData.options.map((option, index) => (
              <motion.button
                key={index}
                className={`option ${answers[currentQuestion] === option ? "selected" : ""}`}
                onClick={() => handleOptionSelect(currentQuestion, option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <div className="actions">
            <button
              className="save-next-btn"
              onClick={() => setCurrentQuestion((prev) => (prev + 1) % test.questions.length)}
            >
              Save & Next
            </button>
            <button className="review-next-btn" onClick={() => handleMarkForReview(currentQuestion)}>
              Mark for Review & Next
            </button>
            <button className="clear-response-btn" onClick={() => handleOptionSelect(currentQuestion, null)}>
              Clear Response
            </button>
            {currentQuestion === test.questions.length - 1 && (
              <motion.button
                className="submit-btn"
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Test
              </motion.button>
            )}
          </div>
        </motion.section>

        <aside className="navigation-panel">
          <div className="timer">
            <span className="clock-icon">⏰</span>
            <span className="time">{timeLeft !== null ? formatTime(timeLeft) : "Loading..."}</span>
          </div>

          <h3>Question Navigation</h3>
          <div className="question-nav">
            {test.questions.map((_, index) => (
              <motion.button
                key={index}
                className={`nav-btn ${
                  index === currentQuestion ? "current" : questionStatus[index] || "not-attempted"
                }`}
                onClick={() => setCurrentQuestion(index)}
                whileHover={{ scale: 1.1 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>

          <div className="progress">
            <p>Progress: {Object.keys(answers).length} / {test.questions.length} questions answered</p>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(Object.keys(answers).length / test.questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TestPage;