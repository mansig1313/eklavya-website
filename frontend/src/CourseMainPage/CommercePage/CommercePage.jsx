import React, { useState } from "react";
import "./CommercePage.css"; // Create and customize this CSS file
import { FaMoneyBillWave, FaChartLine, FaBalanceScale } from "react-icons/fa";

const CommercePage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  const subjects = {
    Finance: [
      { name: "Accounting", icon: <FaMoneyBillWave /> },
      { name: "Economics", icon: <FaChartLine /> },
      { name: "Business Studies", icon: <FaBalanceScale /> },
    ],
    Marketing: [
      { name: "Marketing", icon: <FaChartLine /> },
      { name: "Economics", icon: <FaChartLine /> },
      { name: "Business Communication", icon: <FaBalanceScale /> },
    ],
  };

  return (
    <div id="commerce-page-wrapper">
      <div className="commerce-page-container">
        <div className="commerce-courses-page">
          <header className="commerce-page-header">
            <h1>Explore the World of Commerce</h1>
            <p>
              Select your specialization and dive into the subjects of your
              choice!
            </p>
          </header>

          {!selectedGroup ? (
            <div className="commerce-page-group-selection">
              <h2>Select a Specialization:</h2>
              <div className="commerce-page-group-buttons">
                <button onClick={() => handleGroupSelection("Finance")}>
                  Finance
                </button>
                <button onClick={() => handleGroupSelection("Marketing")}>
                  Marketing
                </button>
              </div>
            </div>
          ) : (
            <div className="commerce-page-subject-list">
              <h2>Subjects for {selectedGroup} </h2>
              <div className="commerce-page-subjects">
                {subjects[selectedGroup].map((subject, index) => (
                  <button key={index} className="commerce-page-subject-button">
                    {subject.icon}
                    <span>{subject.name}</span>
                  </button>
                ))}
              </div>
              <button
                className="commerce-page-back-button"
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

export default CommercePage;
