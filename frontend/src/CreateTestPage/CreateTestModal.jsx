import React, { useState } from "react";
import "./CreateTestModal.css";

const CreateTestModal = ({ setShowModal, setTests }) => {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreateTest = () => {
    if (subject && duration) {
      setTests((prevTests) => [
        ...prevTests,
        { id: Date.now(), subject, date: new Date().toISOString().split("T")[0], attempted: false },
      ]);
      setShowModal(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create New Test</h2>

        <label>Subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Select Subject</option>
          <option value="Math">Math</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>

        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration"
        />

        <div className="modal-buttons">
          <button className="create-btn" onClick={handleCreateTest}>
            Create
          </button>
          <button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestModal;
