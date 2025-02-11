import React, { useState, useEffect } from "react";
import "./TestList.css";
import { useNavigate } from "react-router-dom";


const TestList = () => {

    const navigate = useNavigate();
    const [tests, setTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterSubject, setFilterSubject] = useState("");

    useEffect(() => {
      fetch("http://localhost:5000/api/tests")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched tests:", data);
        setTests(data);
      })
      .catch((err) => console.error("Error fetching tests:", err));
  }, []);

  // ✅ Filter tests based on search input & subject selection
  const filteredTests = tests.filter((test) => 
    test.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterSubject === "" || test.subject === filterSubject)
  );

  // ✅ Handle clicking the "Edit" button
  const handleEditTest = (testId) => {
    if (!testId) {
      console.error("Error: testId is undefined.");
      return;
    }
      console.log(`Navigating to edit test: ${testId}`);
      navigate(`/edit-test/${testId}`);
  }

  return (
    <div className="test-list-container">
      <h2>My Tests</h2>

      {/* ✅ Search and Filter Options */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search tests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select 
          value={filterSubject} 
          onChange={(e) => setFilterSubject(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Subjects</option>
          {[...new Set(tests.map((test) => test.subject))].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Displaying Tests */}
      {filteredTests.length === 0 ? (
        <p>No tests found.</p>
      ) : (
        <ul className="test-list">
          {filteredTests.map((test) => (
            <li key={test.id} className="test-item">
              <span>{test.subject} - {test.duration} min</span>
              {test.status === "unattempted" && (
                <button className="edit-btn" onClick={() => handleEditTest(test._id)}>
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default TestList;
