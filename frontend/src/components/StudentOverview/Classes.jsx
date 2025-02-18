import React from "react";
import "./Classes.css";
import { FaBook } from "react-icons/fa";

const Classes = () => {
  const classData = [
    { subject: "Math", time: "Monday 10 AM" },
    { subject: "Physics", time: "Wednesday 2 PM" },
    { subject: "Chemistry", time: "Friday 11 AM" },
  ];

  return (
    <div className="classes-container">
      <h2 className="page-title">
        <FaBook /> My Classes
      </h2>
      <div className="class-list">
        {classData.map((cls, index) => (
          <div key={index} className="class-card">
            <h3>{cls.subject}</h3>
            <p>{cls.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
