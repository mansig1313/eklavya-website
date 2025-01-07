import React, { useState } from "react";
import "./SciencePage.css"; // Ensure this file exists and is correctly linked
import { FaFlask, FaAtom, FaDna, FaCalculator } from "react-icons/fa";

const SciencePage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  const subjects = {
    PCM: [
      { name: "Physics", icon: <FaAtom /> },
      { name: "Chemistry", icon: <FaFlask /> },
      { name: "Mathematics", icon: <FaCalculator /> },
    ],
    PCB: [
      { name: "Physics", icon: <FaAtom /> },
      { name: "Chemistry", icon: <FaFlask /> },
      { name: "Biology", icon: <FaDna /> },
    ],
    PCMB: [
      { name: "Physics", icon: <FaAtom /> },
      { name: "Chemistry", icon: <FaFlask /> },
      { name: "Mathematics", icon: <FaCalculator /> },
      { name: "Biology", icon: <FaDna /> },
    ],
  };

  return (
    <div id="science-page-wrapper">
      <div className="science-page-container">
        <div className="science-courses-page">
          {/* Header */}
          <header className="science-page-header">
            <h1>Explore the World of Science</h1>
            <p>Select your group and dive into the subjects of your choice!</p>
          </header>

          {/* Group Selection or Subject Display */}
          {!selectedGroup ? (
            <section className="science-page-group-selection">
              <h2>SELECT A GROUP</h2>
              <div className="science-page-group-buttons">
                <button
                  onClick={() => handleGroupSelection("PCM")}
                  className="science-group-button"
                >
                  PCM
                </button>
                <button
                  onClick={() => handleGroupSelection("PCB")}
                  className="science-group-button"
                >
                  PCB
                </button>
                <button
                  onClick={() => handleGroupSelection("PCMB")}
                  className="science-group-button"
                >
                  PCMB
                </button>
              </div>
            </section>
          ) : (
            <section className="science-page-subject-list">
              <h2>SUBJECTS FOR {selectedGroup}</h2>
              <div className="science-page-subjects">
                {subjects[selectedGroup].map((subject, index) => (
                  <button
                    key={index}
                    className="science-page-subject-button"
                    aria-label={subject.name}
                  >
                    {subject.icon}
                    <span>{subject.name}</span>
                  </button>
                ))}
              </div>
              <button
                className="science-page-back-button"
                onClick={() => setSelectedGroup(null)}
              >
                Go Back
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SciencePage;
