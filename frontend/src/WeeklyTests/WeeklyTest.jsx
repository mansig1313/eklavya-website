import React, { useState, useEffect } from "react";
import { FaPlay, FaCheckCircle, FaFileAlt } from "react-icons/fa";
import "../WeeklyTests/WeeklyTest";

const WeeklyTests = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Mock data for the tests (replace with API call to fetch actual data)
    const fetchedTests = [
      { id: 1, title: "Maths Test 1", date: "2025-01-29", status: "Scheduled" },
      { id: 2, title: "Science Test 1", date: "2025-02-03", status: "Scheduled" },
      { id: 3, title: "English Test 1", date: "2025-01-25", status: "Completed" },
    ];
    setTests(fetchedTests);
  }, []);

  return (
    <div className="weekly-tests">
      <div className="weekly-tests-header">
        <h2>📚 Weekly Tests</h2>
        <p>Stay on top of your learning with the latest test schedule!</p>
      </div>
      <div className="weekly-tests-list">
        {tests.map((test) => (
          <div key={test.id} className="weekly-tests-card">
            <div className="weekly-tests-info">
              <h3 className="weekly-tests-title">{test.title}</h3>
              <p className="weekly-tests-detail">
                <FaFileAlt className="weekly-tests-icon" /> Date: {test.date}
              </p>
              <p className="weekly-tests-detail">
                <FaCheckCircle
                  className={`weekly-tests-icon status-icon ${
                    test.status === "Completed" ? "completed" : "scheduled"
                  }`}
                />
                Status: <span className="weekly-tests-status">{test.status}</span>
              </p>
            </div>
            <div className="weekly-tests-action">
              {test.status === "Scheduled" && (
                <button className="weekly-tests-button start">
                  <FaPlay className="button-icon" /> Start Test
                </button>
              )}
              {test.status === "Completed" && (
                <button className="weekly-tests-button view">
                  <FaFileAlt className="button-icon" /> View Results
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTests;
