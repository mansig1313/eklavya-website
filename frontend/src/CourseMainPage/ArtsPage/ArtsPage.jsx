import React, { useState } from "react";
import "./ArtsPage.css"; // Create and customize this CSS file
import { FaPaintBrush, FaMusic, FaTheaterMasks, FaBook } from "react-icons/fa";

const ArtsPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  const subjects = {
    VisualArts: [
      { name: "Painting", icon: <FaPaintBrush /> },
      { name: "Sculpture", icon: <FaPaintBrush /> },
      { name: "Art History", icon: <FaBook /> },
    ],
    PerformingArts: [
      { name: "Music", icon: <FaMusic /> },
      { name: "Drama", icon: <FaTheaterMasks /> },
      { name: "Dance", icon: <FaMusic /> },
    ],
  };

  return (
    <div id="arts-page-wrapper">
      <div className="arts-page-container">
        <div className="arts-courses-page">
          <header className="arts-page-header">
            <h1>Explore the World of Arts</h1>
            <p>Select your field and dive into the subjects of your choice!</p>
          </header>

          {!selectedGroup ? (
            <div className="arts-page-group-selection">
              <h2>SELECT A FIELD</h2>
              <div className="arts-page-group-buttons">
                <button onClick={() => handleGroupSelection("VisualArts")}>
                  Visual Arts
                </button>
                <button onClick={() => handleGroupSelection("PerformingArts")}>
                  Performing Arts
                </button>
              </div>
            </div>
          ) : (
            <div className="arts-page-subject-list">
              <h2>SUBJECTS FOR {selectedGroup}</h2>
              <div className="arts-page-subjects">
                {subjects[selectedGroup].map((subject, index) => (
                  <button key={index} className="arts-page-subject-button">
                    {subject.icon}
                    <span>{subject.name}</span>
                  </button>
                ))}
              </div>
              <button
                className="arts-page-back-button"
                onClick={() => setSelectedGroup(null)}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtsPage;
