import React, { useState } from "react";
import "./SelectionPage.css"; // Ensure the correct styles are included

const CoursePage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = {
    Science: {
      PCM: ["Physics", "Chemistry", "Math"],
      PCB: ["Physics", "Chemistry", "Biology"],
      PCMB: ["Physics", "Chemistry", "Math", "Biology"],
    },
    Commerce: {
      Finance: ["Accounting", "Economics", "Business Studies"],
      Marketing: ["Marketing", "Economics", "Business Communication"],
    },
    Arts: {
      VisualArts: ["Painting", "Sculpture", "Art History"],
      PerformingArts: ["Music", "Drama", "Dance"],
    },
  };

  const handleCourseClick = (course) => {
    if (selectedCourse === course) {
      setSelectedCourse(""); // If clicked again, deselect
    } else {
      setSelectedCourse(course);
      setSelectedGroup(""); // Reset group and subject
      setSelectedSubject("");
    }
  };

  const handleGroupClick = (group, event) => {
    event.stopPropagation(); // Prevents event bubbling
    setSelectedGroup(group);
    setSelectedSubject(""); // Reset subject when group changes
  };

  return (
    <div className="course-page-bg">
      <div className="course-page-html">
        <div className="course-page-body">
          <header className="course-page-course-header">
            <h1>Explore the World of Knowledge</h1>
            <p>Select your course, group, and subject!</p>
          </header>

          {/* Course Selection */}
          <div className="course-page-course-containers">
            {["Science", "Commerce", "Arts"].map((course) => (
              <div
                key={course}
                className={`course-page-course-container ${
                  selectedCourse === course ? "flipped" : ""
                }`}
                onClick={() => handleCourseClick(course)}
              >
                <div className="front">
                  <h2>
                    <i
                      className={`fa fa-${course === "Science" ? "flask" : course === "Commerce" ? "briefcase" : "paint-brush"}`}
                    ></i>
                    {course}
                  </h2>
                  <p>Click to select</p>
                </div>
                <div className="back">
                  {selectedCourse === course && (
                    <div>
                      <h3>Select a Group</h3>
                      <div className="group-options">
                        {Object.keys(subjects[course]).map((group) => (
                          <button
                            key={group}
                            className={selectedGroup === group ? "active" : ""}
                            onClick={(e) => handleGroupClick(group, e)}
                          >
                            <i
                              className={`fa fa-${group === "Finance" ? "credit-card" : group === "Marketing" ? "bullhorn" : "paint-brush"}`}
                            ></i>
                            {group}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Subject Selection (Outside of container) */}
          {selectedGroup && selectedCourse && (
            <div className="subject-selection">
              <h3>Select a Subject</h3>
              <div className="subject-buttons">
                {subjects[selectedCourse][selectedGroup].map(
                  (subject, index) => (
                    <button
                      key={index}
                      className={selectedSubject === subject ? "active" : ""}
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <i
                        className={`fa fa-${subject === "Physics" ? "atom" : subject === "Math" ? "calculator" : subject === "Chemistry" ? "flask" : "book"}`}
                      ></i>
                      {subject}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
