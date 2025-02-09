import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateTestModal from "./CreateTestModal";
import "./CreateTest.css";

  const CreateTest = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [tests, setTests] = useState([]);

    const handleEdit = (testId) => {
      console.log("Edit button clicked for test ID:", testId); // Debugging
      navigate(`/edit-test/${testId}`); // Ensure this route exists
    };
  
    useEffect(() => {
      fetch("http://localhost:5000/api/tests")
        .then((res) => res.json())
        .then((data) => setTests(data))
        .catch((err) => console.error("Error fetching tests:", err));
    }, []);
  
    const filteredTests = tests.filter(
      (test) =>
        test.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.date.includes(searchQuery)
    );

  return (
    <div className="create-test-container">
      <h2 className="title">Create & Manage Tests</h2>

      {/* Search & Filter */}
      <input
        type="text"
        className="search-box"
        placeholder="Search by subject or date..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Previous Tests Section */}
      <div className="previous-tests">
        <h3>Previous Tests</h3>
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <div key={test.id} className="test-card">
              <p><strong>Subject:</strong> {test.subject}</p>
              <p><strong>Date:</strong> {test.date}</p>
              {!test.attempted && (
                <button className="edit-btn" onClick={() => handleEdit(test.id)}>Edit</button>
              )}
            </div>
          ))
        ) : (
          <p>No tests found</p>
        )}
      </div>

      {/* Create Test Button */}
      <button className="create-btn" onClick={() => setShowModal(true)}>
        + Create Test
      </button>

      {/* Floating Modal Popup */}
      {showModal && <CreateTestModal setShowModal={setShowModal} setTests={setTests} />}
    </div>
  );
};

export default CreateTest;
