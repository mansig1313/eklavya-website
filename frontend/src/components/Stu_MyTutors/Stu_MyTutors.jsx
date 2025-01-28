import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import "../Stu_MyTutors/Stu_MyTutors.css"; // Ensure the CSS file path is correct
import myImage from './33_Best_Work_From_Home_Online_Tutoring_Jobs-removebg-preview.png';

function MyTutors() {
  const [selectedCourse, setSelectedCourse] = useState("Science");
  const tutors = [
    { name: "Nisha Mishra", expertise: "Algebra Specialist", image: "https://via.placeholder.com/150" },
    { name: "Vipul Vartak", expertise: "Geometry Expert", image: "https://via.placeholder.com/150" },
    { name: "Rishabh Ahuja", expertise: "Calculus Guru", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="my-tutors-main-container">
      {/* Left Container */}
      <div className="left-container">
        <img
          src={myImage}
          alt="Tutoring Session"
          className="left-container-image"
        />
      </div>

      {/* Right Container */}
      <div className="right-container">
        <motion.div
          className="heading-container"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">
            <FaChalkboardTeacher className="icon" />
            My Tutors
          </h1>
          <p className="tagline">"Your learning journey, guided by the best minds!"</p>
        </motion.div>

        {/* Selected Course */}
        <div className="course-display">
          <MdSchool className="course-icon" />
          <span className="selected-course">
            Selected Course: <strong>{selectedCourse}</strong>
          </span>
        </div>

        {/* Tutors List */}
        <div className="tutors-list">
          {tutors.map((tutor, index) => (
            <motion.div
              className="tutor-card"
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <img src={tutor.image} alt={`${tutor.name}'s profile`} className="tutor-image" />
              <div className="tutor-details">
                <h3 className="tutor-name">{tutor.name}</h3>
                <p className="tutor-expertise">{tutor.expertise}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTutors;
